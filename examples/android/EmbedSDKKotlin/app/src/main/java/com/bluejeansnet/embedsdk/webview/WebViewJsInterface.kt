/**
 * Copyright (c) 2022 Blue Jeans Network, Inc. All rights reserved.
 */
package com.bluejeansnet.embedsdk.webview

import android.content.Context
import android.webkit.JavascriptInterface

class WebViewJsInterface {

    @JavascriptInterface
    fun receiveMessage(data: String?) {
        data?.let {
            messageReceived.onMessageReceived(it)
        }
    }

    interface JsMessageReceived {
        fun onMessageReceived(message: String)
    }

    companion object {
        private const val TAG = "WebViewJsInterface"

        private lateinit var messageReceived: JsMessageReceived
        private var webViewJsInterface: WebViewJsInterface? = null

        fun newInstance(context: Context): WebViewJsInterface {
            messageReceived = context as JsMessageReceived
            webViewJsInterface?.let {
                return it
            }
            webViewJsInterface = WebViewJsInterface()
            return webViewJsInterface as WebViewJsInterface
        }
    }
}