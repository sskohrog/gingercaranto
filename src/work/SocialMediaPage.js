import React from 'react'
import './Work.scss'

function SocialMediaPage({ work = {} }) {
  return (
    <div className='row social-media-container work-item-container'>
      <div className='col-12 title-container'>
        <h4 className='work-title'>{work.title}</h4>
      </div>
      <div className='col-md-4 col-12 svc-container'>
        <p>{work.svc}</p>
      </div>
      <div className='col-md-8 col-12 img-container'>
        <div className='row'>
          {work.imgs.map(img => {
            return (
              <div className='sm-imgs-container col-6'>
                <img className='sm-img' src={img.url} alt='work images' />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SocialMediaPage
