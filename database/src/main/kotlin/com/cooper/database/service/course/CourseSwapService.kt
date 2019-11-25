package com.cooper.database.service.course

import com.cooper.database.model.CourseSwap

interface CourseSwapService {

    fun listAllCourseSwaps(): List<CourseSwap>

    fun findByCourseSwapId(id: Long?): CourseSwap?

    fun findByCourseSwapCompleted(completed: Boolean): List<CourseSwap>?

    fun findBySwaperUserId(id: String?): List<CourseSwap>?

    fun findByCourseToGiveId(courseToGiveId: String?): List<CourseSwap>?

    fun create(courseSwap: CourseSwap): CourseSwap?

    fun complete(courseSwapId: Long, swapeeUserId: String?, swapeeAccept: Boolean?): CourseSwap?
}