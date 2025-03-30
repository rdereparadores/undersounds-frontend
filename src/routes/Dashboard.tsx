import { Link, Outlet, useLocation } from "react-router"
import { Button } from "../components/ui/button"
import { UserRole } from "@/constants"
import { Separator } from "@/components/ui/separator"

export const UserDashboardMenu = () => {
    const location = useLocation()
    const isCurrentRoute = (route: string) => {
        const currentRouteSplitted = location.pathname.split('/').filter(item => item != '')
        const currentRoute = currentRouteSplitted[currentRouteSplitted.length - 1]
        return (currentRoute == route) ? 'secondary' : 'link'
    }

    return (
        <>
            <Button asChild variant={isCurrentRoute('dashboard')}>
                <Link to='/user/dashboard'>Panel</Link>
            </Button>
            <Button asChild variant={isCurrentRoute('profile')}>
                <Link to='/user/dashboard/profile'>Perfil</Link>
            </Button>
            <Button asChild variant={isCurrentRoute('library')}>
                <Link to='/user/dashboard/library'>Biblioteca</Link>
            </Button>
            <Button asChild variant={isCurrentRoute('orders')}>
                <Link to='/user/dashboard/orders'>Pedidos</Link>
            </Button>
            <Button asChild variant={isCurrentRoute('stats')}>
                <Link to='/user/dashboard/stats'>Estadísticas</Link>
            </Button>
        </>
    )
}

export const Dashboard = ({role}: {role: UserRole}) => {
    return (
        <div className="p-5">
            <div className="flex flex-wrap lg:flex-nowrap gap-6 justify-center max-w-[1920px] mx-auto">
                <div className="flex flex-col gap-2 grow sm:w-72 lg:flex-none lg:grow-0">
                    {role == UserRole.USER ? <UserDashboardMenu /> : <></>}
                </div>
                <Separator className="h-auto hidden lg:block" orientation="vertical" />
                <Outlet />
            </div>
        </div>
    )
}