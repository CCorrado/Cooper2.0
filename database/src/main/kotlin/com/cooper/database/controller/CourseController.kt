package com.cooper.database.controller

import com.cooper.database.error.ObjectNotCreated
import com.cooper.database.error.ObjectNotFound
import com.cooper.database.model.Course
import com.cooper.database.model.network.CourseRequest
import com.cooper.database.model.network.CourseResponse
import com.cooper.database.service.course.CourseService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
class CourseController {

    @Autowired
    private val courseService: CourseService? = null

    @RequestMapping(path = ["/courses/{userId}"], method = [RequestMethod.GET])
    fun getCourses(@PathVariable("userId") userId: String?): List<Course>? {
        return courseService?.findCoursesByUserId(userId)
    }

    @RequestMapping(path = ["/courses/{id}/user/{userId}"], method = [RequestMethod.GET])
    fun getCourseById(@PathVariable("id") id: Long?,
                      @PathVariable("userId") userId: String?): CourseResponse? {
        courseService?.findCoursesByUserId(userId)?.let { dbCourses ->
            dbCourses.forEach { course ->
                if (course.courseId == id) {
                    return CourseResponse(
                            title = course.title,
                            userId = course.userId,
                            courseId = course.courseId,
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
                }
            }
        } ?: run {
            throw ObjectNotFound(message = "Course for user $userId with id $id not found")
        }
        throw ObjectNotFound(message = "Course for user $userId with id $id not found")
    }

    @RequestMapping(path = ["/courses/{title}/user/{userId}"], method = [RequestMethod.GET])
    fun getCourseByTitle(@PathVariable("title") title: String?,
                         @PathVariable("userId") userId: String?): List<CourseResponse>? {
        courseService?.findCoursesByUserId(userId)?.let { dbCourses ->
            val courses: ArrayList<CourseResponse> = ArrayList()
            dbCourses.forEach { dbCourse ->
                if (dbCourse.title.equals(title)) {
                    courses.add(CourseResponse(
                            userId = dbCourse.userId,
                            courseId = dbCourse.courseId,
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
            }
            return courses
        } ?: run {
            throw ObjectNotFound(message = "Course for user $userId with title $title not found")
        }
    }

    @RequestMapping(path = ["/course/register"], method = [RequestMethod.POST])
    fun createCourse(@RequestBody courseRequest: CourseRequest): CourseResponse? {
        try {
            if (courseRequest.userId === null) {
                throw ObjectNotCreated(
                        message = "Cannot register for course without userId parameter set.",
                        status = HttpStatus.BAD_REQUEST
                )
            }

            getCourseByTitle(courseRequest.title, courseRequest.userId)?.let { courses ->
                courses.forEach { existingCourse ->
                    if (courseRequest.section.equals(existingCourse.section)
                            && courseRequest.term.equals(existingCourse.term)) {
                        throw ObjectNotCreated(
                                message = "Cannot register for the same course ${courseRequest.title} " +
                                        "within the same term ${courseRequest.term}",
                                status = HttpStatus.BAD_REQUEST
                        )
                    }
                }
            }

            val course = courseService?.create(createCourseFromRequest(courseRequest))
            return CourseResponse(
                    userId = course?.userId,
                    courseId = course?.courseId,
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
                    message = "Could not register for course",
                    status = HttpStatus.BAD_REQUEST
            )
        }
    }

    @RequestMapping(path = ["/courses/{id}/user/{userId}/unregister"], method = [RequestMethod.GET])
    fun unregister(@PathVariable("userId") userId: String?,
                   @PathVariable("id") id: Long) {
        try {
            courseService?.unregister(id)
        } catch (err: Exception) {
            throw ObjectNotCreated(
                    message = "Could not unregister from course $id",
                    status = HttpStatus.BAD_REQUEST
            )
        }
    }

    private fun createCourseFromRequest(courseRequest: CourseRequest): Course {
        val course = Course()
        course.userId = courseRequest.userId
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
