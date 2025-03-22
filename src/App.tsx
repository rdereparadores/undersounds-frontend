import { Routes, Route, Outlet } from 'react-router'
import './App.css'
import { Index } from './routes/Index.tsx'
import { SignIn } from '@/routes/SignIn'
import { SignUp } from '@/routes/SignUp'
import { Checkout } from './routes/Checkout.tsx'
import { Shop } from './routes/Shop.tsx'
import ArtistPanel from './routes/artist_panel/artistPanel.tsx'
import UserPanel from './routes/user_panel/userPanel.tsx'
import { ShopProvider } from './hooks/shop/ShopProvider.tsx'
import { NavBarContainer } from '@/components/navbar/NavBarContainer.tsx'
import { Cart } from './routes/Cart.tsx'
import { GuestOnlyRoute } from './components/auth/GuestOnlyRoute.tsx'
import { ProtectedRoute } from './components/auth/ProtectedRoute.tsx'
import { UserRole } from './constants.ts'
import { ProductContainer } from './components/product/ProductContainer.tsx'

function App() {
    return (
        <Routes>
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

                <Route path='user' element={<ProtectedRoute requiredRole={UserRole.USER} redirectTo='/user/dashboard' />}>
                    <Route path='dashboard' element={<UserPanel />} />
                </Route>

                <Route path='artist' element={<ProtectedRoute requiredRole={UserRole.ARTIST} redirectTo='/artist/dashboard' />}>
                    <Route path='dashboard' element={<ArtistPanel />} />
                </Route>
            </Route>


            <Route path='auth' element={<GuestOnlyRoute />}>
                <Route path='signin' element={<SignIn />} />
                <Route path='signup' element={<SignUp />} />
            </Route>

            <Route path='*' element={<></>} />
        </Routes>
    )
}

export default App
