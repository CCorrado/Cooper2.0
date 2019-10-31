package com.cooper.database.repository

import com.cooper.database.model.Session
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface SessionRepository : CrudRepository<Session, Long> {

    fun findByUserId(userId: String?): Session?

    fun findAllByUserId(userId: String?): List<Session>
}
