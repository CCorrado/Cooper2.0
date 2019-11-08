import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import { Navigation } from './Components/Navigation/NavigationContext'
import Login from './Components/Authentication/Login'
import Registration from './Components/Authentication/Registration'
import Home from './Components/Home'
import { UserProvider } from './Components/common/UserContext'
import RedirectRoute from './Components/Redirect/RedirectRoute'

function App () {
  return (
    <Navigation>
      <UserProvider>
        <Route exact path='/login' render={() => <Login />} />
        <Route exact path='/registration' render={() => <Registration />} />
        <RedirectRoute path='/home' component={Home} />
        <RedirectRoute path='/' component={Home} />
      </UserProvider>
    </Navigation>
  )
}

export default App
