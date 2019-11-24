import React, { useContext, useEffect } from 'react'
import styles from './Search.module.scss'
import { UserContext } from '../../common/UserContext'
import useCacheState from '../../common/hooks/useCacheState'
import userService from '../../../services/api/userService'

export default function Search () {
  const userContext = useContext(UserContext)
  const [courses, setCourses] = useCacheState('courses', [])

  async function getCourses (accessToken) {
    if (!Array.isArray(courses)) {
      const courseList = await userService.getCourses(accessToken)
      setCourses(courseList)
    }
  }

  useEffect(() => {
    getCourses(userContext.token.accessToken)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        {courses && Array.isArray(courses) ? (courses.map(course => (
          <div key={course.section}>
            {' '}
            {course.title}
            {course.section}
            {' '}
          </div>
        ))) : null
        }
      </div>
    </div>
  )
}
