import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import EmptyChatBox from '../components/chat/EmptyChatBox';
import Menus from '../components/menu/Menus';
import { userAuth } from '../context/AccountProvider';
import { useNavigate } from 'react-router-dom';

function IntroPage(props) {
    const navigate = useNavigate();
    const { user, token } = userAuth();

    React.useEffect(() => {
        if (!user && !token) {
            navigate('/signin');
        }
    }, [token, user]);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Menus />
            <EmptyChatBox />
        </Box>
    );
}

export default IntroPage;
