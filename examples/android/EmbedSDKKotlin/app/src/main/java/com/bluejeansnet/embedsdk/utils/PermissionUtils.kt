/**
 * Copyright (c) 2022 Blue Jeans Network, Inc. All rights reserved.
 */
package com.bluejeansnet.embedsdk.utils

import android.content.Context
import android.content.pm.PackageManager

fun Context.hasPermissions(vararg permissions: String) =
    permissions.all { permission ->
        hasPermission(permission)
    }

fun Context.hasPermission(permission: String): Boolean {
    return checkSelfPermission(permission) == PackageManager.PERMISSION_GRANTED
}
