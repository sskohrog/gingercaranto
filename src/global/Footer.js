/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react'
import { Link } from '@reach/router'
import { FirebaseContext } from './FirebaseContext'
import { ReactComponent as EmailSVG } from '../assets/email.svg'
import { ReactComponent as LinkedinSVG } from '../assets/linkedin.svg'
import { ReactComponent as InstagramSVG } from '../assets/instagram.svg'
import './Global.scss'

function Footer({ location }) {
  const { socialContent } = useContext(FirebaseContext)

  const serviceColor = () => {
    let path = (location || {}).pathname || ''
    if (path.includes('graphic-design')) {
      return ' graphic-design'
    } else if (path.includes('social-media')) {
      return ' social-media'
    } else if (path.includes('creative-producer')) {
      return ' creative-producer'
    } else if (path.includes('photo')) {
      return ' photo-editor'
    } else {
      return ''
    }
  }

  return (
    <div
      className={`row footer-container justify-content-between${serviceColor()}`}
    >
      <div className='col-6 footer-link'>
        <div className='row'>
          <div className='col-12'>
            <Link to='/info'>INFO</Link>
            <Link to='/'>WORK</Link>
          </div>
        </div>
      </div>
      <div className='col-6 footer-sm'>
        <div className='row'>
          <div className='col-12'>
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
      </div>
    </div>
  )
}

export default Footer
