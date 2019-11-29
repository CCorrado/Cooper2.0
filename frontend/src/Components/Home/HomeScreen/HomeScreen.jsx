import React, { useContext, useEffect, useState } from 'react'
import styles from './HomeScreen.module.scss'
import { UserContext } from '../../common/UserContext'
import useCacheState from '../../common/hooks/useCacheState'
import userService from '../../../services/api/userService'
import CourseSwap from '../CourseSwap'
import ErrorDialog from '../../common/ErrorDialog'
import useModal from '../../common/hooks/useModal'

export default function HomeScreen () {
  const userContext = useContext(UserContext)
  const [userSwaps, setUserSwaps] = useCacheState('userSwaps', undefined)
  const [error, setError] = useState('')
  const { isShowing, toggle } = useModal()

  async function getCourses (accessToken) {
    const userSwapsResponse = await userService.getSwapsForUser(accessToken)
    if (userSwapsResponse) {
      setUserSwaps(userSwapsResponse.length ? userSwapsResponse : [])
    }
  }

  async function acceptSwap (courseSwap) {
    const swapResponse = await userService.acceptSwap(
      userContext.token.accessToken, userContext.userId, courseSwap
    )
    if (swapResponse && swapResponse.statusCode === 400) {
      setError(swapResponse.body)
      toggle()
    }
    await getCourses(userContext.token.accessToken)
  }

  useEffect(() => {
    getCourses(userContext.token.accessToken)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.container}>
      <ErrorDialog message={error} setShown={toggle} isShown={isShowing} />
      {userSwaps && userSwaps.length ? userSwaps.map(userSwap => (
        <CourseSwap
          key={userSwap.courseSwapId}
          courseSwap={userSwap}
          onSwapAccept={(courseSwap) => {
            acceptSwap(courseSwap)
          }}
        />
      )) : (
        <div className={styles.text}>
          {'No course swaps currently available to accept'}
        </div>
      )}
    </div>
  )
}
