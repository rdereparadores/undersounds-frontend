import { TabsContent } from "@radix-ui/react-tabs"
import { Input } from "../ui/input"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { FaPlay } from "react-icons/fa"
import { FaDownload } from "react-icons/fa"
import { Button } from "../ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { useState } from "react"

export const UserDashboardLibrarySongItem = () => {
    return (
        <Card>
            <CardHeader className="p-0 relative">
                <img src='https://picsum.photos/400' className="w-48 h-48 rounded-xl rounded-b-none" />
                <Button className="absolute bottom-2 right-2 rounded-full w-10 h-10">
                    <FaPlay className="ml-[3px]" />
                </Button>
                <Button variant='secondary' className="absolute bottom-2 right-14 rounded-full w-10 h-10">
                    <FaDownload />
                </Button>
            </CardHeader>
            <CardContent className="pt-2 px-2">
                <CardTitle>Buenas noches</CardTitle>
                <CardDescription>Quevedo</CardDescription>
            </CardContent>
        </Card>
    )
}

export const UserDashboardLibraryAlbumItemTrack = () => {
    return (
        <TableRow>
            <TableCell className="flex gap-2">
                <Button className="rounded-full w-10 h-10">
                    <FaPlay className="ml-[3px]" />
                </Button>
                <Button variant='secondary' className="rounded-full w-10 h-10">
                    <FaDownload />
                </Button>
            </TableCell>
            <TableCell>
                <p>Duro</p>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
                <p>Quevedo</p>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
                <p>3:14</p>
            </TableCell>
        </TableRow>
    )
}

export const UserDashboardLibraryAlbumItem = () => {
    const [open, setIsOpen] = useState(false)
    return (
        <Card>
            <CardHeader>
                <div className="flex gap-4 flex-wrap">
                    <img src='https://picsum.photos/400' className="w-32 h-32 rounded-xl" />
                    <div className="flex flex-col gap-1">
                        <CardTitle>Buenas noches</CardTitle>
                        <CardDescription>Quevedo</CardDescription>
                        <CardDescription>5 pistas | 35:05</CardDescription>
                    </div>
                    <div className="flex flex-col grow -mt-3">
                        <Collapsible open={open} onOpenChange={setIsOpen}>
                            <>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Acciones</TableHead>
                                            <TableHead>Título</TableHead>
                                            <TableHead className="hidden sm:table-cell">Artista</TableHead>
                                            <TableHead className="hidden sm:table-cell">Duración</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>

                                        <UserDashboardLibraryAlbumItemTrack />
                                        <UserDashboardLibraryAlbumItemTrack />
                                        <CollapsibleContent asChild>
                                            <UserDashboardLibraryAlbumItemTrack />
                                        </CollapsibleContent>
                                        <CollapsibleContent asChild>
                                            <UserDashboardLibraryAlbumItemTrack />
                                        </CollapsibleContent>
                                        <CollapsibleContent asChild>
                                            <UserDashboardLibraryAlbumItemTrack />
                                        </CollapsibleContent>
                                        <CollapsibleContent asChild>
                                            <UserDashboardLibraryAlbumItemTrack />
                                        </CollapsibleContent>
                                        <CollapsibleContent asChild>
                                            <UserDashboardLibraryAlbumItemTrack />
                                        </CollapsibleContent>
                                    </TableBody>

                                </Table>
                                <CollapsibleTrigger asChild>
                                    <Button variant="outline" className="w-full">
                                        {open ? 'Ver menos' : 'Ver más'}
                                    </Button>
                                </CollapsibleTrigger>
                            </>

                        </Collapsible>
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}

export const UserDashboardLibrary = () => {
    return (
        <div className="grow flex flex-col flex-wrap">
            <div className="flex justify-between flex-wrap gap-2">
                <h1 className="text-3xl font-medium">Biblioteca</h1>
                <Input type='search' placeholder="Buscar..." className="sm:max-w-72"></Input>
            </div>
            <Tabs defaultValue="songs">
                <TabsList className="mb-2">
                    <TabsTrigger value='songs'>Canciones</TabsTrigger>
                    <TabsTrigger value='albums'>Álbumes</TabsTrigger>
                </TabsList>
                <TabsContent value='songs'>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                        <UserDashboardLibrarySongItem />
                        <UserDashboardLibrarySongItem />
                        <UserDashboardLibrarySongItem />
                        <UserDashboardLibrarySongItem />
                    </div>
                </TabsContent>
                <TabsContent value='albums'>
                    <div className="flex flex-col gap-4">
                        <UserDashboardLibraryAlbumItem />
                        <UserDashboardLibraryAlbumItem />
                        <UserDashboardLibraryAlbumItem />
                        <UserDashboardLibraryAlbumItem />
                        <UserDashboardLibraryAlbumItem />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}