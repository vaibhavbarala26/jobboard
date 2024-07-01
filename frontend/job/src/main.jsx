import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/AuthUserContext.jsx'
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)
ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
     <AuthProvider>
    <BrowserRouter>
   
    <App />
    
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
