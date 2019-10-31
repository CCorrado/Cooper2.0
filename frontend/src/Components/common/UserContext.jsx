import PropTypes from 'prop-types'
import React from 'react'
import userService from '../../services/api/userService'
import useCacheState from './hooks/useCacheState'

export const UserContext = React.createContext()

export function UserProvider ({ children }) {
  const [userId, setUserId] = useCacheState('userId', '')
  const [token, setToken] = useCacheState('token', '')
  const [user, setUser] = useCacheState('user', {})

  async function getUser () {
    if (!user) {
      const data = await userService.getProfile()
      const userResult = data[0]
      return saveUser(userResult)
    }
    return user
  }

  async function saveUser (userResponse) {
    setUser(userResponse)
    return user
  }

  return (
    <UserContext.Provider
      value={{
        getUser,
        saveUser,
        user,
        setToken,
        token,
        userId,
        setUserId
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export const UserConsumer = UserContext.Consumer
