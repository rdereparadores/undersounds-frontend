import { useNavigate } from 'react-router'
import { AuthContext, AuthContextForgotPassword, AuthContextLogInProps, AuthContextSignUpArtistProps, AuthContextSignUpUserProps } from './AuthContext'
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider, signInWithPopup,
    sendPasswordResetEmail,
    FacebookAuthProvider,
    //sendEmailVerification, sendPasswordResetEmail,updatePassword, fetchSignInMethodsForEmail
} from 'firebase/auth'
import { auth } from './firebase'
import { FirebaseError } from 'firebase/app'
import { toast } from 'sonner'
import axios from "axios";
import { api } from '@/lib/api'
import { UserRole } from '@/constants'

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const navigate = useNavigate()

    const logIn = async ({ email, password }: AuthContextLogInProps) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const idToken = await userCredential.user.getIdToken()
            localStorage.setItem("token", idToken)
            const response = await api.post("/api/auth/signin")

            if (response.data.err) {
                toast.error(response.data.err)
                return false
            }
            return true

        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                const errorCode = error.code
                if (errorCode === 'auth/wrong-password') {
                    toast.error("Email o contraseña incorrectos")
                } else if (errorCode === 'auth/invalid-email') {
                    toast.error("Email o contraseña incorrectos")
                } else if (errorCode === 'auth/user-not-found') {
                    toast.error("No existe un usuario para ese email")
                }
            }
            return false
        }
    }

    const logOut = () => {
        auth.signOut()
        localStorage.removeItem('token')
        setTimeout(() => navigate('/auth/signin'), 0)
    }

    const signUpUser = async (data: AuthContextSignUpUserProps) => {
        try {
            const response = await axios.post("/api/auth/signup", {
                ...data,
                userType: "user"
            });

            if (response.data.err) {
                switch (response.data.err) {
                    case "EMAIL_ALREADY_IN_USE": {
                        toast.error("Email ya esta en uso")
                        break
                    }
                    case "INVALID_EMAIL": {
                        toast.error("Email inválido")
                        break
                    }
                    case "WEAK_PASSWORD": {
                        toast.error("Contraseña demasiado débil")
                        break
                    }
                }
                return false
            }
            return true
        } catch (error: unknown) {
            console.log(error)
            return false
        }

    }

    const signUpArtist = async (data: AuthContextSignUpArtistProps) => {

        try {
            const response = await axios.post("/api/auth/signup", {
                ...data,
                userType: "artist"
            });

            if (response.data.err) {
                switch (response.data.err) {
                    case "EMAIL_ALREADY_IN_USE": {
                        toast.error("Email ya esta en uso")
                        break
                    }
                    case "INVALID_EMAIL": {
                        toast.error("Email inválido")
                        break
                    }
                    case "WEAK_PASSWORD": {
                        toast.error("Contraseña demasiado floja")
                        break
                    }
                }
                return false
            }
            return true
        } catch (error: unknown) {
            console.log(error)
            return false
        }

    }

    const signInGoogle = async () => {
        auth.languageCode = 'es';
        const google = new GoogleAuthProvider();
        try {
            const result = (await signInWithPopup(auth, google));
            const idToken = await result.user.getIdToken()
            localStorage.setItem("token", idToken)
            const response = await api.post("/api/auth/signin")

            if (response.data.err) {
                toast.error(response.data.err)
                return false
            }
            navigate('/user/dashboard')
            return true

        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                const errorCode = error.code
                if (errorCode === 'auth/account-exists-with-different-credential') {
                    toast.error("Ya existe un usuario con ese email")
                } else if (errorCode === 'auth/cancelled-popup-request') {
                    toast.error("Se intentó abrir otra ventana emergente")
                } else if (errorCode === 'auth/popup-closed-by-user') {
                    toast.error("Ventana emergente cerrada por el usuario")
                }
            }
            return false
        }
    }

    const signInFacebook = async () => {
        auth.languageCode = 'es';
        const facebook = new FacebookAuthProvider();
        try {
            const result = (await signInWithPopup(auth, facebook));
            const idToken = (await result.user.getIdToken()).toString()

            const response = await axios.get("http://localhost:4000/auth/signin", {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            });

            console.log(response.data)
            //TODO enviar todos los campos a la base de datos

        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                const errorCode = error.code
                if (errorCode === 'auth/account-exists-with-different-credential') {
                    toast.error("Ya existe un usuario con ese email")
                } else if (errorCode === 'auth/cancelled-popup-request') {
                    toast.error("Se intentó abrir otra ventana emergente")
                } else if (errorCode === 'auth/popup-closed-by-user') {
                    toast.error("Ventana emergente cerrada por el usuario")
                }
            }
            return false
        }
    }

    const checkRole = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return UserRole.GUEST

            const result = await api.post('/api/auth/signin', {})
            if (result.data.err) return UserRole.GUEST

            return result.data.msg.userRole === 'user' ? UserRole.USER : UserRole.ARTIST
        } catch {
            return UserRole.GUEST
        }
    }

    const forgotPassword = async (data: AuthContextForgotPassword) => {
        sendPasswordResetEmail(auth, data.email)
        return true
    }

    return (
        <AuthContext.Provider value={{ logIn, logOut, signUpUser, signUpArtist, signInGoogle, forgotPassword, signInFacebook, checkRole }}>
            {children}
        </AuthContext.Provider>
    )
}

