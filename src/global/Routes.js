import React, { useContext, useEffect } from 'react'
import _isNil from 'lodash/isNil'
import { Router } from '@reach/router'
import { FirebaseContext } from './FirebaseContext'
import AdminError from '../admin/AdminError'
import AdminHome from '../admin/AdminHome'
import AdminWork from '../admin/AdminWork'
import Info from '../home/Info'
import Home from '../home/Home'
import EditInfo from '../admin/EditInfo'
import EditWork from '../admin/EditWork'
import WorkPage from '../work/WorkPage'

function Routes({ count, location, passwordCorrect }) {
  const { infoContent, getInfo, socialContent, getSocial } = useContext(
    FirebaseContext
  )
  
  useEffect(() => {
    ;(async () => {
      // Initialize Info and Social
      if (infoContent.length === 0 || _isNil(socialContent)) {
        await getInfo()
        await getSocial()
      }
    })()
  }, [])

  return (
    <Router className='row full-height'>
      <Home path='/' />
      <Info path='/info' />
      <EditInfo exact path='/edit/info' />
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
