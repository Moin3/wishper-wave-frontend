import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './route/router'
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from './context/AccountProvider'
import { Toaster } from 'react-hot-toast';
import UserProvider from './context/UserProvider'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AccountProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </AccountProvider>
    </GoogleOAuthProvider>;
    <Toaster />
  </React.StrictMode>,
)
