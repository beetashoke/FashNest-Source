import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
    const { login, isLoading } = useAuth()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsSubmitting(true)

        try {
            console.log('Login form submitting with:', { email: formData.email, password: '***' }) // Debug log
            const result = await login(formData.email, formData.password)
            console.log('Login result:', result) // Debug log

            if (result.success) {
                // Redirect to home page after successful login
                navigate('/', { replace: true })
            } else {
                setError(result.message)
            }
        } catch (error) {
            console.error('Login form error:', error) // Debug log
            setError('Login failed. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="auth-page">
            <div className="container">
                <div className="auth-container">
                    <div className="auth-card">
                        <div className="auth-header">
                            <h1>Welcome to UNIFORMITY</h1>
                            <p className="auth-subtitle">Please sign in to access our uniform collection and place orders.</p>
                        </div>

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label htmlFor="email">Email Address *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password *</label>
                                <div className="password-input-container">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={isSubmitting}
                                    >
                                        {showPassword ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn auth-btn"
                                disabled={isSubmitting || isLoading}
                            >
                                {isSubmitting ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>

                        <div className="auth-links">
                            <p>
                                Don't have an account?
                                <Link to="/signup" className="auth-link">Sign up here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
