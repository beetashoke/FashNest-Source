import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface AuthGuardProps {
    children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const { isAuthenticated, isLoading } = useAuth()
    const location = useLocation()

    // Show loading screen while checking authentication
    if (isLoading) {
        return (
            <div className="auth-loading">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <h2>Loading...</h2>
                    <p>Please wait while we check your authentication.</p>
                </div>
            </div>
        )
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    // If authenticated, render the protected content
    return <>{children}</>
}
