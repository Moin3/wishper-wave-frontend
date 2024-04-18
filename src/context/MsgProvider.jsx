import { createContext, useContext, useState } from 'react';

export const MsgContext = createContext(null);

const MsgProvider = ({children}) => {

    const [msgText,setMsgText]=useState('')
    const [msgId,setMsgId]=useState('')
    const [open,setOpen]=useState(false)
    const [messages,setMessages]=useState(null)

    
    return (
        <MsgContext.Provider value={{
            msgText,
            setMsgText,
            msgId,
            setMsgId,
            messages,
            setMessages,
            open,
            setOpen
         }}>
            {children}
        </MsgContext.Provider>
    )
}

export const userMsg=()=>useContext(MsgContext)

export default MsgProvider;