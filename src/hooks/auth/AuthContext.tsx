import { createContext } from 'react'

import { UserRole } from '@/constants'

export interface AuthContextLogInProps {
    email: string,
    password: string
}

export interface AuthContextSignUpUserProps {
    userName: string,
    email: string,
    password: string
}

export interface AuthContextSignUpArtistProps extends AuthContextSignUpUserProps {
    name: string,
    surname: string,
    artistName: string
}

interface AuthContextProps {
    token: string | null | undefined,
    userName: string,
    userRole: UserRole,
    logIn: ({ email, password }: AuthContextLogInProps) => Promise<boolean>,
    logOut: () => void,
    signUpUser: ({ userName, email, password }: AuthContextSignUpUserProps) => Promise<boolean>,
    signUpArtist: ({ userName, email, password, name, surname, artistName }: AuthContextSignUpArtistProps) => Promise<boolean>
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