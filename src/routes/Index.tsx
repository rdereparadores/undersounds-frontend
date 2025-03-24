import { IndexPopularCarousel } from '@/components/index/IndexPopularCarousel'
import { IndexGenresPanel } from '@/components/index/IndexGenresPanel'
import { IndexInfoCard } from '@/components/index/IndexInfoCard'

import { Button } from '@/components/ui/button'
import { Link } from 'react-router'

import { TiDeviceLaptop } from 'react-icons/ti'
import { IoPhonePortraitOutline } from 'react-icons/io5'
import { BsMusicPlayerFill } from 'react-icons/bs'
import { GlobalStatsProvider } from '@/hooks/globalStats/GlobalStatsProvider'

const infoCards = [
    {
        title: "Lleva tu música a cualquier lugar",
        description: "En UnderSounds te ofrecemos la flexibilidad de elegir el formato en el que quieres disfrutar de tu música: digital, CD, vinilo o cassette.",
        children: <>
            <IoPhonePortraitOutline className='grow size-auto' />
            <BsMusicPlayerFill className='grow size-auto' />
            <TiDeviceLaptop className='grow size-auto' />
        </>
    },
    {
        title: "Disfruta de tu biblioteca como nunca antes",
        description: "Todo el catálogo está disponible en formatos de alta fidelidad, como FLAC o MQA.",
        children: <>
            <img className='h-40' src='https://www.realhd-audio.com/wp-content/uploads/2014/07/140702_hi-res-logo.jpg' />
        </>
    },
    {
        title: "Sigue a tus artistas favoritos",
        description: "Mantente al día de las novedades de los artistas que sigues.",
        children: <></>
    },
    {
        title: "Si eres artista, aquí te valoramos",
        description: "Ofrecemos las tarifas más competitivas para creadores.",
        children: <></>
    }
]

export const Index = () => (
    <div className=''>
        <div className='flex flex-col items-center justify-center gap-6 h-[60dvh] w-full px-5'>
            <h1 className='bg-gradient-to-r from-black to-blue-500 leading-tight text-transparent bg-clip-text font-extrabold text-6xl text-center'>Descubre. Escucha. Repite.</h1>
            <h2 className='font-medium text-2xl text-center'>Conoce a los artistas del momento.</h2>
            <Button asChild size='lg'>
                <Link to='/auth/signup'>Empieza ahora</Link>
            </Button>
        </div>

        <div className='flex justify-center mb-5'>
            <GlobalStatsProvider>
                <IndexPopularCarousel />
            </GlobalStatsProvider>
        </div>

        <div className='flex justify-center'>
            <IndexGenresPanel />
        </div>

        <div className='flex flex-col items-center gap-96 my-[10dvh]'>
            {infoCards.map((info, index) => (
                <IndexInfoCard key={index} title={info.title} description={info.description}>
                    {info.children}
                </IndexInfoCard>
            ))}
        </div>

        <div className='h-[20dvh] mt-40'>

        </div>
    </div>
)