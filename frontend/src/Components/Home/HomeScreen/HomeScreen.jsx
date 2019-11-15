import React, { useContext, useEffect } from 'react'
import styles from './HomeScreen.module.scss'
import { UserContext } from '../../common/UserContext'
import useCacheState from '../../common/hooks/useCacheState'
import userService from '../../../services/api/userService'
import CourseSwap from '../CourseSwap'

export default function HomeScreen () {
  const userContext = useContext(UserContext)
  const [userSwaps, setUserSwaps] = useCacheState('userSwaps', undefined)

  async function getCourses (accessToken) {
    const userSwapsResponse = await userService.getSwapsForUser(accessToken)
    if (userSwapsResponse) {
      setUserSwaps(userSwapsResponse.length ? userSwapsResponse : [])
    }
  }

  useEffect(() => {
    getCourses(userContext.token.accessToken)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.container}>
      {userSwaps && userSwaps.length ? userSwaps.map(userSwap => (
        <CourseSwap key={userSwap.courseSwapId} courseSwap={userSwap} />
      )) : (
        <div className={styles.text}>
          {'No course swaps currently available to accept'}
        </div>
      )}
    </div>
  )
}
