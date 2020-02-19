import React from 'react'
import { Location, navigate } from '@reach/router'
import './Global.scss'

function Header({ onClick }) {
  return (
    <Location>
      {({ location }) => (
        <div
          className='row header-container'
          id={location.pathname === '/' ? 'home-header' : 'main-header'}
        >
          <div className='col home'>
            <div
              className='row white-banner header-left'
              onClick={() => navigate('/')}
            >
              Ginger <br />
              Caranto
            </div>
          </div>
          <div className='col graphic-designer'>
            <div className='row white-banner'>
              GRAPHIC <br />
              DESIGNER
            </div>
          </div>
          <div className='col social-media'>
            <div className='row white-banner'>
              SOCIAL
              <br /> MEDIA
            </div>
          </div>
          <div className='col creative-producer'>
            <div className='row white-banner'>
              CREATIVE <br />
              PRODUCER
            </div>
          </div>
          <div className='col photo-editor'>
            <div className='row white-banner header-right' onClick={onClick}>
              PHOTO <br />
              EDITOR
            </div>
          </div>
        </div>
      )}
    </Location>
  )
}

export default Header
