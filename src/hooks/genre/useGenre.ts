import { useContext } from 'react'
import { GenreContext } from './GenreContext'

export const useGenre = () => {
    return useContext(GenreContext)
}