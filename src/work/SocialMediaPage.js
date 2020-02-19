import React from 'react'

function SocialMediaPage({ work = {} }) {
  return (
    <div className='row social-media-container'>
      <div className='col-12 title-container'>
        <h4>{work.title}</h4>
      </div>
      <div className='col-4 info-container'>
        <p>{work.text}</p>
      </div>
      <div className='col-8 img-container'>
        <div className='row'>
          {work.imgs.map(img => {
            return (
              <div className='sm-imgs-container col-6'>
                <img className='work-img' id={img.url} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SocialMediaPage
