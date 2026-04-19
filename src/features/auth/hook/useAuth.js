import { useDispatch } from "react-redux";
import { register, login, getMe, logout } from "../service/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";


export function useAuth(){

    const dispatch = useDispatch()

    async function handleRegister({email, username, password}) {
        try{
            dispatch(setLoading(true))
            const data = await register({email, username, password})
            dispatch(setLoading(false))
            return data
        }catch(error){
            dispatch(setError(error.response?.data?.message || "Registration failed"))
            throw error;
        }finally{
            dispatch(setLoading(false))
        }
    }

    async function handleLogin({email, password}){

        try{
            dispatch(setLoading(true))
            const data = await login({email, password})
            dispatch(setUser(data))
        }catch(err){
            dispatch(setError(err.response?.data?.message || "Login failed"))
        }finally{
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe(){
        try{
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data))
        }catch(err){
            dispatch(setError(err.response?.data?.message || "Failed to fetch user"))
        }finally{
            dispatch(setLoading(false))
        }
    }

    async function handleLogout(){
        try{
            dispatch(setLoading(true));
            await logout();
            dispatch(setUser({ user: null }));
        }catch(err){
            console.error("Logout failed", err);
        }finally{
            dispatch(setLoading(false));
        }
    }

    return {
        handleRegister,
        handleLogin,
        handleGetMe,
        handleLogout,
    }
}