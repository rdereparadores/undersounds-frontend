import { Button } from "../ui/button";

export function Album() {
    return (
        <div className="flex flex-col h-80 w-56">
            <img src="https://picsum.photos/450/450" className="rounded-lg size-56"></img>
            <Button variant="link" className="w-[45%] font-bold">Nombre album</Button>
            <Button variant="link" className="w-[45%] font-bold -mt-1">Nombre artista</Button>
            <p>Año</p>
        </div>
    )
}