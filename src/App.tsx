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
import { ArtistProfile } from './components/artistProfile/ArtistProfile.tsx';
import { NotFound404 } from './routes/404.tsx';
import { Dashboard } from './routes/Dashboard.tsx';
import { UserDashboard } from './components/user-dashboard/UserDashboard.tsx';
import { UserDashboardProfile } from './components/user-dashboard/UserDashboardProfile.tsx';
import { UserDashboardLibrary } from './components/user-dashboard/UserDashboardLibrary.tsx';
import { UserDashboardOrders } from './components/user-dashboard/UserDashboardOrders.tsx';
import { UserDashboardStats } from './components/user-dashboard/UserDashboardStats.tsx';
import { ArtistDashboard } from './components/artist-dashboard/ArtistDashboard.tsx';
import { ArtistDashboardProfile } from './components/artist-dashboard/ArtistDashboardProfile.tsx';
import { ArtistDashboardSales } from './components/artist-dashboard/ArtistDashboardSales.tsx';
import { ArtistDashboardStats } from './components/artist-dashboard/ArtistDashboardStats.tsx';
import { ArtistDashboardReleases } from './components/artist-dashboard/ArtistDashboardReleases.tsx';
import { Legal } from './components/footer/Legal.tsx';
import { ArtistDashboardReleasesNewAlbum } from './components/artist-dashboard/ArtistDashboardReleasesNewAlbum.tsx';
import { ArtistDashboardReleasesNewSong } from './components/artist-dashboard/ArtistDashboardReleasesNewSong.tsx';
import { ArtistReleaseProvider } from './hooks/artist-release/ArtistReleaseProvider.tsx';
import { CheckoutSucces } from './components/checkout/CheckoutSucces.tsx';
import { CheckoutDeny } from './components/checkout/CheckoutDeny.tsx';

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

                    {/* TODO ponerlas en las rutas correspondientes*/ }
                    <Route path='checkoutsucces' element={<CheckoutSucces/>}/>
                    <Route path='checkoutdeny' element={<CheckoutDeny/>}/>
                </Route>

                <Route path='album/:id' element={<ProductContainer type='album' />} />
                <Route path='song/:id' element={<ProductContainer type='song' />} />
                <Route path='profile/artist/:id' element={<ArtistProfile />} />
                <Route path='legal' element={<Legal />} />

                <Route path='user' element={<ProtectedRoute requiredRole={UserRole.USER} redirectTo='/user/dashboard' />}>
                    <Route path='dashboard' element={<Dashboard role={UserRole.USER} />}>
                        <Route index element={<UserDashboard />} />
                        <Route path='profile' element={<UserDashboardProfile />} />
                        <Route path='library' element={<UserDashboardLibrary />} />
                        <Route path='orders' element={<UserDashboardOrders />} />
                        <Route path='stats' element={<UserDashboardStats />} />
                    </Route>
                </Route>

                <Route path="artist" element={<ProtectedRoute requiredRole={UserRole.ARTIST} redirectTo="/artist/dashboard" />}>
                    <Route path="dashboard" element={<ArtistReleaseProvider><Dashboard role={UserRole.ARTIST} /></ArtistReleaseProvider>}>
                        <Route index element={<ArtistDashboard />} />
                        <Route path="profile" element={<ArtistDashboardProfile />} />
                        <Route path="sales" element={<ArtistDashboardSales />} />
                        <Route path="stats" element={<ArtistDashboardStats />} />
                        <Route path="releases" element={<ArtistDashboardReleases />} />
                        <Route path='releases/new/song' element={<ArtistDashboardReleasesNewSong />} />
                        <Route path='releases/new/album' element={<ArtistDashboardReleasesNewAlbum />} />
                    </Route>
                </Route>
                <Route path='*' element={<NotFound404 />} />
            </Route>
        </Routes>
    )
}

export default App