import * as React from 'react';
import {useState} from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Footer from './Footer';
import {toast} from 'react-hot-toast'
import { getAPI, postAPI } from '../../services/api';
import { userInfo } from '../../context/UserProvider';
import { userAuth } from '../../context/AccountProvider';
import Message from './Message';



 
const drawerWidth = 240;

const ChatBox = () => {
    const [conversationId,setConversationId]=useState()
    const [singleIsolatedMsg,setSingleIsolatedMsg]=useState([])
    const {person}=userInfo()
    const {user}=userAuth()



    React.useEffect(()=>{
        const getConvertionDetails=async ()=>{
            try{
                let response=await postAPI('/conversation/get',{senderId:user._id,receiverId:person._id})
                let conversationData=response.data
                if(conversationData){
                    setConversationId(conversationData._id)
                }else{
                    toast.success('First time you open this conversation')  
                }
                
            }catch(err){
                toast.error(err.message)
            }
        }
        getConvertionDetails()
    },[person?._id])


    React.useEffect(()=>{
        const getIsolatedConvertion=async ()=>{
            try{
                let response=await getAPI(`/message/get/${conversationId}`)
                let isolatedConvertion=response.data
                setSingleIsolatedMsg(isolatedConvertion)
            }catch(err){
                toast.error(err.message)
            }
        }
        getIsolatedConvertion()
    },[conversationId,person?._id])

  return (
    <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }}}
      >
        <Toolbar />
        <Box>
            {singleIsolatedMsg?.map((msg)=>(
                <Box key={msg._id} sx={{px:2,py:1}}>
                    <Message message={msg}/>
                </Box>
            ))}
        </Box>
        <Toolbar />
        <Box sx={{width: {xs:'100%', sm: `calc(100% - ${drawerWidth}px)` },position:'fixed',bottom:0,right:0}}>
            <Footer conversationId={conversationId}/>
        </Box>
    </Box>
  )
}

export default ChatBox