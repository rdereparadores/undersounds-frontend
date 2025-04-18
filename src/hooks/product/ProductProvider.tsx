import { useState } from "react"
import {
    ProductContext,
    ProductContextQueryProps,
    ProductContextResultProps,
    ProductContextResultShortProps,
    Artist,
    Product,
    ProductContextResultPropsArtist,
    Ratings,
    RatingCount,
    List,
    Price
} from "./ProductContext"
import { toast } from "sonner"
import { api } from '@/lib/api'

interface ProductProviderProps {
    children: React.ReactNode
}

interface SongData {
    _id: string;
    title: string;
    releaseDate: string;
    description: string;
    imgUrl: string;
    productType: string;
    author: string;
    duration: number;
    plays: number;
    genres: string[];
    pricing: {
        digital: number;
        cd: number;
        vinyl: number;
        cassette: number;
    };
}

interface Rating {
    rating: number;
    title: string;
    description: string;
    author: {
        _id: string;
        username: string;
        imgUrl: string;
    };
    publishDate: string;
}

interface SongInfoResponse {
    data: {
        song: SongData;
        recommendations: SongData[];
    };
}

interface SongRatingResponse {
    data: {
        ratings: Rating[];
        averageRating: number;
        totalRatings: number;
    };
}

interface ArtistProfileResponse {
    data: {
        artistName: string;
        artistUsername: string;
        artistImgUrl: string;
        artistBannerUrl: string;
    };
}

interface ArtistFollowingResponse {
    data: {
        following: boolean;
    };
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
    const [queryResult, setQueryResult] = useState<undefined | ProductContextResultProps>(undefined)
    const [queryResultShort, setQueryResultShort] = useState<undefined | ProductContextResultShortProps>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const queryProduct = async ({ type, id }: ProductContextQueryProps) => {
        if (!id) {
            toast.error("ID de producto no proporcionado")
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            if (type === 'song') {
                const songInfoResponse = await api.post<SongInfoResponse>('/api/song/info', { songId: id })

                if (!songInfoResponse.data?.data?.song) {
                    toast.error("Error obteniendo información de la canción")
                    setIsLoading(false)
                    return
                }

                const songData = songInfoResponse.data.data.song
                const recommendations = songInfoResponse.data.data.recommendations || []

                const songRatingResponse = await api.post<SongRatingResponse>('/api/song/ratings', { songId: id })

                if (!songRatingResponse.data?.data) {
                    toast.error("Error obteniendo valoraciones")
                    setIsLoading(false)
                    return
                }

                const ratingsData = songRatingResponse.data.data

                let artistData = {
                    artistName: "Artista Desconocido",
                    artistUsername: "unknown_artist",
                    artistImgUrl: "/placeholder-artist.jpg",
                    artistBannerUrl: ""
                }

                let isFollowing = false

                try {
                    const artistResponse = await api.get<ArtistProfileResponse>('/api/artist/profile')
                    artistData = artistResponse.data.data

                    const followingResponse = await api.post<ArtistFollowingResponse>('/api/user/is-following', {
                        artistUsername: artistData.artistUsername
                    })

                    isFollowing = followingResponse.data.data.following
                } catch (error) {
                    console.warn("No se pudo obtener información del artista: ", error)
                }

                const price: Price = {
                    digital: songData.pricing.digital,
                    cd: songData.pricing.cd,
                    vinyl: songData.pricing.vinyl,
                    cassette: songData.pricing.cassette
                }

                const artists: Artist[] = [{
                    name: artistData.artistName,
                    id: songData.author
                }]

                const product: Product = {
                    title: songData.title,
                    id: songData._id,
                    type: 'song',
                    artists: artists,
                    duration: songData.duration,
                    date: songData.releaseDate,
                    genres: songData.genres || [],
                    description: songData.description,
                    imgUrl: songData.imgUrl,
                    price: price
                }

                const artist: ProductContextResultPropsArtist = {
                    name: artistData.artistName,
                    id: songData.author,
                    followers: 1500,
                    isFollowing: isFollowing,
                    imgUrl: artistData.artistImgUrl
                }

                const ratingCount: RatingCount = {
                    five: ratingsData.ratings.filter(r => r.rating === 5).length,
                    four: ratingsData.ratings.filter(r => r.rating === 4).length,
                    three: ratingsData.ratings.filter(r => r.rating === 3).length,
                    two: ratingsData.ratings.filter(r => r.rating === 2).length,
                    one: ratingsData.ratings.filter(r => r.rating === 1).length
                }

                const list: List[] = ratingsData.ratings.map(rating => ({
                    userImgUrl: rating.author.imgUrl || "/placeholder-user.jpg",
                    username: rating.author.username,
                    title: rating.title,
                    description: rating.description,
                    rating: rating.rating
                }))

                const ratings: Ratings = {
                    average: ratingsData.averageRating,
                    ratingCount: ratingCount,
                    list: list
                }

                const related: ProductContextResultShortProps[] = recommendations.map(rec => ({
                    title: rec.title,
                    id: rec._id,
                    artists: [{
                        name: artistData.artistName,
                        id: rec.author
                    }],
                    type: 'song',
                    genres: rec.genres || [],
                    duration: rec.duration,
                    imgUrl: rec.imgUrl,
                    price: {
                        digital: rec.pricing.digital,
                        cd: rec.pricing.cd,
                        vinyl: rec.pricing.vinyl,
                        cassette: rec.pricing.cassette
                    }
                }))

                setQueryResult({
                    product,
                    artist,
                    ratings,
                    related
                })
            } else if (type === 'album') {
                toast.error('Consulta de álbumes no implementada aún')
            } else {
                toast.error(`Tipo de producto no soportado: ${type}`)
            }
        } catch (err) {
            console.error("Error al obtener información del producto:", err)
            toast.error("Error al obtener información del producto")
            setQueryResult(undefined)
        } finally {
            setIsLoading(false)
        }
    }

    const queryProductShort = async ({ type, id }: ProductContextQueryProps) => {
        if (!id) {
            toast.error("ID de producto no proporcionado")
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            if (type === 'song') {
                const response = await api.post<SongInfoResponse>('/api/song/info', { songId: id })

                if (!response.data?.data?.song) {
                    toast.error("Error obteniendo información de la canción")
                    setIsLoading(false)
                    return
                }

                const songData = response.data.data.song

                let artistName = "Artista Desconocido"
                try {
                    const artistResponse = await api.get<ArtistProfileResponse>('/api/artist/profile')
                    artistName = artistResponse.data.data.artistName
                } catch (error) {
                    console.warn("No se pudo obtener información del artista: ", error)
                }

                const result: ProductContextResultShortProps = {
                    title: songData.title,
                    id: songData._id,
                    artists: [{
                        name: artistName,
                        id: songData.author
                    }],
                    type: 'song',
                    genres: songData.genres || [],
                    duration: songData.duration,
                    imgUrl: songData.imgUrl,
                    price: {
                        digital: songData.pricing.digital,
                        cd: songData.pricing.cd,
                        vinyl: songData.pricing.vinyl,
                        cassette: songData.pricing.cassette
                    }
                }

                setQueryResultShort(result)
            } else if (type === 'album') {
                toast.error('Consulta de álbumes no implementada aún')
            } else {
                toast.error(`Tipo de producto no soportado: ${type}`)
            }
        } catch (err) {
            console.error("Error al obtener información resumida del producto:", err)
            toast.error("Error al obtener información resumida del producto")
            setQueryResultShort(undefined)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <ProductContext.Provider value={{
            queryProduct,
            queryProductShort,
            queryResult,
            queryResultShort,
            isLoading,
            error
        }}>
            {children}
        </ProductContext.Provider>
    )
}