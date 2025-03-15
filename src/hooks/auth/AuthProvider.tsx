import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext, AuthContextLogInProps, AuthContextSignUpArtistProps, AuthContextSignUpUserProps } from './AuthContext'
import { UserRole } from '@/constants'
import { toast } from 'sonner'

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [userName, setUserName] = useState('')
    const [userRole, setUserRole] = useState(UserRole.GUEST)
    const [token, setToken] = useState<undefined | null | string>(undefined)

    const navigate = useNavigate()

    useEffect(() => {
        const verifyToken = async () => {
            const localToken = localStorage.getItem('jwt')
            if (!localToken) { // Guest
                setUserRole(UserRole.GUEST)
                return setToken(null)
            }

            setUserName('AlejPagar')
            setUserRole(UserRole.ARTIST)
            return setToken(localToken)
        }
        verifyToken()
    }, [])

    const logIn = async ({ email, password }: AuthContextLogInProps) => {
        if (email === password) {
            return false
        }

        setUserName(email)
        localStorage.setItem('jwt', 'example-token')
        setToken('example-token')
        setUserRole(UserRole.ARTIST)
        return true
    }

    const logOut = () => {
        localStorage.removeItem('jwt')
        setToken(null)
        setUserRole(UserRole.GUEST)

        setTimeout(() => navigate('/auth/signin'), 0)
    }

    const signUpUser = async ({ userName, email, password }: AuthContextSignUpUserProps) => {
        if (userName == 'usuario') {
            toast.error('El nombre de usuario no está disponible')
            return false
        }
        if (email == 'email@example.com') {
            toast.error('Ya existe un usuario con esa dirección de correo')
            return false
        }
        if (password == 'password') {
            toast.error('Contraseña insegura')
            return false
        }
        return true
    }

    const signUpArtist = async ({ userName, email, password, name, surname, artistName }: AuthContextSignUpArtistProps) => {
        if (userName == 'usuario') {
            toast.error('El nombre de usuario no está disponible')
            return false
        }
        if (email == 'email@example.com') {
            toast.error('Ya existe un usuario con esa dirección de correo')
            return false
        }
        if (password == 'password') {
            toast.error('Contraseña insegura')
            return false
        }
        if (name == 'nombre' || surname == 'apellidos' || artistName == 'artista') {
            toast.error('Campos no válidos')
            return false
        }
        return true
    }
    return (
        <AuthContext.Provider value={{ token, userName, userRole, logIn, logOut, signUpUser, signUpArtist }}>
            { children }
        </AuthContext.Provider>
    )
}