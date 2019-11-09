import React from 'react'
import PropTypes from 'prop-types'
import { Card } from '@material-ui/core'
import moment from 'moment'
import swap from '../../../images/swap.svg'
import deleteIcon from '../../../images/delete.svg'
import styles from './CourseListing.module.scss'

export default function CourseListing ({
  course, isRegistered, swapClicked, unregClicked
}) {
  function getTimeFromCourse (time) {
    try {
      if (moment(time, 'HH:mm:ss').isValid()) {
        return moment(time, 'HH:mm:ss').utc(true).format('h:mm a')
      }
      return null
    } catch (err) {
      return null
    }
  }

  return (
    <Card className={styles.card}>
      <div className={styles['title-container']}>
        <div className={styles['course-title']}>
          {'Course: '}
          {course.title}
        </div>
        {isRegistered && (
          <button
            type='button'
            alt=''
            onClick={() => {
              swapClicked(course)
            }}
          >
            <img className={styles['swap-icon']} src={swap} alt='' />
          </button>
        )}
        {isRegistered && (
          <button
            type='button'
            alt=''
            onClick={unregClicked}
          >
            <img className={styles['swap-icon']} src={deleteIcon} alt='' />
          </button>
        )}
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
      <div className={styles.vh} />
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
  }).isRequired,
  isRegistered: PropTypes.bool,
  unregClicked: PropTypes.func.isRequired,
  swapClicked: PropTypes.func.isRequired
}

CourseListing.defaultProps = {
  isRegistered: false
}
