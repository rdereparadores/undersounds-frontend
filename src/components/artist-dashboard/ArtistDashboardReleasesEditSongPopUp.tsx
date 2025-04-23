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
import { useProduct } from '@/hooks/product/useProduct';
import { SongProps } from '@/hooks/product/ProductContext';

export function ArtistDashboardReleasesEditSongPopUp({ song }: { song: ArtistSongProps }) {
    const artist = useArtist()
    const product = useProduct()
    const [songVersionArray, setSongVersionArray] = useState<SongProps[]>([]);
    const [actualSong, setActualSong] = useState<SongProps>();
    const [version, setVersion] = useState<number>(-1)

    useEffect(() => {
        const fetchSongVersions = async () => {
            console.log("Tamaño de vector versionHistory: " + song.versionHistory)
            const historyArray = await artist.getSongHistoryArray(song._id);
            if (song.versionHistory) {
                console.log("no debaria estar aqui")
                const versions = await Promise.all(historyArray.map(async (song) => await product.getSongInfo(song._id)));
                setSongVersionArray(versions.filter((version): version is SongProps => version != null));
            }else{
                const actualSong = await product.getSongInfo(song._id);
                if (actualSong) {
                    setActualSong(actualSong);
                }
            }
        };
        fetchSongVersions();
    }, [artist, product, song._id, song.versionHistory]);


    return (
        <Dialog>
            <DialogTrigger>
                <Button variant='secondary' className="absolute top-1 right-[11px] rounded-full w-10 h-10">
                    <FaEdit className="ml-[2px]" />
                </Button>
            </DialogTrigger>
            <DialogContent className='min-w-[80%] h-[80%]'>
                <DialogTitle>Editas tus canciones</DialogTitle>
                <ScrollArea className="h-full w-full">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Versiones</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Versiones disponibles</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={version.toString()} onValueChange={(version) => {setVersion(Number(version)); setActualSong(songVersionArray[Number(version)]);}} className='flex-wrap'>
                                    {songVersionArray.map((song,index)=>(
                                        <DropdownMenuRadioItem value={song.version?.toString() || "Sin version"} key={index}>V.{song.version?.toString() }</DropdownMenuRadioItem>
                                    ))}
                                    <DropdownMenuRadioItem value={"-1"}>Versión actual</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {<ArtistDashboardReleasesEditSong {...actualSong as SongProps} />}
                </ScrollArea>
            </DialogContent>
        </Dialog>

    )
}