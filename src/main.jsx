import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './route/router'
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from './context/AccountProvider'
import { Toaster } from 'react-hot-toast';
import UserProvider from './context/UserProvider'
import MsgProvider from './context/MsgProvider'
import SocketProvider from './context/SocketProvider'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> */}
    <GoogleOAuthProvider clientId='356324940055-2fipp94p0ud6a5d34jk4fatd9117v3vj.apps.googleusercontent.com'>
      <MsgProvider>
        <AccountProvider>
          <UserProvider>
            <SocketProvider>
              <RouterProvider router={router} />
            </SocketProvider>
          </UserProvider>
        </AccountProvider>
      </MsgProvider>
    </GoogleOAuthProvider>;
    <Toaster />
  </React.StrictMode>,
)
