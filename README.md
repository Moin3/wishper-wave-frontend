
# WishperWave chat app

Welcome to WhisperWave, a chat application designed for seamless communication. This README provides an overview of the application, its features, dependencies, installation instructions, development guidelines, and case studies.

## Live Link
[https://wishper-wave.vercel.app/](https://wishper-wave.vercel.app/)


## Installation

Install WishperWave with npm

```bash
  git clone https://github.com/Moin3/wishper-wave-frontend.git
  cd client
  npm Install
```
    
## Depvelopment

To run this project 

```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_GOOGLE_CLIENT_ID`



## Tech Stack

**Client:** React, Context Api, React Router DOM, Material UI, Socket.IO Client

**Server:** Node, Express

**Database:** MongoDB

## Dependencies

```json
"dependencies": {
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^5.15.1",
    "@mui/material": "^5.15.1",
    "@react-oauth/google": "^0.12.1",
    "axios": "^1.6.3",
    "jwt-decode": "^4.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hot-toast": "^2.4.1",
    "react-icons": "^5.0.1",
    "react-router-dom": "^6.21.1",
    "react-spinners": "^0.13.8",
    "socket.io-client": "^4.7.5"
}
```

## Features

- **Instant Text Messaging** : Send and receive text messages in real-time.
- **Video Sharing** : Share videos with friends and family.
- **File Sharing** : Easily share files with other users.
- **One-to-One Conversation** : Engage in private conversations with individual users.
- **Custom Login** : Create an account using a custom login system.
- **Google Login** : Log in using Google authentication for added convenience.

## Case Studies 

**Image Upload with Multer**
Integrating multer for image upload initially posed challenges due to issues with support packages. However, utilizing multer exclusively resolved the issue. Note that on a free plan on the live server(Render), uploaded files may be removed after a certain period, leading to their disappearance upon server restart.

**Socket.IO Integration for User Status**
Managing user online/offline status with socket.io integration proved to be a significant challenge. After encountering difficulties, following the documentation, various blogs, and tutorials, a solution was developed. Now, users are automatically marked as online upon login and offline when they leave the platform, ensuring accurate status updates for all users.

## Contributing

Pull requests are welcome! Feel free to modify or extend WishperWave's functionalities based on your needs.

## Feedback

If you have any feedback, please reach out to me at [moinislam667@gmail.com](mailto:moinislam667@gmail.com)
or ![LinkedIn Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/15px-LinkedIn_logo_initials.png)[Moin Islam](https://www.linkedin.com/in/moin-islam)






