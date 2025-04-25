import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '../ui/dialog'
import { FaEdit } from "react-icons/fa";
import { Button } from "../ui/button";
import { ArtistDashboardReleasesEditSong } from './ArtistDashboardReleasesEditSong';
import { ScrollArea } from '../ui/scroll-area';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from 'react';
import { ArtistSongProps } from '@/hooks/artist/ArtistContext';
import { useArtist } from '@/hooks/artist/useArtist';
import { SongProps } from '@/hooks/product/ProductContext';
import { Skeleton } from '../ui/skeleton';

export function ArtistDashboardReleasesEditSongPopUp({ song }: { song: ArtistSongProps }) {
    const artist = useArtist()
    const [songVersionArray, setSongVersionArray] = useState<SongProps[]>([]);
    const [actualSong, setActualSong] = useState<SongProps>();
    const [version, setVersion] = useState<number>(-1)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchSongVersions = async () => {
            setIsLoading(true)
            const historyArray = await artist.getSongHistoryArray(song._id);
            setSongVersionArray(historyArray)
            console.log(historyArray)
            const lastVersion = historyArray.length - 1;
            setVersion(lastVersion)
            setActualSong(historyArray[lastVersion])
            setIsLoading(false)
        };
        if (song._id) fetchSongVersions();
    }, [artist, song._id]);

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant='secondary' className="absolute top-2 right-[11px] rounded-full w-10 h-10">
                    <FaEdit className="ml-[2px]" />
                </Button>
            </DialogTrigger>
            <DialogContent className='min-w-[80%] h-[80%]'>
                {isLoading ? <Skeleton className='w-full h-full' /> :
                    <>
                        <DialogTitle>Editas tus canciones</DialogTitle>
                        <ScrollArea className="h-full w-full">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Versiones</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Versiones disponibles</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioGroup value={version.toString()} onValueChange={(version) => { setVersion(Number(version)); setActualSong({ ...songVersionArray[Number(version)] }) }} className='flex-wrap'>
                                        {songVersionArray.filter((song) => song.version !== undefined).map((song, index) => (
                                            <DropdownMenuRadioItem value={(song.version!).toString() || "Sin version"} key={index}>V.{song.version?.toString()}</DropdownMenuRadioItem>
                                        ))}
                                        <DropdownMenuRadioItem value={(songVersionArray.length - 1).toString()}>Versión actual</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <ArtistDashboardReleasesEditSong {...actualSong as SongProps} />
                        </ScrollArea>
                    </>
                }
            </DialogContent>
        </Dialog>

    )
}