/**
 * Copyright (c) 2022 Blue Jeans Network, Inc. All rights reserved.
 */
package com.bluejeansnet.embedsdk.utils

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.util.MalformedJsonException
import android.view.View
import android.view.inputmethod.InputMethodManager
import android.widget.Toast
import org.json.JSONException
import org.json.JSONObject


fun showToast(context: Context, message: String) {
    Toast.makeText(context, message, Toast.LENGTH_LONG).show()
}

fun joinMeeting(context: Context, meetingProps: String, isJoinByMeetingId: Boolean = false) {
    val intent = Intent(context, com.bluejeansnet.embedsdk.activities.MeetingActivity::class.java)
    intent.putExtra(EXTRA_MEETING_PROPS, meetingProps)
    intent.putExtra(EXTRA_IS_JOIN_BY_ID, isJoinByMeetingId)

    context.startActivity(intent)
}

fun validateJson(payload: String): Boolean {
    return try {
        JSONObject(payload)
        true
    } catch (ex: MalformedJsonException) {
        false
    } catch (ex: JSONException) {
        false
    }
}

fun hideKeyboard(context: Context, view: View) {
    val imm: InputMethodManager =
        context.getSystemService(Activity.INPUT_METHOD_SERVICE) as InputMethodManager
    imm.hideSoftInputFromWindow(view.windowToken, 0)
}