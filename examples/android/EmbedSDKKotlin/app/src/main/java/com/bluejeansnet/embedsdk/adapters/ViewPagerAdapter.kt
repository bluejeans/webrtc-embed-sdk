/**
 * Copyright (c) 2022 Blue Jeans Network, Inc. All rights reserved.
 */
package com.bluejeansnet.embedsdk.adapters

import android.util.Log
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import androidx.viewpager2.adapter.FragmentStateAdapter
import com.bluejeansnet.embedsdk.fragments.JoinUsingJsonFragment
import com.bluejeansnet.embedsdk.fragments.JoinUsingMeetingIdFragment

/**
 * Custom adapter for the [ViewPager] used in [MainActivity]
 */
class ViewPagerAdapter(private val fragmentActivity: FragmentActivity) : FragmentStateAdapter(fragmentActivity) {
    private val TAG = "ViewPagerAdapter"
    private val NUM_PAGES = 2

    override fun createFragment(position: Int): Fragment {
        if (position == 1) {
            return JoinUsingMeetingIdFragment()
        }

        return JoinUsingJsonFragment()
    }

    override fun getItemCount(): Int {
        return NUM_PAGES
    }
}
