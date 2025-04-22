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
                               size = 24,
                           }: StarRatingProps) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const displayValue = hoverValue !== null ? hoverValue : value;

    const handleClick = (index: number) => {
        if (readOnly || !onChange) return;
        onChange(index);
        setHoverValue(null);
    };

    const handleMouseOver = (index: number) => {
        if (readOnly) return;
        setHoverValue(index);
    };

    const handleMouseLeave = () => {
        if (readOnly) return;
        setHoverValue(null);
    };

    return (
        <div className="flex" onMouseLeave={handleMouseLeave}>
            {Array.from({ length: max }, (_, i) => i + 1).map((starValue) => (
                <div
                    key={starValue}
                    onClick={() => handleClick(starValue)}
                    onMouseOver={() => handleMouseOver(starValue)}
                    className={readOnly ? "cursor-default p-1" : "cursor-pointer p-1"}
                >
                    {starValue <= displayValue ? (
                        <FaStar size={size} />
                    ) : (
                        <FaRegStar size={size} />
                    )}
                </div>
            ))}
        </div>
    );
};
