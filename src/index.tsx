import React from 'react'
import ReactDOM from 'react-dom'
import 'index.css'
import App from 'App'
import { IAnypayService } from 'services/Anypay'

const AnypaySDK = ({ config, element = 'root' } : IAnypayService & { element: string }) => {
  ReactDOM.render(
    <React.StrictMode>
      <App config={config} />
    </React.StrictMode>,
    document.getElementById(element)
  )
}

// @ts-ignore
window.AnypaySDK = AnypaySDK
