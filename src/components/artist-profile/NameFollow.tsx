import { Button } from "../ui/button"

interface FollowProps {
    name: string;
    followed: boolean;
    onFollow: () => void;
    onUnfollow: () => void;
}

export function NameFollow({ name, followed, onFollow, onUnfollow }: FollowProps) {
    return (
        <div className="w-[90%] flex sm:flex-wrap gap-5 z-10">
            <p className="font-bold text-3xl text-white text-left">{name}</p>

            <div className="flex items-center">
                {followed ? (
                    <Button className="w-fit h-[40px]" onClick={onUnfollow}>
                        Siguiendo
                    </Button>
                ) : (
                    <Button className="w-fit h-[40px]" onClick={onFollow}>
                        <p>Seguir</p>
                    </Button>
                )}
            </div>
        </div>
    );
}