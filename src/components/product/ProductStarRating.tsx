import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
    max?: number;
    value?: number;
    onChange?: (value: number) => void;
    readOnly?: boolean;
    size?: number;
    emptyByDefault?: boolean;
}

export const StarRating = ({
                               max = 5,
                               value = 0,
                               onChange,
                               readOnly = false,
                               size = 24
                           }: StarRatingProps) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const handleClick = (starValue: number) => {
        if (readOnly || !onChange) return;
        onChange(starValue);
    };

    const handleMouseOver = (starValue: number) => {
        if (readOnly) return;
        setHoverValue(starValue);
    };

    const handleMouseLeave = () => {
        if (readOnly) return;
        setHoverValue(null);
    };

    const displayValue = hoverValue !== null ? hoverValue : value;

    return (
        <div className="flex" onMouseLeave={handleMouseLeave}>
            {Array.from({ length: max }, (_, index) => {
                const starValue = index + 1;
                return (
                    <div
                        key={index}
                        onClick={() => handleClick(starValue)}
                        onMouseOver={() => handleMouseOver(starValue)}
                        className={`${readOnly ? "cursor-default" : "cursor-pointer"} p-1`}
                    >
                        {starValue <= displayValue ? (
                            <FaStar size={size} className="text-yellow-500" />
                        ) : (
                            <FaRegStar size={size} className="text-gray-400" />
                        )}
                    </div>
                );
            })}
        </div>
    );
};