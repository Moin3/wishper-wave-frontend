import { createContext, useContext, useState } from 'react';

export const MsgContext = createContext(null);

const MsgProvider = ({children}) => {

    const [msgText,setMsgText]=useState('')
    const [msgId,setMsgId]=useState('')
    
    return (
        <MsgContext.Provider value={{
            msgText,
            setMsgText,
            msgId,
            setMsgId
         }}>
            {children}
        </MsgContext.Provider>
    )
}

export const userMsg=()=>useContext(MsgContext)

export default MsgProvider;