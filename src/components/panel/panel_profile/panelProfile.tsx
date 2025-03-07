import './panelProfile.css';
import { Avatar, AvatarImage, AvatarFallback } from '../../ui/avatar';
import { Textarea } from '../../ui/textarea';

const ProfileHeader = () => {
    return (
        <div className="header-container flex items-center">
            <Avatar className="w-32 h-32 border-2 min-w border-black ml-24">
                <AvatarImage
                    className="aspect-square w-full h-full"
                    src={""}
                    alt="Fotoperfil"
                />
                <AvatarFallback className="bg-gray-200" />
            </Avatar>
            <div className="w-full max-w-[35%]">
                <h1 className="profile-name">Usuario</h1>
                <Textarea
                    className="resize-none"
                    placeholder="Añade una descripción sobre ti"
                    defaultValue="Estoy en Under Sounds!"
                    disabled={false}
                />
            </div>
        </div>
    );
};

export default ProfileHeader;