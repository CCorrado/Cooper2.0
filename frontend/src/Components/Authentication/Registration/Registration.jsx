import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './Registration.module.scss'
import RegistrationForm from './RegistrationForm/RegistrationForm'
import userService from '../../../services/api/userService'

export default function Registration ({ onSubmit }) {
  const [error, setError] = useState(false)

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
      <div className={styles['section--top']}>
        <div className={styles.title}>Mr. Cooper</div>
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
      await userService.register(email, password, profile)
      setError(false)
      // TODO (corrado) store the response in the local frontend database
      onSubmit()
    } catch (err) {
      setError(true)
    }
  }
}

Registration.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
