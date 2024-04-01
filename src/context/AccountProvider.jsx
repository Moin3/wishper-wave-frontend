import { createContext, useContext, useState, useEffect } from "react";
import toast from 'react-hot-toast'
export const AccountContext=createContext(null);



const AccountProvider = ({children}) => {
    const [token,setToken]=useState(null)
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')) || null)
    const [loading,setLoading]=useState(true)


    useEffect(()=>{
      const storedToken=JSON.parse(localStorage.getItem('token'))
      setToken(storedToken)
      setLoading(false)
    },[])

    const Logout=()=>{
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setToken(null)
      setUser(null)
      toast.success("Successfully Logout")
    }


    if(loading){
      return null
    }

  return (
    <AccountContext.Provider value={{
        token,
        setToken,
        user,
        setUser,
        loading,
        setLoading,
        Logout
    }}>
        {children}
    </AccountContext.Provider>
  )
}

export const userAuth=()=>useContext(AccountContext)

export default AccountProvider