import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './ClassIndex.module.scss'
import CourseListing from '../CourseListing/CourseListing'
import { UserContext } from '../../common/UserContext'
import useCacheState from '../../common/hooks/useCacheState'
import userService from '../../../services/api/userService'

export default function ClassIndex ({ onSwapClicked }) {
  const userContext = useContext(UserContext)
  const [registeredCourses, setRegisteredCourses] = useCacheState('registeredCourses', [])

  async function getCourses (accessToken, userId) {
    const registeredListResponse = await userService.getCoursesForUser(accessToken, userId)
    if (registeredListResponse) {
      setRegisteredCourses(registeredListResponse.length ? registeredListResponse : [])
    }
    if (registeredListResponse && registeredListResponse.error) {
      userContext.setToken('')
    }
  }

  useEffect(() => {
    getCourses(userContext.token.accessToken, userContext.userId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.container}>
      {registeredCourses && registeredCourses.length ? (registeredCourses.map(course => (
        <CourseListing
          key={course.section}
          course={course}
          isRegistered
          unregClicked={async () => {
            const response = await userContext.unregisterCourse(course)
            if (response && !response.error_message) {
              await getCourses(userContext.token.accessToken, userContext.userId)
            }
          }}
          swapClicked={onSwapClicked}
        />
      ))) : (
        <div className={styles.text}>
          {'No courses currently registered'}
        </div>
      )}
    </div>
  )
}

ClassIndex.propTypes = {
  onSwapClicked: PropTypes.func.isRequired
}
