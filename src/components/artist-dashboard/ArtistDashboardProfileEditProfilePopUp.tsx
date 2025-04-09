import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { MdEditSquare } from "react-icons/md"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useRef } from "react"
import { VscDiffAdded } from "react-icons/vsc";
import { IoAddCircleOutline } from "react-icons/io5"


export function ArtistDashboardProfileEditProfilePopUp() {
    const inputFile = useRef<HTMLInputElement | null>(null);

    const onButtonClick = () => {
        if (inputFile.current) {
            inputFile.current.click();
        }
    };
    return (
        <Dialog>
            <DialogTrigger className="absolute top-2 right-2">
                <Button variant='default'><MdEditSquare /> Editar perfil</Button>
            </DialogTrigger>
            <DialogContent className="w-fit">
                <DialogHeader>
                    <DialogTitle>Editar perfil</DialogTitle>
                    <DialogDescription>
                        <div className="mb-3">
                            <span>Desde aquí podras editar como te verán los otros usuarios.</span>
                        </div>
                        <div className="grid max-w-sm gap-1.5 w-full">
                            <div className="bg-cover w-fit justify-center sm:justify-start min-w-full grow">
                                <Label htmlFor="artistBanner">Banner</Label>
                                <Input type='file' id='file' ref={inputFile} style={{ display: 'none' }} />
                                <VscDiffAdded onClick={onButtonClick} className='w-[100%] h-32 hover:cursor-pointer object-cover' />
                            </div>
                            <div className="flex flex-wrap justify-center sm:justify-start w-full grow">
                                <div >
                                    <Label htmlFor="artistImg">Imagen</Label>
                                    <Input type='file' id='file' ref={inputFile} style={{ display: 'none' }} />
                                    <IoAddCircleOutline onClick={onButtonClick} className='w-32 h-32 rounded-full hover:cursor-pointer' />
                                </div>
                                <div className="w-fit grow">
                                    <Label htmlFor="artistName">Nombre de artista</Label>
                                    <Input className="grow w-full" type="artistName" id="artistName" placeholder="Nombre de artista" />

                                    <Label htmlFor="artistUserName">Nombre usuario</Label>
                                    <Input type="artistUserName" id="artistUserName" placeholder="@usuario" />
                                </div>
                            </div>
                        </div>

                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button>Cancelar</Button>
                    </DialogClose>
                    <DialogClose>
                        <Button>Confirmar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}  