import { createContext } from "react";

interface ArtistReleaseContextProps {
    generateAiCover: (prompt: string) => Promise<string>
}

export const ArtistReleaseContext = createContext<ArtistReleaseContextProps>({
    generateAiCover: async () => ''
})