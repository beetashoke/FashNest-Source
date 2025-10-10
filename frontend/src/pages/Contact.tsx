import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SocialSidebar from '../components/SocialSidebar'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // In a real app, this would send to your backend
        console.log('Contact form submitted:', formData)
        alert('Thank you for your message! We\'ll get back to you soon.')
        setFormData({ name: '', email: '', phone: '', company: '', message: '' })
    }

    return (
        <>
            <Header />
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h1>Contact Us</h1>
                    <span />
                </div>

                <div className="contact-layout">
                    <div className="contact-info">
                        <h2>Get in Touch</h2>
                        <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>

                        <div className="contact-details">
                            <div className="contact-item">
                                <h3>📞 Phone</h3>
                                <p>+91 98300 80238</p>
                            </div>

                            <div className="contact-item">
                                <h3>✉️ Email</h3>
                                <p>uniformity27@gmail.com</p>
                            </div>

                            <div className="contact-item">
                                <h3>📍 Address</h3>
                                <p>FD 57, Saltlake, Sector III<br />Kolkata 700106</p>
                            </div>
                        </div>

                        <div className="business-hours">
                            <h3>Business Hours</h3>
                            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                            <p>Saturday: 9:00 AM - 4:00 PM</p>
                            <p>Sunday: Closed</p>
                        </div>
                    </div>

                    <div className="contact-form">
                        <h2>Send us a Message</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Full Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email *</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Company/Institution</label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Message *</label>
                                <textarea
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Tell us about your uniform requirements..."
                                />
                            </div>

                            <button type="submit" className="btn submit-btn">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <SocialSidebar />
            <Footer />
        </>
    )
}
