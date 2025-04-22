import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { LuUserCheck } from "react-icons/lu";
import { UserDashboardRecommendedArtistsItem } from "./UserDashboard";

const artista1 = {
    imgUrl: "",
    artistUsername: "Pani_123",
    artistName: "Pani"
}

const artista2 = {
    imgUrl: "",
    artistUsername: "rdereparadores",
    artistName: "Iván"
}

const artista3 = {
    imgUrl: "",
    artistUsername: "kingd_xop",
    artistName: "Dadvisons"
}


export const UserDashboardFollowedArtistsPopUp = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button><LuUserCheck />Ver artistas seguidos</Button>
            </DialogTrigger>
            <DialogContent className='min-w-[20%]'>
                <DialogHeader>
                    <DialogTitle>Estos son todos los artistas a los que sigues.</DialogTitle>
                    <DialogDescription>Aquí puedes acceder a su perfíl o dejar de seguirlos.</DialogDescription>
                </DialogHeader>
                <UserDashboardRecommendedArtistsItem item={artista1} />
                <UserDashboardRecommendedArtistsItem item={artista2} />
                <UserDashboardRecommendedArtistsItem item={artista3} />
            </DialogContent>
        </Dialog>
    )
}