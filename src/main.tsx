import ReactDOM from 'react-dom/client'
import App from './App'
import { SpeedInsights } from "@vercel/speed-insights/react"
import './index.css'

import { AuthProvider } from './hooks/auth/AuthProvider'
import { ApiProvider } from './hooks/api/ApiProvider'
import { BrowserRouter } from 'react-router'
import { Toaster } from '@/components/ui/sonner'
import { ScrollToTop } from '@/lib/utils'
import { ProductProvider } from './hooks/product/ProductProvider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
            <ApiProvider>
                <ProductProvider>
                    <App />
                    <Toaster richColors />
                </ProductProvider>
            </ApiProvider>
        </AuthProvider>
        <SpeedInsights />
    </BrowserRouter>
);