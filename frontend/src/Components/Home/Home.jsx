import React, { useState } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import BottomNav from './BottomNav'
import styles from './Home.module.scss'
import About from './About'
import ClassIndex from './ClassIndex'
import Search from './Search'
import HomeScreen from './HomeScreen/HomeScreen'

export default function Home () {
  const location = useLocation()
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <BottomNav selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>
      <Switch location={location}>
        <Route exact path='/home/cooper' component={HomeScreen} />
        <Route exact path='/home/about' component={About} />
        <Route exact path='/home/search' component={Search} />
        <Route exact path='/home/classes' component={ClassIndex} />
      </Switch>
    </div>
  )
}
