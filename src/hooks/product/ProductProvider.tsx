import { useState } from "react"
import { ProductContext, ProductContextQueryProps, ProductContextResultProps, ProductContextResultShortProps } from "./ProductContext"
import { api } from '@/lib/api';
import {toast} from "sonner";

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
    publishDate: Date;
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
    const [queryResult, setQueryResult] = useState<undefined | ProductContextResultProps>(undefined);
    const [queryResultShort, setQueryResultShort] = useState<undefined | ProductContextResultShortProps>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const queryProduct = async ({ type, id }: ProductContextQueryProps) => {
        if (type !== 'song') {
            // TODO: Implement album query
            toast.error('Consulta de álbumes no implementada aún');
            return;
        }

        setIsLoading(true);
        try {
            console.log("Enviando solicitud con ID:", id);
            const songInfoResponse = await api.post<SongInfoResponse>('/api/song/info', { songId: id });
            console.log("Respuesta recibida:", songInfoResponse);
            const songData = songInfoResponse.data.data.song;
            const recommendations = songInfoResponse.data.data.recommendations;


            const songRatingResponse = await api.post<SongRatingResponse>('/api/song/ratings', { songId: id });
            const ratingsData = songRatingResponse.data.data;

            let artistData;
            let isFollowing = false;
            try {
                const artistResponse = await api.get<ArtistProfileResponse>('/api/artist/profile');
                artistData = artistResponse.data.data;

                const followingResponse = await api.post<ArtistFollowingResponse>('/api/user/is-following', {
                    artistUsername: artistData.artistUsername
                });
                isFollowing = followingResponse.data.data.following;
            } catch (artistError) {
                console.error("Error al obtener información del artista:", artistError);
                artistData = {
                    artistName: "Artist Name NOT FOUND",
                    artistUsername: "artist_username_not_found",
                    artistImgUrl: "https://picsum.photos/200/300",
                    artistBannerUrl: ""
                };
            }

            const result: ProductContextResultProps = {
                product: {
                    title: songData.title,
                    id: parseInt(songData._id) || id,
                    type: 'song',
                    author: songData.author,
                    artists: [{ name: artistData.artistName, id: parseInt(songData.author) || 1 }],
                    duration: songData.duration,
                    date: songData.releaseDate,
                    genres: songData.genres,
                    description: songData.description,
                    imgUrl: songData.imgUrl,
                    price: {
                        digital: songData.pricing.digital,
                        cd: songData.pricing.cd,
                        vinyl: songData.pricing.vinyl,
                        cassette: songData.pricing.cassette
                    }
                },
                artist: {
                    name: artistData.artistName,
                    id: parseInt(songData.author) || 1,
                    followers: 1500,        // Este dato no está disponible aún en el backend
                    isFollowing: isFollowing,
                    imgUrl: artistData.artistImgUrl
                },
                ratings: {
                    average: ratingsData.averageRating,
                    ratingCount: {
                        five: ratingsData.ratings.filter(r => r.rating === 5).length,
                        four: ratingsData.ratings.filter(r => r.rating === 4).length,
                        three: ratingsData.ratings.filter(r => r.rating === 3).length,
                        two: ratingsData.ratings.filter(r => r.rating === 2).length,
                        one: ratingsData.ratings.filter(r => r.rating === 1).length
                    },
                    list: ratingsData.ratings.map(rating => ({
                        userImgUrl: rating.author.imgUrl,
                        username: rating.author.username,
                        title: rating.title,
                        description: rating.description,
                        rating: rating.rating
                    }))
                },
                related: recommendations.map(rec => ({
                    title: rec.title,
                    _id: rec._id,
                    author: rec.author,
                    artists: [{ name: artistData.artistName, id: parseInt(rec.author) || 1 }],
                    productType: 'song',
                    genres: rec.genres,
                    duration: rec.duration,
                    imgUrl: rec.imgUrl,
                    price: {
                        digital: rec.pricing.digital,
                        cd: rec.pricing.cd,
                        vinyl: rec.pricing.vinyl,
                        cassette: rec.pricing.cassette
                    }
                }))
            };

            setQueryResult(result);
        } catch (error) {
            console.error("Error al obtener información del producto:", error);
            toast.error("Error al obtener información del producto");
        } finally {
            setIsLoading(false);
        }
    };

    const queryProductShort = async ({ type, id }: ProductContextQueryProps) => {
        if (type !== 'song') {
            // TODO: Implement album query short
            toast.error('Consulta corta de álbumes no implementada aún');
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.post<SongInfoResponse>('/api/song/info', { songId: id });
            const songData = response.data.data.song;

            let artistName = "";
            try {
                const artistResponse = await api.get<ArtistProfileResponse>('/api/artist/profile');
                artistName = artistResponse.data.data.artistName;
            } catch (artistError) {
                console.error("Error al obtener información del artista:", artistError);
            }

            const result: ProductContextResultShortProps = {
                title: songData.title,
                _id: songData._id,
                author: songData.author,
                artists: [{ name: artistName, id: parseInt(songData.author) || 1 }],
                productType: 'song',
                genres: songData.genres,
                duration: songData.duration,
                imgUrl: songData.imgUrl,
                price: {
                    digital: songData.pricing.digital,
                    cd: songData.pricing.cd,
                    vinyl: songData.pricing.vinyl,
                    cassette: songData.pricing.cassette
                }
            };

            setQueryResultShort(result);
        } catch (error) {
            console.error("Error al obtener información corta del producto:", error);
            toast.error("Error al obtener información corta del producto");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ProductContext.Provider value={{ queryProduct, queryProductShort, queryResult, queryResultShort, isLoading }}>
            {children}
        </ProductContext.Provider>
    )
}