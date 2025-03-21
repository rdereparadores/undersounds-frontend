import { Navigate, Outlet } from "react-router"

import { useAuth } from "@/hooks/auth/useAuth"

export const GuestOnlyRoute = () => {
    const auth = useAuth()

    if (auth.token === undefined) {
        return <></>
    } else if (auth.token === null) {
        return <Outlet />
    } else {
        return <Navigate to='/user/dashboard' />
    }
    
}