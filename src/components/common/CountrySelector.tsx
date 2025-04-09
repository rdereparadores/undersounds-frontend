import { useState } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import countries from 'i18n-iso-countries'
import es from 'i18n-iso-countries/langs/es.json'
import { Input } from "../ui/input"
import { ChevronsUpDown } from "lucide-react"

countries.registerLocale(es)

export const CountrySelector = ({ setValue }: { setValue: (newVal: string) => void }) => {
    const [open, setOpen] = useState(false)
    const [countryName, setCountryName] = useState('')
    const countryObject = countries.getNames('es', { select: 'official' })
    const countryList = Object.keys(countryObject).map(code => ({
        code,
        name: countryObject[code]
    }))

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className="relative">
                    <Input readOnly value={countryName} />
                    <ChevronsUpDown className="absolute right-1 top-[6px] opacity-50" />
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <Command>
                    <CommandInput placeholder='Selecciona un país...' />
                    <CommandList>
                        <CommandEmpty>Ningún país encontrado</CommandEmpty>
                        <CommandGroup>
                            {countryList.map(country => (
                                <CommandItem
                                    key={country.code}
                                    value={country.name}
                                    onSelect={() => {
                                        setValue(country.code)
                                        setCountryName(country.name)
                                        setOpen(false)
                                    }}
                                >
                                    {country.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}