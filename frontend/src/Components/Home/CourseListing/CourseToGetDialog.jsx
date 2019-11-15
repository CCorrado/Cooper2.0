import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete'
import TextField from '@material-ui/core/TextField'
import styles from './CourseToGetDialog.module.scss'
import close from '../../../images/close.svg'
import useCacheState from '../../common/hooks/useCacheState'
import userService from '../../../services/api/userService'
import { UserContext } from '../../common/UserContext'
import { NavigationContext } from '../../Navigation/NavigationContext'

export default function CourseToGetDialog ({ courseIdToOffer }) {
  const [courses, setCourses] = useCacheState('courses', [])
  const userContext = useContext(UserContext)
  const nav = useContext(NavigationContext)

  async function getCourses () {
    const courseList = await userService.getCourses(userContext.token.accessToken)
    if (courseList && !courseList.error) {
      setCourses(courseList)
    }
  }

  async function createSwap (course) {
    const courseSwap = await userService.createSwap(
      userContext.token.accessToken, userContext.userId, course.section, courseIdToOffer
    )
    if (courseSwap) {
      nav.goBackToPrevious()
    }
  }

  useEffect(() => {
    getCourses(userContext.token.accessToken)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.dialog}>
      <button type='button' className={styles['close-container']} onClick={nav.goBackToPrevious}>
        <img className={styles['close-icon']} src={close} alt='close' />
      </button>
      <div className={styles.title}>
        Select course to receive on swap
      </div>
      {courses && Array.isArray(courses) && (
        <Autocomplete
          onChange={async (event, selectedCourse, value) => {
            await createSwap(selectedCourse)
          }}
          className={styles.autocomplete}
          disableListWrap
          options={courses}
          getOptionLabel={option => (
            option && option.title && option.section && `${option.title} ${option.section}`
          )}
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
    </div>
  )
}

CourseToGetDialog.propTypes = {
  courseIdToOffer: PropTypes.string.isRequired
}
