import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SocialSidebar from '../components/SocialSidebar'

export default function About() {
    return (
        <>
            <Header />
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h1>About UNIFORMITY</h1>
                    <span />
                </div>

                <div className="about-content">
                    <div className="about-hero">
                        <h2>Creating Harmony Through Quality Uniforms</h2>
                        <p>
                            At UNIFORMITY, we believe that the right uniform creates harmony, professionalism, and pride.
                            We've been serving schools, colleges, corporate offices, and healthcare institutions across
                            India with premium quality uniforms that combine comfort, durability, and style.
                        </p>
                    </div>

                    <div className="about-features">
                        <div className="feature-grid">
                            <div className="feature-card">
                                <h3>🏫 Educational Excellence</h3>
                                <p>School and college uniforms designed for comfort and durability, helping students focus on learning.</p>
                            </div>

                            <div className="feature-card">
                                <h3>💼 Professional Standards</h3>
                                <p>Corporate uniforms that reflect your company's values and create a cohesive, professional image.</p>
                            </div>

                            <div className="feature-card">
                                <h3>🏥 Healthcare Heroes</h3>
                                <p>Medical uniforms that meet hygiene standards while providing comfort for long shifts.</p>
                            </div>
                        </div>
                    </div>

                    <div className="about-values">
                        <h2>Our Values</h2>
                        <div className="values-grid">
                            <div className="value-item">
                                <h4>Quality First</h4>
                                <p>We use only premium materials and maintain strict quality control standards.</p>
                            </div>
                            <div className="value-item">
                                <h4>Customer Satisfaction</h4>
                                <p>Your satisfaction is our priority. We work closely with you to meet your specific requirements.</p>
                            </div>
                            <div className="value-item">
                                <h4>Timely Delivery</h4>
                                <p>We understand deadlines matter. Our efficient production and delivery system ensures on-time delivery.</p>
                            </div>
                            <div className="value-item">
                                <h4>Fair Pricing</h4>
                                <p>Competitive prices without compromising on quality. Best value for your investment.</p>
                            </div>
                        </div>
                    </div>

                    <div className="about-contact">
                        <h2>Get in Touch</h2>
                        <div className="contact-info">
                            <div className="contact-item">
                                <strong>Phone:</strong> +91 98300 80238
                            </div>
                            <div className="contact-item">
                                <strong>Email:</strong> uniformity27@gmail.com
                            </div>
                            <div className="contact-item">
                                <strong>Address:</strong> FD 57, Saltlake, Sector III, Kolkata 700106
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SocialSidebar />
            <Footer />
        </>
    )
}
