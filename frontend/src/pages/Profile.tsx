import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Profile() {
    const { user, updateProfile, isLoading } = useAuth()
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        phone: user?.phone || '',
        address: user?.address || '',
        city: user?.city || '',
        state: user?.state || '',
        pincode: user?.pincode || ''
    })
    const [message, setMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setMessage('')

        try {
            const result = await updateProfile(formData)
            if (result.success) {
                setMessage('Profile updated successfully!')
                setIsEditing(false)
            } else {
                setMessage(result.message)
            }
        } catch (error) {
            setMessage('Failed to update profile. Please try again.')
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

    const handleCancel = () => {
        setFormData({
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
            phone: user?.phone || '',
            address: user?.address || '',
            city: user?.city || '',
            state: user?.state || '',
            pincode: user?.pincode || ''
        })
        setIsEditing(false)
        setMessage('')
    }

    if (!user) {
        return (
            <>
                <Header />
                <div className="container">
                    <div className="auth-container">
                        <div className="auth-card">
                            <h1>Access Denied</h1>
                            <p>Please log in to view your profile.</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="profile-container">
                    <div className="profile-card">
                        <div className="profile-header">
                            <h1>My Profile</h1>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="btn btn-outline"
                            >
                                {isEditing ? 'Cancel' : 'Edit Profile'}
                            </button>
                        </div>

                        {message && (
                            <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="profile-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="first_name">First Name</label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        disabled={!isEditing || isSubmitting}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="last_name">Last Name</label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        disabled={!isEditing || isSubmitting}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="disabled-field"
                                />
                                <small>Email cannot be changed</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={!isEditing || isSubmitting}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    disabled={!isEditing || isSubmitting}
                                    rows={3}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="city">City</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        disabled={!isEditing || isSubmitting}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="state">State</label>
                                    <input
                                        type="text"
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        disabled={!isEditing || isSubmitting}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="pincode">Pincode</label>
                                    <input
                                        type="text"
                                        id="pincode"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        disabled={!isEditing || isSubmitting}
                                    />
                                </div>
                            </div>

                            {isEditing && (
                                <div className="form-actions">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="btn btn-outline"
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
