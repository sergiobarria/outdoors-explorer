import React from 'react'
import ReactDOM from 'react-dom/client'

import 'react-toastify/dist/ReactToastify.css'
import '@fontsource/poppins'
import './styles/main.css'

import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
