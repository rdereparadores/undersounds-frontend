import { createContext } from 'react'

import { UserRole } from '@/constants'

export interface AuthContextLogInProps {
    email: string,
    password: string
}

interface AuthContextProps {
    token: string | null | undefined,
    userName: string,
    userRole: UserRole,
    logIn: ({ email, password }: AuthContextLogInProps) => Promise<boolean>,
    logOut: () => void
}

export const AuthContext = createContext<AuthContextProps>({
    token: '',
    userName: '',
    userRole: UserRole.GUEST,
    logIn: async () => (false),
    logOut: () => {}
})