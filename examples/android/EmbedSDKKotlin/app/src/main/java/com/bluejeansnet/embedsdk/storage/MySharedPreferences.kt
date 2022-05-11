/**
 * Copyright (c) 2022 Blue Jeans Network, Inc. All rights reserved.
 */
package com.bluejeansnet.embedsdk.storage

import android.content.Context
import com.bluejeansnet.embedsdk.utils.SHARED_PREFERENCES_FILE

class MySharedPreferences {

    fun setItem(key: String, value: String, context: Context) {
        val sharedPreferences = context.getSharedPreferences(SHARED_PREFERENCES_FILE, Context.MODE_PRIVATE)
        val editor = sharedPreferences.edit()

        editor.putString(key, value)
        editor.apply()
        editor.commit()
    }

    fun getItem(key: String, context: Context): String? {
        val sharedPreferences = context.getSharedPreferences(SHARED_PREFERENCES_FILE, Context.MODE_PRIVATE)
        return sharedPreferences.getString(key, null)
    }

    fun contains(key: String, context: Context): Boolean {
        val sharedPreferences = context.getSharedPreferences(SHARED_PREFERENCES_FILE, Context.MODE_PRIVATE)
        return sharedPreferences.contains(key)
    }
}