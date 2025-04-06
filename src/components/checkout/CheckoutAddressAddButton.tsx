import { Dialog, DialogContent, DialogTrigger, DialogClose, DialogTitle, DialogHeader, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { CheckoutAddressCountrySelector } from "./CheckoutAddressCountrySelector"

export const CheckoutAddressAddButton = () => {

    return (
        <Dialog>
            <DialogTrigger>
                <Button>+ Añadir una dirección</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-bold">Nueva dirección</DialogTitle>
                    <DialogDescription>* Campo obligatorio</DialogDescription>
                </DialogHeader>

                <div className='flex flex-col gap-2'>
                    <div className='flex gap-2'>
                        <div className='flex gap-2 grow flex-col'>
                            <Label htmlFor='address-name'>* Nombre</Label>
                            <Input id='address-name' placeholder='Nombre' />
                        </div>

                        <div className='flex gap-2 grow flex-col'>
                            <Label htmlFor='address-surname'>* Apellidos</Label>
                            <Input id='address-surname' placeholder='Apellidos' />
                        </div>
                    </div>

                    <div className='flex gap-2'>
                        <div className='flex gap-2 grow flex-col'>
                            <CheckoutAddressCountrySelector />
                        </div>
                        <div className='flex gap-2 grow flex-col'>
                            <Label htmlFor='address-phone'>* Teléfono</Label>
                            <Input id='address-phone' placeholder='Teléfono' />
                        </div>
                    </div>

                    <div className='flex gap-2 flex-col'>
                        <Label htmlFor='address-address1'>* Dirección 1</Label>
                        <Input id="address-address1" placeholder="Dirección 1" />
                    </div>

                    <div className='flex gap-2 flex-col'>
                        <Label htmlFor='address-address2'>Dirección 2</Label>
                        <Input id="address-address2" placeholder="Dirección 2" />
                    </div>

                    <div className='flex gap-2'>
                        <div className='flex gap-2 grow flex-col'>
                            <Label htmlFor='address-province'>* Provincia</Label>
                            <Input id="address-province" placeholder="Provincia" />
                        </div>
                        <div className='flex gap-2 grow flex-col'>
                            <Label htmlFor='address-city'>* Ciudad</Label>
                            <Input id='address-city' placeholder='Ciudad' />
                        </div>
                    </div>

                    <div className='flex gap-2 flex-col'>
                        <Label htmlFor='address-observations'>Observaciones</Label>
                        <Input id="address-observations" placeholder="Observaciones" />
                    </div>

                    <div className='flex gap-2 flex-col'>
                        <Label htmlFor='address-alias'>* Alias</Label>
                        <Input id="address-alias" placeholder="Alias" />
                    </div>
                </div>

                <DialogFooter className='gap-y-2'>
                    <DialogClose asChild>
                        <Button variant='outline'>Cancelar</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button>Guardar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}