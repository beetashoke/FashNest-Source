import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
    const { signup, isLoading } = useAuth()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
    })
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        // Validate password length
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long')
            return
        }

        setIsSubmitting(true)

        try {
            const { confirmPassword, ...signupData } = formData
            console.log('Form submitting with data:', signupData) // Debug log
            const result = await signup(signupData)
            console.log('Signup result:', result) // Debug log

            if (result.success) {
                // Redirect to home page after successful signup
                navigate('/', { replace: true })
            } else {
                setError(result.message)
            }
        } catch (error) {
            console.error('Form submission error:', error) // Debug log
            setError('Registration failed. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                            <h1>Join UNIFORMITY</h1>
                            <p className="auth-subtitle">Create your account to browse our uniform collection and place orders.</p>
                        </div>

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="first_name">First Name *</label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="last_name">Last Name *</label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

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
                                <label htmlFor="phone">Phone Number *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="form-row">
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
                                            minLength={6}
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

                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password *</label>
                                    <div className="password-input-container">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                            disabled={isSubmitting}
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            disabled={isSubmitting}
                                        >
                                            {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Address *</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                    rows={3}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="city">City *</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="state">State *</label>
                                    <input
                                        type="text"
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="pincode">Pincode *</label>
                                    <input
                                        type="text"
                                        id="pincode"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn auth-btn"
                                disabled={isSubmitting || isLoading}
                            >
                                {isSubmitting ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>

                        <div className="auth-links">
                            <p>
                                Already have an account?
                                <Link to="/login" className="auth-link">Sign in here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
