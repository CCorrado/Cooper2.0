package com.cooper.database.service.course

import com.cooper.database.model.Course

interface CourseService {

    fun listAllCourses(): List<Course>

    fun findById(id: Long?): Course?

    fun findByTitle(title: String?): List<Course>?

    fun create(course: Course): Course?
}
