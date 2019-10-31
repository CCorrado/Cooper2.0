package com.cooper.database.service.session

import com.cooper.database.model.Session

interface SessionService {

    fun listAllSessions(userId: String?): List<Session>

    fun findById(id: Long?): Session?

    fun findSessionByUserId(userId: String): Session?

    fun create(session: Session): Session?
}
