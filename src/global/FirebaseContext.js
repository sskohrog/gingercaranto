import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import _cloneDeep from 'lodash/cloneDeep'
import { navigate } from '@reach/router'

const FirebaseContext = React.createContext(null)

function FirebaseProvider({ children }) {
  const [firebaseContext, setFirebaseContext] = useState(null)
  const [workContext, setWorkContext] = useState({})
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

  const updateWorkContext = (collection, doc) => {
    firebaseContext &&
      firebaseContext
        .firestore()
        .collection(collection)
        .doc(doc)
        .get()
        .then(item => {
          let work = _cloneDeep(workContext)

          work[collection] = { [doc]: item.data() }
          setWorkContext(work)
        })
  }

  const uploadImages = async (work, svc, project) => {
    await Promise.all(
      work.imgs.map(async (img, idx) => {
        await firebaseContext
          .storage()
          .ref(`${svc}/${project}/${img.file.name}`)
          .put(img.file)
          .then(async snapshot => {
            await firebaseContext
              .storage()
              .ref(`${svc}/${project}`)
              .child(img.file.name)
              .getDownloadURL()
              .then(url => {
                work.imgs[idx].url = url
                work.imgs[idx].previewUrl = ''
                work.imgs[idx].file = {}
              })
          })
      })
    )

    // await Promise.all(
    //   work.imgs.map(async (img, idx) => {
    //     let imgURL = await new Promise(
    //       firebaseContext
    //         .storage()
    //         .ref(`${svc}/${project}`)
    //         .child(img.file.name)
    //         .getDownloadURL()
    //     )
    //     debugger
    //     work.imgs[idx].url = imgURL
    //     work.imgs[idx].previewUrl = ''
    //     work.imgs[idx].file = {}
    //   })
    // )
  }

  const saveNewWork = async (newWork, svc, project) => {
    setIsLoading(true)
    let cloneNewWork = _cloneDeep(newWork)
    await uploadImages(cloneNewWork, svc, project)
    await firebaseContext
      .firestore()
      .collection(svc)
      .doc(project)
      .set({ [cloneNewWork.key]: cloneNewWork })
    navigate(`/edit/${svc}/${project}`)
    setIsLoading(false)
  }

  return (
    <FirebaseContext.Provider
      value={{
        firebaseContext,
        workContext,
        updateWorkContext,
        saveNewWork,
        isLoading
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

export { FirebaseContext, FirebaseProvider }
