import React from "react";
import { RatingContext, RatingFormData, PurchasedFormatsResult } from "./RatingsContext";
import { api } from "@/lib/api";
import { toast } from "sonner";

export const RatingsProvider = ({ children }: { children: React.ReactNode }) => {
    const getProductRatings = async (productId: string) => {
        try {
            const result = await api.post('/api/product/ratings', { id: productId });
            if (result.data.error) {
                throw new Error(result.data.error.message);
            }
            return result.data.data;
        } catch (error) {
            console.error("Error fetching product ratings:", error);
            toast.error("Error al obtener valoraciones");
            return { ratings: [], averageRating: 0, totalRatings: 0 };
        }
    };

    const checkUserRating = async (productId: string) => {
        try {
            const result = await api.post('/api/product/user-rating', { productId });
            if (result.data.error) {
                throw new Error(result.data.error.message);
            }
            return result.data.data;
        } catch (error) {
            console.error("Error checking user rating:", error);
            return { hasRated: false, rating: null };
        }
    };

    const getPurchasedFormats = async (productId: string): Promise<PurchasedFormatsResult> => {
        try {
            const result = await api.post('/api/product/user-purchased-formats', { productId });
            if (result.data.error) {
                throw new Error(result.data.error.message);
            }
            return result.data.data;
        } catch (error) {
            console.error("Error fetching purchased formats:", error);
            return { formats: [], ratedFormats: [] };
        }
    };

    const addRating = async (productId: string, data: RatingFormData) => {
        try {
            const result = await api.post('/api/product/add-rating', {
                productId,
                ...data
            });

            if (result.data.error) {
                toast.error(result.data.error.message || "Error al agregar valoración");
                return false;
            }

            toast.success("Valoración agregada con éxito");
            return true;
        } catch (error) {
            console.error("Error adding rating:", error);
            toast.error("Error al agregar valoración");
            return false;
        }
    };

    const updateRating = async (productId: string, ratingId: string, data: RatingFormData) => {
        try {
            const result = await api.put('/api/product/update-rating', {
                productId,
                ratingId,
                ...data
            });

            if (result.data.error) {
                toast.error(result.data.error.message || "Error al actualizar valoración");
                return false;
            }

            toast.success("Valoración actualizada con éxito");
            return true;
        } catch (error) {
            console.error("Error updating rating:", error);
            toast.error("Error al actualizar valoración");
            return false;
        }
    };

    const removeRating = async (productId: string, ratingId: string) => {
        try {
            const result = await api.delete('/api/product/remove-rating', {
                data: { productId, ratingId }
            });

            if (result.data.error) {
                toast.error(result.data.error.message || "Error al eliminar valoración");
                return false;
            }

            toast.success("Valoración eliminada con éxito");
            return true;
        } catch (error) {
            console.error("Error removing rating:", error);
            toast.error("Error al eliminar valoración");
            return false;
        }
    };

    return (
        <RatingContext.Provider value={{
            getProductRatings,
            checkUserRating,
            getPurchasedFormats,
            addRating,
            updateRating,
            removeRating
        }}>
            {children}
        </RatingContext.Provider>
    );
};