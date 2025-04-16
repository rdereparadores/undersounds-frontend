import { createContext } from 'react'

interface GenreContextProps {
    getAll: () => Promise<string[]>
}

export const GenreContext = createContext<GenreContextProps>({
    getAll: async () => []
})