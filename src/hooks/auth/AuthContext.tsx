import { UserRole } from '@/constants'
import { createContext } from 'react'

export interface AuthContextLogInProps {
    email: string,
    password: string
}

export interface AuthContextSignUpUserProps {
    name: string,
    surname: string
    email: string,
    password: string,
    birthDate: Date,
    username?: string
}

export interface AuthContextSignUpArtistProps extends AuthContextSignUpUserProps {
    artistName: string,
    artistUsername: string
}

export interface AuthContextForgotPassword {
    email: string,
}

interface AuthContextProps {
    signIn: ({ email, password }: AuthContextLogInProps) => Promise<boolean>,
    signOut: () => void,
    signUpUser: (input: AuthContextSignUpUserProps) => Promise<boolean>,
    signUpArtist: (input: AuthContextSignUpArtistProps) => Promise<boolean>,
    signInGoogle: () => void,
    signUpGoogle: (role: string) => void,
    checkRole: () => Promise<UserRole>
    forgotPassword: (input:AuthContextForgotPassword) => Promise<boolean>,
    setOtp: () => void,
    confirmOtp: (input: string) => Promise<boolean>
}

export const AuthContext = createContext<AuthContextProps>({
    signIn: async () => (false),
    signOut: () => {},
    signUpUser: async () => (false),
    signUpArtist: async () => (false),
    signInGoogle: async () => {},
    signUpGoogle: async () => {},
    checkRole: async () => UserRole.GUEST,
    forgotPassword: async () => (false),
    setOtp: async () => {},
    confirmOtp: async() =>(false)
})