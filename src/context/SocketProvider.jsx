import { createContext, useContext, useState, useEffect } from 'react';
import { userAuth } from './AccountProvider';
import io from 'socket.io-client'

export const SocketContext = createContext();

const SocketProvider = ({children}) => {

    const [socket,setSocket]=useState(null)
    const [onlineUsers,setOnlineUsers]=useState([])
    const{user}=userAuth()

    useEffect(()=>{
        if(user){
            // const socket=io('http://localhost:8000',{
            const socket=io('https://wishper-wave-backend-1.onrender.com',{
                query:{
                    userId:user._id
                }
            });
            setSocket(socket)
            socket.on("getOnlineUsers",(users)=>{
                setOnlineUsers(users)
            })

            return () => socket.close();
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    },[user])


    
    return (
        <SocketContext.Provider value={{
            socket,
            onlineUsers
         }}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket=()=>useContext(SocketContext)

export default SocketProvider;