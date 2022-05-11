/**
 * Copyright (c) 2022 Blue Jeans Network, Inc. All rights reserved.
 */
package com.bluejeansnet.embedsdk.webview

import android.util.Log
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import com.bluejeansnet.embedsdk.utils.JOIN_MEETING
import com.bluejeansnet.embedsdk.utils.JS_EVENT_CALLBACK
import org.json.JSONObject

class MyWebViewClient(private val meetingProps: JSONObject) : WebViewClient() {

    private val TAG = "MyWebViewClient"

    private val postMessage = JOIN_MEETING.format(
        meetingProps
    )

    override fun onPageFinished(view: WebView?, url: String?) {
        view?.evaluateJavascript(JS_EVENT_CALLBACK, null)
        view?.evaluateJavascript(postMessage, null)
    }

    override fun onReceivedError(
        view: WebView?,
        request: WebResourceRequest?,
        error: WebResourceError?
    ) {
        super.onReceivedError(view, request, error)
        error?.toString()?.let { Log.e(TAG, it) }
    }
}