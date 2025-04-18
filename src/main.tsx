import ReactDOM from 'react-dom/client'
import App from './App'
import { SpeedInsights } from "@vercel/speed-insights/react"
import './index.css'

import { AuthProvider } from './hooks/auth/AuthProvider'
import { BrowserRouter } from 'react-router'
import { Toaster } from '@/components/ui/sonner'
import { ScrollToTop } from '@/lib/utils'
import { ProductProvider } from './hooks/product/ProductProvider'
import { CartProvider } from './hooks/cart/CartProvider'
import { CheckoutProvider } from './hooks/checkout/CheckoutProvider'
import { UserProvider } from './hooks/user/UserProvider'
import { ArtistProvider } from './hooks/artist/ArtistProvider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
            <ProductProvider>
                <CartProvider>
                    <CheckoutProvider>
                        <UserProvider>
                            <ArtistProvider>
                                <App />
                                <Toaster richColors />
                            </ArtistProvider>
                        </UserProvider>
                    </CheckoutProvider>
                </CartProvider>
            </ProductProvider>
        </AuthProvider>
        <SpeedInsights />
    </BrowserRouter>
);