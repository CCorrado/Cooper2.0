import React from 'react'
import NavBar from '../common/NavBar/NavBar'

export default function Home () {
  return (
    <div className='container'>
      <NavBar />
      <div className='Main'>
        <h2 className='text-center'>Objective</h2>
        <h4 className='text-center'>
          We aim to make the task of choosing and registering for classes as smooth as possible.
        </h4>
        <hr />
        <h2 className='text-center'>Meet The Team</h2>
        <hr />
        <div className='row'>
          <div className='column'>
            <div className='card'>
              <img src='aditya1.jpg' alt='Aditya Munot' style={{ width: '100%' }} />
              <div className='container'>
                <h3>Aditya Munot</h3>
                <p className='title'>Co-Founder</p>
                <p>
                  <button className='button'>Contact</button>
                </p>
              </div>
            </div>
          </div>
          <div className='column'>
            <div className='card'>
              <img src='dariel.jpg' alt='Dariel Bobadilla' style={{ width: '100%' }} />
              <div className='container'>
                <h3>Dariel Bobadilla</h3>
                <p className='title'>Co-Founder</p>
                <p>
                  <button className='button'>Contact</button>
                </p>
              </div>
            </div>
          </div>
          <div className='column'>
            <div className='card'>
              <img src='corrado.jpg' alt='Chris Corrado' style={{ width: '100%' }} />
              <div className='container'>
                <h3>Chris Corrado</h3>
                <p className='title'>Co-Founder</p>
                <p>
                  <button className='button'>Contact</button>
                </p>
              </div>
            </div>
          </div>
          <div className='column'>
            <div className='card'>
              <img src='sam.jpg' alt='Ziyu Zhang' style={{ width: '100%' }} />
              <div className='container'>
                <h3>Ziyu Zhang</h3>
                <p className='title'>Co-Founder</p>
                <p>
                  <button className='button'>Contact</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
