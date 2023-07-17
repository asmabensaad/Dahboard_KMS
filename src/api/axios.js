import axios from 'axios';
const instance = axios.create({
    baseURL:'https://localhost:7271',
    headers:{
        'content-type':'application/json'
    }
})

export default instance;