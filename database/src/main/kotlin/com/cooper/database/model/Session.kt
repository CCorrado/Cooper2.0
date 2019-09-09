package com.cooper.database.model

import java.util.*
import javax.persistence.*

@Entity(name = "Session")
class Session {

    @Id
    @PrimaryKeyJoinColumn(name = "userId")
    @Column(name = "sessionId")
    var sessionId: Long = 1

    @Column(name = "userId")
    var userId: Long? = 0

    @Column(name = "createdDate")
    var createdDate: Date? = Date()

    @Column(name = "refreshToken")
    var refreshToken: String? = null

    @Column(name = "accessToken")
    var accessToken: String? = null

    @Column(name = "expiresIn")
    var expiresIn: Long? = 0

    @Column(name = "tokenType")
    var tokenType: String? = null
}
