import axios from 'axios'


const instance=axios.create({
    baseURL:'http://localhost:8000'
})

// Function for making POST requests
export const postAPI=(url,data)=>instance.post(url,data)

// Function for making GET requests
export const getAPI = (url) => instance.get(url);