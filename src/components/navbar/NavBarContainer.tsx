import { Outlet } from 'react-router'
import { NavBar } from './NavBar'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Footer } from '../footer/Footer'
import { MusicPlayer } from '../music-player/MusicPlayer'

export const NavBarContainer = () => {
    const [scroll, setScroll] = useState(20)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY < 80) {
                setScroll(20 - window.scrollY / 4)
            } else {
                setScroll(0)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    })

    return (
        <>
            <motion.nav
                initial={{ padding: '20px 20px' }}
                animate={{
                    padding: `${scroll}px ${scroll}px`
                }}
                className='fixed top-0 w-full z-50'
            >
                <NavBar floating={scroll > 0} />
            </motion.nav>
            <div className='pt-20 px-[20px]  min-h-screen'>
                <Outlet />
            </div>
            <div className='fixed bottom-2 px-2 w-full'>
                <MusicPlayer />
            </div>
            <Footer />
        </>
    )
}