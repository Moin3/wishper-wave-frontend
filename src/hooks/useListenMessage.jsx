import {useEffect} from 'react';
import { useSocket } from '../context/SocketProvider';
import { userMsg } from '../context/MsgProvider';




const useListenMessage = () => {
    const {socket}=useSocket()
    const {messages,setMessages}=userMsg()
    // console.log(messages)

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            console.log(newMessage);
            setMessages([...messages, newMessage]);
        });
    
        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages]);
    

}

export default useListenMessage;