import "./panelOptions.css";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";

const OptionsPanel = () => {
    return (
        <div className="panel-container ml-12 mr-12">
            <Button>Mis canciones</Button>
            <Button>Mis álbums</Button>
            <Button>Estadísticas</Button>

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
                    <DialogFooter>
                        <Button type="submit">Guardar cambios</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default OptionsPanel;