import React from 'react'
import { Router } from '@reach/router'
import AdminError from '../admin/AdminError'
import AdminHome from '../admin/AdminHome'
import AdminWork from '../admin/AdminWork'
import Info from '../home/Info'
import Home from '../home/Home'
import EditWork from '../admin/EditWork'
import WorkPage from '../work/WorkPage'

function Routes({ count, location, passwordCorrect }) {
  return (
    <Router className='row full-height'>
      <Home path='/' />
      <Info path='/info' />
      {count === 10 ? <AdminHome path='/edit' /> : <AdminError path='/edit' />}

      {location.pathname !== '/work/graphic-design/apple' || passwordCorrect ? (
        <WorkPage path='/work/:svc/:client' location={location} />
      ) : (
        <AdminError path='/work/:svc/:client' />
      )}
      <AdminWork path='/edit/:svc/:client' />
      <EditWork path='/edit/:svc/:client/:project' />
    </Router>
  )
}

export default Routes
