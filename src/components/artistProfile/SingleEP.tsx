import { useState } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export function SingleEP() {
    const [imgLoaded, setImgLoaded] = useState(false)
    return (
        <div className="flex flex-col ">
            <Skeleton hidden={imgLoaded} className='w-[250px] h-[250px]' />
            <img 
                onLoad={() => setImgLoaded(true)}
                src="https://picsum.photos/250/250"
                className="rounded-lg">
            </img>
            <Button variant="link" className="w-[40%] font-bold">Nombre album</Button>
            <Button variant="link" className="w-[40%] font-bold -mt-1">Nombre artista</Button>
            <p>Año</p>
        </div>
    )
}