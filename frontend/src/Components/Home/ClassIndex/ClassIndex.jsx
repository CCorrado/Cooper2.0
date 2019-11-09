import React, {
  useContext, useEffect, useState
} from 'react'
import styles from './ClassIndex.module.scss'
import CourseListing from '../CourseListing/CourseListing'
import { UserContext } from '../../common/UserContext'
import useCacheState from '../../common/hooks/useCacheState'
import userService from '../../../services/api/userService'
import CourseToGetDialog from '../CourseListing/CourseToGetDialog'
import { NavigationContext } from '../../Navigation/NavigationContext'
import RedirectRoute from '../../Redirect/RedirectRoute'

export default function ClassIndex () {
  const userContext = useContext(UserContext)
  const nav = useContext(NavigationContext)
  const [courseToSwap, setCourseToSwap] = useState('')

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
    <>
      <RedirectRoute
        exact
        path='/home/classes/swap'
        render={() => (
          <CourseToGetDialog courseIdToOffer={courseToSwap.courseId} />
        )}
      />
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
            swapClicked={async (course) => {
              setCourseToSwap(course)
              nav.home.goToCourseSwap()
            }}
          />
        ))) : (
          <div className={styles.text}>
            {'No courses currently registered'}
          </div>
        )}
      </div>
    </>
  )
}
