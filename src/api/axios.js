import axios from 'axios';
const instance = axios.create({
    baseURL:'http://0.0.0.0:2023',
    headers:{
        'content-type':'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})

export default instance;