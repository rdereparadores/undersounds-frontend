import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog'
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
import { useProduct } from '@/hooks/product/useProduct';
import { SongProps } from '@/hooks/product/ProductContext';

export function ArtistDashboardReleasesEditSongPopUp({ song }: { song: ArtistSongProps }) {
    const product = useProduct()
    const [songVersionArray, setSongVersionArray] = useState<SongProps[]>([]);
    const [version, setVersion] = useState<number>(-1)

    useEffect(() => {
        const fetchSongVersions = async () => {
            if (song.versionHistory) {
                const versions = await Promise.all(
                    song.versionHistory.map(async (id) => await product.getSongInfo(id))
                );
                setSongVersionArray(versions.filter((version): version is SongProps => version !== null));
            }
        };
        fetchSongVersions();
    }, [song.versionHistory, product]);


    return (
        <Dialog>
            <DialogTrigger>
                <Button variant='secondary' className="absolute top-1 right-[11px] rounded-full w-10 h-10">
                    <FaEdit className="ml-[2px]" />
                </Button>
            </DialogTrigger>
            <DialogContent className='min-w-[80%] min-h-[80%]'>
                <ScrollArea className="h-96 min-h-full">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Versiones</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Versiones disponibles</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={version.toString()} onValueChange={(version) => setVersion(Number(version))}>
                                    {songVersionArray.map((song,index)=>(
                                        <DropdownMenuRadioItem value={song.version?.toString() || "Sin version"} key={index}>V.{song.version?.toString()}</DropdownMenuRadioItem>
                                    ))}
                                    <DropdownMenuRadioItem value={"-1"}>Versión actual</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <ArtistDashboardReleasesEditSong id={song._id} version={version}/>
                </ScrollArea>
            </DialogContent>
        </Dialog>

    )
}