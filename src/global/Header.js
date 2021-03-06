import React, { useContext } from 'react'
import { Location, navigate, Link } from '@reach/router'
import { FirebaseContext } from './FirebaseContext'
import { ReactComponent as EmailSVG } from '../assets/email.svg'
import { ReactComponent as LinkedinSVG } from '../assets/linkedin.svg'
import { ReactComponent as InstagramSVG } from '../assets/instagram.svg'
import './Global.scss'

function Header({ onClick, setCount }) {
  const { socialContent } = useContext(FirebaseContext)
  return (
    <Location>
      {({ location }) => (
        <div
          className='row header-container'
          id={
            location.pathname === '/' || location.pathname === '/edit'
              ? 'home-header'
              : 'main-header'
          }
        >
          <div className='col home'>
            <div
              className='row white-banner header-left'
              onClick={() => {
                setCount(0)
                navigate('/')
              }}
            >
              Ginger <br />
              Caranto
            </div>
          </div>
          <div className='col graphic-designer'>
            <div
              className='row white-banner'
              onClick={() => {
                setCount(0)
                navigate('/')
              }}
            >
              GRAPHIC <br />
              DESIGNER
            </div>
          </div>
          <div className='col social-media'>
            <div
              className='row white-banner'
              onClick={() => {
                setCount(0)
                navigate('/')
              }}
            >
              SOCIAL <br />
              MEDIA
            </div>
          </div>
          <div className='col creative-producer'>
            <div
              className='row white-banner'
              onClick={() => {
                setCount(0)
                navigate('/')
              }}
            >
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
          <div className='mobile-header col-6 name'>
            <Link to='/'>Ginger Caranto</Link>
          </div>
          <div className='mobile-header col-6 sm-icons'>
            <a
              href={(socialContent || {}).instagram}
              rel='noopener noreferrer'
              target='_blank'
            >
              <InstagramSVG />
            </a>
            <a
              href={(socialContent || {}).linkedin}
              rel='noopener noreferrer'
              target='_blank'
            >
              <LinkedinSVG />
            </a>
            <a
              href={`mailto:${(socialContent || {}).email}`}
              rel='noopener noreferrer'
              target='_blank'
            >
              <EmailSVG />
            </a>
          </div>
        </div>
      )}
    </Location>
  )
}

export default Header
