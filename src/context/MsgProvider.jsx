import { createContext, useContext, useState } from 'react';

export const MsgContext = createContext(null);

const MsgProvider = ({children}) => {

    const [msgText,setMsgText]=useState('')
    // const [file,setFile]=useState()
    // const [image,setImage]=useState('')
    const [mainImgUrl,setMainImgUrl]=useState() 
    
    return (
        <MsgContext.Provider value={{
            msgText,
            setMsgText,
            mainImgUrl,
            setMainImgUrl
            // file,
            // setFile,
            // image,
            // setImage
         }}>
            {children}
        </MsgContext.Provider>
    )
}

export const userMsg=()=>useContext(MsgContext)

export default MsgProvider;