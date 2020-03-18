/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import _cloneDeep from 'lodash/cloneDeep'
import { FirebaseContext } from '../global/FirebaseContext'
import { ReactComponent as EmailSVG } from '../assets/email.svg'
import { ReactComponent as LinkedinSVG } from '../assets/linkedin.svg'
import { ReactComponent as InstagramSVG } from '../assets/instagram.svg'
import './Admin.scss'
import Loader from '../global/Loader'

function EditInfo() {
  const {
    infoContent,
    getInfo,
    setInfoContent,
    saveInfo,
    socialContent,
    getSocial,
    setSocialContent,
    saveSocial,
    isLoading
  } = useContext(FirebaseContext)

  useEffect(() => {
    ;(async () => {
      // Initialize Info and Social
      await getInfo()
      await getSocial()
    })()
  }, [])

  const updateInfo = (idx, event) => {
    let text = event.target.value
    let about = _cloneDeep(infoContent)
    about[idx] = text
    setInfoContent(about)
  }

  const updateSocialMedia = (sm, event) => {
    let url = event.target.value
    let social = _cloneDeep(socialContent)
    social[sm] = url
    setSocialContent(social)
  }

  const addTextBlock = () => {
    let about = _cloneDeep(infoContent)
    about.push('')
    setInfoContent(about)
  }

  const deleteTextBlock = idx => {
    let about = _cloneDeep(infoContent)
    about = about.filter((text, idx2) => idx !== idx2)
    setInfoContent(about)
  }

  return (
    <div className='col-12 edit-info-container'>
      {isLoading ? (
        <div className='row info-loader-container'>
          <Loader />
        </div>
      ) : (
        <div className='row'>
          <div className='col-4 sm-icons'>
            <p className='form-group'>
              <a
                href={(socialContent || {}).instagram}
                rel='noopener noreferrer'
                target='_blank'
              >
                <InstagramSVG />
              </a>
              <input
                type='text'
                className='form-control insta-input'
                value={(socialContent || {}).instagram}
                onChange={text => updateSocialMedia('instagram', text)}
              />
            </p>
            <p className='form-group'>
              <a
                href={(socialContent || {}).linkedin}
                rel='noopener noreferrer'
                target='_blank'
              >
                <LinkedinSVG />
              </a>
              <input
                type='text'
                className='form-control linkedin-input'
                value={(socialContent || {}).linkedin}
                onChange={text => updateSocialMedia('linkedin', text)}
              />
            </p>
            <p className='form-group'>
              <a
                href={'mailto:' + (socialContent || {}).email}
                rel='noopener noreferrer'
                target='_blank'
              >
                <EmailSVG />
              </a>
              <input
                type='text'
                className='form-control email-input'
                value={(socialContent || {}).email}
                onChange={text => updateSocialMedia('email', text)}
              />
            </p>
            <p className='save-btn-container'>
              <button
                className='btn save-btn'
                type='button'
                onClick={saveSocial}
              >
                SAVE
              </button>
            </p>
          </div>
          <div className='col-1' />
          <div className='col-7 info-details'>
            {infoContent &&
              infoContent.length > 0 &&
              infoContent.map((text, idx) => {
                return (
                  <p className='info-input-container form-group'>
                    <textarea
                      type='text'
                      className='form-control info-input'
                      id={`info-input-${idx}`}
                      placeholder='INFO'
                      value={text}
                      onChange={t => updateInfo(idx, t)}
                    />
                    <button
                      type='button'
                      className='close'
                      aria-label='Close'
                      onClick={() => deleteTextBlock(idx)}
                    >
                      <span aria-hidden='true'>&times;</span>
                    </button>
                  </p>
                )
              })}
            <p className='save-btn-container'>
              <button
                className='btn add-btn'
                type='button'
                onClick={addTextBlock}
              >
                ADD TEXT BLOCK
              </button>
              <button className='btn save-btn' type='button' onClick={saveInfo}>
                SAVE
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditInfo
