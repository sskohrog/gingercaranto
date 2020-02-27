import React, { useEffect, useContext, useState } from 'react'
import RLDD from 'react-list-drag-and-drop/lib/RLDD'
import _isEmpty from 'lodash/isEmpty'
import { Link, navigate } from '@reach/router'
import { FirebaseContext } from '../global/FirebaseContext'
import './Admin.scss'

function AdminWork({ location, svc, client }) {
  const { updateWorkContext, workContext } = useContext(FirebaseContext)
  const [workItems, setWorkItems] = useState([])
  useEffect(() => {
    ;(async () => {
      if (_isEmpty(workContext[svc] && workContext[svc][client])) {
        let returnedWork = await updateWorkContext(svc, client)
        let newWork = []
        Object.keys(returnedWork[svc][client]).forEach(key => {
          let work = returnedWork[svc][client][key]
          newWork.push(work)
        })
        newWork.sort((a, b) => (a.id > b.id ? 1 : -1))
        setWorkItems(newWork)
      } else {
        let newWork = []
        Object.keys(workContext[svc][client]).forEach(key => {
          let work = workContext[svc][client][key]
          newWork.push(work)
        })
        newWork.sort((a, b) => (a.id > b.id ? 1 : -1))
        setWorkItems(newWork)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svc, client])

  return (
    <div className={'col-12 admin-work-container ' + svc}>
      <div className='row new-work-btn-container'>
        <h6
          type='button'
          className='back-btn'
          onClick={() => navigate(`/edit`)}
        >
          {`< BACK`}
        </h6>
        <Link
          to={`/edit/${svc}/${client}/new`}
          className='btn btn-lg'
          type='button'
        >
          NEW WORK
        </Link>
      </div>
      <div className='row work-item-container'>
        <div className='col-12 title-container'>
          <h4>Work Items</h4>
          <p>Select work title to edit OR drag and drop buttons to specify order</p>
          <hr />
          <RLDD
            items={workItems}
            itemRenderer={work => {
              return (
                <button className='work-title btn btn-lg' key={work.id}>
                  <Link to={`/edit/${svc}/${client}/${work.key}`}>
                    {work.title +
                      (_isEmpty(work.title) ? '' : ' - ') +
                      work.key}
                  </Link>
                </button>
              )
            }}
            onChange={reorder => {
              setWorkItems(reorder)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminWork
