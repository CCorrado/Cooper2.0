import React, { useContext, useState } from 'react'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { BottomNavigation } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import HomeIcon from '@material-ui/icons/HomeSharp'
import SearchIcon from '@material-ui/icons/SearchSharp'
import InfoIcon from '@material-ui/icons/InfoSharp'
import styles from './BottomNav.module.scss'
import { NavigationContext } from '../../Navigation/NavigationContext'

export default function BottomNav () {
  const nav = useContext(NavigationContext)
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <BottomNavigation
      value={selectedTab}
      onChange={(event, newValue) => {
        switch (newValue) {
          case 0:
            nav.home.goHome()
            break
          case 1:
            nav.home.goToClasses()
            break
          case 2:
            nav.home.goToSearch()
            break
          case 3:
            nav.home.goToAbout()
            break
          default:
            nav.home.goHome()
            break
        }
        setSelectedTab(newValue)
      }}
      showLabels
      className={styles.root}
    >
      <BottomNavigationAction className={styles.tab} label='Home' icon={<HomeIcon />} />
      <BottomNavigationAction className={styles.tab} label='Registered Classes' icon={<FavoriteIcon />} />
      <BottomNavigationAction className={styles.tab} label='Search' icon={<SearchIcon />} />
      <BottomNavigationAction className={styles.tab} label='Info' icon={<InfoIcon />} />
    </BottomNavigation>
  )
}
