import { ShopFilters } from "@/components/shop/ShopFilters"
import { ShopItemsContainer } from "@/components/shop/ShopItemsContainer"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Link, useSearchParams } from "react-router"

export const Shop = () => {
    const [params] = useSearchParams()

    return (
        <>
            <Breadcrumb className='mt-2'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to='/'>Inicio</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to='/shop'>Tienda</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {(() => {
                        if (params.get('query')) {
                            return (
                                <>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{params.get('query')}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </>
                            )
                        }
                    })()}
                </BreadcrumbList>
            </Breadcrumb>
            <div className='flex flex-grow flex-shrink-0 basis-auto flex-wrap sm:flex-nowrap mt-3 gap-4 items-start justify-evenly h-fit w-full'>
                <ShopFilters />
                <ShopItemsContainer />
            </div>
        </>
    )
}