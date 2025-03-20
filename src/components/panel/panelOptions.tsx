import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PanelOptionsProps {
    setActiveView: React.Dispatch<React.SetStateAction<string>>;
    setFilterType: React.Dispatch<React.SetStateAction<string>>;
}

const OptionsPanel: React.FC<PanelOptionsProps> = ({ setActiveView, setFilterType }) => {
    return (
        <div className="flex flex-row gap-4 xl:flex-col max-sm:hidden">
            <Button onClick={() => { setActiveView('compras'); setFilterType(''); }}>Perfil</Button>
            <Button onClick={() => { setActiveView('compras'); setFilterType('cancion'); }}>Mis canciones</Button>
            <Button onClick={() => { setActiveView('compras'); setFilterType('album'); }}>Mis álbums</Button>
            <Button onClick={() => setActiveView('statistics')}>Estadísticas</Button>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Editar Perfil</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Editar perfil</DialogTitle>
                        <DialogDescription>
                            Realiza cambios en tu perfil aquí. No olvides guardar los cambios.
                        </DialogDescription>
                </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nombre
                            </Label>
                            <Input
                                id="name"
                                defaultValue="Jairo"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="lastname" className="text-right">
                                Apellidos
                            </Label>
                            <Input
                                id="lastname"
                                defaultValue="Farfán"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="usuario" className="text-right">
                                Usuario
                            </Label>
                            <Input
                                id="usuario"
                                defaultValue="Unamed"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="Bio" className="text-right">
                                Biografía
                            </Label>
                            <Textarea className="col-span-3">Añade una nueva biografía</Textarea>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="address" className="text-right">
                            Dirección
                        </Label>
                        <Input
                            id="address"
                            defaultValue="C./"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="mail" className="text-right">
                            Dirección
                        </Label>
                        <Input
                            id="mail"
                            defaultValue="example@gmail.com"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Contraseña
                        </Label>
                        <Input
                            id="password"
                            defaultValue="*****"
                            className="col-span-3"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Guardar cambios</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default OptionsPanel;