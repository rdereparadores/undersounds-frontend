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
import { GenreProvider } from './hooks/genre/GenreProvider'
import { MusicPlayerProvider } from './hooks/music-player/MusicPlayerProvider'
import {TrendingSongsProvider} from "@/hooks/trending/TrendingSongsProvider.tsx";
import { UserStatsProvider } from './hooks/user-stats/UserStatsProvider'
import { ArtistStatsProvider } from './hooks/artist-stats/ArtistStatsProvider'
import { ArtistProfileProvider } from './hooks/artist-profile/ArtistProfileProvider'
import {RatingsProvider} from "@/hooks/ratings/RatingsProvider.tsx";

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
                                <GenreProvider>
                                    <MusicPlayerProvider>
                                        <TrendingSongsProvider>
                                            <UserStatsProvider>
                                                <ArtistStatsProvider>
                                                    <ArtistProfileProvider>
                                                        <RatingsProvider>
                                                            <App />
                                                            <Toaster richColors />
                                                        </RatingsProvider>
                                                    </ArtistProfileProvider>
                                                </ArtistStatsProvider>
                                            </UserStatsProvider>
                                        </TrendingSongsProvider>
                                    </MusicPlayerProvider>
                                </GenreProvider>
                            </ArtistProvider>
                        </UserProvider>
                    </CheckoutProvider>
                </CartProvider>
            </ProductProvider>
        </AuthProvider>
        <SpeedInsights />
    </BrowserRouter>
);