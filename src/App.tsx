import { Routes, Route, Outlet } from 'react-router'
import './App.css'
import { Index } from "@/routes/Index.tsx";
import { SignIn } from '@/routes/SignIn'
import { SignUp } from '@/routes/SignUp'
import { Checkout } from './routes/Checkout.tsx'
import { Shop } from './routes/Shop.tsx'
import { ShopProvider } from './hooks/shop/ShopProvider.tsx'
import { NavBarContainer } from '@/components/navbar/NavBarContainer.tsx'
import { Cart } from './routes/Cart.tsx'
import { GuestOnlyRoute } from './components/auth/GuestOnlyRoute.tsx'
import { ProtectedRoute } from './components/auth/ProtectedRoute.tsx'
import { UserRole } from './constants.ts'
import { ProductContainer } from './components/product/ProductContainer.tsx'
import MusicPlayer from "@/components/panel/songPanel/music-player.tsx";
import { sampleSongs } from "@/components/panel/songPanel/sample-songs.tsx";
import AlbumPlayer from "@/components/panel/albumPanel/album-player.tsx";
import { sampleAlbums } from "@/components/panel/albumPanel/sample-albums.tsx";
import { ArtistPanel } from "@/routes/ArtistPanel.tsx";
import SalePanel from "@/components/panel/salePanel/sale-panel.tsx";
import { salesData } from "@/components/panel/salePanel/salesData.tsx";
import ArtistProfileCard from "@/components/panel/profilePanel/artistProfileCard.tsx";
import { ArtistProfile } from './components/artistProfile/ArtistProfile.tsx';
import { NotFound404 } from './routes/404.tsx';
import { Dashboard } from './routes/Dashboard.tsx';
import { UserDashboard } from './components/user-dashboard/UserDashboard.tsx';
import { UserDashboardProfile } from './components/user-dashboard/UserDashboardProfile.tsx';
import { UserDashboardLibrary } from './components/user-dashboard/UserDashboardLibrary.tsx';
import { UserDashboardOrders } from './components/user-dashboard/UserDashboardOrders.tsx';

function App() {
    return (
        <Routes>

            <Route path='auth' element={<GuestOnlyRoute />}>
                <Route path='signin' element={<SignIn />} />
                <Route path='signup' element={<SignUp />} />
            </Route>

            <Route element={<NavBarContainer />}>
                <Route index element={<Index />} />

                <Route path='shop' element={<Outlet />}>
                    <Route index element={<ShopProvider><Shop /></ShopProvider>} />

                    <Route path='cart' element={<Cart />} />
                    <Route element={<ProtectedRoute requiredRole={UserRole.USER} redirectTo='/shop/checkout' />}>
                        <Route path='checkout' element={<Checkout />} />
                    </Route>
                </Route>

                <Route path='album/:id' element={<ProductContainer type='album' />} />
                <Route path='song/:id' element={<ProductContainer type='song' />} />
                <Route path='profile/artist/:id' element={<ArtistProfile />} />

                <Route path='user' element={<ProtectedRoute requiredRole={UserRole.USER} redirectTo='/user/dashboard' />}>
                    <Route path='dashboard' element={<Dashboard role={UserRole.USER} />}>
                        <Route index element={<UserDashboard />}/>
                        <Route path='profile' element={<UserDashboardProfile />}/>
                        <Route path='library' element={<UserDashboardLibrary />}/>
                        <Route path='orders' element={<UserDashboardOrders />}/>
                        <Route path='stats' element={<MusicPlayer songs={sampleSongs} />}/>
                    </Route>
                </Route>

                <Route path="artist" element={<ProtectedRoute requiredRole={UserRole.ARTIST} redirectTo="/artist/dashboard"/>}>
                    <Route path="dashboard" element={<ArtistPanel />}>
                        <Route index element={<ArtistProfileCard />} />
                        <Route path="profile" element={<ArtistProfileCard />} />
                        <Route path="sales" element={<SalePanel sales={salesData} />} />
                        <Route path="stats" element={<></>} />
                        <Route path="songs" element={<MusicPlayer songs={sampleSongs} />} />
                        <Route path="albums" element={<AlbumPlayer albums={sampleAlbums} />} />
                    </Route>
                </Route>
                <Route path='*' element={<NotFound404 />} />
            </Route>
        </Routes>
    )
}

export default App