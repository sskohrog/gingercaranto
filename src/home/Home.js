import React, { useContext, useState, useEffect } from 'react'
import { Link } from '@reach/router'
import HyperModal from 'react-hyper-modal'
import { FirebaseContext } from '../global/FirebaseContext'
import './Home.scss'

function Home() {
  const { passwordCorrect, setApplePW } = useContext(FirebaseContext)
  const [openpwModal, setpwModal] = useState(false)
  const [password, setPassword] = useState('')

  useEffect(() => {
    setApplePW('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      <HyperModal isOpen={openpwModal} requestClose={() => setpwModal(false)}>
        <div className='container pw-modal'>
          <div className='row justify-content-center'>
            <div className='col-7 title'>
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
