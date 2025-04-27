import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { LuUserCheck } from "react-icons/lu";
import { useUser } from "@/hooks/user/useUser";
import { useEffect, useState } from "react";
import { FeaturedArtistItem } from "@/hooks/user/UserContext";
import { Skeleton } from "../ui/skeleton";
import { CardDescription } from "../ui/card";
import { Link } from "react-router";

export const UserDashboardFollowedArtistsItem = ({ item }: { item: FeaturedArtistItem }) => {
    const [imgLoaded, setImgLoaded] = useState(false)
    const [following, setFollowing] = useState(true)
    const user = useUser()

    const handleFollowToggle = () => {
        if (following) {
            user.unfollow(item.artistUsername).then(result => result && setFollowing(false))
        } else {
            user.follow(item.artistUsername).then(result => result && setFollowing(true))
        }
    }

    return (
        <div className="flex items-center justify-between sm:min-w-96 hover:bg-gray-100 hover:cursor-pointer p-2 rounded-sm transition ease-in-out ">
            <div className="flex items-center gap-2">
                {!imgLoaded && <Skeleton className="rounded-full w-12 h-12" />}
                <img className={`rounded-full w-12 h-12 ${imgLoaded ? '' : 'hidden'}`} src={item.imgUrl} onLoad={() => { setImgLoaded(true) }} />
                <div>
                    <p>{item.artistName}</p>
                    <CardDescription>@{item.artistUsername}</CardDescription>
                </div>
            </div>
            <Button onClick={handleFollowToggle} variant={following ? 'outline' : 'default'} className="h-10 mr-1">{following ? 'Siguiendo' : 'Seguir'}</Button>
        </div>
    )
}

export const UserDashboardFollowedArtistsPopUp = () => {
    const user = useUser()
    const [following, setFollowing] = useState<FeaturedArtistItem[] | undefined>(undefined)

    useEffect(() => {
        user.following().then(f => setFollowing(f))
    }, [])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button><LuUserCheck />Ver artistas seguidos</Button>
            </DialogTrigger>
            {following === undefined ?
                <Skeleton className='min-w-[20%]' />
                :
                <DialogContent className='min-w-[20%] max-h-[70%]'>
                    <DialogHeader>
                        <DialogTitle>Estos son todos los artistas a los que sigues.</DialogTitle>
                        <DialogDescription>Aquí puedes acceder a su perfíl o dejar de seguirlos.</DialogDescription>
                    </DialogHeader>
                    <div className="h-[62%] overflow-y-auto">
                        {following.map((f, index) => (
                            <Link to={`/profile/artist/${f.artistUsername}`}>
                                <UserDashboardFollowedArtistsItem key={index} item={f} />
                            </Link>
                        ))}
                    </div>
                </DialogContent>
            }
        </Dialog>
    )
}