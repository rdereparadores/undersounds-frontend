import { Card, CardContent,CardHeader} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogClose, DialogTitle} from "@/components/ui/dialog"

import {Select, SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"

import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

function DatosPersonales() {
    return (
        <Card className="p-4 grow">
            <CardHeader className="text-3xl font-bold">Datos de entrega</CardHeader>

            <CardContent>
                <p className="text-lg font-bold">Direcciones de envio</p>

                <RadioGroup defaultValue="option-one" className="p-1">
                    <div className="flex flex-wrap items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one"/>
                        <div>
                            <p className="font-medium flex self-center">Nombre Apellido1 Apellido2</p>
                            <p>Avenida de la Universidad S/N, Norte, 10003, Cáceres</p>
                            <p>Entregar en despacho 53</p>
                        </div>
                        <Label htmlFor="option-one"></Label>
                    </div>
                    <div className="flex flex-wrap items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two"/>
                        <div>
                            <p className="font-medium flex self-center">Nombre Apellido1 Apellido2</p>
                            <p>Avenida de la Universidad S/N, Norte, 10003, Cáceres</p>
                            <p>Entregar en despacho 53</p>
                        </div>
                        <Label htmlFor="option-two"></Label>
                    </div>
                </RadioGroup>
                <Separator className="mb-4 mt-4"/>
                <Dialog>
                    <DialogTrigger> <Button> + Añadir otra dirección </Button></DialogTrigger>
                    <DialogContent>
                        <DialogTitle className="font-bold">Añadir otra dirección</DialogTitle>
                        
                        <div className="grid w-full max-w-sm items-center justify-center gap-1.5">

                            <div className='flex flex-row gap-2'>
                                <div className='grid gap-2'>
                                    <Label htmlFor='name'>Nombre*</Label>
                                    <Input id='name' placeholder='Nombre' />
                                </div>

                                <div className='grid gap-2'>
                                    <Label htmlFor='surname'>Apellidos*</Label>
                                    <Input id='surname' placeholder='Apellido' />
                                </div>
                            </div>

                            <div className='flex flex-row gap-2'>
                                <div className='grid gap-2 grow'>
                                    <Label>País*</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="País" />
                                        </SelectTrigger>
                                        <SelectContent id="country">
                                            <SelectItem value="alemania">Alemania</SelectItem>
                                            <SelectItem value="andorra">Andorra</SelectItem>
                                            <SelectItem value="australia">Australia</SelectItem>
                                            <SelectItem value="austria">Austria</SelectItem>
                                            <SelectItem value="bélgica">Bélgica</SelectItem>
                                            <SelectItem value="brasil">Brasil</SelectItem>
                                            <SelectItem value="canadá">Canadá</SelectItem>
                                            <SelectItem value="china">China</SelectItem>
                                            <SelectItem value="dinamarca">Dinamarca</SelectItem>
                                            <SelectItem value="egipto">Egipto</SelectItem>
                                            <SelectItem value="emiratos_árabes_unidos">Emiratos Árabes Unidos</SelectItem>
                                            <SelectItem value="españa">España</SelectItem>
                                            <SelectItem value="estados_unidos">Estados Unidos</SelectItem>
                                            <SelectItem value="francia">Francia</SelectItem>
                                            <SelectItem value="grecia">Grecia</SelectItem>
                                            <SelectItem value="india">India</SelectItem>
                                            <SelectItem value="irlanda">Irlanda</SelectItem>
                                            <SelectItem value="italia">Italia</SelectItem>
                                            <SelectItem value="japón">Japón</SelectItem>
                                            <SelectItem value="méxico">México</SelectItem>
                                            <SelectItem value="noruega">Noruega</SelectItem>
                                            <SelectItem value="países_bajos">Países Bajos</SelectItem>
                                            <SelectItem value="polonia">Polonia</SelectItem>
                                            <SelectItem value="portugal">Portugal</SelectItem>
                                            <SelectItem value="reino_unido">Reino Unido</SelectItem>
                                            <SelectItem value="suecia">Suecia</SelectItem>
                                            <SelectItem value="suiza">Suiza</SelectItem>
                                            <SelectItem value="turquía">Turquía</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className='grid gap-2'>
                                    <Label>Teléfono*</Label>
                                    <Input id="phone" placeholder="Teléfono" />
                                </div>
                            </div>

                            <Label>Direción 1*</Label>
                            <Input id="dir1" placeholder="Dirección 1" />

                            <Label>Direción 2</Label>
                            <Input id="dir2" placeholder="Dirección 2" />

                            <Label>Provincia*</Label>
                            <Input id="provincia" placeholder="Provincia" />

                            <Label>Ciudad*</Label>
                            <Input id="ciudad" placeholder="Ciudad" />
                        </div>

                        <div className="flex justify-end gap-2">
                            <DialogClose asChild>
                                <Button variant="destructive" type="button">Cancelar</Button>     
                            </DialogClose>   
                            <DialogClose asChild>
                                <Button className="flex bg-green-500 hover:bg-green-600" type="button">Guardar</Button>
                            </DialogClose> 
                        </div>        
                    </DialogContent>
                </Dialog>


                {/**
                 *  Division entre datos de envio y de facturación
                 */}
                 

                <p className="text-lg font-bold mt-4">Datos de facturación</p>

                <RadioGroup defaultValue="option-one" className="p-1">
                    <div className="flex flex-wrap items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one"/>
                        <div>
                            <p className="font-medium flex self-center">Nombre Apellido1 Apellido2</p>
                            <p>Avenida de la Universidad S/N, Norte, 10003, Cáceres</p>    
                        </div>
                        <Label htmlFor="option-one"></Label>
                    </div>
                </RadioGroup>
                <Separator className="mb-4 mt-4"/>
                <Dialog>
                    <DialogTrigger><Button> + Añadir datos de facturación</Button></DialogTrigger>
                    <DialogContent>
                        <p className="text-lg font-bold">Añadir otra dirección</p>

                        <div className="grid w-full max-w-sm items-center justify-center gap-1.5">

                            <div className='flex flex-row gap-2'>
                                <div className='grid gap-2'>
                                    <Label htmlFor='name'>Nombre*</Label>
                                    <Input id='name' placeholder='Nombre' />
                                </div>

                                <div className='grid gap-2'>
                                    <Label htmlFor='surname'>Apellidos*</Label>
                                    <Input id='surname' placeholder='Apellido' />
                                </div>
                            </div>

                            <div className='flex flex-row gap-2'>
                                <div className='grid gap-2 grow'>
                                    <Label>País*</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="País" />
                                        </SelectTrigger>
                                        <SelectContent id="country">
                                            <SelectItem value="alemania">Alemania</SelectItem>
                                            <SelectItem value="andorra">Andorra</SelectItem>
                                            <SelectItem value="australia">Australia</SelectItem>
                                            <SelectItem value="austria">Austria</SelectItem>
                                            <SelectItem value="bélgica">Bélgica</SelectItem>
                                            <SelectItem value="brasil">Brasil</SelectItem>
                                            <SelectItem value="canadá">Canadá</SelectItem>
                                            <SelectItem value="china">China</SelectItem>
                                            <SelectItem value="dinamarca">Dinamarca</SelectItem>
                                            <SelectItem value="egipto">Egipto</SelectItem>
                                            <SelectItem value="emiratos_árabes_unidos">Emiratos Árabes Unidos</SelectItem>
                                            <SelectItem value="españa">España</SelectItem>
                                            <SelectItem value="estados_unidos">Estados Unidos</SelectItem>
                                            <SelectItem value="francia">Francia</SelectItem>
                                            <SelectItem value="grecia">Grecia</SelectItem>
                                            <SelectItem value="india">India</SelectItem>
                                            <SelectItem value="irlanda">Irlanda</SelectItem>
                                            <SelectItem value="italia">Italia</SelectItem>
                                            <SelectItem value="japón">Japón</SelectItem>
                                            <SelectItem value="méxico">México</SelectItem>
                                            <SelectItem value="noruega">Noruega</SelectItem>
                                            <SelectItem value="países_bajos">Países Bajos</SelectItem>
                                            <SelectItem value="polonia">Polonia</SelectItem>
                                            <SelectItem value="portugal">Portugal</SelectItem>
                                            <SelectItem value="reino_unido">Reino Unido</SelectItem>
                                            <SelectItem value="suecia">Suecia</SelectItem>
                                            <SelectItem value="suiza">Suiza</SelectItem>
                                            <SelectItem value="turquía">Turquía</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className='grid gap-2 '>
                                    <Label>Teléfono*</Label>
                                    <Input id="phone" placeholder="Teléfono" />
                                </div>
                            </div>

                            <Label>Direción 1*</Label>
                            <Input id="dir1" placeholder="Dirección 1" />

                            <Label>Direción 2</Label>
                            <Input id="dir2" placeholder="Dirección 2" />

                            <Label>Provincia*</Label>
                            <Input id="provincia" placeholder="Provincia" />

                            <Label>Ciudad*</Label>
                            <Input id="ciudad" placeholder="Ciudad" />
                        </div>

                        <div className="flex justify-end gap-2">
                            <DialogClose asChild>
                                <Button variant="destructive" type="button">Cancelar</Button>     
                            </DialogClose>   
                            <DialogClose asChild>
                                <Button className="flex bg-green-500 hover:bg-green-600" type="button">Guardar</Button>
                            </DialogClose> 
                        </div>
                    </DialogContent>
                </Dialog>

            </CardContent>
        </Card>)
}

export { DatosPersonales }