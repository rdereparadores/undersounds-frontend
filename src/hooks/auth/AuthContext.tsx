import { UserRole } from '@/constants'
import { createContext } from 'react'

export interface AuthContextLogInProps {
    email: string,
    password: string
}

export interface AuthContextSignUpUserProps {
    name: string,
    surName: string
    email: string,
    password: string,
    birthDate: Date,
    userName?: string
}

export interface AuthContextSignUpArtistProps extends AuthContextSignUpUserProps {
    artistName: string,
    artistUserName: string
}

export interface AuthContextForgotPassword {
    email:string,
}

interface AuthContextProps {
    logIn: ({ email, password }: AuthContextLogInProps) => Promise<boolean>,
    logOut: () => void,
    signUpUser: (input: AuthContextSignUpUserProps) => Promise<boolean>,
    signUpArtist: (input: AuthContextSignUpArtistProps) => Promise<boolean>,
    signInGoogle: () => void,
    signInFacebook: () => void,
    checkRole: () => Promise<UserRole>
    forgotPassword: (input:AuthContextForgotPassword) => Promise<boolean>
}

export const AuthContext = createContext<AuthContextProps>({
    logIn: async () => (false),
    logOut: () => {},
    signUpUser: async () => (false),
    signUpArtist: async () => (false),
    signInGoogle: async () => {},
    signInFacebook: async () => {},
    checkRole: async () => UserRole.GUEST,
    forgotPassword: async () => (false)
})