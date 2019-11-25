import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Card } from '@material-ui/core'
import moment from 'moment'
import styles from './CourseSwap.module.scss'
import accept from '../../../images/accept.svg'
import { UserContext } from '../../common/UserContext'
import userService from '../../../services/api/userService'

export default function CourseSwap ({ courseSwap, onSwapAccept }) {
  const userContext = useContext(UserContext)
  const [courseToGet, setCourseToGet] = useState(undefined)
  const [courseToGive, setCourseToGive] = useState(undefined)

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

  async function getCourses (accessToken) {
    const courseList = await userService.getCourses(accessToken)
    if (courseList && !courseList.error) {
      courseList.forEach((course) => {
        if (course.section === courseSwap.courseToGiveId) {
          setCourseToGive(course)
        }
        if (course.section === courseSwap.courseToGetId) {
          setCourseToGet(course)
        }
      })
    }
  }

  useEffect(() => {
    getCourses(userContext.token.accessToken)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card className={styles.card}>
      {courseToGet && courseToGive && (
        <div className={styles['title-container']}>
          <div className={styles.card}>
            <div className={styles['course-title']}>
              {'Requested Course: '}
              {courseToGet.title}
            </div>
            <div className={styles['small-text']}>
              {'Section: '}
              {courseToGet.section}
            </div>
            <div className={styles['small-text']}>
              {'Start Time: '}
              {getTimeFromCourse(courseToGet.startTime)}
            </div>
            <div className={styles['small-text']}>
              {'End Time: '}
              {getTimeFromCourse(courseToGet.endTime)}
            </div>
            <div className={styles['small-text']}>
              {'Days: '}
              {courseToGet.meetingDay}
            </div>
            <div className={styles['course-title']}>
              {'Course to Receive: '}
              {courseToGive.title}
            </div>
            <div className={styles['small-text']}>
              {'Section: '}
              {courseToGive.section}
            </div>
            <div className={styles['small-text']}>
              {'Start Time: '}
              {getTimeFromCourse(courseToGive.startTime)}
            </div>
            <div className={styles['small-text']}>
              {'End Time: '}
              {getTimeFromCourse(courseToGive.endTime)}
            </div>
            <div className={styles['small-text']}>
              {'Days: '}
              {courseToGive.meetingDay}
            </div>
          </div>
          <button
            className={styles.button}
            type='button'
            onClick={() => {
              onSwapAccept(courseSwap)
            }}
          >
            <img
              className={styles['accept-icon']}
              src={accept}
              alt='accept'
            />
          </button>
        </div>
      )}
    </Card>
  )
}

CourseSwap.propTypes = {
  courseSwap: PropTypes.shape({
    courseSwapId: PropTypes.string.isRequired,
    courseToGetId: PropTypes.string.isRequired,
    courseToGiveId: PropTypes.string.isRequired,
    swaperUserId: PropTypes.string.isRequired
  }).isRequired,
  onSwapAccept: PropTypes.func.isRequired
}
