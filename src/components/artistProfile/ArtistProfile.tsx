import { ArtistImage } from "./ArtistImage";
import { TopSongs } from "./TopSongs";
import { AlbumCarrousel } from "./AlbumCarrousel";
import { SingleEPCarrousel } from "./SingleEPCarrousel";


export function ArtistProfile() {
    return (
        <>
            <ArtistImage></ArtistImage>
            
            <div className="flex justify-center">
                <TopSongs></TopSongs>
            </div>

            <div className="flex justify-center pt-10">
                <AlbumCarrousel></AlbumCarrousel>
            </div>

            <div className="flex justify-center pt-10">
                <SingleEPCarrousel></SingleEPCarrousel>
            </div>
        </>
    )
}