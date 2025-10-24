import React from 'react'

export default function LoadingScreen() {
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
