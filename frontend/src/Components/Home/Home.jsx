import React from 'react'
import { Route } from 'react-router-dom'
import BottomNav from './BottomNav'
import styles from './Home.module.scss'
import About from './About'
import ClassIndex from './ClassIndex'
import Search from './Search'

export default function Home () {
  return (
    <div className={styles.container}>
      <Route exact path='/home/about' component={About} />
      <Route exact path='/home/search' component={Search} />
      <Route exact path='/home/classes' component={ClassIndex} />
      <div className={styles.nav}>
        <BottomNav />
      </div>
    </div>
  )
}
