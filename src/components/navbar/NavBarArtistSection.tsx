import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { IoAlbumsOutline } from 'react-icons/io5'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoStatsChartOutline } from 'react-icons/io5'
import { IoIosLogOut } from 'react-icons/io'
import { Button } from "../ui/button"
import { Skeleton } from '../ui/skeleton'
import { useAuth } from '@/hooks/auth/useAuth'
import { RxDashboard } from "react-icons/rx"
import { Link } from 'react-router'
import { useEffect, useState } from 'react'
import { useArtist } from '@/hooks/artist/useArtist'
import { ArtistInfoProps } from '@/hooks/artist/ArtistContext'

export const NavBarArtistSection = () => {
    const auth = useAuth()
    const artist = useArtist()
    const [artistInfo, setArtistInfo] = useState<ArtistInfoProps | undefined>(undefined)

    useEffect(() => {
        artist.getArtistInfo()
        .then(artist => setArtistInfo(artist))
    }, [])

    if (artistInfo === undefined) return <></>

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Avatar>
                        <AvatarImage src={artistInfo.artistImgUrl} width='25px' height='25px' alt="avatarUser" className='w-[25px] h-[25px] rounded-full object-cover' />
                        <AvatarFallback><Skeleton className='w-[25px] h-[25px] rounded-full' /></AvatarFallback>
                    </Avatar>
                    Mi cuenta
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='min-w-44 w-fit' align='end'>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Avatar>
                            <AvatarImage src={artistInfo.artistImgUrl} width='30px' height='30px' alt="avatarUser" className='w-[30px] h-[30px] rounded-full object-cover' />
                            <AvatarFallback>
                                <Skeleton className='w-[30px] h-[30px] rounded-full' />
                            </AvatarFallback>
                        </Avatar>
                        <p>@{artistInfo.artistUsername}</p>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link to='/artist/dashboard'><RxDashboard />Panel</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link to='/artist/dashboard/releases'><IoAlbumsOutline />Lanzamientos</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link to='/artist/dashboard/sales'><IoStatsChartOutline />Ventas</Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link to='/user/dashboard'><RxDashboard />Panel de usuario</Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={auth.logOut}>
                        <IoIosLogOut />Cerrar sesión
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}