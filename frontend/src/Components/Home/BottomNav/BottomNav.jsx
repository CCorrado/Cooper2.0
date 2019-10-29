import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { BottomNavigation } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import HomeIcon from '@material-ui/icons/HomeSharp'
import SearchIcon from '@material-ui/icons/SearchSharp'
import InfoIcon from '@material-ui/icons/InfoSharp'
import styles from './BottomNav.module.scss'
import { NavigationContext } from '../../Navigation/NavigationContext'

export default function BottomNav ({ selectedTab, setSelectedTab }) {
  const nav = useContext(NavigationContext)

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
      <BottomNavigationAction className={styles.tab} label='Registered' icon={<FavoriteIcon />} />
      <BottomNavigationAction className={styles.tab} label='Search' icon={<SearchIcon />} />
      <BottomNavigationAction className={styles.tab} label='Info' icon={<InfoIcon />} />
    </BottomNavigation>
  )
}

BottomNav.propTypes = {
  selectedTab: PropTypes.number.isRequired,
  setSelectedTab: PropTypes.func.isRequired
}
