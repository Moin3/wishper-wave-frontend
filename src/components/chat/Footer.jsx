import { EmojiEmotions, AttachFile, Mic } from '@mui/icons-material';
import { Box, styled, InputBase } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import { userMsg } from '../../context/MsgProvider';
import { userAuth } from '../../context/AccountProvider';
import { userInfo } from '../../context/UserProvider';
import { postAPI } from '../../services/api';
import {toast} from 'react-hot-toast'
import { useEffect, useState } from 'react';
import { useSocket } from '../../context/SocketProvider';



const Container = styled(Box)`
    height: 55px;
    background: #ededed;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    &  > * {
        margin: 5px;
        color: #919191;
    }
`;

const Search = styled(Box)`
    border-radius: 18px;
    background-color: #FFFFFF;
    width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 20px;
    padding-left: 25px;
    font-size: 14px;
    height: 20px;
    width: 100%;
`;

const ClipIcon = styled(AttachFile)`
    transform: rotate(40deg);
    margin-top:5px;
    cursor:pointer;
`;


const Footer = ({conversationId}) => {
    const {msgText,setMsgText,setMsgId,setMessages}=userMsg()
    const {user}=userAuth()
    const {person}=userInfo()
    const {socket }=useSocket()
     const [file,setFile]=useState(null)
    const [image,setImage]=useState('')
    

    useEffect(()=>{
        socket?.on("getMessage",data=>{
            setMessages({
                ...data,
                createdAt:Date.now()
            })
        })
    })



    const handleMsgSend=async ()=>{
        try{
            let message={}
            if(!file){
                message={
                senderId:user._id,
                recieverId:person._id,
                conversationId:conversationId,
                type:'text',
                text:msgText
            }
            }
            else{
                message={
                senderId:user._id,
                recieverId:person._id,
                conversationId:conversationId,
                type:'file',
                text:image
            }
        }

        // socket msg send to backend
        socket.emit('sendMessage', message);


        const response=await postAPI('/message/add',message)
        const isolatedMsg=response.data
        setMsgId(isolatedMsg.newMessage._id)
        toast.success(isolatedMsg.msg)
        }catch(err){
            toast.error(err.message)
        }

        setMsgText('')
        setImage('')
        setFile(null)
    }




    const onFileChange = (e) => {
        setFile(e.target.files[0]);
        setMsgText(e.target.files[0].name);
    }


    useEffect(() => {
        const getImage = async () => {
                if (file) {
                    const datas = new FormData();
                    datas.append("file", file);
                    
                    try{
                        const response = await postAPI('/file/upload',datas)
                        setImage(response.data.imageUrl)
                    }catch(err){
                        toast.error(err.message)
                    }
                }
        }
        getImage()
    }, [file])



    return (
        
        <Container>
            <IconButton sx={{cursor:'pointer'}} color="secondary">
                <EmojiEmotions />
            </IconButton>
            <IconButton sx={{cursor:'pointer'}} color="secondary">
                <label htmlFor="fileInput">
                    <ClipIcon />
                </label>
            </IconButton> 
            <input
                type='file'
                id="fileInput"
                style={{ display: 'none' }}
                onChange={(e) => onFileChange(e)}
            />

            <Search>
                <InputField
                    placeholder="Type a message"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e)=>setMsgText(e.target.value)}
                    value={msgText}
                />
            </Search>
            {
                msgText ? 
                (<IconButton sx={{cursor:'pointer'}} onClick={handleMsgSend} color="secondary">
                    <SendIcon />
                </IconButton>)
                 : 
                ( <IconButton sx={{cursor:'pointer'}} color="secondary">
                    <Mic />
                </IconButton>)
                 
            }
            
        </Container>
    )
}

export default Footer;