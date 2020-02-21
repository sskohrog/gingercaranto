import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import _cloneDeep from 'lodash/cloneDeep'
import { navigate } from '@reach/router'

const FirebaseContext = React.createContext(null)

function FirebaseProvider({ children }) {
  const [firebaseContext, setFirebaseContext] = useState(null)
  const [workContext, setWorkContext] = useState({
    'creative-producer': {
      alta: {},
      apple: {},
      darnell: {},
      ks: {},
      stussy: {},
      vans: {}
    },
    'graphic-design': {
      apple: {}
    },
    photo: {
      andi: {},
      ks: {}
    },
    'social-media': {
      element: {},
      vans: {}
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

          work[collection] = { [doc]: item.data() }
          setWorkContext(work)
          return work
        }))
    )
  }

  const uploadImages = async (work, svc, project) => {
    await Promise.all(
      work.imgs.map(async (img, idx) => {
        if (img.url !== '') {
          work.imgs[idx].previewUrl = ''
          work.imgs[idx].file = {}
          return
        }
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
  }

  const saveWork = async (work, svc, client, project) => {
    setIsLoading(true)
    let updatedWork = _cloneDeep(work)
    let cloneWork = _cloneDeep(workContext)
    cloneWork[svc][client][updatedWork.key] = updatedWork

    await uploadImages(updatedWork, svc, client)
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
    setIsLoading(false)
  }

  return (
    <FirebaseContext.Provider
      value={{
        firebaseContext,
        workContext,
        updateWorkContext,
        saveWork,
        isLoading
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

export { FirebaseContext, FirebaseProvider }
