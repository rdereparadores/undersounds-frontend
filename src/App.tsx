import { BrowserRouter, Routes, Route, Outlet } from 'react-router'

import './App.css'
import { Index } from './routes/Index.tsx'
import { LogInCard } from './components/auth/login/LogInCard.tsx'
import { SignUpCard } from './components/auth/signup/SignUpCard.tsx'
import { PaginaCesta } from './routes/PaginaCesta.tsx'
import { PaginaCheckout } from './routes/PaginaCheckout.tsx'
import Shop from './routes/Shop.tsx'
import SongPage from './routes/SongPage.tsx'
import AlbumPage from './routes/AlbumPage.tsx'
import ArtistPanel from './routes/artist_panel/artistPanel.tsx'
import UserPanel from './routes/user_panel/userPanel.tsx'

import { CartProvider } from './hooks/cartContext.tsx'
import { NavBarContainer } from '@/components/navbar/NavBarContainer.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavBarContainer />}>
          <Route index element={<Index />} />

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
        </Route>


        <Route path='auth' element={<Outlet />}>
          <Route path='login' element={<LogInCard />} />
          <Route path='signup' element={<SignUpCard />} />
        </Route>

        <Route path='*' element={<></>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
