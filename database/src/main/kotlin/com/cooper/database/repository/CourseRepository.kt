package com.cooper.database.repository

import com.cooper.database.model.Course
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface CourseRepository : CrudRepository<Course, Long> {

    fun findByTitle(title: String?): List<Course>

    fun findByUserId(userId: String): List<Course>?

    fun findBySection(section: String): List<Course>?

}
