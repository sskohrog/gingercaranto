import React from 'react'
import { Link } from '@reach/router'
import './Admin.scss'

function AdminHome() {
  return (
    <>
      <div className='col admin-home admin-landing-page'>
        <div className='row tile-container'>
          <Link to='/edit/info' className='col-12 tiles'>
            Info
          </Link>
        </div>
      </div>
      <div className='col graphic-designer admin-landing-page'>
        <div className='row tile-container'>
          <Link to='/edit/graphic-design/apple' className='col-12 tiles apple'>
            Apple Music
          </Link>
          <Link to='/edit/graphic-design/stussy' className='col-6 tiles stussy'>
            Stussy
          </Link>
          <Link to='/edit/graphic-design/ks' className='col-6 tiles ks'>
            Kassia + Surf
          </Link>
          <Link to='/edit/graphic-design/darnell' className='col-12 tiles dw'>
            Darnell Williams
          </Link>
          <Link to='/edit/graphic-design/alta' className='col-12 tiles alta'>
            Altamont
          </Link>
        </div>
      </div>
      <div className='col social-media admin-landing-page'>
        <div className='row tile-container'>
          <Link to='/edit/social-media/vans' className='col-12 tiles vans'>
            Vans
          </Link>
          <Link
            to='/edit/social-media/element'
            className='col-12 tiles element'
          >
            Element Skateboards
          </Link>
        </div>
      </div>
      <div className='col creative-producer admin-landing-page'>
        <div className='row tile-container'>
          <Link
            to='/edit/creative-producer/apple'
            className='col-12 tiles apple'
          >
            Apple Music
          </Link>
          <Link to='/edit/creative-producer/vans' className='col-12 tiles vans'>
            Vans
          </Link>
        </div>
      </div>
      <div className='col photo-editor admin-landing-page'>
        <div className='row tile-container'>
          <Link to='/edit/photo/andi' className='col-12 tiles ae'>
            Andi Elloway
          </Link>
          <Link to='/edit/photo/kassia' className='col-12 tiles ks'>
            Kassia + Surf
          </Link>
        </div>
      </div>
    </>
  )
}

export default AdminHome
