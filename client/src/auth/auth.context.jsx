import { createContext, useEffect, useState } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [checkingAuth, setCheckingAuth] = useState(true)

    useEffect(() => {
        const restoreUser = async () => {
            try {
                const data = await getMe()
                setUser(data?.user ?? null)
            } catch (error) {
                setUser(null)
            } finally {
                setCheckingAuth(false)
            }
        }

        restoreUser()
    }, [])

    return (
        <AuthContext.Provider value={{user, setUser, loading, setLoading, checkingAuth}}>{children

        }
        </AuthContext.Provider>
    )
}

