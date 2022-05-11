/**
 * Copyright (c) 2022 Blue Jeans Network, Inc. All rights reserved.
 */
package com.bluejeansnet.embedsdk.webview

import android.util.Log
import android.webkit.JavascriptInterface
import com.bluejeansnet.embedsdk.activities.ConnectionState
import com.bluejeansnet.embedsdk.model.ConnectionStateJson
import com.bluejeansnet.embedsdk.utils.EMBED_NATIVE
import com.bluejeansnet.embedsdk.utils.JSON_CONNECTED
import com.bluejeansnet.embedsdk.utils.JSON_CONNECTING
import com.bluejeansnet.embedsdk.utils.JSON_CONNECTION_STATE
import com.bluejeansnet.embedsdk.utils.JSON_DISCONNECTED
import com.google.gson.Gson
import io.reactivex.rxjava3.subjects.PublishSubject

class WebViewJsInterface {

    @JavascriptInterface
    fun receiveMessage(data: String?) {
        data?.let {
            val json = Gson().fromJson(it, ConnectionStateJson::class.java)

            if (json.type == EMBED_NATIVE) {
                jsEventInternal.onNext(it)
                if (json.property == JSON_CONNECTION_STATE) {
                    when (json.value) {
                        JSON_CONNECTING -> connectionStateInternal.onNext(ConnectionState.Connecting)
                        JSON_CONNECTED -> connectionStateInternal.onNext(ConnectionState.Connected)
                        JSON_DISCONNECTED -> connectionStateInternal.onNext(ConnectionState.Disconnected)
                        else -> Log.w(TAG, "Unrecognized connection state ${json.value}")
                    }
                }
            }
        }
    }

    companion object {
        private const val TAG = "WebViewJsInterface"

        private val connectionStateInternal = PublishSubject.create<ConnectionState>()
        private val jsEventInternal = PublishSubject.create<String>()

        val connectionState = connectionStateInternal.hide()
        val jsEvent = jsEventInternal.hide()
    }
}