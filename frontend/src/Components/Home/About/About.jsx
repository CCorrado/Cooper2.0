import React from 'react'
import aditya from '../../../images/aditya1.jpg'
import dariel from '../../../images/dariel.jpg'
import chris from '../../../images/chris.png'
import sam from '../../../images/sam.jpeg'
import styles from './About.module.scss'

export default function About () {
  return (
    <div className={styles.container}>
      <h2>Objective</h2>
      <h4>
        We aim to make the task of choosing and registering for classes as smooth as possible.
      </h4>
      <hr />
      <h2>Meet The Team</h2>
      <hr />
      <div>
        <div>
          <div>
            <img src={aditya} alt='Aditya Munot' style={{ width: '50%' }} />
            <div className='container'>
              <h3>Aditya Munot</h3>
              <p>Co-Founder</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <img src={dariel} alt='Dariel Bobadilla' style={{ width: '50%' }} />
            <div>
              <h3>Dariel Bobadilla</h3>
              <p>Co-Founder</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <img src={chris} alt='Chris Corrado' style={{ width: '50%' }} />
            <div>
              <h3>Chris Corrado</h3>
              <p>Co-Founder</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <img src={sam} alt='Ziyu Zhang' style={{ width: '50%' }} />
            <div>
              <h3>Ziyu Zhang</h3>
              <p>Co-Founder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
