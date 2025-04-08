import { Navigate, Outlet } from "react-router"

import { UserRole } from "@/constants"
import { useAuth } from "@/hooks/auth/useAuth"
import { useEffect, useState } from "react"

interface ProtectedRouteProps {
    requiredRole: UserRole,
    redirectTo: string
}

export const ProtectedRoute = ({ requiredRole, redirectTo }: ProtectedRouteProps) => {
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
    } else if (userRole < requiredRole) {
        return <Navigate to={`/auth/signin?redirectTo=${redirectTo}`} />
    } else {
        return (<Outlet />)
    }
}