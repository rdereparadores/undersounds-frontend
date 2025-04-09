import { Navigate, Outlet } from "react-router"

import { useAuth } from "@/hooks/auth/useAuth"
import { useEffect, useState } from "react"
import { UserRole } from "@/constants"

export const GuestOnlyRoute = () => {
    const auth = useAuth()
    const [userRole, setUserRole] = useState<UserRole | undefined>(undefined)
    useEffect(() => {
        const roleHandler = async () => {
            const role = await auth.checkRole()
            setUserRole(role)
        }
        roleHandler()
    }, [auth])

    if (userRole === undefined) {
        return <></>
    } else if (userRole === UserRole.GUEST) {
        return <Outlet />
    } else {
        return <Navigate to='/user/dashboard' />
    }

}