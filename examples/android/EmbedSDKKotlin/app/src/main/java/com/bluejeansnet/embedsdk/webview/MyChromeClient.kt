/**
 * Copyright (c) 2022 Blue Jeans Network, Inc. All rights reserved.
 */
package com.bluejeansnet.embedsdk.webview

import android.annotation.TargetApi
import android.os.Build
import android.util.Log
import android.webkit.ConsoleMessage
import android.webkit.PermissionRequest
import android.webkit.WebChromeClient
import java.lang.Exception

class MyChromeClient : WebChromeClient() {
    private val TAG = "MyChromeClient"

    private val permissions = arrayOf(PermissionRequest.RESOURCE_AUDIO_CAPTURE, PermissionRequest.RESOURCE_VIDEO_CAPTURE)

    override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
        return super.onConsoleMessage(consoleMessage)
    }

    /**
     * This method grants the camera and microphone permission required by the [WebView]
     * to connect to a meeting.
     */
    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    override fun onPermissionRequest(request: PermissionRequest?) {
        try {
            request?.grant(permissions)
        } catch (e: Exception) {
            Log.e(TAG, "Exception occured while granting permission to the webview: $e")
        }
    }
}