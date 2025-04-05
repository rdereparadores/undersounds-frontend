import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/auth/useAuth"
import { useState } from "react"
import { toast } from "sonner"


export function ForgotPassword() {
    const [email, setEmail] = useState("")   
    const auth = useAuth()

    const handleSubmit = () => {
        auth.forgotPassword({ email })
        {toast("Se ha enviado el correo de recuperación")}
    }
    return (
        <Dialog>
            <DialogTrigger asChild >
                <a href='#' className='ml-auto text-sm hover:underline'>¿Olvidaste tu contraseña?</a>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Restablecer contraseña</DialogTitle>
                    <DialogDescription>
                        Te enviaremos un mensaje a tu email para que puedas restablecer tu contraseña.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="email" className="sr-only">
                            email
                        </Label>
                        <Input
                            id="email"
                            placeholder="email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="px-3" onClick={handleSubmit}>
                        Enviar
                    </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
