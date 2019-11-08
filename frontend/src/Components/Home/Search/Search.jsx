import React, { useContext, useEffect, useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import styles from './Search.module.scss'
import { UserContext } from '../../common/UserContext'
import useCacheState from '../../common/hooks/useCacheState'
import userService from '../../../services/api/userService'
import CourseListing from '../CourseListing/CourseListing'
import ProgressDialog from '../../common/ProgressDialog/ProgressDialog'

export default function Search () {
  const userContext = useContext(UserContext)
  const [courses, setCourses] = useCacheState('courses', [])
  const [coursesToRegister, setCoursesToRegister] = useCacheState('coursesToRegister', [])
  const [loading, setLoading] = useState(false)

  async function getCourses (accessToken) {
    const courseList = await userService.getCourses(accessToken)
    if (courseList && !courseList.error) {
      setCourses(courseList)
    }
  }

  async function registerCourses () {
    setLoading(true)
    if (coursesToRegister && coursesToRegister.length) {
      const result = await coursesToRegister.map(async (course) => {
        const courseResult = await userService.registerCourse(
          userContext.token.accessToken, userContext.userId, course
        )
        return courseResult
      })
      if (result && !result.error) {
        setCoursesToRegister([])
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    getCourses(userContext.token.accessToken)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.container}>
      <ProgressDialog open={loading} />
      {courses && Array.isArray(courses) && (
        <Autocomplete
          multiple
          onChange={(event, selectedCourses, value) => {
            setCoursesToRegister(selectedCourses)
          }}
          value={coursesToRegister}
          disableListWrap
          options={courses}
          getOptionLabel={option => (
            option && option.title && option.section && `${option.title} ${option.section}`
          )}
          style={{ width: '100%' }}
          renderInput={params => (
            <TextField
              {...params}
              variant='outlined'
              placeholder='Course title or section...'
              fullWidth
            />
          )}
        />
      )}
      {coursesToRegister && coursesToRegister.length ? (coursesToRegister.map(course => (
        <CourseListing key={course.section} course={course} />
      ))) : (
        <div className={styles.text}>
          {'No courses currently selected for Registration'}
        </div>
      )}
      <div className={styles['submit-button']}>
        <button
          className={styles.button}
          type='submit'
          onClick={registerCourses}
        >
          Register For Courses
        </button>
      </div>
    </div>
  )
}
