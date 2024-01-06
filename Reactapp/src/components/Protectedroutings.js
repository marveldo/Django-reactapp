import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useAuth } from "./Auth";
const Protectedroute = ({children}) => {
    const auth = useAuth()
    let refreshtoken = localStorage.getItem('refreshtoken')
    
    const isauthenticated = auth.user || refreshtoken ? true : false
     
    return isauthenticated ? children :  <Navigate to='/' replace/>
}

const AlreadyLoggedin = ({children}) => {
    const auth = useAuth()
    let refreshtoken = localStorage.getItem('refreshtoken')
    
    const isauthenticated = auth.user || refreshtoken ? false: true
    return isauthenticated? children : <Navigate to='/home' replace/>
}
export {Protectedroute,AlreadyLoggedin}