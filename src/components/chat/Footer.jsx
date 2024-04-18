import { EmojiEmotions, AttachFile, Mic } from '@mui/icons-material';
import { Box, styled, InputBase } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import { userMsg } from '../../context/MsgProvider';
import { userAuth } from '../../context/AccountProvider';
import { userInfo } from '../../context/UserProvider';
import { postAPI } from '../../services/api';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useSocket } from '../../context/SocketProvider';
import Spinner from '../reusable/Spinner';

const Container = styled(Box)`
    height: 55px;
    background: #c5d3de;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    &  > * {
        margin: 5px;
        color: #5d809c;
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
    border: none;
    outline: none;
`;

const ClipIcon = styled(AttachFile)`
    transform: rotate(40deg);
    margin-top: 5px;
    cursor: pointer;
`;

const Footer = ({ conversationId }) => {
    const { msgText, setMsgText, setMsgId, setMessages,setOpen} = userMsg();
    const { user } = userAuth();
    const { person } = userInfo();
    const { socket } = useSocket();
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [fileText, setFileText] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        socket?.on("getMessage", data => {
            setMessages({
                ...data,
                createdAt: Date.now()
            });
        });
    }, []);

    const handleMsgSend = async () => {
        setMsgText('');
        try {
            let message = {};
            if (!file) {
                message = {
                    senderId: user._id,
                    recieverId: person._id,
                    conversationId: conversationId,
                    type: 'text',
                    text: msgText
                };
            } else {
                message = {
                    senderId: user._id,
                    recieverId: person._id,
                    conversationId: conversationId,
                    type: 'file',
                    text: image
                };
            }

            // socket msg send to backend
            socket.emit('sendMessage', message);

            const response = await postAPI('/message/add', message);
            const isolatedMsg = response.data;
            setMsgId(isolatedMsg.newMessage._id);
            toast.success(isolatedMsg.msg);
        } catch (err) {
            toast.error(err.message);
        }

        // setMsgText('');
        setImage(null);
        setFile(null);
    };

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileText(e.target.files[0].name);
        setLoading(true); // Set loading to true when file is being uploaded
    };

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const datas = new FormData();
                datas.append("file", file);

                try {
                    const response = await postAPI('/file/upload', datas);
                    if(response.data.imageUrl){
                        setMsgText(fileText)
                    }
                    setImage(response.data.imageUrl);
                } catch (err) {
                    toast.error(err.message);
                } finally {
                    setLoading(false); // Set loading to false after file upload is completed
                }
            }
        };
        getImage();
    }, [file]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey && msgText.trim() !== '' && image !== '') {
            event.preventDefault(); 
            handleMsgSend(); 
        }
    };

    return (
        <Container>
            <IconButton sx={{ cursor: 'pointer' }} color="#5d809c" onClick={()=>setOpen(prev => !prev)}>
                <EmojiEmotions />
            </IconButton>
            <IconButton sx={{ cursor: 'pointer' }} color="#5d809c" >
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
                    onChange={(e) => setMsgText(e.target.value)}
                    onKeyDown={handleKeyDown} 
                    value={msgText}
                />
            </Search>
            <IconButton
                sx={{ cursor: 'pointer' }}
                onClick={handleMsgSend}
                color="#5d809c"
                disabled={!msgText || loading} // Disable button when no message or loading
            >
                {loading ? <Spinner /> : <SendIcon />}
            </IconButton>
        </Container>
    );
};

export default Footer;
