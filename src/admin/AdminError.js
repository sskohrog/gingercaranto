import React from 'react'
import { Link } from '@reach/router'
import './Admin.scss'

function AdminError() {
  return (
    <div className='col-12 admin-error'>
      <Link to='/' className='go-home' type='button'>
        GO HOME !
      </Link>
    </div>
  )
}

export default AdminError
