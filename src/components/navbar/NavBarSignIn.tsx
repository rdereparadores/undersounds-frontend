import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { IoCartOutline } from 'react-icons/io5'

function NavBarSignIn({sesionIniciada}){
    return(
        <Card className='w-[100%] h-fit flex items-center justify-between p-2 flex-wrap'>
            <div className='flex gap-2 items-center justify-start'> 
                <Button>Under<br></br>Sounds</Button>
                <Input type='search' placeholder='Buscar'></Input>
            </div>
            <div className='flex items-center justify-end'>
                <Button variant='ghost'>Tienda</Button>
                <Button variant='ghost'>Iniciar sesión</Button>
                <Button>Registrarse</Button> 
                {/*<Button>
                    <IoCartOutline/>Carrito
                </Button>*/}
            </div>
        </Card>
        
    )
}

export {NavBarSignIn}