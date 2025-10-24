import { api as axiosClient } from './client'

export interface User {
    name: string
    first_name: string
    last_name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    pincode: string
    created_at: string
}

export interface SignupData {
    first_name: string
    last_name: string
    email: string
    phone: string
    password: string
    address: string
    city: string
    state: string
    pincode: string
}

export const authApi = {
    async login(email: string, password: string) {
        const { data } = await axiosClient.post('/test_google.google_testing.api.user_login', {
            email,
            password
        })
        return data.message || data
    },

    async signup(userData: SignupData) {
        console.log('API signup called with:', userData) // Debug log
        const { data } = await axiosClient.post('/test_google.google_testing.api.user_signup', userData)
        console.log('API signup response:', data) // Debug log
        return data.message || data
    },

    async getUserProfile(userId: string) {
        const { data } = await axiosClient.get('/test_google.google_testing.api.get_user_profile', {
            params: { user_id: userId }
        })
        return data.message || data
    },

    async updateProfile(userId: string, userData: Partial<User>) {
        const { data } = await axiosClient.post('/test_google.google_testing.api.update_user_profile', {
            user_id: userId,
            ...userData
        })
        return data.message || data
    }
}

export const api = authApi
