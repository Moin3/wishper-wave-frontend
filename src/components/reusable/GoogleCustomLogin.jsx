import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { postAPI } from '../../services/api';
import { userAuth } from '../../context/AccountProvider';
import toast from 'react-hot-toast'



const GoogleCustomLogin = () => {
  const {setToken,setUser}=userAuth()
  const navigate = useNavigate()

    const onLoginSuccess=async (res)=>{
      const decodedData=jwtDecode(res.credential)
      const {email,email_verified,given_name,family_name,picture}=decodedData
      try{
        const googleSignInUser=await postAPI('/google_login',{email,email_verified,given_name,family_name,picture})
        const response=googleSignInUser.data
  
        if(response.success){
          toast.success(response.msg)
          navigate('/')
          localStorage.setItem('token',JSON.stringify(response.token))
          localStorage.setItem('user',JSON.stringify(response.user))
          setToken(response.token)
          setUser(response.user)
        }
      }catch(err){
        toast.error(err.response.data.msg)
      }
      
    }

    const onLoginError=(res)=>{
      console.log('Login Failed',res)
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