import { Link } from "react-router";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";

export function Album() {
    const [imgLoaded, setImgLoaded] = useState(false)

    return (
        <div className="flex flex-col gap-1">
            <Skeleton hidden={imgLoaded} className='w-[250px] h-[250px]' />
            <img 
                hidden={!imgLoaded}
                onLoad={() => setImgLoaded(true)}
                    src="https://picsum.photos/250/250"
                    className="rounded-lg"></img>
            <Link to="/album/:id"><p className="font-bold">Nombre album</p></Link>
            <Link to="/profile/artist/:id"><p className="font-bold -mt-1">Nombre artista</p></Link>
            <p>Año</p>
        </div>
    )
}