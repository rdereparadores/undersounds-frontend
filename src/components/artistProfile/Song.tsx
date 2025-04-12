import { Link } from "react-router";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

export interface SongArtistsProps { name: string, artistId: string }

export interface SongProps {songName:string, imgURL:string, artists: SongArtistsProps[], album:string}

export function Song({songName,imgURL,artists,album}:SongProps){
    const [imgLoaded, setImgLoaded] = useState(false)
    return(
        <Card className="flex justify-between items-center flex-wrap" >  
            <div className="flex items-center pl-2 visible ">   
                <Skeleton hidden={imgLoaded} className='w-[75px] h-[75px]' />    
                <img 
                    alt="Imagen de una canción"
                    hidden={!imgLoaded}
                    onLoad={() => setImgLoaded(true)}
                    src={imgURL}
                    className="flex rounded-lg p-1" 
                ></img>
                <Button asChild variant="link">
                    <Link to="">{songName}</Link>
                </Button>
            </div>
            <Button variant="link" className="visible">{artists.map(item => item.name).join(', ')}</Button>
            <Button variant="link" className="hidden sm:block">{album}</Button> 
        </Card>
    )
}