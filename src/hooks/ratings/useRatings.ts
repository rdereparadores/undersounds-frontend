import { useContext } from "react";
import { RatingContext } from "./RatingsContext";

export const useProductRating = () => {
    return useContext(RatingContext);
};