import React from 'react'
import { Link } from '@reach/router'
import './Home.scss'

function Home() {
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
          <Link to='/work/graphic-design/apple' className='col-12 tiles apple'>
            Apple Music
          </Link>
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
          <Link to='/work/social-media/element' className='col-12 tiles element'>
            Element Skateboards
          </Link>
        </div>
      </div>
      <div className='col creative-producer landing-page'>
        <div className='row tile-container'>
          <Link to='/work/creative-producer/apple' className='col-12 tiles apple'>
            Apple Music
          </Link>
          <Link to='/work/creative-producer/vans' className='col-12 tiles vans'>
            Vans
          </Link>
        </div>
      </div>
      <div className='col photo-editor landing-page'>
        <div className='row tile-container'>
          <Link to='/work/photo/andi' className='col-12 tiles ae'>
            Andi Elloway
          </Link>
          <Link to='/work/photo/ks' className='col-12 tiles ks'>
            Kassia + Surf
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
