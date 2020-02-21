import React from 'react'
import ReactLoader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

function Loader({ svc = '', height = 90, width = 90 }) {
  const serviceColor = () => {
    switch (svc) {
      case 'graphic-design':
        return '#fa8aa9'
      case 'social-media':
        return '#f6d40e'
      case 'creative-producer':
        return '#0253dd'
      case 'photo':
        return '#14af75'
      default:
        return '#ea3d30'
    }
  }
  return (
    <ReactLoader type='Bars' color={serviceColor()} height={height} width={width} />
  )
}

export default Loader
