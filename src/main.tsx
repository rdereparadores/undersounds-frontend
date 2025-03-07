import React from 'react';
import ReactDOM from 'react-dom/client';
import { CartProvider } from './hooks/cartContext.tsx';
import './index.css'
import Shop from "@/routes/Shop.tsx"

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <CartProvider>
            <Shop />
        </CartProvider>
    </React.StrictMode>
);