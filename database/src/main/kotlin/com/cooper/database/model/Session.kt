package com.cooper.database.model

import org.hibernate.annotations.GenericGenerator
import java.util.*
import javax.persistence.*

@Entity(name = "Session")
class Session {

    @Id
    @PrimaryKeyJoinColumn(name = "userId")
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    @Column(name = "sessionId")
    var sessionId: Long = 0

    @Column(name = "userId")
    var userId: String? = ""

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
