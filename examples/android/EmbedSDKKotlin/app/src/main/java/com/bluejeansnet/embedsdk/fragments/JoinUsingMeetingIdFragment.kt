/**
 * Copyright (c) 2022 Blue Jeans Network, Inc. All rights reserved.
 */
package com.bluejeansnet.embedsdk.fragments

import android.os.Bundle
import android.util.Log
import android.util.MalformedJsonException
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import com.bluejeansnet.embedsdk.R
import com.bluejeansnet.embedsdk.storage.MySharedPreferences
import com.bluejeansnet.embedsdk.utils.JSON_MEETING_ID
import com.bluejeansnet.embedsdk.utils.JSON_MEETING_INFO
import com.bluejeansnet.embedsdk.utils.JSON_NAME
import com.bluejeansnet.embedsdk.utils.JSON_PASSCODE
import com.bluejeansnet.embedsdk.utils.MEETING_JOIN_PROPS_JSON
import com.bluejeansnet.embedsdk.utils.PREF_MEETING_ID
import com.bluejeansnet.embedsdk.utils.PREF_MEETING_NAME
import com.bluejeansnet.embedsdk.utils.PREF_MEETING_PASSCODE
import com.bluejeansnet.embedsdk.utils.joinMeeting
import com.bluejeansnet.embedsdk.utils.showToast
import org.json.JSONException
import org.json.JSONObject


/**
 * A simple [Fragment] subclass.
 * Use the [JoinUsingMeetingIdFragment] factory method to
 * create an instance of this fragment.
 * Handles joining of a meeting using meeting ID, passcode and name.
 */
class JoinUsingMeetingIdFragment : Fragment() {

    private val TAG = "JoinUsingMeetingIdFragment"

    private var meetingProps: String? = null

    private lateinit var etMeetingId: EditText
    private lateinit var etPasscode: EditText
    private lateinit var etName: EditText
    private lateinit var btnJoin: Button
    private lateinit var btnReset: Button

    private lateinit var mySharedPreferences: MySharedPreferences

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_join_using_meeting_id, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        etMeetingId = view.findViewById(R.id.etMeetingId)
        etPasscode = view.findViewById(R.id.etPasscode)
        etName = view.findViewById(R.id.etName)
        btnJoin = view.findViewById(R.id.btnJoinById)
        btnReset = view.findViewById(R.id.btnResetId)

        mySharedPreferences = MySharedPreferences()
        context?.let {
            if (mySharedPreferences.contains(PREF_MEETING_ID, it)) {
                etMeetingId.setText(mySharedPreferences.getItem(PREF_MEETING_ID, it))
            }

            if (mySharedPreferences.contains(PREF_MEETING_PASSCODE, it)) {
                etPasscode.setText(mySharedPreferences.getItem(PREF_MEETING_PASSCODE, it))
            }

            if (mySharedPreferences.contains(PREF_MEETING_NAME, it)) {
                etName.setText(mySharedPreferences.getItem(PREF_MEETING_NAME, it))
            }
        }

        meetingProps = context?.applicationContext?.assets?.open(MEETING_JOIN_PROPS_JSON)?.bufferedReader().use {
            it?.readText()
        }

        btnReset.setOnClickListener {
            etMeetingId.setText("")
            etPasscode.setText("")
            etName.setText("")
        }

        btnJoin.setOnClickListener {
            context?.let {
                if (etMeetingId.text.toString().isNullOrEmpty() || etName.text.toString().isNullOrEmpty()) {
                    showToast(it, "Meeting ID or name missing")
                    return@setOnClickListener
                }

                meetingProps?.let { props ->
                    try {
                        val meetingProps = JSONObject(props)
                        val meetingInfoJson = meetingProps.getJSONObject(JSON_MEETING_INFO)
                        meetingInfoJson.put(JSON_MEETING_ID, etMeetingId.text.toString())
                        meetingInfoJson.put(JSON_PASSCODE, etPasscode.text.toString())
                        meetingInfoJson.put(JSON_NAME, etName.text.toString())

                        meetingProps.put(JSON_MEETING_INFO, meetingInfoJson)

                        joinMeeting(it, meetingProps.toString(), true)
                    } catch (e: JSONException) {
                        Log.e(TAG, e.printStackTrace().toString())
                        e.message?.let { message ->
                            showToast(it, message)
                        }
                    } catch (e: MalformedJsonException) {
                        Log.e(TAG, e.printStackTrace().toString())
                        e.message?.let { message ->
                            showToast(it, message)
                        }
                    }
                }
            }
        }
    }
}