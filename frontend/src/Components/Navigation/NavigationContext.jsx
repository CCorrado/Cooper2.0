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
    history.push('/home/cooper')
  }

  const goToAbout = () => {
    history.push('/home/about')
  }

  const goToSearch = () => {
    history.push('/home/search')
  }

  const goToClasses = () => {
    history.push('/home/classes')
  }

  const goBackToPrevious = () => {
    history.goBack()
  }

  const home = {
    goHome,
    goToClasses,
    goToSearch,
    goToAbout
  }

  const routes = {
    goToLogin,
    goToRegistration,
    goBackToPrevious,
    home
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
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  }).isRequired
}

NavigationProvider.defaultProps = {
  children: null
}

export const Navigation = withRouter(NavigationProvider)
