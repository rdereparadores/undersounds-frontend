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
        <div className="w-[90%] flex flex-wrap gap-5 -mt-20 mb-20 z-10">
            <p className="font-bold text-3xl text-white ">Nombre autor</p>

            {followed ? <IsFollowed/> : <IsNotFollowed/>}

        </div>
    )
}