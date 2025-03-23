import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

export function ArtistImage (){
    const [imgLoaded, setImgLoaded] = useState(false)
    return( 
        <div>
            <Skeleton hidden={imgLoaded} className='w-[1900px] h-[400px]' />
           <img 
                hidden={!imgLoaded}
                onLoad={() => setImgLoaded(true)}
                     src="https://picsum.photos/1900/500"
                    className="rounded-lg"></img> 
        </div>
    )

}