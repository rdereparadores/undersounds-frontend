//import MainBar from '@/components/panel/panelBar';
import ProfileHeader from '@/components/panel/profileHeader.tsx';
import {Outlet} from "react-router";
import ArtistPanelOptions from "@/components/panel/artistPanelOptions.tsx";

export const ArtistPanel = () => {
    return (
        <div className="w-full">
            {/*<MainBar /> */}
            <ProfileHeader isArtist={true} username="Manahen Music" />
            <div className="flex flex-auto p-5">
                <div className="xl:w-1/5 min-w-[200px] p-5 sm:w-full">
                    <ArtistPanelOptions />
                </div>
                <Outlet/>
            </div>
        </div>
    );

};