import React, { useContext, useEffect } from 'react'
import styles from './HomeScreen.module.scss'
import { UserContext } from '../../common/UserContext'
import useCacheState from '../../common/hooks/useCacheState'
import userService from '../../../services/api/userService'

export default function HomeScreen () {
  const userContext = useContext(UserContext)
  const [userSwaps, setUserSwaps] = useCacheState('userSwaps', [])

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
      {userSwaps && userSwaps.map(userSwap => (
        <div key={userSwap.courseSwapId}>
          {`${
            userSwap.courseToGiveId + userSwap.courseToGetId
          }`}
        </div>
      ))}
    </div>
  )
}
