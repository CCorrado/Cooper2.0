import React, { useContext, useEffect } from 'react'
import styles from './Search.module.scss'
import { UserContext } from '../../common/UserContext'
import useCacheState from '../../common/hooks/useCacheState'

export default function Search () {
  const userContext = useContext(UserContext)
  const [courses, setCourses] = useCacheState('courses', [])

  async function getCourses () {
    const courseList = await userContext.getCourses(userContext.token.authToken)
    setCourses(courseList)
  }

  useEffect(() => {
    getCourses()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.text}>This will be a way to search for classes</div>
      {courses ? courses.forEach((course) => {
        console.log(course.title)
        return (<div>course.title</div>)
      }) : null
      }
    </div>
  )
}
