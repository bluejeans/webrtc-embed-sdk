/**
 * Copyright (c) 2022 Blue Jeans Network, Inc. All rights reserved.
 */
package com.bluejeansnet.embedsdk.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.util.MalformedJsonException
import android.webkit.WebSettings
import android.webkit.WebView
import android.widget.Toast
import com.bluejeansnet.embedsdk.databinding.ActivityMeetingBinding
import com.bluejeansnet.embedsdk.storage.MySharedPreferences
import com.bluejeansnet.embedsdk.utils.ASSET_DIRECTORY
import com.bluejeansnet.embedsdk.utils.ENCODING
import com.bluejeansnet.embedsdk.utils.EXECUTE_JS
import com.bluejeansnet.embedsdk.utils.EXTRA_IS_JOIN_BY_ID
import com.bluejeansnet.embedsdk.utils.EXTRA_MEETING_PROPS
import com.bluejeansnet.embedsdk.utils.INDEX_HTML
import com.bluejeansnet.embedsdk.utils.JSON_MEETING_ID
import com.bluejeansnet.embedsdk.utils.JSON_MEETING_INFO
import com.bluejeansnet.embedsdk.utils.JSON_NAME
import com.bluejeansnet.embedsdk.utils.JSON_PASSCODE
import com.bluejeansnet.embedsdk.utils.LEAVE_MEETING_JS
import com.bluejeansnet.embedsdk.utils.MIME_TYPE
import com.bluejeansnet.embedsdk.utils.PREF_MEETING_ID
import com.bluejeansnet.embedsdk.utils.PREF_MEETING_NAME
import com.bluejeansnet.embedsdk.utils.PREF_MEETING_PASSCODE
import com.bluejeansnet.embedsdk.utils.PREF_MEETING_PROPS
import com.bluejeansnet.embedsdk.utils.hideKeyboard
import com.bluejeansnet.embedsdk.utils.validateJson
import com.bluejeansnet.embedsdk.webview.MyChromeClient
import com.bluejeansnet.embedsdk.webview.WebViewJsInterface
import com.bluejeansnet.embedsdk.webview.MyWebViewClient
import io.reactivex.rxjava3.disposables.CompositeDisposable
import org.json.JSONException
import org.json.JSONObject

sealed class ConnectionState {
    object Connecting : ConnectionState()
    object Connected : ConnectionState()
    object Disconnected : ConnectionState()
}

/**
 *
 */
class MeetingActivity : AppCompatActivity() {
    private val TAG = "MeetingActivity"

    private lateinit var activityMeetingBinding: ActivityMeetingBinding
    private lateinit var mySharedPreferences: MySharedPreferences
    private var meetingProps: String? = null

    private val compositeDisposable = CompositeDisposable()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        activityMeetingBinding = ActivityMeetingBinding.inflate(layoutInflater)
        setContentView(activityMeetingBinding.root)

        mySharedPreferences = MySharedPreferences()

        meetingProps = intent.getStringExtra(EXTRA_MEETING_PROPS)

        meetingProps?.let {
            try {
                val jsonObject = JSONObject(it)
                if (intent.getBooleanExtra(EXTRA_IS_JOIN_BY_ID, false)) {
                    convertToJsonAndSave(it)
                } else {
                    mySharedPreferences.setItem(PREF_MEETING_PROPS, it, applicationContext)
                }
                initializeWebView(jsonObject)

                var indexFile = application.assets.open(INDEX_HTML).bufferedReader().use {
                    it.readText()
                }

                activityMeetingBinding.webView.loadDataWithBaseURL(ASSET_DIRECTORY, indexFile, MIME_TYPE, ENCODING, null)
            } catch (e: JSONException) {
                Log.e(TAG, e.printStackTrace().toString())
                e.message?.let {
                    showToast(it)
                }
            } catch (e: MalformedJsonException) {
                Log.e(TAG, e.printStackTrace().toString())
                e.message?.let {
                    showToast(it)
                }
            }
        }

        compositeDisposable.add(
            WebViewJsInterface.connectionState.subscribe({
                when (it) {
                    ConnectionState.Connecting -> updateConnectionState(com.bluejeansnet.embedsdk.utils.JSON_CONNECTING)
                    ConnectionState.Connected -> updateConnectionState(com.bluejeansnet.embedsdk.utils.JSON_CONNECTED)
                    ConnectionState.Disconnected -> runOnUiThread {
                        finish()
                    }
                }
            }, {
                Log.e(TAG, "Exception occured while receiving connection state: ${it.message}")
            })
        )

        compositeDisposable.add(
            WebViewJsInterface.jsEvent.subscribe({ event ->
                event?.let {
                    runOnUiThread {
                        activityMeetingBinding.tvJsEvents.text = it
                    }
                }
            }, {
                Log.e(TAG, "Exception occured while receiving JS event: ${it.message}")
            })
        )

        activityMeetingBinding.btnSubmit.setOnClickListener {
            val payload = activityMeetingBinding.etPayload.text.toString()
            if (!validateJson(payload)) {
                showToast("Invalid payload")
                return@setOnClickListener
            }

            Log.i(TAG, "Executing JS: ${EXECUTE_JS.format(payload)}")
            activityMeetingBinding.webView.evaluateJavascript(EXECUTE_JS.format(payload), null)
            activityMeetingBinding.etPayload.setText("")

            hideKeyboard(applicationContext, it)
        }
    }

    override fun onBackPressed() {
        super.onBackPressed()
        activityMeetingBinding.webView.evaluateJavascript(LEAVE_MEETING_JS, null)
        finish()
    }

    override fun onDestroy() {
        super.onDestroy()
        compositeDisposable.dispose()
    }

    private fun showToast(message: String) {
        Toast.makeText(applicationContext, message, Toast.LENGTH_LONG).show()
    }

    private fun initializeWebView(jsonObject: JSONObject) {
        activityMeetingBinding.webView.clearCache(true)
        activityMeetingBinding.webView.settings.cacheMode = WebSettings.LOAD_CACHE_ELSE_NETWORK
        activityMeetingBinding.webView.settings.domStorageEnabled = true
        activityMeetingBinding.webView.settings.javaScriptEnabled = true
        activityMeetingBinding.webView.settings.useWideViewPort = true
        activityMeetingBinding.webView.settings.mediaPlaybackRequiresUserGesture = false
        WebView.setWebContentsDebuggingEnabled(true)

        activityMeetingBinding.webView.webViewClient = MyWebViewClient(jsonObject)
        activityMeetingBinding.webView.webChromeClient = MyChromeClient()
        activityMeetingBinding.webView.addJavascriptInterface(
            WebViewJsInterface(), "Android"
        )
    }

    private fun convertToJsonAndSave(meetingProps: String) {
        try {
            val meetingInfoJson = JSONObject(meetingProps).getJSONObject(JSON_MEETING_INFO)

            val meetingId = meetingInfoJson.getString(JSON_MEETING_ID)
            val meetingPasscode = meetingInfoJson.getString(JSON_PASSCODE)
            val name = meetingInfoJson.getString(JSON_NAME)

            mySharedPreferences.setItem(PREF_MEETING_ID, meetingId, applicationContext)

            if (!meetingPasscode.isNullOrEmpty()) {
                mySharedPreferences.setItem(
                    PREF_MEETING_PASSCODE,
                    meetingPasscode,
                    applicationContext
                )
            }

            mySharedPreferences.setItem(PREF_MEETING_NAME, name, applicationContext)
        } catch (ex: JSONException) {
            Log.e(TAG, "Exception occured while converting meeting props string to JSON ${ex.message}")
            showToast("Something went wrong while saving meeting ID, meeting passcode and name")
            finish()
        } catch (ex: MalformedJsonException) {
            Log.e(TAG, "Exception occured while converting meeting props string to JSON ${ex.message}")
            showToast("Something went wrong while saving meeting ID, meeting passcode and name")
            finish()
        }
    }

    private fun updateConnectionState(state: String) {
        runOnUiThread {
            activityMeetingBinding.tvConnectionState.setText(
                com.bluejeansnet.embedsdk.utils.CONNECTION_STATE + state)
        }
    }
}