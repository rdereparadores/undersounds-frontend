import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useGenre } from "@/hooks/genre/useGenre"
import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router"

export const ShopFilters = () => {
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const genre = useGenre()
    const [date, setDate] = useState(params.get('date'))
    const [genreList, setGenreList] = useState(params.get('genre')?.split(',') || [])
    const [ genres, setGenres ] = useState<string[]>([])

    useEffect(() => {
        genre.getAll().then(genreResult => setGenres(genreResult))
    }, [])
    
    const applyFilters = () => {
        if (date) {
            params.set('date', date!)
        } else {
            params.delete('date')
        }
        
        if (genreList.length > 0) {
            params.set('genre', genreList.join(','))
        } else {
            params.delete('genre')
        }

        navigate('?' + params.toString())
    }

    const onGenreChange = (value: string) => {
        if (genreList.some(item => item === value)) {
            setGenreList(genreList.filter(item => item !== value))
        } else {
            setGenreList([...genreList, value])
        }
    }

    const onDateChange = (value: string) => {
        setDate(value)
    }

    return (
        <Card className='w-full sm:w-[300px] flex-shrink-0'>
            <CardHeader>
                <CardTitle>
                    <h3 className='font-medium text-xl'>Filtros</h3>
                </CardTitle>
            </CardHeader>

            <CardContent>
                <Accordion type='multiple' className='w-full'>
                    <AccordionItem value='filter-genre'>
                        <AccordionTrigger>
                            Género
                        </AccordionTrigger>
                        <AccordionContent className='flex gap-2 flex-wrap'>
                            {genres.sort((a, b) => {
                                const aInGenreList = genreList.some(item => item === a)
                                const bInGenreList = genreList.some(item => item === b)
                                if (aInGenreList === bInGenreList) {
                                    return a.localeCompare(b)
                                } else if (aInGenreList && !bInGenreList) {
                                    return -1
                                } else {
                                    return 1
                                }
                            }).map((genre, index) => (
                                <Badge key={index}
                                    className='hover:cursor-pointer'
                                    variant={
                                        genreList.some(item => item === genre) ? 'default' : 'outline'
                                    }
                                    onClick={() => { onGenreChange(genre) }}
                                >
                                    {genre}
                                </Badge>
                            ))}
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value='filter-date'>
                        <AccordionTrigger>
                            Fecha de publicación
                        </AccordionTrigger>
                        <AccordionContent>
                            <Button onClick={() => {setDate(null)}} variant='link' className='font-normal p-0 mb-2'>Restablecer filtro</Button>
                            <RadioGroup defaultValue={date!} value={date || ''} onValueChange={onDateChange}>
                                <div className='flex items-center space-x-2'>
                                    <RadioGroupItem value='today' id='today' />
                                    <Label htmlFor='today'>Hoy</Label>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <RadioGroupItem value='week' id='week' />
                                    <Label htmlFor='week'>En la última semana</Label>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <RadioGroupItem value='month' id='month' />
                                    <Label htmlFor='month'>En el último mes</Label>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <RadioGroupItem value='3months' id='3months' />
                                    <Label htmlFor='3months'>En los últimos 3 meses</Label>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <RadioGroupItem value='6months' id='6months' />
                                    <Label htmlFor='6months'>En los últimos 6 meses</Label>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <RadioGroupItem value='year' id='year' />
                                    <Label htmlFor='year'>En el último año</Label>
                                </div>
                            </RadioGroup>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>

            <CardFooter>
                <Button onClick={applyFilters} className='w-full'>Aplicar filtros</Button>
            </CardFooter>
        </Card>
    )
}