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
          <Route path='/login' render={() => <Login onSubmit={onSubmitLogin} />} />
          <Route path='/registration' render={() => <Registration onSubmit={onSubmitRegistration} />} />
          <Route path='/home' component={Home} />
        </Navigation>
      </Switch>
    </BrowserRouter>
  )

  function onSubmitLogin () {
    // TODO navigate home
  }

  function onSubmitRegistration () {
    // TODO navigate home
  }
}

export default App
