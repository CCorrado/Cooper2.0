package com.cooper.database.repository

import com.cooper.database.model.CourseSwap
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface CourseSwapRespository : CrudRepository<CourseSwap, Long> {

    fun findBySwaperUserId(swaperUserId: String): List<CourseSwap>?

    fun findByCourseToGiveId(courseToGiveId: String): List<CourseSwap>?
}