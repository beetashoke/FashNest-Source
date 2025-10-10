import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { SettingsProvider } from './contexts/SettingsContext';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import './styles.css';

const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/collection/:slug', element: <Collection /> },
    { path: '/cart', element: <Cart /> },
    { path: '/checkout', element: <Checkout /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <SettingsProvider>
            <CartProvider>
                <RouterProvider router={router} />
            </CartProvider>
        </SettingsProvider>
    </React.StrictMode>
)


