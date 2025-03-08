import { BrowserRouter, Routes, Route, Outlet } from 'react-router'

import './App.css'
import { Index } from './routes/Index.tsx'
import { LogInCard } from './components/auth/login/LogInCard.tsx'
import { SignUpCard } from './components/auth/signup/SignUpCard.tsx'
import { PaginaCesta } from './routes/Cart.tsx'
import { PaginaCheckout } from './routes/Checkout.tsx'
import Shop from './routes/Shop.tsx'
import SongPage from './routes/Song.tsx'
import AlbumPage from './routes/Album.tsx'
import ArtistPanel from './routes/artist_panel/artistPanel.tsx'
import UserPanel from './routes/user_panel/userPanel.tsx'

import { CartProvider } from './hooks/cartContext.tsx'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Index />} />
        <Route path='auth' element={<Outlet />}>
          <Route path='login' element={<LogInCard />} />
          <Route path='signup' element={<SignUpCard />} />
        </Route>

        <Route path='shop' element={<Outlet />}>
          <Route index element={<><CartProvider><Shop /></CartProvider></>} />
          <Route path='cart' element={<PaginaCesta />} />
          <Route path='checkout' element={<PaginaCheckout />} />
        </Route>

        <Route path='song' element={<SongPage />} />
        <Route path='album' element={<AlbumPage />} />

        <Route path='user' element={<Outlet />}>
          <Route path='dashboard' element={<UserPanel />} />
        </Route>

        <Route path='artist' element={<Outlet />}>
          <Route path='dashboard' element={<ArtistPanel />} />
        </Route>

        <Route path='*' element={<></>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
