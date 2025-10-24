import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { AuthProvider } from './contexts/AuthContext';
import AuthGuard from './components/AuthGuard';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import './styles.css';

const router = createBrowserRouter([
    // Public routes (no authentication required)
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },

    // Protected routes (authentication required)
    {
        path: '/',
        element: (
            <AuthGuard>
                <Home />
            </AuthGuard>
        )
    },
    {
        path: '/collection/:slug',
        element: (
            <AuthGuard>
                <Collection />
            </AuthGuard>
        )
    },
    {
        path: '/cart',
        element: (
            <AuthGuard>
                <Cart />
            </AuthGuard>
        )
    },
    {
        path: '/checkout',
        element: (
            <AuthGuard>
                <Checkout />
            </AuthGuard>
        )
    },
    {
        path: '/about',
        element: (
            <AuthGuard>
                <About />
            </AuthGuard>
        )
    },
    {
        path: '/contact',
        element: (
            <AuthGuard>
                <Contact />
            </AuthGuard>
        )
    },
    {
        path: '/profile',
        element: (
            <AuthGuard>
                <Profile />
            </AuthGuard>
        )
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <SettingsProvider>
            <AuthProvider>
                <CartProvider>
                    <RouterProvider router={router} />
                </CartProvider>
            </AuthProvider>
        </SettingsProvider>
    </React.StrictMode>
)


