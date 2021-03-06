/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import _cloneDeep from 'lodash/cloneDeep'
import _isNil from 'lodash/isNil'
import { navigate } from '@reach/router'
import { v4 as uuid } from 'uuid'

const FirebaseContext = React.createContext(null)

function FirebaseProvider({ children }) {
  const [firebaseContext, setFirebaseContext] = useState(null)
  const [applePW, setApplePW] = useState({ password: '', svc: '' })
  const [passwordCorrect, setPWCorrect] = useState(true)
  const [infoContent, setInfoContent] = useState([])
  const [socialContent, setSocialContent] = useState(null)
  const [workContext, setWorkContext] = useState({
    'graphic-design': {
      alta: {},
      apple: {},
      darnell: {},
      ks: {},
      stussy: {},
      vans: {}
    },
    'social-media': {
      element: {},
      vans: {}
    },
    'creative-producer': {
      apple: {},
      vans: {}
    },
    photo: {
      andi: {},
      ks: {}
    }
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      // Initialize Firebase
      setFirebaseContext(
        await firebase.initializeApp({
          apiKey: process.env.REACT_APP_API_KEY,
          authDomain: process.env.REACT_APP_AUTH_DOMAIN,
          databaseURL: process.env.REACT_APP_DATABASE_URL,
          projectId: process.env.REACT_APP_PROJECT_ID,
          storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
          messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
          appId: process.env.REACT_APP_ID,
          measurementId: process.env.REACT_APP_MEASUREMENT_ID
        })
      )
    })()
  }, [])

  useEffect(() => {
    if (applePW.password === '') {
      return
    } else if (
      applePW.password.toLowerCase() === process.env.REACT_APP_APPLE_PW
    ) {
      setPWCorrect(true)
      navigate(`/work/${applePW.svc}/apple`)
      setApplePW({ password: '', svc: '' })
    } else {
      setPWCorrect(false)
    }
  }, [applePW])

  const updateWorkContext = async (collection, doc) => {
    return (
      firebaseContext &&
      (await firebaseContext
        .firestore()
        .collection(collection)
        .doc(doc)
        .get()
        .then(item => {
          let work = _cloneDeep(workContext)

          work[collection] = { ...work[collection], [doc]: item.data() }
          setWorkContext(work)
          return work
        }))
    )
  }

  const uploadImages = async (work, svc, project) => {
    await Promise.all(
      work.imgs.map(async (img, idx) => {
        if (img.url !== '' || _isNil(work.imgs[idx].file)) {
          work.imgs[idx].previewUrl = ''
          work.imgs[idx].file = {}
          return
        }
        let imageName = uuid()
        await firebaseContext
          .storage()
          .ref(`${svc}/${project}/${imageName}`)
          .put(img.file)
          .then(async snapshot => {
            await firebaseContext
              .storage()
              .ref(`${svc}/${project}`)
              .child(imageName)
              .getDownloadURL()
              .then(url => {
                work.imgs[idx].url = url
                work.imgs[idx].previewUrl = ''
                work.imgs[idx].file = {}
              })
          })
      })
    )
  }

  const updatePosition = async (work, svc, client) => {
    setIsLoading(true)
    try {
      await firebaseContext
        .firestore()
        .collection(svc)
        .doc(client)
        .set(work)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  const saveWork = async (work, svc, client, project) => {
    setIsLoading(true)
    let updatedWork = _cloneDeep(work)
    let cloneWork = _cloneDeep(workContext)
    if (!updatedWork.id) {
      updatedWork.id = Object.keys(cloneWork[svc][client]).length + 1
    }
    cloneWork[svc][client][updatedWork.key] = updatedWork

    project !== 'position' && (await uploadImages(updatedWork, svc, client))

    try {
      project === 'new'
        ? await firebaseContext
            .firestore()
            .collection(svc)
            .doc(client)
            .set(cloneWork[svc][client])
        : await firebaseContext
            .firestore()
            .collection(svc)
            .doc(client)
            .update(cloneWork[svc][client])
    } catch (err) {
      console.log(err)
    }
    navigate(`/edit/${svc}/${client}`)
    updateWorkContext(svc, client)
    setIsLoading(false)
  }

  const deleteWork = async (work, svc, client) => {
    setIsLoading(true)
    let cloneWork = _cloneDeep(workContext)
    delete cloneWork[svc][client][work.key]

    try {
      await firebaseContext
        .firestore()
        .collection(svc)
        .doc(client)
        .set(cloneWork[svc][client])
    } catch (err) {
      console.log(err)
    }
    navigate(`/edit/${svc}/${client}`)
    updateWorkContext(svc, client)
    setIsLoading(false)
  }

  const getInfo = async () => {
    return (
      firebaseContext &&
      (await firebaseContext
        .firestore()
        .collection('info')
        .doc('about')
        .get()
        .then(item => {
          let info = item.data().data
          setInfoContent(info)
          return info
        }))
    )
  }

  const saveInfo = async () => {
    setIsLoading(true)
    try {
      await firebaseContext
        .firestore()
        .collection('info')
        .doc('about')
        .update({ data: infoContent })
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  const getSocial = async () => {
    return (
      firebaseContext &&
      (await firebaseContext
        .firestore()
        .collection('info')
        .doc('social-media')
        .get()
        .then(item => {
          let info = item.data()
          setSocialContent(info)
          return info
        }))
    )
  }

  const saveSocial = async () => {
    setIsLoading(true)
    try {
      await firebaseContext
        .firestore()
        .collection('info')
        .doc('social-media')
        .update(socialContent)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  return (
    <FirebaseContext.Provider
      value={{
        firebaseContext,
        workContext,
        updateWorkContext,
        updatePosition,
        saveWork,
        deleteWork,
        applePW,
        setApplePW,
        passwordCorrect,
        infoContent,
        getInfo,
        setInfoContent,
        saveInfo,
        socialContent,
        getSocial,
        setSocialContent,
        saveSocial,
        isLoading
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

export { FirebaseContext, FirebaseProvider }
