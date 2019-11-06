package com.cooper.database.controller

import com.cooper.database.error.ObjectNotCreated
import com.cooper.database.model.CourseSwap
import com.cooper.database.model.network.CourseSwapRequest
import com.cooper.database.model.network.CourseSwapResponse
import com.cooper.database.service.course.CourseSwapService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@RestController
class CourseSwapController {

    @Autowired
    private val courseSwapService: CourseSwapService? = null

    @RequestMapping(path = ["/courses/swaps"], method = [RequestMethod.GET])
    fun getCourseSwaps(): List<CourseSwap>? {
        return courseSwapService?.listAllCourseSwaps()
    }

    @RequestMapping(path = ["/courses/swaps/create"], method = [RequestMethod.POST])
    fun createCourseSwap(@RequestBody courseSwapRequest: CourseSwapRequest): CourseSwapResponse? {
        try {
            if (courseSwapRequest.swaperUserId === null) {
                throw ObjectNotCreated(
                        message = "Cannot create course swap without swaperUserId parameter set.",
                        status = HttpStatus.BAD_REQUEST
                )
            }

            courseSwapService?.create(createCourseSwapFromRequest(courseSwapRequest))?.let { courseSwap ->
                return CourseSwapResponse(
                        courseSwapId = courseSwap.courseSwapId,
                        courseToGetId = courseSwap.courseToGetId,
                        courseToGiveId = courseSwap.courseToGiveId,
                        createdDate = courseSwap.createdDate,
                        swapCompleted = courseSwap.swapCompleted,
                        swapeeAccept = courseSwap.swapeeAccept,
                        swapeeUserId = courseSwap.swapeeUserId,
                        swaperUserId = courseSwap.swaperUserId
                )
            } ?: run {
                throw ObjectNotCreated(
                        message = "Could not create swap for course",
                        status = HttpStatus.BAD_REQUEST
                )
            }
        } catch (err: Exception) {
            throw ObjectNotCreated(
                    message = "Could not create swap for course",
                    status = HttpStatus.BAD_REQUEST
            )
        }
    }

    @RequestMapping(path = ["/courses/swaps/accept"], method = [RequestMethod.POST])
    fun acceptCourseSwap(@RequestBody courseSwapRequest: CourseSwapRequest): CourseSwapResponse? {
        try {
            if (courseSwapRequest.swaperUserId === null || courseSwapRequest.swapeeUserId === null) {
                throw ObjectNotCreated(
                        message = "Cannot complete course swap without swaperUserId and swapeeUserId parameter set.",
                        status = HttpStatus.BAD_REQUEST
                )
            }

            courseSwapRequest.courseSwapId?.let { swapId ->
                courseSwapService?.complete(swapId, courseSwapRequest.swapeeUserId,
                        courseSwapRequest.swapeeAccept)?.let { courseSwap ->
                    return CourseSwapResponse(
                            courseSwapId = courseSwap.courseSwapId,
                            courseToGetId = courseSwap.courseToGetId,
                            courseToGiveId = courseSwap.courseToGiveId,
                            createdDate = courseSwap.createdDate,
                            swapCompleted = courseSwap.swapCompleted,
                            swapeeAccept = courseSwap.swapeeAccept,
                            swapeeUserId = courseSwap.swapeeUserId,
                            swaperUserId = courseSwap.swaperUserId
                    )
                }
            } ?: run {
                throw ObjectNotCreated(
                        message = "Could not complete swap for course",
                        status = HttpStatus.BAD_REQUEST
                )
            }
        } catch (err: Exception) {
            throw ObjectNotCreated(
                    message = "Could not complete swap for course",
                    status = HttpStatus.BAD_REQUEST
            )
        }
    }

    private fun createCourseSwapFromRequest(courseRequest: CourseSwapRequest): CourseSwap {
        val courseSwap = CourseSwap()
        courseRequest.courseSwapId?.let { swapId ->
            if (swapId != 0L) {
                courseSwap.courseSwapId = swapId
            }
        }
        courseSwap.swapCompleted = courseRequest.swapCompleted
        courseSwap.swapeeAccept = courseRequest.swapeeAccept
        courseSwap.swaperUserId = courseRequest.swaperUserId
        courseSwap.courseToGetId = courseRequest.courseToGetId
        courseSwap.courseToGiveId = courseRequest.courseToGiveId
        return courseSwap
    }
}