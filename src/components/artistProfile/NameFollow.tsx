import { Button } from "../ui/button"

interface FollowProps { followed: boolean }

const IsFollowed = () => (
    <>
        <Button className="w-[8%] h-[40px]">Siguiendo</Button>
    </>
)

const IsNotFollowed = () => (
    <>
        <Button className="w-[8%] h-[40px]" variant="outline">Seguir</Button>
    </>
)


export function NameFollow({followed}: FollowProps) {
    return (
        <div className="w-[90%] flex flex-wrap gap-5 z-10">
            <p className="font-bold text-3xl text-white flex">Nombre autor</p>

            {followed ? <IsFollowed/> : <IsNotFollowed/>}

        </div>
    )
}