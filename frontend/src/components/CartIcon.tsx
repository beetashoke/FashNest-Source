import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

export default function CartIcon() {
    const { state } = useCart()

    return (
        <Link to="/cart" className="cart-icon">
            🛒
            {state.itemCount > 0 && (
                <span className="cart-badge">{state.itemCount}</span>
            )}
        </Link>
    )
}


