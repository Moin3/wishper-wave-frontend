import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Footer from './Footer';
import { toast } from 'react-hot-toast';
import { getAPI, postAPI } from '../../services/api';
import { userInfo } from '../../context/UserProvider';
import { userAuth } from '../../context/AccountProvider';
import Message from './Message';
import { userMsg } from '../../context/MsgProvider';


const drawerWidth = 240;

const ChatBox = () => {
    const [conversationId, setConversationId] = useState();
    const [singleIsolatedMsg, setSingleIsolatedMsg] = useState([]);
    const { msgId, messages } = userMsg();
    const { person } = userInfo();
    const { user } = userAuth();
    const messagesEndRef = useRef(null);
    const [conversation, setConversation] = useState({});


    useEffect(() => {
        messages && conversation?.members?.includes(messages.senderId) &&
            setSingleIsolatedMsg((prev) => [...prev, messages]);

    }, [messages, conversation]);


    useEffect(() => {
        const getConversationDetails = async () => {
            try {
                let response = await postAPI('/conversation/get', { senderId: user._id, receiverId: person._id });
                let conversationData = response.data;
                if (conversationData) {
                    setConversationId(conversationData._id);
                    setConversation(conversationData)
                } else {
                    toast.success('First time you open this conversation');
                }

            } catch (err) {
                toast.error(err.message);
            }
        };
        getConversationDetails();
    }, [person?._id]);



    useEffect(() => {
        const getIsolatedConversation = async () => {
            try {
                let response = await getAPI(`/message/get/${conversationId}`);
                let isolatedConversation = response.data;
                setSingleIsolatedMsg(isolatedConversation);
            } catch (err) {
                toast.error(err.message);
            }
        };
        getIsolatedConversation();
    }, [conversationId, person?._id, msgId]);

    // ///////////UseEffect for Scroll/////////////

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [singleIsolatedMsg]);

    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
            <Toolbar />
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {singleIsolatedMsg.length === 0 ? (
                    <Box sx={{my:'30%', px: 2, py: 1,display:'flex',justifyContent:'center',color:"#577799",fontWeight:'bold',fontFamily: "Quicksand" }}>Start your first conversation</Box>
                ) : (
                    singleIsolatedMsg.map((msg) => (
                        <Box ref={messagesEndRef} key={msg._id} sx={{ px: 2, py: 1 }}>
                            <Message message={msg} />
                        </Box>
                    ))
                )}
            </Box>
            <Toolbar />
            <Box
                sx={{ width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` }, position: 'fixed', bottom: 0, right: 0 }}
            >
                <Footer conversationId={conversationId} />
            </Box>
        </Box>
    );
};

export default ChatBox;
