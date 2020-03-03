import React, { useEffect, useContext, useState } from 'react'
import _isEmpty from 'lodash/isEmpty'
import _isNil from 'lodash/isNil'
import ItemsCarousel from 'react-items-carousel'
import { FirebaseContext } from '../global/FirebaseContext'
import SocialMediaPage from './SocialMediaPage'
import './Work.scss'

function WorkPage({ location, svc, client }) {
  const { updateWorkContext, workContext } = useContext(FirebaseContext)
  const [activeItemIndex, setActiveItemIndex] = useState(0)
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
        Object.keys(workContext[svc][client])
          .sort((a, b) =>
            workContext[svc][client][a].id > workContext[svc][client][b].id
              ? 1
              : -1
          )
          .map((key, idx) => {
            let work = workContext[svc][client][key]
            return svc === 'social-media' ? (
              <SocialMediaPage work={work} />
            ) : !_isNil(work) ? (
              <div className='row work-item-container'>
                {work.title && (
                  <div className='col-12 title-container'>
                    <h5 className='work-title'>{work.title}</h5>
                  </div>
                )}
                {work.svc && (
                  <div className='col-12 services'>
                    <p>Service: {work.svc}</p>
                  </div>
                )}
                {work.carousel ? (
                  <ItemsCarousel
                    infiniteLoop
                    requestToChangeActive={setActiveItemIndex}
                    activeItemIndex={activeItemIndex}
                    numberOfCards={window.innerWidth <= 768 ? 1 : 3}
                    gutter={20}
                    leftChevron={<span className='left-btn'>{'<'}</span>}
                    rightChevron={<span className='right-btn'>{'>'}</span>}
                    chevronWidth={40}
                    classes={{
                      wrapper: 'carousel-container',
                      itemsInnerWrapper: 'carousel-wrapper'
                    }}
                  >
                    {work.imgs.map(img => {
                      return (
                        <img
                          alt='carousel item'
                          className='carousel-img'
                          src={img.url}
                        />
                      )
                    })}
                  </ItemsCarousel>
                ) : (
                  work.imgs.map(img => {
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
                            src={img.url}
                          />
                        ) : (
                          <video className='work-video' controls>
                            <source
                              src={img.url}
                              alt={img.text}
                              type='video/mp4'
                            />
                          </video>
                        )}
                        <p className='img-subtext'>{img.text}</p>
                      </div>
                    )
                  })
                )}
              </div>
            ) : null
          })}
    </div>
  )
}

export default WorkPage
