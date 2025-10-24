import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { api } from '../api/auth'

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

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
    signup: (userData: SignupData) => Promise<{ success: boolean; message: string }>
    logout: () => void
    updateProfile: (userData: Partial<User>) => Promise<{ success: boolean; message: string }>
}

interface SignupData {
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

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const isAuthenticated = !!user

    // Check for existing session on mount
    useEffect(() => {
        const checkAuth = async () => {
            const savedUser = localStorage.getItem('user')
            if (savedUser) {
                try {
                    const userData = JSON.parse(savedUser)
                    setUser(userData)
                } catch (error) {
                    localStorage.removeItem('user')
                }
            }
            setIsLoading(false)
        }
        checkAuth()
    }, [])

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true)
            console.log('Login attempt with:', { email, password: '***' }) // Debug log
            const response = await api.login(email, password)
            console.log('Login response:', response) // Debug log

            if (response.success) {
                setUser(response.user)
                localStorage.setItem('user', JSON.stringify(response.user))
                return { success: true, message: response.message }
            } else {
                return { success: false, message: response.message }
            }
        } catch (error) {
            console.error('Login error:', error) // Debug log
            return { success: false, message: 'Login failed. Please try again.' }
        } finally {
            setIsLoading(false)
        }
    }

    const signup = async (userData: SignupData) => {
        try {
            setIsLoading(true)
            console.log('Signup data:', userData) // Debug log
            const response = await api.signup(userData)
            console.log('Signup response:', response) // Debug log

            if (response.success) {
                // Auto-login after successful signup
                const loginResponse = await api.login(userData.email, userData.password)
                console.log('Login response:', loginResponse) // Debug log
                if (loginResponse.success) {
                    setUser(loginResponse.user)
                    localStorage.setItem('user', JSON.stringify(loginResponse.user))
                }
                return { success: true, message: response.message }
            } else {
                return { success: false, message: response.message }
            }
        } catch (error) {
            console.error('Signup error:', error) // Debug log
            return { success: false, message: 'Registration failed. Please try again.' }
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    const updateProfile = async (userData: Partial<User>) => {
        if (!user) {
            return { success: false, message: 'No user logged in' }
        }

        try {
            setIsLoading(true)
            const response = await api.updateProfile(user.name, userData)

            if (response.success) {
                // Update local user data
                const updatedUser = { ...user, ...userData }
                setUser(updatedUser)
                localStorage.setItem('user', JSON.stringify(updatedUser))
                return { success: true, message: response.message }
            } else {
                return { success: false, message: response.message }
            }
        } catch (error) {
            return { success: false, message: 'Profile update failed. Please try again.' }
        } finally {
            setIsLoading(false)
        }
    }

    const value: AuthContextType = {
        user,
        isAuthenticated,
        isLoading,
        login,
        signup,
        logout,
        updateProfile
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
