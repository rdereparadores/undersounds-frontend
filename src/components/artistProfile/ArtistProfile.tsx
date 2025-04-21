import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ArtistImage } from "./ArtistImage";
import { TopSongs } from "./TopSongs";
import { AlbumCarrousel } from "./AlbumCarrousel";
import { SingleEPCarrousel } from "./SingleEPCarrousel";
import { NameFollow } from "./NameFollow";
import { NewestReleases } from "./NewestReleases";
import { useArtistProfile } from "@/hooks/artist-profile/useArtistProfile";
import { ArtistProfileProps } from "@/hooks/artist-profile/ArtistProfileContext";
import { Skeleton } from "../ui/skeleton";

export function ArtistProfile() {
    const params = useParams();
    const artistProfile = useArtistProfile();
    const [profile, setProfile] = useState<ArtistProfileProps | undefined>(undefined);

    useEffect(() => {
        const artistID = params.id!;
        if (artistID) {
            artistProfile.getArtistProfile(artistID).then(setProfile);
            console.log(profile);
        }
    }, [params.id, artistProfile]);

    const handleFollow = async () => {
        if (profile) {
            await artistProfile.followArtist(profile.artist.artistUsername);
            setProfile(prev => prev ? {
                ...prev,
                artist: { ...prev.artist, followed: true }
            } : undefined);
        }
    };

    const handleUnfollow = async () => {
        if (profile) {
            await artistProfile.unfollowArtist(profile.artist.artistUsername);
            setProfile(prev => prev ? {
                ...prev,
                artist: { ...prev.artist, followed: false }
            } : undefined);
        }
    };

    if (profile === undefined) {
        return <Skeleton className="grow gap-4 flex flex-col flex-wrap" />;
    }

    return (
        <>
            <div className="relative">
                <ArtistImage imgUrl={profile.artist.bannerImgUrl} />
                <div className="absolute bottom-5 left-5 text-center">
                    <NameFollow
                        name={profile.artist.name}
                        followed={profile.artist.followed}
                        onFollow={handleFollow}
                        onUnfollow={handleUnfollow}
                    />
                </div>
            </div>

            <div className="flex justify-center grow gap-2 flex-wrap">
                <div className="grow">
                    <p className="font-bold text-2xl">Top Canciones</p>
                    <TopSongs topSongs={profile.topSongs} />
                </div>
                <div>
                    <p className="font-bold text-2xl">Último lanzamiento</p>
                    {profile.newestRelease ? (
                        <NewestReleases release={profile.newestRelease} />
                    ) : (
                        <p>No hay lanzamientos recientes</p>
                    )}
                </div>
            </div>

            {profile.albums.length > 0 && (
                <div className="flex justify-center pt-10">
                    <AlbumCarrousel albums={profile.albums} />
                </div>
            )}

            {profile.epsYsingles.length > 0 && (
                <div className="flex justify-center pt-10">
                    <SingleEPCarrousel singles={profile.epsYsingles} />
                </div>
            )}
        </>
    );
}