package com.cooper.database.model.network

data class CourseRequest(
        var userId: String? = "",
        var title: String?,
        var section: String?,
        var minCredit: String?,
        var maxCredit: String?,
        var maxEnrollment: String?,
        var currentEnrollment: String?,
        var status: String?,
        var startDate: String?,
        var endDate: String?,
        var startTime: String?,
        var endTime: String?,
        var instructor: String?,
        var term: String?,
        var meetingDay: String?,
        var building: String?,
        var room: String? = ""
)