import { createContext, useContext, useState, useEffect,useRef } from "react";
import toast from 'react-hot-toast'
export const AccountContext=createContext(null);
import {io} from 'socket.io-client'



const AccountProvider = ({children}) => {

    const [token,setToken]=useState(null)
    const [activeUsers,setActiveUsers]=useState([])
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')) || null)
    const [loading,setLoading]=useState(true)
    const socket=useRef()


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

    

    useEffect(()=>{
        socket.current=io("ws://localhost:9000")
        return () => {
          socket.current.disconnect();
      };
    },[user])

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
        Logout,
        socket,
        activeUsers,
        setActiveUsers
    }}>
        {children}
    </AccountContext.Provider>
  )
}

export const userAuth=()=>useContext(AccountContext)

export default AccountProvider