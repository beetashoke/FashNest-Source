import axios from 'axios'

export const api = axios.create({
    baseURL: '/api/method',
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})


