package com.cooper.database.model

import org.hibernate.annotations.GenericGenerator
import java.util.*
import javax.persistence.*

@Entity(name = "CourseSwap")
class CourseSwap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @GenericGenerator(name = "increment", strategy = "increment")
    @Column(name = "courseSwapId", updatable = false, nullable = false)
    var courseSwapId: Long = 0

    @Column(name = "swaperUserId")
    var swaperUserId: String? = ""

    @Column(name = "swapeeUserId")
    var swapeeUserId: String? = ""

    @Column(name = "swapeeAccept")
    var swapeeAccept: Boolean? = false

    @Column(name = "swapCompleted")
    var swapCompleted: Boolean? = false

    @Column(name = "courseToGiveId")
    var courseToGiveId: String? = ""

    @Column(name = "courseToGetId")
    var courseToGetId: String? = ""

    @Column(name = "createdDate")
    var createdDate: Date? = Date()

}