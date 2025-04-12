import { useContext } from 'react'
import { ArtistContext } from './ArtistContext'

export const useArtist = () => {
    return useContext(ArtistContext)
}