import { login, logout , register, getMe } from "../services/auth.api";
import { useContext } from "react";
import { AuthContext } from "../auth.context";

 export const useAuth = () =>{
    const context = useContext(AuthContext);
    const {user,setuser,loading,setloading} = context;

    const handleLogin = async ({username,email,password})=> {
        setloading(true);
        const data = await login({username,email,password});         
        setuser(data.user);
        setloading(false)
    }
    const handleRegister = async ({username,email,password})=> {
        setloading(true);
        const data = await register({username,email,password});         
        setuser(data.user);
        setloading(false)
    }

    const handleLogout = async ()=> {
        setloading(true);
        const data = await logout();         
        setuser(data.user);
        setloading(false)
    }
    const handleGetMe = async ()=> {
        setloading(true);
        const data = await getMe();         
        setuser(data.user);
        setloading(false)
    }

    return(
        {
            handleLogin,
            handleRegister,
            handleLogout,
            handleGetMe,
            user,
            loading
        }
    )
 }