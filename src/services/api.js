import axios from 'axios'


const instance=axios.create({
    // baseURL:'http://localhost:8000'
    baseURL:'https://wishper-wave-backend-1.onrender.com'
})

// Function for making POST requests
export const postAPI=(url,data)=>instance.post(url,data)

// Function for making GET requests
export const getAPI = (url) => instance.get(url);