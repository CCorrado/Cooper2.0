package com.cooper.database.model

import org.hibernate.annotations.GenericGenerator
import java.util.*
import javax.persistence.*


@Entity(name = "Course")
class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @GenericGenerator(name = "increment", strategy = "increment")
    @Column(name = "courseId", updatable = false, nullable = false)
    var courseId: Long = 0

    @Column(name = "userId")
    var userId: String? = ""

    @Column(name = "createdDate")
    var createdDate: Date? = Date()

    @Column(name = "title")
    var title: String? = ""

    @Column(name = "section")
    var section: String? = ""

    @Column(name = "minCredit")
    var minCredit: String? = ""

    @Column(name = "maxCredit")
    var maxCredit: String? = ""

    @Column(name = "maxEnrollment")
    var maxEnrollment: String? = ""

    @Column(name = "currentEnrollment")
    var currentEnrollment: String? = ""

    @Column(name = "status")
    var status: String? = ""

    @Column(name = "startDate")
    var startDate: String? = ""

    @Column(name = "endDate")
    var endDate: String? = ""

    @Column(name = "startTime")
    var startTime: String? = ""

    @Column(name = "endTime")
    var endTime: String? = ""

    @Column(name = "instructor")
    var instructor: String? = ""

    @Column(name = "term")
    var term: String? = ""

    @Column(name = "meetingDay")
    var meetingDay: String? = ""

    @Column(name = "building")
    var building: String? = ""

    @Column(name = "room")
    var room: String? = ""

}
