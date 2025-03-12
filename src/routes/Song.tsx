import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import { LikeButton } from "@/components/album/like-button.tsx";
import { MusicPlayer } from "@/components/song/MusicPlayer.tsx";
import { PurchaseOptions } from "@/components/album/purchase-options.tsx";
import { RecommendedSection } from "@/components/album/recommended-section.tsx";

export const Song = () => {

    return (
        <div className="min-h-screen">
            <div className="max-w-[1400px] mx-auto p-4">
                <div className="mt-6 pl-12">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="">Inicio</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="">Tienda</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Whatever-Kygo & Ava Max</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>



                <div className="ml-12 mt-2 flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Portada del álbum */}
                            <div className="w-full md:w-[300px] flex-shrink-0">
                                <img
                                    src="src/assets/Whatever_Kygo_y_AvaMax.png"
                                    alt="WHATEVER by KYGO & AVA MAX"
                                    className="rounded-br-2xl rounded-tl-2xl w-full"
                                />
                            </div>

                            {/* Información de la canción */}
                            <div className="flex-1 content-center">
                                <div className="flex justify-around items-start">
                                    <div className="mt-4 text-black/80">
                                        <h3 className="text-5xl font-bold mb-2">WHATEVER</h3>
                                        <h4 className="text-2xl text-center">KYGO & AVA MAX</h4>
                                    </div>
                                    {/* Componente Like */}
                                    <div className="text-start pt-5 text-black/80">
                                        <LikeButton />
                                    </div>
                                </div>
                                <div className="">
                                    <MusicPlayer />
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 text-sm md:text-base leading-relaxed text-black-300 md:w-4/5">
                            <h3>
                                "Whatever" de Kygo y Ava Max es una canción pop-electrónica con una melodía pegajosa y un ritmo bailable. La voz
                                distintiva de Ava Max se complementa con la producción atmosférica de Kygo, y la letra transmite un mensaje de
                                empoderamiento y vivir el momento. Perfecta para animar cualquier fiesta.😎
                            </h3>
                        </div>
                        <PurchaseOptions />
                    </div>

                    <div className="lg:w-64 w-full">
                        <RecommendedSection />
                    </div>
                </div>
            </div>
        </div>
    )
}
