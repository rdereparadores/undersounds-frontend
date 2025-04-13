import { useArtist } from "@/hooks/artist/useArtist"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { ChangeFeatureContent } from "./ArtistDashboardProfileChangeFeatureContent"
import { ArtistDashboardProfileEditProfilePopUp } from "./ArtistDashboardProfileEditProfilePopUp"
import { useEffect, useState } from "react"
import { ArtistInfoProps } from "@/hooks/artist/ArtistContext"

export const ArtistDashboardProfile = () => {
    const artist = useArtist()
    const [ artistData, setArtistData ] = useState<ArtistInfoProps | undefined>(undefined)

    useEffect(() => {
        artist.getArtistInfo()
        .then(data => setArtistData(data))
    }, [])
    console.log(artistData)

    if (artistData === undefined) return <></>

    return (
        <div className="grow gap-4 flex flex-col flex-wrap">
            <h1 className="text-3xl font-medium">Perfil</h1>

            <div className="relative">
                <img src={artistData.artistBannerImgUrl} className="w-full h-48 rounded-md object-cover" />
                <ArtistDashboardProfileEditProfilePopUp profileImgPlaceholder={artistData.artistImgUrl} bannerImgPlaceholder={artistData.artistBannerImgUrl}/>
                <div className="flex flex-wrap gap-4 items-end absolute -bottom-16 w-full pl-2">
                    <img src={artistData.artistImgUrl} className="w-32 h-32 rounded-full object-cover" />
                    <div className="flex flex-col justify-end flex-wrap">
                        <p className="text-2xl font-medium">{artistData.artistName}</p>
                        <p className="">@{artistData.artistUsername}</p>
                    </div>
                </div>
            </div>

            <div className="mt-16 flex justify-end">
                <Card className="w-fit">
                    <CardHeader>
                        <div className="flex justify-between gap-4">
                            <div>
                                <CardTitle>Contenido destacado</CardTitle>
                                <CardDescription>Destaca contenido en tu perfil</CardDescription>
                            </div>
                            <ChangeFeatureContent/>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center">
                            <div className="flex flex-col items-start gap-1">
                                <img src='https://picsum.photos/400' className="w-48 h-48 rounded-md" />
                                <p className="text-lg font-medium">Canción destacada</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}