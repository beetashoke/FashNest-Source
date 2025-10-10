import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

export default function Checkout() {
    const { state, clearCart } = useCart()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        paymentMethod: 'card'
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [orderComplete, setOrderComplete] = useState(false)

    if (state.items.length === 0) {
        return (
            <div className="container">
                <h1>Checkout</h1>
                <p>Your cart is empty</p>
                <Link to="/" className="btn">Continue Shopping</Link>
            </div>
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate order processing
        await new Promise(resolve => setTimeout(resolve, 2000))

        // In a real app, you'd send this to your backend
        console.log('Order submitted:', {
            items: state.items,
            total: state.total,
            customer: formData
        })

        setOrderComplete(true)
        clearCart()
        setIsSubmitting(false)
    }

    if (orderComplete) {
        return (
            <div className="container">
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <h1>🎉 Order Placed Successfully!</h1>
                    <p>Thank you for your order. We'll contact you soon with delivery details.</p>
                    <Link to="/" className="btn">Continue Shopping</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <h1>Checkout</h1>

            <div className="checkout-layout">
                <div className="checkout-form">
                    <h2>Shipping Information</h2>
                    <form onSubmit={handleSubmit}>
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

                        <div className="form-group">
                            <label>Phone *</label>
                            <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Address *</label>
                            <textarea
                                required
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>City *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>ZIP Code *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.zipCode}
                                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Payment Method</label>
                            <select
                                value={formData.paymentMethod}
                                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                            >
                                <option value="card">Credit/Debit Card</option>
                                <option value="cod">Cash on Delivery</option>
                            </select>
                        </div>

                        <button type="submit" disabled={isSubmitting} className="btn checkout-btn">
                            {isSubmitting ? 'Processing...' : `Place Order - ₹${state.total.toFixed(2)}`}
                        </button>
                    </form>
                </div>

                <div className="checkout-summary">
                    <h2>Order Summary</h2>
                    <div className="order-items">
                        {state.items.map((item) => (
                            <div key={item.id} className="order-item">
                                <div className="order-item-info">
                                    <h4>{item.title}</h4>
                                    <p>Qty: {item.quantity} × ₹{item.price.toFixed(2)}</p>
                                </div>
                                <div className="order-item-total">
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="order-totals">
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>₹{state.total.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>₹{state.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
