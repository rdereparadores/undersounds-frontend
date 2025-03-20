import { Navigate, Outlet } from "react-router"

import { UserRole } from "@/constants"
import { useAuth } from "@/hooks/auth/useAuth"

interface ProtectedRouteProps {
    requiredRole: UserRole,
    redirectTo: string
}

export const ProtectedRoute = ({ requiredRole, redirectTo }: ProtectedRouteProps) => {
    const user = useAuth()

    if (user.token === undefined) {
        return <></>
    } else if (user.token === null || user.userRole < requiredRole) {
        return <Navigate to={`/auth/signin?redirectTo=${redirectTo}`} />
    } else {
        return (<Outlet />)
    }
}