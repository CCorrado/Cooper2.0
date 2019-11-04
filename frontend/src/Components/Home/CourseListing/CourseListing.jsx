import React from 'react'
import PropTypes from 'prop-types'
import { Card } from '@material-ui/core'
import moment from 'moment'
import styles from './CourseListing.module.scss'

export default function CourseListing ({ course }) {
  function getTimeFromCourse (time) {
    try {
      if (moment(time, 'HH:mm:ss').isValid()) {
        return moment(time, 'HH:mm:ss').format('h:mm a')
      }
      return null
    } catch (err) {
      return null
    }
  }

  return (
    <Card className={styles.card}>
      <div className={styles['course-title']}>
        {'Course: '}
        {course.title}
      </div>
      <div className={styles['course-instructor']}>
        {'Instructor: '}
        {course.instructor}
      </div>
      <div className={styles['course-section']}>
        {'Section: '}
        {course.section}
      </div>
      <div className={styles['course-term']}>
        {'Term: '}
        {course.term}
      </div>
      {getTimeFromCourse(course.startTime) && (
        <div className={styles['course-start']}>
          {'Start Time: '}
          {getTimeFromCourse(course.startTime)}
        </div>
      )}
      {getTimeFromCourse(course.endTime) && (
        <div className={styles['course-start']}>
          {'End Time: '}
          {getTimeFromCourse(course.endTime)}
        </div>
      )}
      {course && course.meetingDay && (
        <div className={styles['course-credits']}>
          {'Day(s): '}
          {course.meetingDay}
        </div>
      )}
      {course && course.minCredit && (
        <div className={styles['course-credits']}>
          {'Credits: '}
          {course.minCredit}
        </div>
      )}
    </Card>
  )
}

CourseListing.propTypes = {
  course: PropTypes.shape({
    title: PropTypes.string.isRequired,
    section: PropTypes.string.isRequired,
    call_number: PropTypes.string.isRequired,
    minCredit: PropTypes.string.isRequired,
    maxCredit: PropTypes.string.isRequired,
    maxEnrollment: PropTypes.string.isRequired,
    currentEnrollment: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    instructor: PropTypes.string.isRequired,
    term: PropTypes.string.isRequired,
    meetingDay: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    building: PropTypes.string.isRequired,
    room: PropTypes.string.isRequired
  }).isRequired
}
