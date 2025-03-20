import { Button } from "../ui/button"
import { PiVinylRecord } from "react-icons/pi"
import { IoStatsChartOutline } from 'react-icons/io5'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { IoAlbumsOutline } from 'react-icons/io5'
import { useAuth } from "@/hooks/auth/useAuth"
import { Link } from "react-router"
import { Skeleton } from "../ui/skeleton"
import { RxDashboard } from "react-icons/rx"
import { SheetClose } from "../ui/sheet"

export const NavBarUserSectionMobile = () => {
    const auth = useAuth()
    return (
        <>
            <Button variant="outline">
                <Avatar>
                    <AvatarImage src="https://picsum.photos/30" width='25px' height='25px' alt="avatarUser" className='rounded-full'></AvatarImage>
                    <AvatarFallback>
                        <Skeleton className='w-[25px] h-[25px] rounded-full' />
                    </AvatarFallback>
                </Avatar>
                @{auth.userName}
            </Button>
            <SheetClose asChild>
                <Button asChild variant="ghost">
                    <Link to='/user/dashboard'><RxDashboard />Panel</Link>
                </Button>
            </SheetClose>
            <SheetClose asChild>
                <Button variant="ghost">
                    <Link to='/user/dashboard/songs'><PiVinylRecord />Canciones</Link>
                </Button>
            </SheetClose>
            <SheetClose asChild>
                <Button variant="ghost"><IoAlbumsOutline />
                    <Link to='/user/dashboard/albums'>Álbumes</Link>
                </Button>
            </SheetClose>
            <SheetClose asChild>
                <Button variant="ghost"><IoStatsChartOutline />
                    <Link to='/user/dashboard/stats'>Estadísticas</Link>
                </Button>
            </SheetClose>
        </>
    )
}