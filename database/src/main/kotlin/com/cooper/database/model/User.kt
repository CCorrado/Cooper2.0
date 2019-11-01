package com.cooper.database.model

import org.hibernate.annotations.GenericGenerator
import java.util.*
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity(name = "User")
class User {

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    @Column(name = "userId")
    var id: Long = 0

    @Column(name = "userUuid")
    var userUuid: String? = ""

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
