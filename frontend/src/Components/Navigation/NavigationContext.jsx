import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

export const NavigationContext = React.createContext()

function NavigationProvider ({ children, history }) {
  const goToLogin = () => {
    history.push('/login')
  }

  const goToRegistration = () => {
    history.push('/registration')
  }

  const goHome = () => {
    history.push('/home')
  }

  const goBackToPrevious = () => {
    history.goBack()
  }

  const routes = {
    goToLogin,
    goToRegistration,
    goHome,
    goBackToPrevious
  }

  return (
    <NavigationContext.Provider value={routes}>
      {children}
    </NavigationContext.Provider>
  )
}

NavigationProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

NavigationProvider.defaultProps = {
  children: null
}

export const Navigation = withRouter(NavigationProvider)
