import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export const CheckoutAddressCountrySelector = () => (
    <>
        <Label htmlFor='address-country'>* País</Label>
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="País" />
            </SelectTrigger>
            <SelectContent id="address-country">
                <SelectGroup>
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
                </SelectGroup>
            </SelectContent>
        </Select>
    </>
)