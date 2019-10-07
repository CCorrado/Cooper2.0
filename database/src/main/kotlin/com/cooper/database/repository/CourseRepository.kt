package com.cooper.database.repository

import com.cooper.database.model.Course
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface CourseRepository : CrudRepository<Course, Long> {

    fun findByCourseId(courseId: Long?): Course?

    fun findByTitle(title: String?): List<Course>

}
