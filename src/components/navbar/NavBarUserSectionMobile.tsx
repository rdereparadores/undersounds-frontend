import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { IoAlbumsOutline } from 'react-icons/io5'
import { useAuth } from "@/hooks/auth/useAuth"
import { Link } from "react-router"
import { Skeleton } from "../ui/skeleton"
import { RxDashboard } from "react-icons/rx"
import { SheetClose } from "../ui/sheet"
import { MdOutlineLocalShipping } from "react-icons/md"
import { useEffect, useState } from "react"
import { useUser } from "@/hooks/user/useUser"
import { UserInfoProps } from "@/hooks/user/userContext"
import { Separator } from "../ui/separator"
import { IoIosLogOut } from "react-icons/io"

export const NavBarUserSectionMobile = () => {
    const auth = useAuth()
    const user = useUser()
    const [userInfo, setUserInfo] = useState<UserInfoProps | undefined>(undefined)

    useEffect(() => {
        user.getUserInfo()
            .then(user => setUserInfo(user))
    }, [])

    if (userInfo === undefined) return <></>

    return (
        <>
            <Button variant="outline">
                <Avatar>
                    <AvatarImage src={userInfo.imgUrl} width='25px' height='25px' alt="avatarUser" className='rounded-full'></AvatarImage>
                    <AvatarFallback>
                        <Skeleton className='w-[25px] h-[25px] rounded-full' />
                    </AvatarFallback>
                </Avatar>
                @{userInfo.userName}
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
            <Separator />
            <Button variant="ghost" onClick={auth.logOut}> <IoIosLogOut />Cerrar sesión</Button>
        </>
    )
}