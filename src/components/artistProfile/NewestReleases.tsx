import { Link } from "react-router";
import { Card } from "../ui/card";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

export function NewestReleases() {
    const [imgLoaded, setImgLoaded] = useState(false)
    
    return (
        <Link to="/song">
            <div className="flex flex-col gap-2 w-full h-full">
                <Card className="flex flex-col p-2 gap-2">
                    <Skeleton hidden={imgLoaded} className='w-[350px] h-[350px]' />
                    <img 
                        hidden={!imgLoaded}
                        onLoad={() => setImgLoaded(true)}
                            src="https://picsum.photos/350/350"
                            className="rounded-lg"></img>
                    <Link to="/album/:id"><p className=" font-bold">Nombre album</p></Link>
                    <Link to="/profile/artist/:id"><p className=" font-bold">Nombre artista</p></Link>
                    <p className="-mt-1">Año</p>
                </Card>
            </div>
        </Link>
    )
}