import { createContext } from "react"
import { ProductContextResultShortProps } from "../product/ProductContext"

/*interface GlobalStatsContextAlbum {
    id: number
}*/

interface GlobalStatsContextProps {
    top10Songs : () => Promise<ProductContextResultShortProps[]>
}

export const GlobalStatsContext = createContext<GlobalStatsContextProps>({
    top10Songs: async () => ([]),
})
