import React from 'react'
import ReactDOM from 'react-dom'
import 'index.css'
import App from 'App'
import Modal from 'react-modal'
import { IAnypayService } from 'services/Anypay'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 0,
    borderRadius: '0.5rem',
  },
  overlay: {
    backgroundColor: '#33333380',
  }
}

const AnypaySDK = ({ config } : IAnypayService) => {
  ReactDOM.render(
    <React.StrictMode>
      <Modal isOpen style={customStyles}>
        <App config={config} />
      </Modal>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

// @ts-ignore
window.AnypaySDK = AnypaySDK
