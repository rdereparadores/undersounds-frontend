import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { StarRating } from "./ProductStarRating";
import { RatingItemProps } from "@/hooks/ratings/RatingsContext";
import { useProductRating } from "@/hooks/ratings/useRatings";
import { toast } from "sonner";

interface ProductContainerRatingFormProps {
    productId: string;
    format: string;
    onSuccess: () => void;
    onCancel: () => void;
    existingRating?: RatingItemProps | null;
    isEditing?: boolean;
}

const ratingFormSchema = z.object({
    title: z.string()
        .min(3, "El título debe tener al menos 3 caracteres")
        .max(100, "El título no puede exceder los 100 caracteres"),
    description: z.string()
        .min(10, "La descripción debe tener al menos 10 caracteres")
        .max(500, "La descripción no puede exceder los 500 caracteres"),
    rating: z.number()
        .min(1, "Debes dar al menos 1 estrella")
        .max(5, "Máximo 5 estrellas"),
});

type RatingFormValues = z.infer<typeof ratingFormSchema>;

export const ProductContainerRatingForm = ({
                                               productId,
                                               format,
                                               onSuccess,
                                               onCancel,
                                               existingRating,
                                               isEditing = false
                                           }: ProductContainerRatingFormProps) => {
    const productRating = useProductRating();
    const [submitting, setSubmitting] = useState(false);

    const form = useForm<RatingFormValues>({
        resolver: zodResolver(ratingFormSchema),
        defaultValues: {
            title: existingRating?.title || "",
            description: existingRating?.description || "",
            rating: existingRating?.rating || 0,
        },
    });

    useEffect(() => {
        if (existingRating) {
            form.reset({
                title: existingRating.title,
                description: existingRating.description,
                rating: existingRating.rating,
            });
        } else {
            form.reset({
                title: "",
                description: "",
                rating: 0,
            });
        }
    }, [form, existingRating]);

    const onSubmit = async (data: RatingFormValues) => {
        setSubmitting(true);
        try {
            const payload = {
                ...data,
                format
            };

            let success: boolean;

            if (isEditing && existingRating) {
                success = await productRating.updateRating(
                    productId,
                    existingRating._id,
                    payload
                );
            } else {
                success = await productRating.addRating(productId, payload);
            }

            if (success) {
                onSuccess();
            } else {
                toast.error(isEditing ? "Error al actualizar la valoración" : "Error al añadir la valoración");
            }
        } catch (error) {
            console.error("Error submitting rating:", error);
            toast.error("Error al procesar la valoración");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="mb-4">
                    <h3 className="text-lg font-medium">
                        {isEditing
                            ? `Editando valoración para el formato ${format.charAt(0).toUpperCase() + format.slice(1)}`
                            : `Valorando formato: ${format.charAt(0).toUpperCase() + format.slice(1)}`}
                    </h3>
                </div>

                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Puntuación</FormLabel>
                            <FormControl>
                                <StarRating
                                    value={field.value}
                                    onChange={field.onChange}
                                    emptyByDefault={true}
                                />
                            </FormControl>
                            <FormDescription>Selecciona entre 1 y 5 estrellas</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título</FormLabel>
                            <FormControl>
                                <Input placeholder="Escribe un título para tu valoración" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Comparte tu opinión sobre este producto"
                                    rows={4}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-between items-center gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={submitting}
                    >
                        Cancelar
                    </Button>

                    <div className="flex">
                        <Button type="submit" disabled={submitting}>
                            {submitting
                                ? "Procesando..."
                                : isEditing
                                    ? "Actualizar valoración"
                                    : "Enviar valoración"}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};