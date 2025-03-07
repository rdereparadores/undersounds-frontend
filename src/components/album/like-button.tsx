import {useState} from "react";
import {Heart} from "lucide-react";

export function LikeButton() {
    // Estado para manejar si el corazón está "liked" o no
    const [filled, setFilled] = useState(false);
    return (
        <button
            className={`transition-transform transform ${
                filled
                    ? "text-red-500 hover:text-red-400"
                    : "text-gray-500 hover:text-red-300"
            }`}
            onClick={() => setFilled(!filled)} // Alterna el estado entre "liked" y "no liked"
        >
            <Heart
                size={32}
                fill={filled ? "currentColor" : "none"} // Rellena el corazón si está "liked"
                className={`transition-colors duration-300 ${
                    filled ? "hover:fill-red-400" : "hover:fill-red-300"
                }`} // Cambia el color al pasar el ratón (hover)
            />
        </button>
    );
}