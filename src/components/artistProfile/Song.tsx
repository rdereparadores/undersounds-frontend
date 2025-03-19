import { Link } from "react-router";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export interface SongArtistsProps { name: string, artistId: string }

export interface SongProps {songName:string, imgURL:string, artists: SongArtistsProps[], album:string}

export function Song({songName,imgURL,artists,album}:SongProps){
    return(
        <Card className="flex justify-between items-center w-full h-24 " >  
            <div className="flex items-center pl-2 visible">       
                <img className="flex rounded-sm" src={imgURL}></img>
                <Button asChild variant="link">
                    <Link to="">{songName}</Link>
                </Button>
            </div>
            <Button variant="link" className="visible">{artists.map(item => item.name).join(', ')}</Button>
            <Button variant="link" className="visible">{album}</Button>
            <Button variant="ghost"  className="visible"></Button>
        </Card>
    )
}