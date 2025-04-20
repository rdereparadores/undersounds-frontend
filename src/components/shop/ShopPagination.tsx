import { useSearchParams, useNavigate } from "react-router"
import { Button } from "../ui/button"
import { GrFormPrevious } from "react-icons/gr"
import { GrFormNext } from "react-icons/gr"
import { ShopContextResultProps } from "@/hooks/shop/ShopContext"

export const ShopPagination = ({ searchResults }: { searchResults: ShopContextResultProps }) => {
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const nextPage = () => {
        if (params.get('page')) {
            params.set('page', Number(parseInt(params.get('page')!) + 1).toString())
        } else {
            params.set('page', Number(2).toString())
        }
        navigate('/shop?' + params.toString())
    }
    const previousPage = () => {
        if (params.get('page') || parseInt(params.get('page')!) > 1) {
            params.set('page', Number(parseInt(params.get('page')!) - 1).toString())
        }
        navigate('/shop?' + params.toString())
    }

    const nextPageButtonVisibility = () => {
        if (!params.get('page')){
            return false
        } else if (parseInt(params.get('page')!) == Math.ceil(searchResults.itemCount / 20)){
            return false
        } else {
            return true
        }
    }

    const previousPageButtonVisibility = () => {
        if (!params.get('page')) { // Página 1
            return false
        } else if (parseInt(params.get('page')!) == 1) {
            return false
        } else {
            return true
        }
    }

    return (
        <div className='mt-4 w-full flex justify-center items-center gap-2'>
            <Button className={`w-10 h-10 ${previousPageButtonVisibility() ? '' : 'hidden'}`} onClick={previousPage}>
                <GrFormPrevious />
            </Button>
            <p>Página {params.get('page') ? params.get('page') : '1'} de {Math.ceil(searchResults.itemCount / 20)}</p>
            <Button className={`w-10 h-10 ${nextPageButtonVisibility() ? '' : 'hidden'}`} onClick={nextPage}>
                <GrFormNext />
            </Button>
        </div>
    )
}