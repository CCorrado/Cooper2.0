import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import { Navigation } from './Components/Navigation/NavigationContext'
import Login from './Components/Authentication/Login'
import Registration from './Components/Authentication/Registration'
import Home from './Components/Home'

function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Navigation>
          <Route path='/login' component={Login} />
          <Route path='/registration' component={Registration} />
          <Route path='/home' component={Home} />
        </Navigation>
      </Switch>
    </BrowserRouter>
  )
}

export default App
