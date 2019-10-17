import React, {
  Fragment, useCallback, useContext, useState
} from 'react'
import { Field, Form, Formik } from 'formik'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import TextInput from '../../common/TextInput'
import styles from './Login.module.scss'
import userService from '../../../services/api/userService'
import { NavigationContext } from '../../Navigation/NavigationContext'
import ProgressDialog from '../../common/ProgressDialog/ProgressDialog'

export default function Login () {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pwFieldVisible, setPwFieldVisible] = useState(false)

  const nav = useContext(NavigationContext)

  const handleClickShowPassword = () => {
    setPwFieldVisible(!pwFieldVisible)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const onSubmitForm = useCallback(
    // eslint-disable-next-line no-shadow
    async ({ email, password }) => {
      if (email && password) {
        await loginUser(email, password)
      }
      // eslint-disable-next-line
    }, []
  )

  return (
    <div className={styles.main}>
      <ProgressDialog open={loading} />
      <div>
        {error ? (
          <div className={styles.error}>
            {'Failed to login at this time. Please try again later'}
          </div>
        )
          : null}
        <Formik
          initialValues={{ email, password }}
          onSubmit={(formVal) => {
            setEmail(formVal.email)
            setPassword(formVal.password)
            onSubmitForm({ email: formVal.email, password: formVal.password })
          }}
          render={({
            handleSubmit, values, handleChange, handleBlur, errors, touched
          }) => (
            <Form id='login' onSubmit={handleSubmit} action=''>
              <div className={styles.form}>
                <Field render={() => (
                  <Fragment>
                    <TextInput
                      name='email'
                      placeholder='E-Mail'
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
                      label='Password'
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
            form='login'
            type='submit'
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )

  async function loginUser (emailVal, passwordVal) {
    try {
      setLoading(true)
      await userService.login(emailVal, passwordVal)
      setLoading(false)
      setError(false)
      // TODO (corrado) store the response in the local frontend database
      nav.home.goHome()
    } catch (err) {
      setError(true)
    }
  }
}
