import './panelBar.css';
import { Avatar, AvatarImage, AvatarFallback } from '../../ui/avatar';

const MainBar = () => {
    return (
        <div className="bar-container">
            <h2 className="title">UnderSounds</h2>

            <div className="search-bar">
                <input type="text" placeholder="Buscar..." />
            </div>

            <nav>
                <button className="nav-button">Inicio</button>
                <button className="nav-button">Tienda</button>
                <button className="nav-button">Biblioteca</button>
                <button className="nav-button">Carrito</button>
            </nav>

            <Avatar className="w-16 h-16 border-2 min-w border-black ml-8 mr-4">
                <AvatarImage
                    className="aspect-square w-full h-full"
                    src={""}
                    alt="Fotoperfil"
                />
                <AvatarFallback className="bg-gray-200" />
            </Avatar>
        </div>
    );
};

export default MainBar;