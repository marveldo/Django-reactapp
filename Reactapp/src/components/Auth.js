import { createContext , useContext , useState } from "react";


const AuthContext = createContext(null)

export const Authprovider = ({children}) =>{
    const [user,setuser] = useState(null)
    const [access, setaccess] = useState(null)
    const [refresh,setrefresh] = useState(null)
    
    

    const login = (user, access, refresh) => {
        setuser(user)
        setaccess(access)
        setrefresh(refresh)
    }
    const logout = () =>{
        setuser(null)
        setaccess(null)
        setrefresh(null)
    }
  
    return(
        <AuthContext.Provider value={{user,login,logout ,access,refresh}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}