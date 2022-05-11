/**
 * Copyright (c) 2022 Blue Jeans Network, Inc. All rights reserved.
 */
package com.bluejeansnet.embedsdk.utils

const val MEETING_JOIN_PROPS_JSON = "joinMeetingProps.json"

const val PROD_MEETINGS_URL = "https://bluejeans.com"
const val STAGE_MEETINGS_URL = "https://a.bluejeans.com"

const val EXTRA_MEETING_PROPS = "meeting_props"
const val EXTRA_IS_JOIN_BY_ID = "is_join_by_id"

const val INDEX_HTML = "index.html"

const val ASSET_DIRECTORY = "file:///android_asset/"
const val MIME_TYPE = "text/html"
const val ENCODING = "UTF-8"

const val JS_EVENT_CALLBACK =
    "function receiveMessage(event) {Android.receiveMessage(" +
            "JSON.stringify(event.data));} \n window.addEventListener(\"message\", receiveMessage, false);"
const val EMBED_PROXY = "embedProxy.toProxy"
const val EMBED_NATIVE = "embedProxy.toNative"
const val METHOD_JOIN_MEETING = "joinMeeting"
const val JOIN_MEETING = "window.postMessage({ \"type\": \"$EMBED_PROXY\", \n\"method\": \"$METHOD_JOIN_MEETING\", \n\"args\": [%1s] });"
const val EXECUTE_JS = "window.postMessage(%1s);"
const val LEAVE_MEETING_JS = "window.postMessage({\n" +
        "        \"type\": \"embedProxy.toProxy\",\n" +
        "        \"method\" : \"leave\",\n" +
        "        \"args\": []\n" +
        "    })"
const val JSON_TYPE = "type"
const val JSON_CONNECTION_STATE = "connectionState"
const val JSON_CONNECTING = "Connecting"
const val JSON_CONNECTED = "Connected"
const val JSON_DISCONNECTED = "Disconnected"
const val JSON_PROPERTY = "property"
const val JSON_MEETING_INFO = "meetingInfo"
const val JSON_MEETING_ID = "meetingId"
const val JSON_PASSCODE = "passcode"
const val JSON_NAME = "name"
const val JSON_MEETING_ORIGIN = "meetingOrigin"
const val CONNECTION_STATE = "Connection State: "

const val SHARED_PREFERENCES_FILE = "com.bluejeansnet.embedsdk.storage"
const val PREF_MEETING_PROPS = "preference.meeting.props"
const val PREF_MEETING_ID = "preference.meeting.id"
const val PREF_MEETING_PASSCODE = "preference.meeting.passcode"
const val PREF_MEETING_NAME = "preference.meeting.name"

const val PERMISSIONS_REQUEST_CODE = 500

val PERMISSIONS = arrayOf(
    "android.permission.CAMERA",
    "android.permission.INTERNET",
    "android.permission.BLUETOOTH",
    "android.permission.MODIFY_AUDIO_SETTINGS",
    "android.permission.RECORD_AUDIO"
)