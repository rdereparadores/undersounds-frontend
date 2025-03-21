import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'

interface IndexGenresPanelGenreProps {
    name: string,
    gradientFrom: string,
    gradientTo: string,
    genre?: string
}

const IndexGenresPanelGenre = ({ name, gradientFrom, gradientTo, genre }: IndexGenresPanelGenreProps) => {
    const navigate = useNavigate()
    return (
        <Button onClick={() => { navigate(`/shop/${genre ? '?genre=' + genre : ''}`) }} className={`h-36 flex-1 min-w-28 bg-gradient-to-tr ${gradientFrom} ${gradientTo}`}>{name}</Button>
    )
}

export const IndexGenresPanel = () => (
    <div className='w-5/6 h-fit'>
        <h2 className='text-xl font-medium mb-2'>Géneros destacados</h2>
        <div className='flex flex-wrap justify-evenly gap-5'>
            <IndexGenresPanelGenre genre='pop' name='Pop' gradientFrom="from-pink-400" gradientTo="to-pink-600" />
            <IndexGenresPanelGenre genre='rock' name='Rock' gradientFrom="from-indigo-900" gradientTo="to-black" />
            <IndexGenresPanelGenre genre='techno' name='Techno' gradientFrom="from-green-400" gradientTo="to-blue-600" />
            <IndexGenresPanelGenre genre='reggae' name='Reggae' gradientFrom="from-yellow-400" gradientTo="to-red-600" />
            <IndexGenresPanelGenre genre='hip-hop' name='Hip-Hop' gradientFrom="from-yellow-500" gradientTo="to-purple-900" />
            <IndexGenresPanelGenre name='Ver más' gradientFrom="from-black" gradientTo="to-black" />
        </div>
    </div>
)