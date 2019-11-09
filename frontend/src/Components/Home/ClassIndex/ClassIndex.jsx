import React, { useContext, useEffect } from 'react'
import styles from './ClassIndex.module.scss'
import CourseListing from '../CourseListing/CourseListing'
import { UserContext } from '../../common/UserContext'
import useCacheState from '../../common/hooks/useCacheState'
import userService from '../../../services/api/userService'

export default function ClassIndex () {
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
            const unreg = await userContext.unregisterCourse(course)
            if (unreg && !unreg.error_message) {
              await getCourses(userContext.token.accessToken, userContext.userId)
            }
          }}
        />
      ))) : (
        <div className={styles.text}>
          {'No courses currently registered'}
        </div>
      )}
    </div>
  )
}
