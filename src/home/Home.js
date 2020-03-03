import React, { useContext, useState, useEffect } from 'react'
import { Link, navigate } from '@reach/router'
import _isNil from 'lodash/isNil'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import HyperModal from 'react-hyper-modal'
import { FirebaseContext } from '../global/FirebaseContext'
import './Home.scss'

function Home() {
  const { passwordCorrect, setApplePW } = useContext(FirebaseContext)
  const [openpwModal, setpwModal] = useState(false)
  const [password, setPassword] = useState('')
  const [openService, setOpenSvc] = useState(null)

  useEffect(() => {
    setApplePW('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openMobileMenu = currSvc => {
    if (currSvc === openService) {
      return ' open-menu'
    } else if (!_isNil(openService) && currSvc !== openService) {
      return ' closed-menu'
    } else if (_isNil(openService)) {
      return ''
    }
  }

  return (
    <>
      <div className='col home landing-page'>
        <div className='row tile-container'>
          <Link to='/info' className='col-12 tiles'>
            Info
          </Link>
        </div>
      </div>
      <div className='col graphic-designer landing-page'>
        <div className='row tile-container'>
          <span className='col-12 tiles apple' onClick={() => setpwModal(true)}>
            Apple Music
          </span>
          <Link to='/work/graphic-design/stussy' className='col-6 tiles stussy'>
            Stussy
          </Link>
          <Link to='/work/graphic-design/ks' className='col-6 tiles ks'>
            Kassia + Surf
          </Link>
          <Link to='/work/graphic-design/darnell' className='col-12 tiles dw'>
            Darnell Williams
          </Link>
          <Link to='/work/graphic-design/alta' className='col-12 tiles alta'>
            Altamont
          </Link>
        </div>
      </div>
      <div className='col social-media landing-page'>
        <div className='row tile-container'>
          <Link to='/work/social-media/vans' className='col-12 tiles vans'>
            Vans
          </Link>
          <Link
            to='/work/social-media/element'
            className='col-12 tiles element'
          >
            Element Skateboards
          </Link>
        </div>
      </div>
      <div className='col creative-producer landing-page'>
        <div className='row tile-container'>
          <Link
            to='/work/creative-producer/apple'
            className='col-12 tiles apple'
          >
            Apple Music
          </Link>
          <Link to='/work/creative-producer/vans' className='col-12 tiles vans'>
            Vans
          </Link>
        </div>
      </div>
      <div className='col photo landing-page'>
        <div className='row tile-container'>
          <Link to='/work/photo/andi' className='col-12 tiles ae'>
            Andi Elloway
          </Link>
          <Link to='/work/photo/ks' className='col-12 tiles ks'>
            Kassia + Surf
          </Link>
        </div>
      </div>

      <Accordion className='mobile-home'>
        <Card className={'mobile-info-container' + openMobileMenu('')}>
          <Link to='/info' className='mobile-home-title'>
            INFO
          </Link>
        </Card>
        <Card className={'mobile-gd-container' + openMobileMenu('gd')}>
          <Accordion.Toggle
            as={Card.Header}
            eventKey='graphic-designer'
            onClick={() =>
              setOpenSvc(pastSvc => {
                return pastSvc === 'gd' ? null : 'gd'
              })
            }
          >
            <p className='mobile-home-title'>GRAPHIC DESIGNER</p>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='graphic-designer'>
            <Card.Body>
              <p className='mobile-link' onClick={() => setpwModal(true)}>
                Apple Music
              </p>
              <p
                className='mobile-link'
                onClick={() => navigate('/work/graphic-design/stussy')}
              >
                Stussy
              </p>
              <p
                className='mobile-link'
                onClick={() => navigate('/work/graphic-design/ks')}
              >
                Kassia + Surf
              </p>
              <p
                className='mobile-link'
                onClick={() => navigate('/work/graphic-design/darnell')}
              >
                Darnell Williams
              </p>
              <p
                className='mobile-link'
                onClick={() => navigate('/work/graphic-design/alta')}
              >
                Altamont
              </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card className={'mobile-sm-container' + openMobileMenu('sm')}>
          <Accordion.Toggle
            as={Card.Header}
            eventKey='social-media'
            onClick={() =>
              setOpenSvc(pastSvc => {
                return pastSvc === 'sm' ? null : 'sm'
              })
            }
          >
            <p className='mobile-home-title'>SOCIAL MEDIA</p>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='social-media'>
            <Card.Body>
              <p
                className='mobile-link'
                onClick={() => navigate('/work/social-media/vans')}
              >
                Vans
              </p>
              <p
                className='mobile-link'
                onClick={() => navigate('/work/social-media/element')}
              >
                Element Skateboards
              </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card className={'mobile-cp-container' + openMobileMenu('cp')}>
          <Accordion.Toggle
            as={Card.Header}
            eventKey='creative-producer'
            onClick={() =>
              setOpenSvc(pastSvc => {
                return pastSvc === 'cp' ? null : 'cp'
              })
            }
          >
            <p className='mobile-home-title'>CREATIVE PRODUCER</p>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='creative-producer'>
            <Card.Body>
              <p
                className='mobile-link'
                onClick={() => navigate('/work/creative-producer/apple')}
              >
                Apple Music
              </p>
              <p
                className='mobile-link'
                onClick={() => navigate('/work/creative-producer/vans')}
              >
                Vans
              </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card className={'mobile-pe-container' + openMobileMenu('pe')}>
          <Accordion.Toggle
            as={Card.Header}
            eventKey='photo-editor'
            onClick={() =>
              setOpenSvc(pastSvc => {
                return pastSvc === 'pe' ? null : 'pe'
              })
            }
          >
            <p className='mobile-home-title'>PHOTO EDITOR</p>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='photo-editor'>
            <Card.Body>
              <p
                className='mobile-link'
                onClick={() => navigate('/work/photo/andi')}
              >
                Andi Elloway
              </p>
              <p
                className='mobile-link'
                onClick={() => navigate('/work/photo/ks')}
              >
                Kassia + Surf
              </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      <HyperModal isOpen={openpwModal} requestClose={() => setpwModal(false)}>
        <div className='container pw-modal'>
          <div className='row justify-content-center'>
            <div className='col-md-7 col-9 title'>
              <h5>ENTER PASSWORD:</h5>
              <p className='input-container'>
                <input
                  type='text'
                  className='form-control pw-input'
                  aria-describedby='password-input'
                  placeholder='PASSWORD'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </p>
              {!passwordCorrect && (
                <p className='pw-error'>INCORRECT PASSWORD. TRY AGAIN.</p>
              )}
              <p
                className={
                  'enter-btn-container' + (!passwordCorrect ? '' : ' mt-4')
                }
              >
                <button
                  type='button'
                  className='btn btn-lg enter-btn'
                  onClick={() => {
                    setPassword('')
                    setApplePW(password)
                  }}
                >
                  ENTER
                </button>
              </p>
            </div>
          </div>
        </div>
      </HyperModal>
    </>
  )
}

export default Home
