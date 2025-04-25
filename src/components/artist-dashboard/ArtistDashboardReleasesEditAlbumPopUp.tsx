import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '../ui/dialog'
import { FaEdit } from "react-icons/fa";
import { Button } from "../ui/button";
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
import { ArtistAlbumProps } from '@/hooks/artist/ArtistContext';
import { useArtist } from '@/hooks/artist/useArtist';
import { AlbumProps } from '@/hooks/product/ProductContext';
import { Skeleton } from '../ui/skeleton';
import { ArtistDashboardReleasesEditAlbum } from './ArtistDashboardReleasesEditAlbum';

export function ArtistDashboardReleasesEditAlbumPopUp({ album }: { album: ArtistAlbumProps }) {
    const artist = useArtist()
    const [albumVersionArray, setAlbumVersionArray] = useState<AlbumProps[]>([]);
    const [actualAlbum, setActualAlbum] = useState<AlbumProps>();
    const [version, setVersion] = useState<number>(-1)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchSongVersions = async () => {
            setIsLoading(true)
            const historyArray = await artist.getAlbumHistoryArray(album._id);
            setAlbumVersionArray(historyArray)
            console.log(historyArray)
            const lastVersion = historyArray.length - 1;
            setVersion(lastVersion)
            setActualAlbum(historyArray[lastVersion])
            setIsLoading(false)
        };
        if (album._id) fetchSongVersions();
    }, [artist, album._id]);

    return (
        <Dialog>
            <DialogTrigger>
                <Button className="w-10 h-10 pl-4" variant='outline'><FaEdit /></Button>
            </DialogTrigger>
            <DialogContent className='min-w-[80%] h-[80%]'>
                {isLoading ? <Skeleton className='w-full h-full' /> :
                    <>
                        <DialogTitle>Edita tus álbumes</DialogTitle>
                        <ScrollArea className="h-full w-full">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className='mb-2'>
                                    <Button variant="outline">Versiones</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Versiones disponibles</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioGroup value={version.toString()} onValueChange={(version) => { setVersion(Number(version)); setActualAlbum({ ...albumVersionArray[Number(version)] }) }} className='flex-wrap'>
                                        {albumVersionArray.filter((album) => album.version !== undefined).map((album, index) => (
                                            <DropdownMenuRadioItem value={(album.version!).toString() || "Sin version"} key={index}>V.{album.version?.toString()}</DropdownMenuRadioItem>
                                        ))}
                                        <DropdownMenuRadioItem value={(albumVersionArray.length - 1).toString()}>Versión actual</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <ArtistDashboardReleasesEditAlbum {...actualAlbum as AlbumProps} />
                        </ScrollArea>
                    </>
                }
            </DialogContent>
        </Dialog>

    )
}