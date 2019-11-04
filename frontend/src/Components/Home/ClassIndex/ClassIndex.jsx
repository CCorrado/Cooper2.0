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
    if (!registeredCourses.length) {
      const registeredList = await userService.getCoursesForUser(accessToken, userId)
      if (registeredList && registeredList.length) {
        setRegisteredCourses(registeredList)
      }
    }
  }

  useEffect(() => {
    getCourses(userContext.token.accessToken, userContext.userId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.container}>
      {registeredCourses && registeredCourses.length ? (registeredCourses.map(course => (
        <CourseListing key={course.section} course={course} />
      ))) : (
        <div className={styles.text}>
          {'No courses currently registered'}
        </div>
      )}
    </div>
  )
}
