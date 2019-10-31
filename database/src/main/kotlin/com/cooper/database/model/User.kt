package com.cooper.database.model

import java.util.*
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id

@Entity(name = "User")
class User {

    @Id
    @Column(name = "userId")
    var userId: String = ""

    @Column(name = "role")
    var role: String? = null

    @Column(name = "name")
    var name: String? = null

    @Column(name = "username")
    var username: String? = null

    @Column(name = "password")
    var password: String? = null

    @Column(name = "createdDate")
    var createdDate: Date? = Date()
}
