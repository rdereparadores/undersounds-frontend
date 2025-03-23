import { Button } from "../ui/button"
import { PiVinylRecord } from "react-icons/pi"
import { IoStatsChartOutline } from 'react-icons/io5'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { IoAlbumsOutline } from 'react-icons/io5'
import { useAuth } from "@/hooks/auth/useAuth"
import { Skeleton } from "../ui/skeleton"
import { Link } from "react-router"
import { Separator } from "../ui/separator"
import { RxDashboard } from "react-icons/rx"
import { SheetClose } from "../ui/sheet"

export const NavBarArtistSectionMobile = () => {
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
                    <Link to='/artist/dashboard'><RxDashboard />Perfil</Link>
                </Button>
            </SheetClose>
            <SheetClose asChild>
                <Button asChild variant="ghost">
                    <Link to='/artist/dashboard/songPanel'><PiVinylRecord />Mis canciones</Link>
                </Button>
            </SheetClose>
            <SheetClose asChild>
                <Button asChild variant="ghost">
                    <Link to='/artist/dashboard/albumPanel'><IoAlbumsOutline />Mis álbumes</Link>
                </Button>
            </SheetClose>
            <SheetClose asChild>
                <Button asChild variant="ghost">
                    <Link to='/artist/dashboard/sales'><IoStatsChartOutline />Ventas</Link>
                </Button>
            </SheetClose>
            <Separator />
            <SheetClose asChild>
                <Button asChild variant="ghost">
                    <Link to='/user/dashboard'><RxDashboard />Panel de usuario</Link>
                </Button>
            </SheetClose>
        </>
    )
}