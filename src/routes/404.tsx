import { PiVinylRecord } from "react-icons/pi";
import { BsCassette } from "react-icons/bs";
import { TbMusicOff } from "react-icons/tb";
import { SlDisc } from "react-icons/sl";
import { BsMusicPlayer } from "react-icons/bs";
import { Link } from "react-router";

export function NotFound404() {
    return (
        <div className="flex flex-wrap justify-between sm:px-56 pt-16 gap-6">
            <div className=" flex flex-col justify-center gap-4 w-fit max-w-md">
                <div>
                    <h1 className="bg-gradient-to-r from-black to-cyan-400 leading-tight
                    bg-clip-text text-transparent font-bold text-6xl">
                            Ups, no hemos encontrado esta página</h1>
                </div>
                <div>
                    <h2 className="text-3xl">La canción que buscas tiene pinta de estar en otro tocadiscos.</h2>
                </div>
                <div>
                    <h2 className="text-3xl">Siempre puedes buscar más canciones desde nuestra 
                    <Link to="/"><p className=" text-3xl underline hover:text-gray-600">página principal.</p></Link>
                    </h2>
                    
                </div>
            </div>
            <div className="flex justify-center items-center gap-3 w-fit">
                <div className="text-8xl w-[100px]">
                    <PiVinylRecord/>
                    <SlDisc/>
                </div>
                <div>
                    <TbMusicOff className="text-8xl w-[100px]" />
                </div>
                <div className="text-8xl w-[100px]">
                    <BsCassette />
                    <BsMusicPlayer />
                </div>
            </div>
        </div>
    )
}