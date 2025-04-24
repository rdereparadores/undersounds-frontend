import React from "react";
import { RatingContext, RatingProps } from "./RatingsContext";
import { api } from "@/lib/api";
import { toast } from "sonner";

export const RatingsProvider = ({ children }: { children: React.ReactNode }) => {
    const getProductRatings = async (productId: string) => {
        try {
            const result = await api.post('/api/product/ratings', { id: productId });
            if (result.data.error) {
                return []
            }
            return result.data.data
        } catch {
            return []
        }
    };

    const checkUserRating = async (productId: string) => {
        try {
            const result = await api.post('/api/product/ratings/user', { id: productId });
            if (result.data.error) {
                throw new Error(result.data.error.message);
            }
            return result.data.data
        } catch {
            return { hasRated: false, rating: null };
        }
    };

    const addRating = async (productId: string, data: Partial<RatingProps>) => {
        try {
            const result = await api.post('/api/product/ratings/add', {
                id: productId,
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

    const updateRating = async (productId: string, data: Partial<RatingProps>) => {
        try {
            const result = await api.post('/api/product/ratings/update', {
                id: productId,
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

    const removeRating = async (productId: string) => {
        try {
            const result = await api.post('/api/product/ratings/remove', {
                id: productId
            })

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
            addRating,
            updateRating,
            removeRating
        }}>
            {children}
        </RatingContext.Provider>
    );
};