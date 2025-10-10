import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

export default function Cart() {
    const { state, removeItem, updateQuantity, clearCart } = useCart()

    if (state.items.length === 0) {
        return (
            <div className="container">
                <h1>Your Cart</h1>
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <p>Your cart is empty</p>
                    <Link to="/" className="btn">Continue Shopping</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Your Cart ({state.itemCount} items)</h1>
                <button onClick={clearCart} className="btn" style={{ background: '#dc2626' }}>
                    Clear Cart
                </button>
            </div>

            <div className="cart-items">
                {state.items.map((item) => (
                    <div key={item.id} className="cart-item">
                        <div className="cart-item-image">
                            {item.image ? <img src={item.image} alt={item.title} /> : <div className="placeholder">📦</div>}
                        </div>
                        <div className="cart-item-details">
                            <h3>{item.title}</h3>
                            <p className="cart-item-category">{item.category}</p>
                            <p className="cart-item-price">₹{item.price.toFixed(2)} each</p>
                        </div>
                        <div className="cart-item-controls">
                            <div className="quantity-controls">
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                            </div>
                            <button
                                onClick={() => removeItem(item.id)}
                                className="remove-btn"
                            >
                                Remove
                            </button>
                        </div>
                        <div className="cart-item-total">
                            ₹{(item.price * item.quantity).toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
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
                <Link to="/checkout" className="btn checkout-btn">
                    Proceed to Checkout
                </Link>
            </div>
        </div>
    )
}
