import React,{useContext} from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { AccountContext } from '../../context/AccountProvider';
import { useNavigate } from "react-router-dom";



const GoogleCustomLogin = () => {
  const { setAccount } = useContext(AccountContext);
  const navigate = useNavigate()

    const onLoginSuccess=(res)=>{
      const decodedData=jwtDecode(res.credential)
      setAccount(decodedData)
      if(decodedData){
          navigate('/')
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