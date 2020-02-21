import React, { useEffect, useContext } from 'react'
import _isEmpty from 'lodash/isEmpty'
import { FirebaseContext } from '../global/FirebaseContext'
import SocialMediaPage from './SocialMediaPage'
import './Work.scss'

function WorkPage({ location, svc, client }) {
  const { updateWorkContext, workContext } = useContext(FirebaseContext)
  useEffect(() => {
    ;(async () => {
      _isEmpty(workContext[svc] && workContext[svc][client]) &&
        updateWorkContext(svc, client)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svc, client])
  return (
    <div className={'col-12 work-container ' + svc}>
      {workContext[svc] &&
        workContext[svc][client] &&
        Object.keys(workContext[svc][client]).map((key, idx) => {
          let work = workContext[svc][client][key]
          return svc === 'social-media' ? (
            <SocialMediaPage work={work} />
          ) : (
            <div className='row work-item-container'>
              <div className='col-12 title-container'>
                <h5 className='work-title'>{work.title}</h5>
              </div>
              <div className='col-12 services'>
                <p>Service: {work.svc}</p>
              </div>
              {work.imgs.map(img => {
                return (
                  <div
                    className={
                      'imgs-container col' + (img.col ? '-' + img.col : '')
                    }
                  >
                    {img.type === 'img' ? (
                      <img
                        alt={img.text}
                        className='work-img'
                        src={img.previewUrl || img.url}
                      />
                    ) : (
                      <video className='work-video' controls>
                        <source
                          src={img.previewUrl || img.url}
                          alt={img.text}
                          type='video/mp4'
                        />
                      </video>
                    )}
                    <p className='img-subtext'>{img.text}</p>
                  </div>
                )
              })}
            </div>
          )
        })}
    </div>
  )
}

export default WorkPage
