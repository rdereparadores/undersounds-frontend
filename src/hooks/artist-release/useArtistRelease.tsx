import { useContext } from 'react'
import { ArtistReleaseContext } from './ArtistReleaseContext'

export const useArtistRelease = () => {
    return useContext(ArtistReleaseContext)
}