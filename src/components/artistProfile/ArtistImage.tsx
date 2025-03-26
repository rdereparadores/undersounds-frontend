import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

export function ArtistImage (){
    const [imgLoaded, setImgLoaded] = useState(false)
    return( 
        <>
            <Skeleton hidden={imgLoaded} className='min-w-full grow min-h-96' />
           <img 
                alt="Imagen del artista"
                hidden={!imgLoaded}
                onLoad={() => setImgLoaded(true)}
                     src="https://picsum.photos/1900/500"
                    className="rounded-lg w-[100%] h-[75%] object-cover"></img> 
                    
        </>
    )

}