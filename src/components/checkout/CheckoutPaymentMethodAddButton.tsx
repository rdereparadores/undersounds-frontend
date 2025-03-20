import { Dialog, DialogContent, DialogTrigger, DialogClose, DialogTitle, DialogHeader, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const CheckoutPaymentMethodAddButton = () => (
    <Dialog>
        <DialogTrigger>
            <Button>+ Añadir un método de pago</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="font-bold">Nuevo método de pago</DialogTitle>
                <DialogDescription>Todos los campos son obligatorios</DialogDescription>
            </DialogHeader>

            <div className='flex flex-col gap-2'>

                <div className='flex gap-2 flex-col'>
                    <Label htmlFor='paymentmethod-full-name'>* Nombre completo</Label>
                    <Input id="paymentmethod-full-name" placeholder="Nombre completo" />
                </div>

                <div className='flex gap-2'>
                    <div className='flex grow-[2] flex-col gap-2'>
                        <Label htmlFor='paymentmethod-card-number'>* Número de tarjeta</Label>
                        <Input id="paymentmethod-card-number" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className='flex grow w-min flex-col gap-2'>
                        <Label htmlFor='paymentmethod-card-cvv'>* CVV</Label>
                        <Input id="paymentmethod-card-cvv" placeholder="123" />
                    </div>
                </div>
                
                <div className='flex gap-2'>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder='Mes' />
                        </SelectTrigger>

                        <SelectContent className='max-h-56'>
                            <SelectItem value='paymentmethod-card-month-january'>Enero</SelectItem>
                            <SelectItem value='paymentmethod-card-month-february'>Febrero</SelectItem>
                            <SelectItem value='paymentmethod-card-month-march'>Marzo</SelectItem>
                            <SelectItem value='paymentmethod-card-month-april'>Abril</SelectItem>
                            <SelectItem value='paymentmethod-card-month-may'>Mayo</SelectItem>
                            <SelectItem value='paymentmethod-card-month-june'>Junio</SelectItem>
                            <SelectItem value='paymentmethod-card-month-july'>Julio</SelectItem>
                            <SelectItem value='paymentmethod-card-month-august'>Agosto</SelectItem>
                            <SelectItem value='paymentmethod-card-month-september'>Septiembre</SelectItem>
                            <SelectItem value='paymentmethod-card-month-october'>Octubre</SelectItem>
                            <SelectItem value='paymentmethod-card-month-november'>Noviembre</SelectItem>
                            <SelectItem value='paymentmethod-card-month-december'>Diciembre</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder='Año' />
                        </SelectTrigger>

                        <SelectContent className='max-h-56'>
                            {Array.from(Array(10).keys()).map((e) => (
                                <SelectItem key={e} value={`paymentmethod-card-year-${2025 + e}`}>{2025 + e}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className='flex gap-2 flex-col'>
                    <Label htmlFor='paymentmethod-alias'>* Alias</Label>
                    <Input id="paymentmethod-alias" placeholder="Alias" />
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