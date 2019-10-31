import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
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
        <Navigation>
          <Route exact path='/login' render={() => <Login />} />
          <Route exact path='/registration' render={() => <Registration />} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/scheduler' component={mygrid} />
        </Navigation>
    </Provider>
    </BrowserRouter>
  )
}

export default App
