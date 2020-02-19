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
    if (count === 4) {
      navigate('/edit')
    } else if (count === 5) {
      setCount(0)
      navigate('/')
    }
  }

  return (
    <Location>
      {({ location }) => (
        <div
          className={
            'main-container container-fluid' + (count === 5 ? ' edit' : '')
          }
        >
          <Header onClick={adminMode} />
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
          ) && <Footer />}
        </div>
      )}
    </Location>
  )
}

export default App
