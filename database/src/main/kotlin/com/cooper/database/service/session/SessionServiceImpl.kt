package com.cooper.database.service.session

import com.cooper.database.error.ObjectNotCreated
import com.cooper.database.error.ObjectNotFound
import com.cooper.database.model.Session
import com.cooper.database.repository.SessionRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import java.util.*

@Service
class SessionServiceImpl : SessionService {

    @Autowired
    private val sessionRepository: SessionRepository? = null

    override fun listAllSessions(userId: Long?): List<Session> {
        val all = ArrayList<Session>()

        try {
            sessionRepository?.let { repository ->
                for (session in repository.findAllByUserId(userId)) {
                    all.add(session)
                }
            }
        } catch (err: Exception) {
            throw ObjectNotFound(message = "Could not find sessions for user with id: $userId")
        }

        return all
    }

    override fun findById(id: Long?): Session? {
        id?.let { sessionId ->
            try {
                return this.sessionRepository?.findById(sessionId)?.get()
            } catch (err: Exception) {
                throw ObjectNotFound(message = "Could not find session with id: $id")
            }
        } ?: run {
            throw ObjectNotFound(message = "Could not find session with id: $id")
        }
    }

    override fun findSessionByUserId(userId: Long): Session? {
        try {
            return sessionRepository?.findByUserId(userId)
        } catch (err: Exception) {
            throw ObjectNotFound(message = "Could not find session for user with id: $userId")
        }
    }

    override fun create(session: Session): Session? {
        try {
            return this.sessionRepository?.save(session)
        } catch (err: Exception) {
            throw ObjectNotCreated(
                    status = HttpStatus.BAD_REQUEST,
                    message = "Could not create session for userId: ${session.userId}"
            )
        }
    }

}
