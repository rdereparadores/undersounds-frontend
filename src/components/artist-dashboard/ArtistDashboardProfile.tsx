import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { ChangeFeatureContent } from "./ArtistDashboardProfileChangeFeatureContent"
import { ArtistDashboardProfileEditProfilePopUp } from "./ArtistDashboardProfileEditProfilePopUp"

export const ArtistDashboardProfile = () => {

    return (
        <div className="grow gap-4 flex flex-col flex-wrap">
            <h1 className="text-3xl font-medium">Perfil</h1>

            <div className="relative">
                <img src='https://picsum.photos/1920/1080' className="w-full h-48 rounded-md object-cover" />
                <ArtistDashboardProfileEditProfilePopUp/>
                <div className="flex flex-wrap gap-4 items-end absolute -bottom-16 w-full pl-2">
                    <img src='https://picsum.photos/200' className="w-32 h-32 rounded-full" />
                    <div className="flex flex-col justify-end flex-wrap">
                        <p className="text-2xl font-medium">Machine Gun Kelly</p>
                        <p className="">@mgk</p>
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