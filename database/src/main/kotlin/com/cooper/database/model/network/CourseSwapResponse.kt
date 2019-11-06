package com.cooper.database.model.network

import java.util.*

data class CourseSwapResponse(
        var courseSwapId: Long? = 0,
        var swaperUserId: String? = "",
        var swapeeUserId: String? = "",
        var swapeeAccept: Boolean? = false,
        var swapCompleted: Boolean? = false,
        var courseToGiveId: String? = "",
        var courseToGetId: String? = "",
        var createdDate: Date? = Date()
)