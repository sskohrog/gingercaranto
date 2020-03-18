/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { FirebaseContext } from '../global/FirebaseContext'
import { ReactComponent as EmailSVG } from '../assets/email.svg'
import { ReactComponent as LinkedinSVG } from '../assets/linkedin.svg'
import { ReactComponent as InstagramSVG } from '../assets/instagram.svg'

function Info() {
  const { infoContent, getInfo, socialContent, getSocial } = useContext(
    FirebaseContext
  )

  useEffect(() => {
    ;(async () => {
      // Initialize Info and Social
      await getInfo()
      await getSocial()
    })()
  }, [])

  return (
    <div className='col-12 info-container'>
      <div className='row'>
        <div className='col-md-2 sm-icons'>
          <p>
            <a
              href={(socialContent || {}).instagram}
              rel='noopener noreferrer'
              target='_blank'
            >
              <InstagramSVG />
            </a>
          </p>
          <p>
            <a
              href={(socialContent || {}).linkedin}
              rel='noopener noreferrer'
              target='_blank'
            >
              <LinkedinSVG />
            </a>
          </p>
          <p>
            <a
              href={`mailto:${(socialContent || {}).email}`}
              rel='noopener noreferrer'
              target='_blank'
            >
              <EmailSVG />
            </a>
          </p>
        </div>
        <div className='col-1' />
        <div className='col-md-7 col-10 info-details'>
          {infoContent &&
            infoContent.map(text => {
              return (
                <>
                  <p>{text}</p>
                  <br />
                </>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Info
