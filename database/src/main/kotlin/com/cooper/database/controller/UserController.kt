package com.cooper.database.controller

import com.cooper.database.error.ObjectNotCreated
import com.cooper.database.error.ObjectNotFound
import com.cooper.database.model.Session
import com.cooper.database.model.User
import com.cooper.database.model.network.UserSession
import com.cooper.database.service.session.SessionService
import com.cooper.database.service.user.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import java.util.*
import javax.servlet.http.HttpServletRequest

@RestController
class UserController {

    @Autowired
    private val userService: UserService? = null

    @Autowired
    private val sessionService: SessionService? = null

    @RequestMapping(path = ["/users/all"])
    fun getUsers(): List<User>? {
        return userService?.list()
    }

    @RequestMapping(path = ["/users"])
    fun getUser(
            request: HttpServletRequest,
            @RequestParam(name = "username", required = true) username: CharSequence
    ): UserSession? {
        userService?.findByUsername(request.queryString.split("=")[1])?.let { user ->
            return UserSession(
                    userId = user.userUuid,
                    sessionId = null,
                    role = user.role,
                    name = user.name,
                    username = user.username,
                    userCreatedDate = user.createdDate,
                    sessionCreatedDate = null,
                    refreshToken = null,
                    accessToken = null,
                    expiresIn = null,
                    tokenType = null,
                    password = user.password
            )
        } ?: run {
            throw ObjectNotFound(message = "User not found")
        }
    }

    @RequestMapping(path = ["/users/{id}"])
    fun get(@PathVariable("id") id: String?): UserSession? {
        userService?.findById(id)?.let { user ->
            sessionService?.findSessionByUserUuid(user.userUuid)?.let { session ->
                return UserSession(
                        userId = user.userUuid,
                        sessionId = session.sessionId,
                        role = user.role,
                        name = user.name,
                        username = user.username,
                        userCreatedDate = user.createdDate,
                        sessionCreatedDate = session.createdDate,
                        refreshToken = session.refreshToken,
                        accessToken = session.accessToken,
                        expiresIn = session.expiresIn,
                        tokenType = session.tokenType,
                        password = user.password
                )
            }
        } ?: run {
            throw ObjectNotFound(message = "User with id $id not found")
        }
    }

    @RequestMapping(path = ["/users"], method = [RequestMethod.POST])
    fun createUser(@RequestBody userSession: UserSession): UserSession? {
        val user = userService?.create(makeUserFromRequest(userSession))

        val session: Session? = sessionService?.create(makeSessionFromRequest(user?.userUuid, userSession))
        return UserSession(
                userId = user?.userUuid,
                role = user?.role,
                name = user?.name,
                sessionId = session?.sessionId,
                username = user?.username,
                userCreatedDate = user?.createdDate,
                sessionCreatedDate = session?.createdDate,
                refreshToken = session?.refreshToken,
                accessToken = session?.accessToken,
                expiresIn = session?.expiresIn,
                tokenType = session?.tokenType,
                password = null
        )
    }

    @RequestMapping(path = ["/users/newSession"], method = [RequestMethod.POST])
    fun createSessionForUser(@RequestBody userSession: UserSession): UserSession? {
        userSession.username?.let { username ->
            userService?.findByUsername(username)?.let { user ->
                val session: Session? = sessionService?.create(makeSessionFromRequest(user.userUuid, userSession))
                return UserSession(
                        userId = user.userUuid,
                        sessionId = session?.sessionId,
                        role = user.role,
                        name = user.name,
                        username = user.username,
                        userCreatedDate = user.createdDate,
                        sessionCreatedDate = session?.createdDate,
                        refreshToken = session?.refreshToken,
                        accessToken = session?.accessToken,
                        expiresIn = session?.expiresIn,
                        tokenType = session?.tokenType,
                        password = null
                )
            }
        } ?: run {
            throw ObjectNotCreated(
                    message = "Could not create user session",
                    status = HttpStatus.NOT_FOUND
            )
        }
    }

    private fun makeUserFromRequest(userSession: UserSession): User {
        val newUser = User()
        newUser.createdDate = Date()
        newUser.userUuid = userSession.userId
        newUser.name = userSession.name
        newUser.password = userSession.password
        newUser.role = userSession.role
        newUser.username = userSession.username
        return newUser
    }

    private fun makeSessionFromRequest(userId: String?, userSession: UserSession): Session {
        val newSession = Session()
        newSession.userId = userId
        newSession.accessToken = userSession.accessToken
        newSession.createdDate = Date()
        newSession.expiresIn = userSession.expiresIn
        newSession.refreshToken = userSession.refreshToken
        newSession.tokenType = userSession.tokenType
        return newSession
    }
}
