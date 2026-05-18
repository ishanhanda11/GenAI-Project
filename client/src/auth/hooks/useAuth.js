import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout } from "../services/auth.api";
export const useAuth = ()=>{
    const context = useContext(AuthContext)
    const {user, setUser, loading, setLoading, checkingAuth} = context

    const handleLogin = async({email,password})=>{
        setLoading(true)
        try{
            const data = await login({email,password})
            if (data?.user){
                setUser(data.user)
            }
            return data
        }catch(err){
            console.log(err)
        } finally{
            setLoading(false)
        }
    }

    const handleRegister = async({username,email,password})=>{
        setLoading(true)
        try{
            const data = await register({username,email,password})
            if (data?.user){
                setUser(data.user)
            }
            return data
        }catch(err){
            console.log(err)
        } finally{
            setLoading(false)
        }
    }

    const handleLogout = async ()=>{
        setLoading(true)
        try{
            const data = await logout()
            setUser(null)
            return data
        }catch(err){
            console.log(err)
        } finally{
            setLoading(false)
        }
    }
    return {user,loading,checkingAuth,handleLogin,handleRegister,handleLogout}
}
