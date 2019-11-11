import React, { useContext, useState } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import BottomNav from './BottomNav'
import styles from './Home.module.scss'
import About from './About'
import ClassIndex from './ClassIndex'
import Search from './Search'
import HomeScreen from './HomeScreen/HomeScreen'
import RedirectRoute from '../Redirect/RedirectRoute'
import CourseToGetDialog from './CourseListing/CourseToGetDialog'
import { NavigationContext } from '../Navigation/NavigationContext'

export default function Home () {
  const nav = useContext(NavigationContext)
  const location = useLocation()
  const [selectedTab, setSelectedTab] = useState(0)
  const [courseToOffer, setCourseToOffer] = useState('')

  function swapClicked (course) {
    setCourseToOffer(course)
    nav.home.goToCourseSwap()
  }

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <BottomNav selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>
      <Switch location={location}>
        <RedirectRoute exact path='/home/cooper' component={HomeScreen} />
        <RedirectRoute exact path='/home/about' component={About} />
        <RedirectRoute exact path='/home/search' component={Search} />
        <Route
          exact
          path='/home/classes'
          render={() => (<ClassIndex onSwapClicked={course => (swapClicked(course))} />)}
        />
        <Route
          exact
          path='/home/classes/swap'
          render={() => (
            <CourseToGetDialog courseIdToOffer={courseToOffer.section} />
          )}
        />
      </Switch>
    </div>
  )
}
