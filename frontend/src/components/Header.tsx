import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CartIcon from './CartIcon'
import { useSettings } from '../contexts/SettingsContext'
import { useAuth } from '../contexts/AuthContext'
import { downloadBrochure } from '../api/uniforms'

export default function Header() {
    const { settings, categories } = useSettings()
    const { user, isAuthenticated, logout } = useAuth()
    const [showUserMenu, setShowUserMenu] = useState(false)

    const handleDownloadBrochure = async () => {
        try {
            await downloadBrochure()
        } catch (error) {
            console.error('Failed to download brochure:', error)
            alert('Failed to download brochure. Please try again.')
        }
    }

    const handleLogout = () => {
        logout()
        setShowUserMenu(false)
    }

    return (
        <>
            {/* Top Contact Bar */}
            <div className="top-bar">
                <div className="container">
                    <div className="contact-info">
                        <span>📞 {settings?.phone || '+91 98300 80238'}</span>
                        <span>✉️ {settings?.email || 'uniformity27@gmail.com'}</span>
                        <span>📍 {settings?.address || 'FD 57, Saltlake, Sector III, Kolkata 700106'}</span>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="main-header">
                <div className="container">
                    <div className="header-content">
                        <Link to="/" className="logo">
                            <span className="logo-text">{settings?.company_name || 'UNIFORMITY'}</span>
                            <span className="logo-tagline">{settings?.tagline || 'Creating Harmony'}</span>
                        </Link>

                        <nav className="main-nav">
                            <Link to="/">Home</Link>
                            <Link to="/about">About Us</Link>
                            <div className="dropdown">
                                <span>Products ▼</span>
                                <div className="dropdown-content">
                                    {(categories || []).map((c) => (
                                        <Link key={c.name} to={`/collection/${encodeURIComponent(c.slug || c.name)}`}>
                                            {c.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <Link to="/contact">Contact</Link>
                        </nav>

                        <div className="header-actions">
                            <button onClick={handleDownloadBrochure} className="download-btn">
                                Download Brochure
                            </button>

                            {isAuthenticated ? (
                                <div className="user-menu">
                                    <button
                                        className="user-btn"
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                    >
                                        👤 {user?.first_name} {user?.last_name}
                                    </button>
                                    {showUserMenu && (
                                        <div className="user-dropdown">
                                            <div className="user-info">
                                                <p><strong>{user?.first_name} {user?.last_name}</strong></p>
                                                <p>{user?.email}</p>
                                                <p>{user?.phone}</p>
                                            </div>
                                            <div className="user-actions">
                                                <Link to="/profile" className="profile-link">
                                                    View Profile
                                                </Link>
                                                <button onClick={handleLogout} className="logout-btn">
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="auth-buttons">
                                    <Link to="/login" className="btn btn-outline">Login</Link>
                                    <Link to="/signup" className="btn">Sign Up</Link>
                                </div>
                            )}

                            <CartIcon />
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
