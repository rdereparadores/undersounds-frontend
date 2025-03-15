import ReactDOM from 'react-dom/client'
import App from './App'
import { SpeedInsights } from "@vercel/speed-insights/react"
import './index.css'

import { AuthProvider } from './hooks/auth/AuthProvider'
import { BrowserRouter } from 'react-router'
import { Toaster } from '@/components/ui/sonner'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <BrowserRouter>
        <AuthProvider>
            <App />
            <Toaster richColors/>
        </AuthProvider>
        <SpeedInsights />
    </BrowserRouter>
);