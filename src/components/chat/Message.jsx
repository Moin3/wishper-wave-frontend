import { Box, styled, Typography } from '@mui/material';
import { userAuth } from '../../context/AccountProvider';
import { formatDate } from '../../utils/common-utils';
import { MdDownloadForOffline } from "react-icons/md";


const Wrapper = styled(Box)`
    background: #6dd7f4;
    padding:10px 10px;
    max-width: 60%;
    width: fit-content;
    margin-right: auto;
    display: flex;
    border-radius: 5px;
    word-break: break-word;
`;
    
const Own = styled(Box)`
    background: #c4e0f5;
    padding:10px 10px;
    max-width: 60%;
    width: fit-content;
    margin-left: auto;
    display: flex;
    border-radius: 5px;
    word-break: break-word;
`;

const Text = styled(Typography)`
    font-size: 14px;
    padding: 0 25px 0 5px;
    font-family:Quicksand;
    font-weight:500;
    color:black
`;

const Time = styled(Typography)`
    font-family:Quicksand;
    font-weight:semi-bold;
    font-size: 10px;
    color: #373636;
    // margin-top: 6px;
    word-break: keep-all;
    margin-top: auto;
`;

const Message = ({ message }) => {
    const {user}=userAuth()


    return (
        <>
        {
            user?._id === message.senderId ? 
                <Own>
                    {
                        message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
                    }
                </Own>
                 : 
                <Wrapper>
                    {
                        message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
                    }
                </Wrapper>
        }
        
        </>
    )
}

const TextMessage = ({ message }) => {
    
    return (
        <>
            <Text>{message.text}</Text>
            <Time>{formatDate(message.createdAt)}</Time>
        </>
    )
}



const ImageMessage = ({ message }) => {

    return (
        <div style={{ position: 'relative' }}>
            {
                message?.text?.includes('.pdf') ?
                    <div style={{ display: 'flex' }}>
                        <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png'} alt="pdf-icon" style={{ width: 80 }} />
                        <Typography style={{ fontSize: 14 }} >{message.text.split("/").pop()}</Typography>
                    </div>
                : 
                    <img style={{ width: "100%",maxWidth:'300px', height: '100%',maxHeight:'250px', objectFit: 'contain' }} src={message.text} alt={message.text} />
            }
            
            <Time style={{ position: 'absolute', bottom: 3, right: 0 ,backgroundColor:'#577799',borderRadius: '2px',color:'white',padding:'0 4px',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',gap:'10px'}}>
                <Typography sx={{mt:'3px',cursor:'pointer',fontSize:'14px'}}>
                    <MdDownloadForOffline />
                </Typography>
                {formatDate(message.createdAt)}
            </Time>
        </div>
    )
}


export default Message;