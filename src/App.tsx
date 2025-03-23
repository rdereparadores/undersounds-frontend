import { Routes, Route, Outlet } from 'react-router'
import './App.css'
import {Index} from "@/routes/Index.tsx";
import { songChartData, albumChartData, playbackChartData } from '@/components/panel/artistStatistics/artist-chart-data.tsx'
import { SignIn } from '@/routes/SignIn'
import { SignUp } from '@/routes/SignUp'
import { Checkout } from './routes/Checkout.tsx'
import { Shop } from './routes/Shop.tsx'
import { Album } from './routes/Album.tsx'
import { Song } from './routes/Song.tsx'
import { UserPanel } from './routes/UserPanel.tsx'
import { ShopProvider } from './hooks/shop/ShopProvider.tsx'
import { NavBarContainer } from '@/components/navbar/NavBarContainer.tsx'
import { Cart } from './routes/Cart.tsx'
import { GuestOnlyRoute } from './components/auth/GuestOnlyRoute.tsx'
import { ProtectedRoute } from './components/auth/ProtectedRoute.tsx'
import { UserRole } from './constants.ts'
import { ProductContainer } from './components/product/ProductContainer.tsx'
import PurchasePanel from "@/components/panel/purchasePanel/purchasePanel.tsx";
import {purchasesData} from "@/components/panel/purchasePanel/purchaseData.tsx";
import MusicPlayer from "@/components/panel/songPanel/music-player.tsx";
import {sampleSongs} from "@/components/panel/songPanel/sample-songs.tsx";
import AlbumPlayer from "@/components/panel/albumPanel/album-player.tsx";
import {sampleAlbums} from "@/components/panel/albumPanel/sample-albums.tsx";
import ProfileCard from "@/components/panel/profilePanel/profileCard.tsx";
import StatisticsPanel from "@/components/panel/statisticsPanel/statisticsPanel.tsx";
import {ArtistPanel} from "@/routes/ArtistPanel.tsx";
import ArtistStatisticsPanel from "@/components/panel/artistStatistics/artist-statistics-panel.tsx";
import SalePanel from "@/components/panel/salePanel/sale-panel.tsx";
import {salesData} from "@/components/panel/salePanel/salesData.tsx";
import ArtistProfileCard from "@/components/panel/profilePanel/artistProfileCard.tsx";
import { ArtistProfile } from './components/artistProfile/ArtistProfile.tsx';

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
                <Route path='profile/artist/:id' element={<ArtistProfile />} />
              
                <Route path='user' element={<ProtectedRoute requiredRole={UserRole.USER} redirectTo='/user/dashboard' />}>
                    <Route path='dashboard' element={<UserPanel/>}>
                        <Route index element={
                            <div className="lg:w-4/5 w-[100%]">
                                <ProfileCard/>
                            </div>
                        }
                        />
                        <Route path="userProfile" element={
                            <div className="lg:w-4/5 w-[100%]">
                                <ProfileCard/>
                            </div>
                        }
                        />
                        <Route path='purchases' element={
                            <div className="lg:w-4/5 w-[100%]">
                                <PurchasePanel purchases={purchasesData}/>
                            </div>
                        }
                        />
                        <Route path='statistics' element={
                            <div className="lg:w-4/5 w-[100%]">
                                <StatisticsPanel />
                            </div>
                        }
                        />
                        <Route path='songPanel' element={
                            <div className="lg:w-4/5 w-[100%]">
                                <MusicPlayer songs={sampleSongs} />
                            </div>
                        }
                        />
                        <Route path='albumPanel' element={
                            <div className="lg:w-4/5 w-[100%]">
                                <AlbumPlayer albums={sampleAlbums} />
                            </div>
                        }
                        />
                    </Route>

                </Route>

                <Route
                    path="artist"
                    element={
                        <ProtectedRoute
                            requiredRole={UserRole.USER}
                            redirectTo="/artist/dashboard"
                        />
                    }
                >
                    <Route path="dashboard" element={<ArtistPanel/>}>
                        <Route index element={<ArtistProfileCard/>} />
                        <Route path="artistProfile" element={<ArtistProfileCard/>} />
                        <Route path="sales" element={<SalePanel sales={salesData} />} />
                        <Route path="statistics" element={
                            <ArtistStatisticsPanel
                            songChartData={songChartData}
                            albumChartData={albumChartData}
                            playbackChartData={playbackChartData}
                            period="Último mes"
                            trend="↑ 15% más ingresos que el mes anterior"
                            totalIncome={5950}
                        />} />
                        <Route path="songPanel" element={<MusicPlayer songs={sampleSongs} />} />
                        <Route path="albumPanel" element={<AlbumPlayer albums={sampleAlbums} />} />
                    </Route>
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