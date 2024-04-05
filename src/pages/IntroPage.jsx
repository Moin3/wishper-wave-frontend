import React from 'react';
import Menus from '../components/menu/Menus'; // Corrected import path
import EmptyChatBox from '../components/chat/EmptyChatBox';
import { userAuth } from '../context/AccountProvider';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

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
            <Menus /> {/* Using the Menus component */}
            <EmptyChatBox />
        </Box>
    );
}

export default IntroPage;
