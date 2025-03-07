import { Breadcrumb,BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator} from "@/components/ui/breadcrumb"
import {LikeButton} from "@/components/album/like-button.tsx";
import {Navbar} from "@/components/album/navbar.tsx";
import {TrackList} from "@/components/album/track-list.tsx";
import {PurchaseOptions} from "@/components/album/purchase-options.tsx";
import {RecommendedSection} from "@/components/album/recommended-section.tsx";


// Página principal del álbum
export default function AlbumPage() {
  return (
      <div className="min-h-screen">
        <div className="max-w-[1400px] mx-auto p-4">
          <Navbar />
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
                  <BreadcrumbPage>The Martin Garrix Collection</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>



          <div className="ml-12 mt-2 flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Portada del álbum */}
                <div className="w-full md:w-[400px] flex-shrink-0">
                  <img
                      src="src/assets/The%20Martin%20Garrix%20Collection.png"
                      alt="The Martin Garrix Collection"
                      className="rounded-br-2xl rounded-tl-2xl w-full"
                  />
                </div>

                {/* Información del álbum */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold text-black mb-1">
                        The Martin Garrix Collection
                      </h1>
                      <h2 className="text-xl md:text-2xl text-black mb-3">
                        Deluxe Edition
                      </h2>
                    </div>
                    {/* Componente Like */}
                    <LikeButton />
                  </div>

                  <TrackList />
                </div>
              </div>
              <div className="mt-8 text-sm md:text-base leading-relaxed text-black-300 md:w-4/5">
                <h3>
                  "The Martin Garrix Collection" es un álbum recopilatorio del DJ y productor holandés Martin Garrix.
                  Lanzado el 21 de abril de 2017, este álbum incluye una selección de sus mayores éxitos desde 2015
                  hasta 2017. Entre las canciones destacadas se encuentran colaboraciones con artistas como Dua Lipa,
                  Bebe Rexha y Usher. Es una colección que captura la esencia de la música electrónica de Garrix y es
                  perfecta para los fans del EDM.
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
  );
}
