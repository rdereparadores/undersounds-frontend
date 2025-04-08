import { Button } from "../ui/button"
import { IoStatsChartOutline } from 'react-icons/io5'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { IoAlbumsOutline } from 'react-icons/io5'
import { useAuth } from "@/hooks/auth/useAuth"
import { Skeleton } from "../ui/skeleton"
import { Link } from "react-router"
import { Separator } from "../ui/separator"
import { RxDashboard } from "react-icons/rx"
import { SheetClose } from "../ui/sheet"
import { IoIosLogOut } from "react-icons/io"
import { useUser } from "@/hooks/user/useUser"
import { useEffect, useState } from "react"
import { ArtistInfoProps } from "@/hooks/user/userContext"

export const NavBarArtistSectionMobile = () => {
    const auth = useAuth()
    const user = useUser()
    const [artistInfo, setArtistInfo] = useState<ArtistInfoProps | undefined>(undefined)

    useEffect(() => {
        user.getArtistInfo()
        .then(artist => setArtistInfo(artist))
    }, [])

    if (artistInfo === undefined) return <></>

    return (
        <>
            <Button variant="outline">
                <Avatar>
                    <AvatarImage src={artistInfo.imgUrl} width='25px' height='25px' alt="avatarUser" className='rounded-full'></AvatarImage>
                    <AvatarFallback>
                        <Skeleton className='w-[25px] h-[25px] rounded-full' />
                    </AvatarFallback>
                </Avatar>
                @{artistInfo.artistUserName}
            </Button>
            <SheetClose asChild>
                <Button asChild variant="ghost">
                    <Link to='/artist/dashboard'><RxDashboard />Panel</Link>
                </Button>
            </SheetClose>
            <SheetClose asChild>
                <Button asChild variant="ghost">
                    <Link to='/artist/dashboard/releases'><IoAlbumsOutline />Lanzamientos</Link>
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
            <Separator />
            <Button variant="ghost" onClick={auth.logOut}> <IoIosLogOut />Cerrar sesión</Button>
        </>
    )
}