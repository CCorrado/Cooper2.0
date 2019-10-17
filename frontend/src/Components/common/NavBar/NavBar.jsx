import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar () {
  const sessionOut = sessionStorage => (e) => {
    if (sessionStorage.getItem('Access')) {
      sessionStorage.removeItem('Access')
      sessionStorage.removeItem('Username')
    }
  }
  let sessionValue = 'Login'
  if (sessionStorage.getItem('Access')) {
    sessionValue = 'Logout'
  }

  return (
    <nav>
      <div className='container'>
        <Link to='/'>Mr. Cooper</Link>
        <button type='button' data-toggle='collapse' data-target='#navbarNav'>
          <span />
        </button>
        <div id='navbarNav'>
          <ul>
            <li>
              <Link to='/map'>Map</Link>
            </li>
            <li>
              <Link to='/grid'>Scheduler</Link>
            </li>
            <li>
              <Link to='/explore'>Explore Course</Link>
            </li>
            <li>
              <Link to='/courses'>My Course</Link>
            </li>
            <li>
              <Link to='/dashboard'>Swapper</Link>
            </li>
            <li>
              <Link
                to='/login'
                onClick={sessionOut(sessionStorage)}
              >
                {sessionValue}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
