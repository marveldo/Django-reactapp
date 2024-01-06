import { useAuth } from "./Auth";
import React from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Refresh = ({children}) => {
   
    const auth = useAuth();
   
    const [shouldTriggerEffect, setShouldTriggerEffect] = React.useState(true);
    const navigate = useNavigate()
    
    const refresh = async(refreshtoken) =>{
        const url = 'http://127.0.0.1:8000/api/refresh/'
        const headers = new Headers()
        headers.set('Content-Type','application/json')
        const header = {
            method : 'POST',
            headers : headers,
            body : JSON.stringify({refresh : refreshtoken})
         }
        try{
            const response = await fetch(url,header)
            const data = await response.json()
            
            if(data.access){
                localStorage.setItem('accesstoken',data.access)
                auth.login(data.username,data.access,data.refresh)
             }
            if (data.detail){
                auth.logout()
                localStorage.removeItem('refreshtoken')
                localStorage.removeItem('accesstoken')
                localStorage.removeItem('email')
                localStorage.removeItem('username')
                navigate('/', {replace: true})
           
            }
            
           
        }catch(error){
            
            const data = error.name
            if (data === 'TypeError'){
               
                auth.logout()
                localStorage.removeItem('refreshtoken')
                localStorage.removeItem('accesstoken')
                localStorage.removeItem('email')
                localStorage.removeItem('username')
                navigate('/', {replace: true})
                
             
              
                
            }
            else if (data === 'NetworkError'){
                
                auth.logout()

                localStorage.removeItem('refreshtoken')
                localStorage.removeItem('accesstoken')
                localStorage.removeItem('email')
                localStorage.removeItem('username')
                navigate('/', {replace: true})
                
              
                
            }
            
        }
    }
    React.useEffect(()=>{
        const refreshtoken = auth.refresh ? auth.refresh : localStorage.getItem('refreshtoken')
       
        if(refreshtoken){
             refresh(refreshtoken)
        }
    },[])
    React.useEffect(()=>{
      const refreshtoken  = localStorage.getItem('refreshtoken')
      const Interval = setInterval(async()=>{
          if(refreshtoken){
            await  refresh(refreshtoken)

          }
         setShouldTriggerEffect(prev => !prev)
           
            
        
      }, 180000)
      
      return () => clearInterval(Interval); 
     
    },[shouldTriggerEffect])
  
    return children 
  
  
}
