import axios from 'axios'

export const api = axios.create({
    baseURL: '/api/method',
    withCredentials: false,
})


