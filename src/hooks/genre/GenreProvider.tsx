import { api } from "@/lib/api"
import { GenreContext } from "./GenreContext"

export const GenreProvider = ({ children }: { children: React.ReactNode }) => {

    const getAll = async () => {
        const result = await api.get('/api/genre/all')
        return result.data.data.genres
    }

    return (
        <GenreContext.Provider value={{ getAll }}>
            { children }
        </GenreContext.Provider>
    )
}