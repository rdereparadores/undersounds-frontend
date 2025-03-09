import { Card} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { IoAlbumsOutline, IoCartOutline } from 'react-icons/io5'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { IoAlarmOutline } from 'react-icons/io5'
import {PiVinylRecord} from "react-icons/pi"
import { IoStatsChartOutline } from 'react-icons/io5'
import {IoIosLogOut} from 'react-icons/io'


function NavBarLogIn({sesionIniciada}){
    return(
        <Card className='w-[100%] h-fit flex items-center justify-between p-2 flex-wrap'>
            <div className='flex gap-2 items-center justify-start'> 
                <Button>Under<br></br>Sounds</Button>
                <Input type='search' placeholder='Buscar'></Input>
            </div>
            <div className='flex items-center gap-3 justify-end'>
                <Button variant='ghost'>Tienda</Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                        <Avatar>
                            <AvatarImage src="https://picsum.photos/30" alt="avatarUser" className='rounded-full'></AvatarImage>
                            <AvatarFallback>User</AvatarFallback>
                        </Avatar>
                        Mi cuenta
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-44 felx ' align='end'>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                            <Avatar>
                                <AvatarImage src="https://picsum.photos/30" alt="avatarUser" className='rounded-full'></AvatarImage>
                                <AvatarFallback>User</AvatarFallback>
                            </Avatar>   
                            <p>Nombre Usuario</p>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                               <PiVinylRecord/>Canciones
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <IoAlbumsOutline/>Álbumes
                            </DropdownMenuItem>
                        </DropdownMenuGroup> 
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <IoStatsChartOutline/>Estadísticas
                            </DropdownMenuItem>
                        </DropdownMenuGroup> 
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <IoIosLogOut />Cerrar sesión
                            </DropdownMenuItem>
                        </DropdownMenuGroup> 
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button>
                    <IoCartOutline/>Carrito
                </Button>
            </div>
        </Card>
        
    )
}

export {NavBarLogIn}