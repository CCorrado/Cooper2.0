import React, { useState } from 'react'
import { Switch, useLocation } from 'react-router-dom'
import BottomNav from './BottomNav'
import styles from './Home.module.scss'
import About from './About'
import ClassIndex from './ClassIndex'
import Search from './Search'
import HomeScreen from './HomeScreen/HomeScreen'
import RedirectRoute from '../Redirect/RedirectRoute'

export default function Home () {
  const location = useLocation()
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <BottomNav selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>
      <Switch location={location}>
        <RedirectRoute exact path='/home/cooper' component={HomeScreen} />
        <RedirectRoute exact path='/home/about' component={About} />
        <RedirectRoute exact path='/home/search' component={Search} />
        <RedirectRoute exact path='/home/classes' component={ClassIndex} />
      </Switch>
    </div>
  )
}
