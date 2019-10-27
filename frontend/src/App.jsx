import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import { Navigation } from './Components/Navigation/NavigationContext'
import Login from './Components/Authentication/Login'
import Registration from './Components/Authentication/Registration'
import Home from './Components/Home'

function App () {
  return (
    <Navigation>
      <Route exact path='/login' render={() => <Login />} />
      <Route exact path='/registration' render={() => <Registration />} />
      <Route path='/home' component={Home} />
    </Navigation>
  )
}

export default App
