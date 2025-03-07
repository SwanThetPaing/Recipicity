import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthContextProvider } from './contexts/AuthContext.jsx';
import Routes from './routes/index.jsx';
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  </React.StrictMode>,
)