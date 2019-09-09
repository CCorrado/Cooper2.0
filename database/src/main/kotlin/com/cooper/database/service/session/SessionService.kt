package com.cooper.database.service.session

import com.cooper.database.model.Session

interface SessionService {

    fun listAllSessions(userId: Long?): List<Session>

    fun findById(id: Long?): Session?

    fun findSessionByUserId(userId: Long): Session?

    fun create(session: Session): Session?
}
