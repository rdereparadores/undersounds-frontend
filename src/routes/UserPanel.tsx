//import MainBar from '@/components/panel/panelBar';
import ProfileHeader from '@/components/panel/profileHeader.tsx';
import OptionsPanel from '@/components/panel/panelOptions';
import {Outlet} from "react-router";

export const UserPanel = () => {
    return (
        <div className="w-full">
            {/*<MainBar /> */}
            <ProfileHeader isArtist={false} username="Manahen Music" />
            <div className="flex flex-wrap p-5">
                <div className="xl:w-1/5 min-w-[200px] p-5 sm:w-full">
                    <OptionsPanel />
                </div>
                <Outlet/>
            </div>
        </div>
    );

};

