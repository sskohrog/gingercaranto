import React from 'react'
import { ReactComponent as EmailSVG } from '../assets/email.svg'
import { ReactComponent as LinkedinSVG } from '../assets/linkedin.svg'
import { ReactComponent as InstagramSVG } from '../assets/instagram.svg'

function Info() {
  return (
    <div className='col-12 info-container'>
      <div className='row'>
        <div className='col-2 sm-icons'>
          <p>
            <a
              href='https://www.instagram.com/ginggerbreaad/'
              rel='noopener noreferrer'
              target='_blank'
            >
              <InstagramSVG />
            </a>
          </p>
          <p>
            <a
              href='https://www.linkedin.com/in/ginger-caranto-b98b88a1/'
              rel='noopener noreferrer'
              target='_blank'
            >
              <LinkedinSVG />
            </a>
          </p>
          <p>
            <a
              href='mailto:gingercaranto@gmail.com'
              rel='noopener noreferrer'
              target='_blank'
            >
              <EmailSVG />
            </a>
          </p>
        </div>
        <div className='col-3' />
        <div className='col-4 info-details'>
          <p>Hello!</p>
          <br />
          <p>
            I am a highly organized and creative person that is always up to
            solve problems and get the job done, no matter what it may be. I’ve
            dipped my hands into multiple fields, some of those being - creative
            producer, graphic designer & social media manager.
          </p>
          <br />
          <p>
            Originating and continuing to live in Venice Beach, CA. Most of my
            time outside of work is spent skateboarding and dabbling in new
            crafts.
          </p>
          <br />
          <p>
            Currently, I’m a creative producer and graphic designer at Apple
            Music.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Info
