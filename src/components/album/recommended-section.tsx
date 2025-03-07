import { ScrollArea } from "@/components/ui/scroll-area"
import * as React from "react";
import {Separator} from "@/components/ui/separator.tsx";

// Datos de ejemplo
const recommendedItems = [
    { title: "Whatever", artist: "Kygo & Ava Max", imageSrc: "src/assets/Whatever_Kygo_y_AvaMax.png" },
    { title: "Let's Love", artist: "David Guetta & Sia", imageSrc: "src/assets/David%20Guetta%20&%20Sia.png" },
    { title: "Lágrimas Desordenadas", artist: "Melendi", imageSrc: "src/assets/Melendi_%20Lágrimas%20Desordenadas.png" },
    { title: "Grandes Éxitos", artist: "David Bisbal", imageSrc: "src/assets/David%20Bisbal_%20Grandes%20Éxitos.png" },
    { title: "Whatever", artist: "Kygo & Ava Max", imageSrc: "src/assets/Whatever_Kygo_y_AvaMax.png" },
    { title: "Grandes Éxitos", artist: "David Bisbal", imageSrc: "src/assets/David%20Bisbal_%20Grandes%20Éxitos.png" },
    { title: "Let's Love", artist: "David Guetta & Sia", imageSrc: "src/assets/David%20Guetta%20&%20Sia.png" },
    { title: "Grandes Éxitos", artist: "David Bisbal", imageSrc: "src/assets/David%20Bisbal_%20Grandes%20Éxitos.png" },
]

function RecommendedItem({ title, artist, imageSrc }: { title: string; artist: string; imageSrc: string }) {
    return (
        <div className="flex items-center gap-8">
            <div className="w-24 h-24 flex-shrink-0 rounded-tl-2xl rounded-br-2xl overflow-hidden">
                <img src={imageSrc || "src/assets/placeholder.jpg"} alt={title} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
                <h3 className="text-black font-medium text-sm md:text-base">{title}</h3>
                {artist && <p className="text-sm text-black ">{artist}</p>}
            </div>
        </div>
    )
}

// Componente que muestra RecommendedItems en un ScrollArea
function RecommendedItemsScrollArea() {
    return (
        <ScrollArea className="h-128 w-auto rounded-md border">
            <div className="p-4">
                {recommendedItems.map((item, index) => (
                    <React.Fragment key={item.title}>
                        <RecommendedItem
                            title={item.title}
                            artist={item.artist}
                            imageSrc={item.imageSrc}
                        />
                        {index < recommendedItems.length - 1 && <Separator className="my-2" />}
                    </React.Fragment>
                ))}
            </div>
        </ScrollArea>
    )
}

export function RecommendedSection() {
    return (
        <div className="w-full h-full lg:w-64 flex-shrink-0 z-10">
            <h2 className="text-xl font-bold border-b-2 border-primary inline-block mb-3 text-black">
                Recomendados
            </h2>
            <RecommendedItemsScrollArea/>
        </div>
    );
}
