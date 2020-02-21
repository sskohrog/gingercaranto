import React, { useState } from 'react'
import { Location, navigate } from '@reach/router'
import { FirebaseProvider, FirebaseContext } from './FirebaseContext'
import Footer from './Footer'
import Header from './Header'
import Routes from './Routes'
import './Global.scss'

function App() {
  const [count, setCount] = useState(0)
  const adminMode = e => {
    setCount(count + 1)
    if (count === 9) {
      navigate('/edit')
    } else if (count === 10) {
      setCount(0)
      navigate('/')
    }
  }

  return (
    <Location>
      {({ location }) => (
        <div
          className={
            'main-container container-fluid' + (count === 10 ? ' edit' : '')
          }
        >
          <Header onClick={adminMode} setCount={setCount} />
          <FirebaseProvider>
            <FirebaseContext.Consumer>
              {({ firebaseContext }) => {
                return (
                  firebaseContext && (
                    <Routes count={count} location={location} />
                  )
                )
              }}
            </FirebaseContext.Consumer>
          </FirebaseProvider>
          {!(
            location.pathname === '/' ||
            location.pathname === '/info' ||
            location.pathname.includes('/edit') ||
            location.pathname.includes('/new')
          ) && <Footer location={location} />}
        </div>
      )}
    </Location>
  )
}

export default App
