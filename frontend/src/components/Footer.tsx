import React from 'react'
import { Link } from 'react-router-dom'
import { useSettings } from '../contexts/SettingsContext'

export default function Footer() {
    const { settings, categories } = useSettings()
    return (
        <footer className="main-footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <div className="footer-logo">
                            <span className="logo-text">{settings?.company_name || 'UNIFORMITY'}</span>
                            <span className="logo-tagline">{settings?.tagline || 'Creating Harmony'}</span>
                        </div>
                        <div className="footer-contact">
                            <div className="contact-item">
                                <span>📞</span>
                                <span>{settings?.phone || '+91 98300 80238'}</span>
                            </div>
                            <div className="contact-item">
                                <span>✉️</span>
                                <span>{settings?.email || 'uniformity27@gmail.com'}</span>
                            </div>
                            <div className="contact-item">
                                <span>📍</span>
                                <span>{settings?.address || 'FD 57, Saltlake, Sector III, Kolkata 700106'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul className="footer-links">
                            <li><Link to="/about">About Us</Link></li>
                            {(categories || []).map((c) => (
                                <li key={c.name}>
                                    <Link to={`/collection/${encodeURIComponent(c.slug || c.name)}`}>{c.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3>Let's Connect</h3>
                        <div className="social-links">
                            {settings?.facebook_url && <a href={settings.facebook_url} className="social-link">Facebook</a>}
                            {settings?.twitter_url && <a href={settings.twitter_url} className="social-link">Twitter</a>}
                            {settings?.youtube_url && <a href={settings.youtube_url} className="social-link">YouTube</a>}
                            {settings?.instagram_url && <a href={settings.instagram_url} className="social-link">Instagram</a>}
                            {settings?.whatsapp_number && (
                                <a
                                    href={`https://wa.me/${encodeURIComponent(settings.whatsapp_number.replace(/[^\d+]/g, ''))}`}
                                    className="social-link"
                                >
                                    WhatsApp
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2024 {settings?.website || 'uniformity.com.in'}</p>
                </div>
            </div>
        </footer>
    )
}
