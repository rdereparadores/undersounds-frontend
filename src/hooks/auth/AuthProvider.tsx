import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext, AuthContextLogInProps, AuthContextSignUpArtistProps, AuthContextSignUpUserProps } from './AuthContext'
import { UserRole } from '@/constants'

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

    const signUpUser = async (data: AuthContextSignUpUserProps) => {
        console.log(data)
        return true
    }

    const signUpArtist = async (data: AuthContextSignUpArtistProps) => {
        console.log(data)
        return true
    }
    return (
        <AuthContext.Provider value={{ token, userName, userRole, logIn, logOut, signUpUser, signUpArtist }}>
            { children }
        </AuthContext.Provider>
    )
}