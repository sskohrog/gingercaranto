import React, { useEffect, useContext } from 'react'
import _isEmpty from 'lodash/isEmpty'
import { Link } from '@reach/router'
import { FirebaseContext } from '../global/FirebaseContext'
import './Admin.scss'

function AdminWork({ location, svc, client }) {
  const { updateWorkContext, workContext } = useContext(FirebaseContext)
  // const [editMode, setEditMode] = set
  useEffect(() => {
    ;(async () => {
      _isEmpty(workContext[svc] && workContext[svc][client]) &&
        updateWorkContext(svc, client)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svc, client])

  return (
    <div className={'col-12 admin-work-container ' + svc}>
      <div className='row new-work-btn-container'>
        <Link
          to={`/edit/${svc}/${client}/new`}
          className='btn btn-lg'
          type='button'
        >
          NEW WORK
        </Link>
      </div>
      {workContext[svc] &&
        workContext[svc][client] &&
        Object.keys(workContext[svc][client]).map((key, idx) => {
          let work = workContext[svc][client][key]
          return (
            <div className='row work-item-container' id={'work-item-' + idx}>
              <div className='col-12 title-container'>
                <h4 className='work-title'>
                  <Link to={`/edit/${svc}/${client}/${work.key}`}>
                    {work.title}
                  </Link>
                </h4>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default AdminWork