import React from 'react'
import { Router } from '@reach/router'
import AdminError from '../admin/AdminError'
import AdminHome from '../admin/AdminHome'
import AdminWork from '../admin/AdminWork'
import Info from '../home/Info'
import Home from '../home/Home'
import EditWork from '../admin/EditWork'
import WorkPage from '../work/WorkPage'

function Routes({ count, location }) {
  return (
    <Router className='row full-height'>
      <Home path='/' />
      <Info path='/info' />
      {count === 10 ? <AdminHome path='/edit' /> : <AdminError path='/edit' />}
      <WorkPage path='/work/:svc/:client' location={location} />
      <AdminWork path='/edit/:svc/:client' />
      <EditWork path='/edit/:svc/:client/:project' />
    </Router>
  )
}

export default Routes
