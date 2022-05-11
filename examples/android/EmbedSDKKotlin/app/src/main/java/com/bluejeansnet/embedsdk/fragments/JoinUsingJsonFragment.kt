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
import com.bluejeansnet.embedsdk.utils.MEETING_JOIN_PROPS_JSON
import com.bluejeansnet.embedsdk.utils.PREF_MEETING_PROPS
import com.bluejeansnet.embedsdk.utils.joinMeeting
import com.bluejeansnet.embedsdk.utils.showToast
import org.json.JSONException
import org.json.JSONObject

/**
 * A simple [Fragment] subclass.
 * Use the [JoinUsingJsonFragment] factory method to
 * create an instance of this fragment.
 * Handles joining of a meeting using JSON.
 */
class JoinUsingJsonFragment : Fragment() {
    private val TAG = "JoinUsingJsonFragment"

    private lateinit var etJson: EditText
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
        return inflater.inflate(R.layout.fragment_join_using_json, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        etJson = view.findViewById(R.id.etJson)
        btnJoin = view.findViewById(R.id.btnJoin)
        btnReset = view.findViewById(R.id.btnReset)

        mySharedPreferences = MySharedPreferences()

        context?.let { c ->
            var meetingProps = mySharedPreferences.getItem(PREF_MEETING_PROPS, c)

            if (meetingProps.isNullOrEmpty()) {
                meetingProps = c.applicationContext?.assets?.open(MEETING_JOIN_PROPS_JSON)?.bufferedReader().use {
                    it?.readText()
                }
            }

            meetingProps?.let {
                etJson.setText(it)
            }
        }

        btnJoin.setOnClickListener {
            context?.let {
                val props = etJson.text.toString()
                if (props.isNullOrEmpty()) {
                    showToast(it, "Missing meeting props")
                    return@setOnClickListener
                }

                try {
                    val meetingInfoJson = JSONObject(props).getJSONObject(JSON_MEETING_INFO)
                    if (meetingInfoJson.getString(JSON_MEETING_ID).isNullOrEmpty() ||
                        meetingInfoJson.getString(JSON_NAME).isNullOrEmpty()) {
                        showToast(it, "Either meeting ID or name is missing")
                        return@setOnClickListener
                    }
                } catch (ex: MalformedJsonException) {
                    showToast(it, "Invalid JSON")
                    Log.e(TAG, "$ex")
                    return@setOnClickListener
                } catch (ex: JSONException) {
                    showToast(it, "Invalid JSON")
                    Log.e(TAG, "$ex")
                    return@setOnClickListener
                }

                joinMeeting(it, etJson.text.toString())
            }
        }

        btnReset.setOnClickListener {
            etJson.setText("")
        }
    }
}