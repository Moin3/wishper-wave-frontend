import { createContext, useContext, useState, useEffect } from 'react';
import { userAuth } from './AccountProvider';
import io from 'socket.io-client'
// import { userMsg } from './MsgProvider';

export const SocketContext = createContext();

const SocketProvider = ({children}) => {

    const [socket,setSocket]=useState(null)
    const [onlineUsers,setOnlineUsers]=useState([])
    const{user}=userAuth()
    // const {messages,setMessages,msgId}=userMsg()

    useEffect(()=>{
        if(user){
            const socket=io('http://localhost:8000',{
                query:{
                    userId:user._id
                }
            });
            setSocket(socket)
            socket.on("getOnlineUsers",(users)=>{
                // console.log(users)
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

    // useEffect(() => {
    //     socket?.currnet.on("newMessage", (newMessage) => {
    //         console.log(newMessage);
    //         setMessages([...messages, newMessage]);
    //     });
    
    //     return () => socket?.off("newMessage");
    // }, [socket, setMessages, messages,msgId]);

    
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