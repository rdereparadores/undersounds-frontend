import { Button } from "../ui/button"

interface FollowProps { followed: boolean }

const IsFollowed = () => (
    <>
        <Button className="w-fit h-[40px]">Siguiendo</Button>
    </>
)

const IsNotFollowed = () => (
    <>
        <Button className="w-fit h-[40px]"><p>Seguir</p></Button>
    </>
)


export function NameFollow({followed}: FollowProps) {
    return (
        <div className="w-[90%] flex sm:flex-wrap gap-5 z-10">
            <p className="font-bold text-3xl text-white text-left">Machine gun kelly</p>

            <div className="flex items-center">
            {followed ? <IsFollowed/> : <IsNotFollowed/>}
            </div>

        </div>
    )
}