import axios from 'axios'


const instance=axios.create({
    baseURL:'http://localhost:8000'
})

export const postAPI=(url,data)=>instance.post(url,data)