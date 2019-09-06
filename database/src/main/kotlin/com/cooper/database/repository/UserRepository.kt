package com.cooper.database.repository

import com.cooper.database.model.User
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : CrudRepository<User, Long> {

    fun findByUsername(username: String?): User?
}
