import { useState } from "react"
import { ProductContext, ProductContextQueryProps, ProductContextResultProps, ProductContextResultShortProps } from "./ProductContext"

interface ProductProviderProps {
    children: React.ReactNode
}

export const ProductProvider = ({ children }: ProductProviderProps) => {

    const [queryResult, setQueryResult] = useState<undefined | ProductContextResultProps>(undefined)
    const [queryResultShort, setQueryResultShort] = useState<undefined | ProductContextResultShortProps>(undefined)

    const queryProduct = async ({ type, id }: ProductContextQueryProps) => {
        setQueryResult({
            product: {
                title: "Echoes of Time",
                id: id,
                type: type,
                artists: [
                    { name: "Stellar Waves", "id": 28 },
                    { name: "DJ Quantum", "id": 33 }
                ],
                duration: 3842,
                date: "2025-01-10",
                genres: ["Ambient", "Electronic", "Experimental"],
                description: "Echoes of Time es una exploración sonora de los conceptos de pasado y futuro. Compuesto durante un retiro en Islandia, este álbum fusiona grabaciones de campo con sintetizadores modulares para crear paisajes sonoros inmersivos que invitan a la reflexión y contemplación.",
                imgUrl: "https://picsum.photos/id/96/400/400",
                trackList: [
                    {
                        title: "Frozen Memories",
                        id: 1,
                        artists: [{ name: "Stellar Waves", id: 28 }],
                        type: "song",
                        genres: ["Ambient", "Electronic"],
                        duration: 342,
                        imgUrl: "https://picsum.photos/id/96/300/300"
                    },
                    {
                        title: "Digital Dreams",
                        id: 2,
                        artists: [
                            { "name": "Stellar Waves", "id": 28 },
                            { "name": "DJ Quantum", "id": 33 }
                        ],
                        type: "song",
                        genres: ["Electronic", "Experimental"],
                        duration: 287,
                        imgUrl: "https://picsum.photos/id/96/300/300"
                    },
                    {
                        title: "Northern Lights",
                        id: 3,
                        artists: [{ "name": "Stellar Waves", "id": 28 }],
                        type: "song",
                        genres: ["Ambient"],
                        duration: 423,
                        imgUrl: "https://picsum.photos/id/96/300/300"
                    }
                ],
                price: {
                    digital: 8.99,
                    cd: 13.50,
                    vinyl: 26.99,
                    cassette: 11.99
                }
            },
            artist: {
                name: "Stellar Waves",
                id: 28,
                followers: 87632,
                isFollowing: true,
                imgUrl: "https://picsum.photos/id/65/300/300"
            },
            ratings: {
                average: 4.7,
                ratingCount: {
                    5: 214,
                    4: 68,
                    3: 12,
                    2: 5,
                    1: 3
                },
                list: [
                    {
                        "userImgUrl": "https://picsum.photos/id/237/50/50",
                        "username": "ambient_lover",
                        "title": "Una obra maestra ambiental",
                        "description": "Como fanático de la música ambient, puedo decir que este álbum es una de las mejores producciones del año. La atmósfera que crea es inmersiva y transportadora.",
                        "rating": 5
                    },
                    {
                        "userImgUrl": "https://picsum.photos/id/1027/50/50",
                        "username": "electronic_enthusiast",
                        "title": "Innovador y cautivador",
                        "description": "La combinación de grabaciones de campo y sintetizadores es simplemente perfecta. 'Northern Lights' es una experiencia transcendental.",
                        "rating": 5
                    },
                    {
                        "userImgUrl": "https://picsum.photos/id/1025/50/50",
                        "username": "casual_listener",
                        "title": "Muy relajante",
                        "description": "Lo escucho mientras trabajo y me ayuda a concentrarme. No es mi género habitual pero me ha sorprendido gratamente.",
                        "rating": 4
                    },
                    {
                        "userImgUrl": "https://picsum.photos/id/1074/50/50",
                        "username": "music_critic_101",
                        "title": "Interesante pero repetitivo",
                        "description": "Hay momentos brillantes pero algunas pistas son demasiado similares. Buena producción en general, pero esperaba más variedad temática.",
                        "rating": 3
                    },
                    {
                        "userImgUrl": "https://picsum.photos/id/177/50/50",
                        "username": "vinyl_collector",
                        "title": "Impresionante en formato vinilo",
                        "description": "La edición en vinilo suena excepcional, con detalles sonoros que se pierden en la versión digital. Artwork precioso y calidad de prensado superior.",
                        "rating": 5
                    }
                ]
            },
            related: [{
                title: "Frozen Memories",
                id: 1,
                artists: [{ name: "Stellar Waves", id: 28 }],
                type: "song",
                genres: ["Ambient", "Electronic"],
                duration: 342,
                imgUrl: "https://picsum.photos/id/96/300/300"
            }]
        })
    }

    const queryProductShort = async ({ type, id }: ProductContextQueryProps) => {
        setQueryResultShort({
            title: "Dancing in Shadows",
            id: id,
            artists: [
                { name: "Alex Rivera", "id": 23 },
                { name: "Lunar Beats", "id": 45 }
            ],
            type: type,
            genres: ["Electronic", "Deep House"],
            duration: 247,
            imgUrl: "https://picsum.photos/id/64/300/300"
        })
    }

    return (
        <ProductContext.Provider value={{ queryProduct, queryProductShort, queryResult, queryResultShort }}>
            {children}
        </ProductContext.Provider>
    )
}