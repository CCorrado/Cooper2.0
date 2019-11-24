package com.cooper.database.service.user

import com.cooper.database.model.User

interface UserService {

    fun list(): List<User>

    fun findById(id: Long?): User?

    fun findByUsername(username: String): User?

    fun create(user: User): User?
}
