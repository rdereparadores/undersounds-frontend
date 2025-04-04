import { createContext } from 'react'

import { UserRole } from '@/constants'

export interface AuthContextLogInProps {
    email: string,
    password: string
}

export interface AuthContextSignUpUserProps {
    name: string,
    surName: string
    email: string,
    password: string,
    birthDate: Date
}

export interface AuthContextSignUpArtistProps extends AuthContextSignUpUserProps {
    artistName: string,
    artistUserName: string
}

interface AuthContextProps {
    token: string | null | undefined,
    userName: string,
    userRole: UserRole,
    logIn: ({ email, password }: AuthContextLogInProps) => Promise<boolean>,
    logOut: () => void,
    signUpUser: (input: AuthContextSignUpUserProps) => Promise<boolean>,
    signUpArtist: (input: AuthContextSignUpArtistProps) => Promise<boolean>
}

export const AuthContext = createContext<AuthContextProps>({
    token: '',
    userName: '',
    userRole: UserRole.GUEST,
    logIn: async () => (false),
    logOut: () => {},
    signUpUser: async () => (false),
    signUpArtist: async () => (false)
})