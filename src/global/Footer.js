import React from 'react'
import { Link } from '@reach/router'
import { ReactComponent as EmailSVG } from '../assets/email.svg'
import { ReactComponent as LinkedinSVG } from '../assets/linkedin.svg'
import { ReactComponent as InstagramSVG } from '../assets/instagram.svg'
import './Global.scss'

function Footer({ location }) {
  const serviceColor = () => {
    let path = (location || {}).pathname || ''
    if (path.includes('graphic-design')) {
      return ' graphic-design'
    } else if (path.includes('social-media')) {
      return ' social-media'
    } else if (path.includes('creative-producer')) {
      return ' creative-producer'
    } else if (path.includes('photo')) {
      return ' graphic-design'
    } else {
      return ''
    }
  }

  return (
    <div
      className={`row footer-container justify-content-between${serviceColor()}`}
    >
      <div className='col-6 footer-link'>
        <Link to='/info'>INFO</Link>
        <Link to='/'>WORK</Link>
      </div>
      <div className='col-6 footer-sm'>
        <a
          href='https://www.instagram.com/ginggerbreaad/'
          rel='noopener noreferrer'
          target='_blank'
        >
          <InstagramSVG />
        </a>
        <a
          href='https://www.linkedin.com/in/ginger-caranto-b98b88a1/'
          rel='noopener noreferrer'
          target='_blank'
        >
          <LinkedinSVG />
        </a>
        <a
          href='mailto:gingercaranto@gmail.com'
          rel='noopener noreferrer'
          target='_blank'
        >
          <EmailSVG />
        </a>
      </div>
    </div>
  )
}

export default Footer
