import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { UserContext } from '../common/UserContext'

// eslint-disable-next-line react/prop-types
export default function RedirectRoute ({ component: Component, ...rest }) {
  const { token } = useContext(UserContext)
  return (
    <Route
      {...rest}
      render={props => (
        token
          ? <Component {...props} />
          : <Redirect to='/login' />
      )}
    />
  )
}
