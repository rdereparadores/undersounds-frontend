import { ArtistImage } from "./ArtistImage";
import { TopSongs } from "./TopSongs";
import { AlbumCarrousel } from "./AlbumCarrousel";
import { SingleEPCarrousel } from "./SingleEPCarrousel";
import { NameFollow } from "./NameFollow";
import { NewestReleases } from "./NewestReleases";

export function ArtistProfile() {
    return (
        <>
            <ArtistImage></ArtistImage>

            <div className="flex justify-center">
                <NameFollow followed={true}></NameFollow>
            </div>
            
            <div className="flex justify-center grow gap-2 flex-wrap">
                <div className="grow">
                    <p className="font-bold text-2xl ">Top Canciones</p>
                    <TopSongs></TopSongs>
                </div>
                <div>
                    <p className="font-bold text-2xl">Último lanzamiento</p>
                    <NewestReleases></NewestReleases>   
                </div>
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