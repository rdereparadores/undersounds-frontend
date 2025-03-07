import { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion.tsx';
import * as Slider from '@radix-ui/react-slider';

export default function Filters() {
    const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
    const [dateFilter, setDateFilter] = useState<string>('all');
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    const genres: string[] = ['Rock', 'Jazz', 'Pop', 'Rap', 'Soul', 'Gospel', 'Metal', 'Corridos', 'Blues', 'Classical'];

    const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const genre: string = e.target.value;
        if (e.target.checked) {
            setSelectedGenres([...selectedGenres, genre]);
        } else {
            setSelectedGenres(selectedGenres.filter((g: string) => g !== genre));
        }
    };

    const handlePriceChange = (value: number[]) => {
        setPriceRange(value);
    };

    const getDateLabel = (value: string) => {
        switch (value) {
            case '1d':
                return 'Hace 1 día';
            case '1w':
                return 'Hace 1 semana';
            case '1m':
                return 'Hace 1 mes';
            default:
                return 'Más de 1 mes';
        }
    };

    return (
        <div className="bg-white p-4 shadow rounded flex flex-col gap-4 h-full">
            <h3 className="text-xl font-bold">
                Filtros
            </h3>
            {/* Mostrar filtros seleccionados */}
            <div className="text-xs text-gray-600 mt-2">
                {selectedGenres.length > 0 && (
                    <div>
                        <strong>Géneros &gt;</strong> {selectedGenres.join(', ')}
                    </div>
                )}
                {(priceRange[0] !== 0 || priceRange[1] !== 500) && (
                    <div>
                        <strong>Precio &gt;</strong> ${priceRange[0]} - ${priceRange[1]}
                    </div>
                )}
                {dateFilter !== 'all' && (
                    <div>
                        <strong>Fecha de Publicación &gt;</strong> {getDateLabel(dateFilter)}
                    </div>
                )}
            </div>

            <Accordion type="multiple">
                {/* Filtro por Género */}
                <AccordionItem value="genero">
                    <AccordionTrigger>Género</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-2">
                            {genres.map((genre: string) => (
                                <label key={genre}>
                                    <input
                                        type="checkbox"
                                        value={genre}
                                        checked={selectedGenres.includes(genre)}
                                        onChange={handleGenreChange}
                                        className="mr-2"
                                    />
                                    {genre}
                                </label>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Filtro por Precio */}
                <AccordionItem value="precio">
                    <AccordionTrigger>Precio</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-4">
                            <Slider.Root
                                className="relative flex items-center select-none touch-none w-full h-5"
                                value={priceRange}
                                onValueChange={handlePriceChange}
                                min={0}
                                max={500}
                                step={1}
                            >
                                <Slider.Track className="bg-gray-200 relative grow rounded-full h-1">
                                    <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
                                </Slider.Track>
                                <Slider.Thumb
                                    className="block w-5 h-5 bg-white border border-gray-300 rounded-full shadow-md"
                                    aria-label="Precio mínimo"
                                />
                                <Slider.Thumb
                                    className="block w-5 h-5 bg-white border border-gray-300 rounded-full shadow-md"
                                    aria-label="Precio máximo"
                                />
                            </Slider.Root>
                            <div className="flex justify-between text-sm">
                                <span>${priceRange[0]}</span>
                                <span>${priceRange[1]}</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Filtro por Fecha de Publicación */}
                <AccordionItem value="fecha-publicacion">
                    <AccordionTrigger>Fecha de Publicación</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-2">
                            {[
                                { label: 'Hace 1 día', value: '1d' },
                                { label: 'Hace 1 semana', value: '1w' },
                                { label: 'Hace 1 mes', value: '1m' },
                                { label: 'Más de 1 mes', value: 'all' },
                            ].map((option) => (
                                <label key={option.value}>
                                    <input
                                        type="radio"
                                        name="dateFilter"
                                        value={option.value}
                                        checked={dateFilter === option.value}
                                        onChange={() => setDateFilter(option.value)}
                                        className="mr-2"
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Button>Filtrar</Button>
        </div>
    );
}
