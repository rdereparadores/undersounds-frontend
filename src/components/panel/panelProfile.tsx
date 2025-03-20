// components/shop/ProfileHeader.tsx
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

const ProfileHeader = () => {
    return (
        <div className="flex items-center px-4 py-4 gap-8">
            <Avatar className="w-32 h-32 border-2 border-black min-w-[8rem] ml-4">
                <AvatarImage
                    className="aspect-square w-full h-full"
                    src=""
                    alt="Fotoperfil"
                />
                <AvatarFallback className="bg-gray-200" />
            </Avatar>

            <div className="w-full max-w-[50%]">
                <h1 className="text-xl font-bold mb-2">Usuario</h1>
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
