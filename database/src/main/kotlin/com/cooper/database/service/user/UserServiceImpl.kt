package com.cooper.database.service.user

import com.cooper.database.error.ObjectNotCreated
import com.cooper.database.error.ObjectNotFound
import com.cooper.database.model.User
import com.cooper.database.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserServiceImpl : UserService {

    @Autowired
    private val userRepository: UserRepository? = null

    override fun list(): List<User> {
        val all = ArrayList<User>()

        try {
            userRepository?.let { repository ->
                for (user in repository.findAll()) {
                    all.add(user)
                }
            }
        } catch (err: Exception) {
            throw ObjectNotFound(message = "Could not find any users")
        }

        return all
    }

    override fun findById(id: String?): User? {
        id?.let { userId ->
            try {
                return this.userRepository?.findByUserUuid(userId)
            } catch (err: Exception) {
                throw ObjectNotFound(message = "Could not find user with id: $id")
            }
        } ?: run {
            throw ObjectNotFound(message = "Could not find user with id $id")
        }
    }

    override fun findByUsername(username: String): User? {
        try {
            return this.userRepository?.findByUsername(username)
        } catch (err: Exception) {
            throw ObjectNotFound(message = "Could not find user with username: $username")
        }
    }

    override fun create(user: User): User? {
        try {
            userRepository?.findByUsername(user.username)?.let {
                throw ObjectNotCreated(
                        status = HttpStatus.BAD_REQUEST,
                        message = "User already exists with username: ${user.username}"
                )
            }
            return this.userRepository?.save(user)
        } catch (err: Exception) {
            throw ObjectNotCreated(
                    status = HttpStatus.BAD_REQUEST,
                    message = "Could not create user for: ${user.username}"
            )
        }
    }
}
