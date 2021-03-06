import React, { useCallback, useContext, useState } from 'react'
import styles from './Registration.module.scss'
import RegistrationForm from './RegistrationForm/RegistrationForm'
import userService from '../../../services/api/userService'
import { NavigationContext } from '../../Navigation/NavigationContext'
import ProgressDialog from '../../common/ProgressDialog/ProgressDialog'
import logo from '../../../images/bulldog.jpg'
import { UserContext } from '../../common/UserContext'

export default function Registration () {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const nav = useContext(NavigationContext)
  const userContext = useContext(UserContext)

  const onSubmitForm = useCallback(
    async ({
      firstName, lastName, email, password
    }) => {
      if (firstName && lastName && email && password) {
        await registerUser(firstName, lastName, email, password)
      }
      // eslint-disable-next-line
    }, []
  )

  return (
    <div className={styles.main}>
      <ProgressDialog open={loading} />
      <div className={styles['section--top']}>
        <div className={styles.title}>Mr. Cooper</div>
        <div className={styles.image}>
          <img className={styles['image-pad']} src={logo} alt='Mr. Cooper' />
        </div>
      </div>
      <div className={styles.subtitle}>Create Account</div>
      {error ? (
        <div className={styles.error}>
          {'Failed to register at this time. Please try again later'}
        </div>
      )
        : null}
      <RegistrationForm onSubmit={onSubmitForm} />
    </div>
  )

  async function registerUser (firstName, lastName, email, password) {
    const profile = {
      firstName,
      lastName
    }
    try {
      setLoading(true)
      const userResponse = await userService.register(email, password, profile)
      setLoading(false)
      setError(false)
      await userContext.setUserId(userResponse.userId)
      await userContext.setToken({
        accessToken: userResponse.accessToken,
        refreshToken: userResponse.refreshToken
      })
      await userContext.saveUser(userResponse)
      nav.home.goHome()
    } catch (err) {
      setError(true)
      setLoading(false)
    }
  }
}
