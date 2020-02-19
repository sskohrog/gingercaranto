import React, { useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../global/FirebaseContext'
import Loader from '../global/Loader'
import './Admin.scss'
import _cloneDeep from 'lodash/cloneDeep'

function EditWork({ location, svc, client, project }) {
  const { saveNewWork, isLoading } = useContext(FirebaseContext)
  const [newWork, setNewWork] = useState({
    title: '',
    svc: '',
    imgs: [
      // {
      //   type: 'img',
      //   col: '',
      //   text: 'teest'
      // },{
      //   type: 'img',
      //   col: '',
      //   text: 'teest'
      // }
    ]
  })

  // useEffect(() => {
  //   ;(async () => {

  //   })()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [svc, client])

  const updateTitle = event => {
    let cloneWork = _cloneDeep(newWork)
    cloneWork.title = event.target.value
    setNewWork(cloneWork)
  }
  const updateSvc = event => {
    let cloneWork = _cloneDeep(newWork)
    cloneWork.svc = event.target.value
    setNewWork(cloneWork)
  }
  const updateImgText = (event, idx) => {
    let cloneWork = _cloneDeep(newWork)
    cloneWork.imgs[idx].text = event.target.value
    setNewWork(cloneWork)
  }
  const updateCol = (event, idx) => {
    let cloneWork = _cloneDeep(newWork)
    cloneWork.imgs[idx].col = event.target.value
    setNewWork(cloneWork)
  }

  const newMediaObject = () => {
    let cloneWork = _cloneDeep(newWork)
    cloneWork.imgs.push({
      type: '',
      col: '',
      text: '',
      url: '',
      previewUrl: '',
      file: {}
    })
    setNewWork(cloneWork)
  }
  const editWorkDetails = (type, event, idx) => {
    let cloneWork = _cloneDeep(newWork)
    switch (type) {
      case 'upload':
        if (event.target.files.length === 0) {
          cloneWork.imgs[idx].previewUrl = ''
          cloneWork.imgs[idx].file = {}
          break
        }
        cloneWork.imgs[idx].file = event.target.files[0]
        cloneWork.imgs[idx].previewUrl = URL.createObjectURL(
          event.target.files[0]
        )
        event.target.files[0].type.includes('image')
          ? (cloneWork.imgs[idx].type = 'img')
          : (cloneWork.imgs[idx].type = 'vid')

        break
      case 'key':
        cloneWork.key = event.target.value
        break
      default:
        break
    }
    setNewWork(cloneWork)
  }

  return (
    <div
      className={`col-12 new-work-container ${svc}${
        isLoading ? ' loading' : ''
      }`}
    >
      {isLoading ? (
        <Loader svc={svc} />
      ) : (
        <div className='row work-item-container'>
          <div className='col-12 title-container'>
            <p className='work-title form-group'>
              <label for='work-title'>Title: </label>
              <input
                type='text'
                class='form-control'
                id='work-title'
                aria-describedby='workTitle'
                placeholder='TITLE'
                value={newWork.title}
                onChange={updateTitle}
              />
            </p>
          </div>
          <div className='col-12 services'>
            <p className='form-group'>
              <label for='work-svc'>Service: </label>
              <input
                type='text'
                class='form-control'
                id='work-svc'
                aria-describedby='workService'
                placeholder='SERVICE'
                value={newWork.svc}
                onChange={updateSvc}
              />
            </p>
          </div>
          <div className='col-12 key-work'>
            <p className='form-group'>
              <label for='key-name'>Key: </label>
              <input
                type='text'
                class='form-control'
                id='key-name'
                aria-describedby='keyName'
                placeholder='KEY NAME'
                value={newWork.key}
                onChange={e => editWorkDetails('key', e)}
              />
            </p>
          </div>
          <div className='col-12 new-imgs-btn-container'>
            <button
              type='button'
              className='btn btn-lg'
              onClick={newMediaObject}
            >
              NEW IMG/VIDEO
            </button>
          </div>
          {newWork.imgs.map((img, idx) => {
            return (
              <div
                className={
                  'imgs-container col' + (newWork.col ? ' ' + newWork.col : '')
                }
              >
                <button type='button' className='close' aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
                {img.type === 'img' ? (
                  <img
                    alt={img.text}
                    className='work-img'
                    src={img.previewUrl || img.url}
                  />
                ) : (
                  <video>
                    <source
                      src={img.previewUrl || img.url}
                      alt={img.text}
                      type='video/mp4'
                    />
                  </video>
                )}
                <div className='uploads'>
                  <input
                    type='file'
                    onChange={event => editWorkDetails('upload', event, idx)}
                  />
                </div>
                <p className='form-group'>
                  Alt Text:
                  <input
                    type='text'
                    class='form-control'
                    id='alt-text-img'
                    aria-describedby='altTextImage'
                    placeholder='ALT TEXT FOR IMAGE'
                    value={img.text}
                    onChange={e => updateImgText(e, idx)}
                  />
                </p>
                <p className='form-group'>
                  Img Size:
                  <input
                    type='text'
                    class='form-control'
                    id='col-img'
                    aria-describedby='imageSize'
                    placeholder='IMG SIZE'
                    value={img.col}
                    onChange={e => updateCol(e, idx)}
                  />
                </p>
              </div>
            )
          })}
          <div className='col-12 save-container'>
            <button
              type='button'
              className='btn btn-lg save-btn'
              onClick={() => saveNewWork(newWork, svc, client)}
            >
              SAVE WORK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditWork
