import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import { Navigation } from './Components/Navigation/NavigationContext'
import Login from './Components/Authentication/Login'
import Registration from './Components/Authentication/Registration'
import Home from './Components/Home'
import mygrid from './Components/Scheduler/mygrid'
import { Provider } from 'react-redux'
import store from './Components/Scheduler/store/index'

function App () {
  return (
    <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Navigation>
          <Route path='/login' render={() => <Login onSubmit={onSubmitLogin} />} />
          <Route path='/registration' render={() => <Registration onSubmit={onSubmitRegistration} />} />
          <Route path='/' component={Home} />
          <Route path='/scheduler' component={mygrid} />
        </Navigation>
      </Switch>
    </Provider>
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
