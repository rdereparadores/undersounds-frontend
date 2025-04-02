import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { IoAlbumsOutline } from 'react-icons/io5'
import { useAuth } from "@/hooks/auth/useAuth"
import { Link } from "react-router"
import { Skeleton } from "../ui/skeleton"
import { RxDashboard } from "react-icons/rx"
import { SheetClose } from "../ui/sheet"
import { MdOutlineLocalShipping } from "react-icons/md"

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
                <Button variant="ghost"><IoAlbumsOutline />
                    <Link to='/user/dashboard/library'>Biblioteca</Link>
                </Button>
            </SheetClose>
            <SheetClose asChild>
                <Button variant="ghost"><MdOutlineLocalShipping />
                    <Link to='/user/dashboard/orders'>Pedidos</Link>
                </Button>
            </SheetClose>
        </>
    )
}