import React from 'react'
import { GoogleLogin } from '@react-oauth/google';


const GoogleCustomLogin = () => {
    const onLoginSuccess=()=>{

    }

    const onLoginError=()=>{
        
    }


  return (
    <GoogleLogin
        onSuccess={onLoginSuccess}
        onError={onLoginError}
        size='medium'
        width='250px'
    />
  )
}

export default GoogleCustomLogin