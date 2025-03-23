import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { Input } from "../ui/input"
import { Link } from 'react-router'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoCartOutline } from "react-icons/io5"
import { Skeleton } from "../ui/skeleton"

import { NavBarCart } from './NavBarCart'

import { NavBarUserSection } from './NavBarUserSection'
import { NavBarGuestSection } from './NavBarGuestSection'
import { NavBarArtistSection } from "./NavBarArtistSection"
import { NavBarUserSectionMobile } from "./NavBarUserSectionMobile"
import { NavBarGuestSectionMobile } from "./NavBarGuestSectionMobile"
import { NavBarArtistSectionMobile } from "./NavBarArtistSectionMobile"

import { UserRole } from '@/constants.ts'
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/auth/useAuth"
import { useNavigate } from "react-router"
import { ChangeEvent, FormEvent, useState } from "react"
import { IoIosLogOut } from 'react-icons/io'

interface NavBarProps { floating: boolean }

export const NavBar = ({ floating }: NavBarProps) => {

    const auth = useAuth()
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('')

    const onSearch = (e: FormEvent) => {
        e.preventDefault()
        navigate(`/shop?query=${searchQuery}`)

    }

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    return (
        <Card className={`${floating ? '' : 'rounded-none'} w-full h-fit flex items-center justify-between p-2`}>
            <div className='grow flex gap-2 pr-2 items-center justify-start'>
                <Button asChild>
                    <Link to='/'>Under<br />Sounds</Link>
                </Button>
                <form className='w-full sm:w-[50%]' onSubmit={onSearch}>
                    <Input name='search' type='search' placeholder='Buscar' onChange={onSearchChange}></Input>
                </form>
            </div>

            {/* NavBar de PC */}
            <div className='items-stretch gap-2 justify-end hidden sm:flex'>
                <Button asChild variant='ghost'>
                    <Link to='/shop'>Tienda</Link>
                </Button>

                {(() => {
                    if (auth.token === undefined) {
                        return <Skeleton className='w-56' />
                    }
                    switch (auth.userRole) {
                        case UserRole.GUEST:
                            return <NavBarGuestSection />
                        case UserRole.USER:
                            return <NavBarUserSection />
                        case UserRole.ARTIST:
                            return <NavBarArtistSection />
                    }
                })()}

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <NavBarCart />
                        </TooltipTrigger>
                        <TooltipContent>Carrito</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            {/* NavBar de móvil */}
            <div className='sm:hidden'>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline"><GiHamburgerMenu /></Button>
                    </SheetTrigger>

                    <SheetContent className="flex flex-col">
                        <SheetHeader>
                            <SheetTitle />
                            <SheetDescription />
                        </SheetHeader>

                        <SheetClose asChild>
                            <Button asChild variant="outline">
                                <Link to='/shop'>Tienda</Link>
                            </Button>
                        </SheetClose>
                        <SheetClose asChild>
                            <Button asChild>
                                <Link to='/shop/cart'>
                                    <IoCartOutline /> Carrito
                                </Link>
                            </Button>
                        </SheetClose>

                        <Separator />

                        {(() => {
                            if (auth.token === undefined) {
                                return <Skeleton className='h-56' />
                            }
                            switch (auth.userRole) {
                                case UserRole.GUEST:
                                    return <NavBarGuestSectionMobile />
                                case UserRole.USER:
                                    return <NavBarUserSectionMobile />
                                case UserRole.ARTIST:
                                    return <NavBarArtistSectionMobile />
                            }
                        })()}

                        <Separator />

                        <Button variant="ghost" onClick={auth.logOut}> <IoIosLogOut />Cerrar sesión</Button>
                    </SheetContent>
                </Sheet>
            </div>
        </Card>
    )
}