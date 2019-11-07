package com.cooper.database.service.course

import com.cooper.database.error.ObjectNotCreated
import com.cooper.database.error.ObjectNotFound
import com.cooper.database.model.CourseSwap
import com.cooper.database.repository.CourseSwapRespository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import java.util.*

@Service
class CourseSwapServiceImpl : CourseSwapService {

    @Autowired
    private val courseSwapRepository: CourseSwapRespository? = null

    override fun listAllCourseSwaps(): List<CourseSwap> {
        val all = ArrayList<CourseSwap>()

        try {
            courseSwapRepository?.let { repository ->
                for (courseSwap in repository.findAll()) {
                    all.add(courseSwap)
                }
            }
        } catch (err: Exception) {
            throw ObjectNotFound(message = "Could not find any course swaps")
        }

        return all
    }

    override fun findByCourseSwapId(id: Long?): CourseSwap? {
        id?.let { courseSwapId ->
            try {
                return this.courseSwapRepository?.findById(courseSwapId)?.get()
            } catch (err: Exception) {
                throw ObjectNotFound(message = "Could not find course swap with id: $id")
            }
        } ?: run {
            throw ObjectNotFound(message = "Could not find course swap with id: $id")
        }
    }

    override fun findBySwaperUserId(id: String?): List<CourseSwap>? {
        val all = ArrayList<CourseSwap>()

        id?.let { swaperUserId ->
            try {
                courseSwapRepository?.findBySwaperUserId(swaperUserId)?.let { courseSwaps ->
                    all.addAll(courseSwaps)
                }
                return all
            } catch (err: Exception) {
                throw ObjectNotFound(message = "Could not find any course swaps for user id: $id")
            }
        } ?: run {
            throw ObjectNotFound(message = "Could not find any course swaps for user id: $id")
        }
    }

    override fun findByCourseToGiveId(courseToGiveId: String?): List<CourseSwap>? {
        val all = ArrayList<CourseSwap>()

        courseToGiveId?.let { courseGive ->
            try {
                courseSwapRepository?.findByCourseToGiveId(courseGive)?.let { courseSwaps ->
                    all.addAll(courseSwaps)
                }
                return all
            } catch (err: Exception) {
                throw ObjectNotFound(message = "Could not find any course swaps for course id: $courseToGiveId")
            }
        } ?: run {
            throw ObjectNotFound(message = "Could not find any course swaps for course id: $courseToGiveId")
        }
    }

    override fun create(courseSwap: CourseSwap): CourseSwap? {
        try {
            return courseSwapRepository?.save(courseSwap)
        } catch (err: Exception) {
            throw ObjectNotCreated(
                    status = HttpStatus.BAD_REQUEST,
                    message = "Could not create course swap for user: ${courseSwap.swaperUserId}"
            )
        }
    }

    override fun complete(courseSwapId: Long, swapeeUserId: String?, swapeeAccept: Boolean?): CourseSwap? {
        try {
            val courseSwap: CourseSwap? = courseSwapRepository?.findById(courseSwapId)?.get()
            courseSwap?.swapeeAccept = swapeeAccept
            courseSwap?.swapCompleted = true
            courseSwap?.swapeeUserId = swapeeUserId
            courseSwap?.let { swap -> courseSwapRepository?.save(swap) }
            return courseSwap
        } catch (err: Exception) {
            throw ObjectNotCreated(
                    status = HttpStatus.BAD_REQUEST,
                    message = "Could not update course swap for id: $courseSwapId"
            )
        }
    }
}