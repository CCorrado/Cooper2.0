package com.cooper.database.controller

import com.cooper.database.error.ObjectNotCreated
import com.cooper.database.error.ObjectNotFound
import com.cooper.database.model.Course
import com.cooper.database.model.network.CourseRequest
import com.cooper.database.service.course.CourseService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
class CourseController {

    @Autowired
    private val courseService: CourseService? = null

    @RequestMapping(path = ["/courses"], method = [RequestMethod.GET])
    fun getCourses(): List<Course>? {
        return courseService?.listAllCourses()
    }

    @RequestMapping(path = ["/courses/{id}"], method = [RequestMethod.GET])
    fun getCourseById(@PathVariable("id") id: Long?): CourseRequest? {
        courseService?.findById(id)?.let { course ->
            return CourseRequest(
                    title = course.title,
                    section = course.section,
                    minCredit = course.minCredit,
                    maxCredit = course.maxCredit,
                    maxEnrollment = course.maxEnrollment,
                    currentEnrollment = course.currentEnrollment,
                    status = course.status,
                    startDate = course.startDate,
                    endDate = course.endDate,
                    startTime = course.startTime,
                    endTime = course.endTime,
                    instructor = course.instructor,
                    term = course.term,
                    meetingDay = course.meetingDay,
                    building = course.building,
                    room = course.room
            )
        } ?: run {
            throw ObjectNotFound(message = "Course with id $id not found")
        }
    }

    @RequestMapping(path = ["/courses/{title}"], method = [RequestMethod.GET])
    fun getCourseByTitle(@PathVariable("title") title: String?): List<CourseRequest>? {
        courseService?.findByTitle(title)?.let { dbCourses ->
            val courses: ArrayList<CourseRequest> = ArrayList()
            dbCourses.forEach { dbCourse ->
                courses.add(CourseRequest(
                        title = dbCourse.title,
                        section = dbCourse.section,
                        minCredit = dbCourse.minCredit,
                        maxCredit = dbCourse.maxCredit,
                        maxEnrollment = dbCourse.maxEnrollment,
                        currentEnrollment = dbCourse.currentEnrollment,
                        status = dbCourse.status,
                        startDate = dbCourse.startDate,
                        endDate = dbCourse.endDate,
                        startTime = dbCourse.startTime,
                        endTime = dbCourse.endTime,
                        instructor = dbCourse.instructor,
                        term = dbCourse.term,
                        meetingDay = dbCourse.meetingDay,
                        building = dbCourse.building,
                        room = dbCourse.room
                ))
            }
            return courses
        } ?: run {
            throw ObjectNotFound(message = "Course with title $title not found")
        }
    }

    @RequestMapping(path = ["/courses"], method = [RequestMethod.POST])
    fun createCourse(@RequestBody courseRequest: CourseRequest): CourseRequest? {
        try {
            val course = courseService?.create(createCourseFromRequest(courseRequest))
            return CourseRequest(
                    title = course?.title,
                    section = course?.section,
                    minCredit = course?.minCredit,
                    maxCredit = course?.maxCredit,
                    maxEnrollment = course?.maxEnrollment,
                    currentEnrollment = course?.currentEnrollment,
                    status = course?.status,
                    startDate = course?.startDate,
                    endDate = course?.endDate,
                    startTime = course?.startTime,
                    endTime = course?.endTime,
                    instructor = course?.instructor,
                    term = course?.term,
                    meetingDay = course?.meetingDay,
                    building = course?.building,
                    room = course?.room
            )
        } catch (err: Exception) {
            throw ObjectNotCreated(
                    message = "Could not create course",
                    status = HttpStatus.BAD_REQUEST
            )
        }
    }

    private fun createCourseFromRequest(courseRequest: CourseRequest): Course {
        val course = Course()
        course.title = courseRequest.title
        course.building = courseRequest.building
        course.section = courseRequest.section
        course.minCredit = courseRequest.minCredit
        course.maxCredit = courseRequest.maxCredit
        course.maxEnrollment = courseRequest.maxEnrollment
        course.currentEnrollment = courseRequest.currentEnrollment
        course.status = courseRequest.status
        course.startDate = courseRequest.startDate
        course.endDate = courseRequest.endDate
        course.startTime = courseRequest.startTime
        course.endTime = courseRequest.endTime
        course.instructor = courseRequest.instructor
        course.term = courseRequest.term
        course.meetingDay = courseRequest.meetingDay
        course.room = courseRequest.room

        return course
    }

}