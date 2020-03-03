import React, { useState, useContext, useEffect } from 'react'
import HyperModal from 'react-hyper-modal'
import _cloneDeep from 'lodash/cloneDeep'
import { navigate } from '@reach/router'
import { FirebaseContext } from '../global/FirebaseContext'
import Loader from '../global/Loader'
import './Admin.scss'

function EditWork({ svc, client, project }) {
  const { saveWork, deleteWork, updateWorkContext, isLoading } = useContext(
    FirebaseContext
  )
  const [gingerWork, setGingerWork] = useState()
  const [openDeleteModal, setDeleteModal] = useState(false)

  useEffect(() => {
    ;(async () => {
      project === 'new'
        ? setGingerWork({
            title: '',
            svc: '',
            imgs: []
          })
        : await updateFromCache()
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svc, client, project])

  const updateFromCache = async () => {
    const ginger = await updateWorkContext(svc, client)
    setGingerWork(ginger[svc][client][project])
  }

  const updateTitle = event => {
    let cloneWork = _cloneDeep(gingerWork)
    cloneWork.title = event.target.value
    setGingerWork(cloneWork)
  }
  const updateSvc = event => {
    let cloneWork = _cloneDeep(gingerWork)
    cloneWork.svc = event.target.value
    setGingerWork(cloneWork)
  }
  const toggleCarousel = () => {
    let cloneWork = _cloneDeep(gingerWork)
    cloneWork.carousel = !cloneWork.carousel
    setGingerWork(cloneWork)
  }
  const updateImgText = (event, idx) => {
    let cloneWork = _cloneDeep(gingerWork)
    cloneWork.imgs[idx].text = event.target.value
    setGingerWork(cloneWork)
  }
  const updateCol = (event, idx) => {
    let cloneWork = _cloneDeep(gingerWork)
    cloneWork.imgs[idx].col = event.target.value
    setGingerWork(cloneWork)
  }

  const removeFromImgArray = (img, idx) => {
    let cloneWork = _cloneDeep(gingerWork)
    cloneWork.imgs = cloneWork.imgs.filter((img2, idx2) => idx !== idx2)
    setGingerWork(cloneWork)
  }

  const newMediaObject = () => {
    let cloneWork = _cloneDeep(gingerWork)
    cloneWork.imgs.push({
      type: '',
      col: '',
      text: '',
      url: '',
      previewUrl: '',
      file: {}
    })
    setGingerWork(cloneWork)
  }

  const editWorkDetails = (type, event, idx) => {
    let cloneWork = _cloneDeep(gingerWork)
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
    setGingerWork(cloneWork)
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
          <div className='col-12 back-container'>
            <h6
              className='back-btn'
              onClick={() => navigate(`/edit/${svc}/${client}`)}
            >
              {`< BACK`}
            </h6>
            <button
              type='button'
              className='btn btn-md'
              onClick={() => setDeleteModal(true)}
            >
              DELETE WORK
            </button>
          </div>
          <div className='col-12 title-container'>
            <p className='work-title form-group'>
              <label>Title: </label>
              <input
                type='text'
                className='form-control'
                id='work-title'
                aria-describedby='workTitle'
                placeholder='TITLE'
                value={(gingerWork || {}).title}
                onChange={updateTitle}
              />
            </p>
          </div>
          <div className='col-12 services'>
            <p className='form-group'>
              <label>Service: </label>
              <input
                type='text'
                className='form-control'
                id='work-svc'
                aria-describedby='workService'
                placeholder='SERVICE'
                value={(gingerWork || {}).svc}
                onChange={updateSvc}
              />
            </p>
          </div>
          <div className='col-12 key-work'>
            <p className='form-group'>
              <label>Key (required): </label>
              <input
                type='text'
                className='form-control'
                id='key-name'
                disabled={project !== 'new'}
                aria-describedby='keyName'
                placeholder='KEY NAME'
                value={(gingerWork || {}).key}
                onChange={e => editWorkDetails('key', e)}
              />
            </p>
          </div>
          <div className='col-12 new-imgs-btn-container'>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                defaultChecked={(gingerWork || {}).carousel}
                id='carousel-check'
                onClick={toggleCarousel}
              />
              <label className='form-check-label' for='carousel-check'>
                Carousel Item?
              </label>
            </div>
            <button
              type='button'
              className='btn btn-lg'
              onClick={newMediaObject}
            >
              NEW IMG/VIDEO
            </button>
          </div>
          {((gingerWork || {}).imgs || []).map((img, idx) => {
            return (
              <div
                key={idx}
                className={
                  'imgs-container col' +
                  (gingerWork.col ? ' ' + gingerWork.col : '')
                }
              >
                <button
                  type='button'
                  className='close'
                  aria-label='Close'
                  onClick={() => removeFromImgArray(img, idx)}
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
                {img.type === 'img' ? (
                  <img
                    alt={img.text}
                    className='work-img'
                    src={img.previewUrl || img.url}
                  />
                ) : (
                  <video className='work-img'>
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
                    className='form-control'
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
                    className='form-control'
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
              onClick={() => saveWork(gingerWork || {}, svc, client, project)}
            >
              SAVE WORK
            </button>
          </div>
        </div>
      )}
      <HyperModal
        isOpen={openDeleteModal}
        requestClose={() => setDeleteModal(false)}
      >
        <div className='container delete-modal'>
          <div className='row justify-content-center'>
            <div className='col-7 title'>
              <h5 className='delete-title'>
                ARE YOU SURE YOU WANT TO DELETE ?
              </h5>
              <p className={'delete-btn-container mt-4'}>
                <button
                  type='button'
                  className='btn btn-md yes-btn'
                  onClick={() => {
                    deleteWork(gingerWork || {}, svc, client)
                    setDeleteModal(false)
                  }}
                >
                  YES
                </button>
                <button
                  type='button'
                  className='btn btn-md no-btn'
                  onClick={() => {
                    setDeleteModal(false)
                  }}
                >
                  NO
                </button>
              </p>
            </div>
          </div>
        </div>
      </HyperModal>
    </div>
  )
}

export default EditWork
