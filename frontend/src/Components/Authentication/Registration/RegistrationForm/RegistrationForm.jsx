import PropTypes from 'prop-types'
import React, { Fragment, useState } from 'react'
import { Field, Form, Formik } from 'formik'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import emailRegex from 'email-regex'
import styles from './RegistrationForm.module.scss'
import TextInput from '../../../common/TextInput'

export default function RegistrationForm ({ onSubmit }) {
  const [pwFieldVisible, setPwFieldVisible] = useState(false)

  const handleClickShowPassword = () => {
    setPwFieldVisible(!pwFieldVisible)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const validate = ({
    // eslint-disable-next-line no-shadow
    firstName, lastName, email, password
  }) => {
    const errors = {}
    if (!firstName) {
      errors.firstName = 'Please enter your first name'
    }
    if (!lastName) {
      errors.lastName = 'Please enter your last name'
    }
    if (!emailRegex({ exact: true }).test(email)) {
      errors.email = 'Please enter a valid email'
    }
    if (!password) {
      errors.password = 'Please enter a valid password'
    }
    return errors
  }

  return (
    <div>
      <Formik
        initialValues={{
          firstName, lastName, email, password
        }}
        onSubmit={(fieldVal) => {
          setFirstName(fieldVal.firstName)
          setLastName(fieldVal.lastName)
          setEmail(fieldVal.email)
          setPassword(fieldVal.password)
          onSubmit({
            firstName: fieldVal.firstName,
            lastName: fieldVal.lastName,
            email: fieldVal.email,
            password: fieldVal.password
          })
        }}
        validate={validate}
        render={({
          handleSubmit, values, handleChange, handleBlur, errors, touched
        }) => (
          <Form id='registration' onSubmit={handleSubmit} action=''>
            <div className={styles.form}>
              <Field render={() => (
                <Fragment>
                  <TextInput
                    name='firstName'
                    placeholder='First Name'
                    id='firstName'
                    variant='standard'
                    value={values.firstName}
                    onChange={(e) => {
                      handleChange(e)
                    }}
                    onBlur={handleBlur}
                    error={errors.firstName && touched.firstName}
                  />
                  {errors.firstName && touched.firstName ? (
                    <div>
                      <p className={styles.error}>
                        {errors.firstName}
                      </p>
                    </div>
                  ) : null}
                </Fragment>
              )}
              />
              <Field render={() => (
                <Fragment>
                  <TextInput
                    name='lastName'
                    variant='standard'
                    placeholder='Last Name'
                    id='lastName'
                    value={values.lastName}
                    onChange={(e) => {
                      handleChange(e)
                    }}
                    onBlur={handleBlur}
                    error={errors.lastName && touched.lastName}
                  />
                  {errors.lastName && touched.lastName ? (
                    <div>
                      <p className={styles.error}>
                        {errors.lastName}
                      </p>
                    </div>
                  ) : null}
                </Fragment>
              )}
              />
              <Field render={() => (
                <Fragment>
                  <TextInput
                    name='email'
                    placeholder='E-Mail'
                    variant='standard'
                    id='email'
                    value={values.email}
                    onChange={(e) => {
                      handleChange(e)
                    }}
                    onBlur={handleBlur}
                    error={errors.email && touched.email}
                  />
                  {errors.email && touched.email ? (
                    <div>
                      <p className={styles.error}>
                        {errors.email}
                      </p>
                    </div>
                  ) : null}
                </Fragment>
              )}
              />
              <Field render={() => (
                <Fragment>
                  <TextField
                    name='password'
                    id='password'
                    type={pwFieldVisible ? 'text' : 'password'}
                    value={values.password}
                    onChange={(e) => {
                      handleChange(e)
                    }}
                    className={errors.password && touched.password ? styles['error-border'] : styles['password-input']}
                    onBlur={handleBlur}
                    error={errors.password && touched.password}
                    variant='standard'
                    label='Enter Password'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {pwFieldVisible ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  {errors.password && touched.password ? (
                    <div>
                      <p className={styles.error}>
                        {errors.password}
                      </p>
                    </div>
                  ) : null}
                </Fragment>
              )}
              />
            </div>
          </Form>
        )}
      />
      <div className={styles['submit-button']}>
        <button
          color='primary'
          form='registration'
          type='submit'
        >
          Register
        </button>
      </div>
    </div>
  )
}

RegistrationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
