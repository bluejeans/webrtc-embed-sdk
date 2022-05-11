/**
 * Copyright (c) 2022 Blue Jeans Network, Inc. All rights reserved.
 */
package com.bluejeansnet.embedsdk.activities

import android.Manifest
import android.content.Context
import android.os.Bundle
import android.widget.Toast
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat.getDrawable
import androidx.fragment.app.FragmentActivity
import androidx.viewpager2.widget.ViewPager2
import com.bluejeansnet.embedsdk.R
import com.bluejeansnet.embedsdk.adapters.ViewPagerAdapter
import com.bluejeansnet.embedsdk.databinding.ActivityMainBinding
import com.bluejeansnet.embedsdk.utils.PERMISSIONS
import com.bluejeansnet.embedsdk.utils.PERMISSIONS_REQUEST_CODE
import com.bluejeansnet.embedsdk.utils.hasPermission
import com.google.android.material.tabs.TabLayoutMediator

/**
 * A [FragmentActivity] that contains the [TabLayout] and the [ViewPager2].
 * It also performs the necessary permission checks needed for the EmbedSDK to start a meeting.
 * Be advise: This activity class does not contain the logic of joining a meeting.
 * Please refer to [JoinUsingJsonFragment] or [JoinUsingMeetingIdFragment] for this.
 */
class MainActivity : FragmentActivity() {

    private val TAG = "MainActivity"

    private val tabsText = arrayOf(
        "JSON", "MEETING ID"
    )

    private lateinit var activityMainBinding: ActivityMainBinding


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        activityMainBinding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(activityMainBinding.root)

        checkPermissions()

        activityMainBinding.vpViewPager.adapter = ViewPagerAdapter(this)
        activityMainBinding.vpViewPager.orientation = ViewPager2.ORIENTATION_HORIZONTAL

        TabLayoutMediator(activityMainBinding.tabLayout, activityMainBinding.vpViewPager) { tab, position ->
            tab.text = resources.getStringArray(R.array.tabs_title)[position]

            when (position) {
                0 -> tab.icon = getDrawable(R.drawable.ic_baseline_code_24)
                1 -> tab.icon = getDrawable(R.drawable.ic_baseline_meeting_room_24)
            }
        }.attach()
    }

    private fun checkPermissions() {
        if (!applicationContext.hasPermission(Manifest.permission.CAMERA) ||
            !applicationContext.hasPermission(Manifest.permission.RECORD_AUDIO) ||
            !applicationContext.hasPermission(Manifest.permission.BLUETOOTH) ||
            !applicationContext.hasPermission(Manifest.permission.MODIFY_AUDIO_SETTINGS) ||
            !applicationContext.hasPermission(Manifest.permission.RECORD_AUDIO)) {
            ActivityCompat.requestPermissions(this, PERMISSIONS, PERMISSIONS_REQUEST_CODE)
        }
    }

    private fun showToast(message: String) {
        Toast.makeText(applicationContext, message, Toast.LENGTH_LONG).show()
    }
}