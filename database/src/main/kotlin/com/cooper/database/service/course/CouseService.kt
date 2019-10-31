package com.cooper.database.service.course

import com.cooper.database.model.Course

interface CourseService {

    fun listAllCourses(): List<Course>

    fun findById(id: Long?): Course?

    fun findCoursesByUserId(id: String?): List<Course>?

    fun findByTitle(title: String?): List<Course>?

    fun findBySection(section: String?): List<Course>?

    fun create(course: Course): Course?

    fun unregister(courseId: Long)
}
