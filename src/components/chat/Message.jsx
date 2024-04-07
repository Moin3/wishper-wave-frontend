import { Box, styled, Typography } from '@mui/material';
import { userAuth } from '../../context/AccountProvider';
import { downloadMedia, formatDate } from '../../utils/common-utils';
import { MdDownloadForOffline } from "react-icons/md";
import React, { forwardRef } from 'react';

const Wrapper = styled(Box)`
    background: #6dd7f4;
    padding:1px 5px;
    max-width: 60%;
    width: fit-content;
    margin-right: auto;
    display: flex;
    border-radius: 5px;
    word-break: break-word;
`;
    
const Own = styled(Box)`
    background: #c4e0f5;
    padding:1px 5px;
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
    font-family: Quicksand;
    font-weight: 500;
    color: black;
`;

const Time = styled(Typography)`
    font-family: Quicksand;
    font-weight: semi-bold;
    font-size: 10px;
    color: #373636;
    word-break: keep-all;
    margin-top: auto;
`;

const VideoMessage = ({ message }) => {
    return (
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
            <video controls style={{ width: "100%",maxWidth:'350px', height: '100%',maxHeight:'250px', objectFit: 'contain' }} >
                <source  src={message.text} type="video/mp4" />
            </video>
        </Box>
    );
};

const ImageMessage = ({ message }) => {
    const getFileIcon = (fileType) => {
        switch (fileType) {
            case 'pdf':
                return 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png';
            case 'doc':
            case 'docx':
                return 'https://google.oit.ncsu.edu/wp-content/uploads/sites/6/2021/01/Google_Docs.max-2800x2800-1.png';
            case 'txt':
                return 'https://cdn-icons-png.flaticon.com/512/29/29076.png';
            case 'ppt':
            case 'pptx':
                return 'https://cdn-icons-png.flaticon.com/512/4726/4726016.png';
            case 'mp4':
            case 'mkv':
            case 'wmv':
            case 'webm':
                return 'https://t3.ftcdn.net/jpg/01/09/40/34/360_F_109403483_qocRmeSFXJ6KlF3yoaDBuI3CZOiNGfCw.jpg';
            case 'zip':
                return 'https://www.iconpacks.net/icons/2/free-zip-icon-1519-thumb.png';
            default:
                return 'https://icons.veryicon.com/png/o/file-type/system-icon/unknown-file-types.png';
        }
    };

    const getFileType = (fileName) => {
        const extension = fileName?.split('.').pop().toLowerCase();
        switch (extension) {
            case 'pdf':
            case 'doc':
            case 'docx':
            case 'txt':
            case 'ppt':
            case 'pptx':
            case 'mp4':
            case 'mkv':
            case 'wmv':
            case 'webm':
                return extension;
            default:
                return 'unknown';
        }
    };

    const renderFileMessage = () => {
        const fileType = getFileType(message.text);
        if (fileType === 'mp4' || fileType === 'mkv' || fileType === 'wmv' || fileType === 'webm') {
            return <VideoMessage message={message} />;
        } else if (fileType !== 'unknown') {
            return (
                <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                    <img src={getFileIcon(fileType)} alt={`${fileType}-icon`} style={{ width: 60, padding: 6 }} />
                    <Typography style={{ fontSize: 12, width: '80%', maxWidth: '300px', fontFamily: 'Quicksand', fontWeight: '500' }}>{message?.text?.split("/").pop()}</Typography>
                </Box>
            );
        } else {
            return (
                <img style={{ width: "100%",maxWidth:'300px', height: '100%',maxHeight:'250px', objectFit: 'contain' }} src={message.text} alt={message.text}/>
            );
        }
    };

    return (
        <Box style={{ position: 'relative' }}>
            {renderFileMessage()}
            <Time style={{ position: 'absolute', bottom: 3, right: 0, backgroundColor: '#577799', borderRadius: '2px', color: 'white', padding: '0 4px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                <MdDownloadForOffline style={{ cursor: 'pointer' }} onClick={(e) => downloadMedia(e, message.text)} />
                {formatDate(message.createdAt)}
            </Time>
        </Box>
    );
};

const Message = forwardRef(({ message }, ref) => {
    const { user } = userAuth();

    return (
        <div ref={ref}>
        {
            user ?._id === message.senderId ? 
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
        
        </div>
    );
});

const TextMessage = ({ message }) => {
    return (
        <>
            <Text>{message.text}</Text>
            <Time>{formatDate(message.createdAt)}</Time>
        </>
    );
};

export default Message;
