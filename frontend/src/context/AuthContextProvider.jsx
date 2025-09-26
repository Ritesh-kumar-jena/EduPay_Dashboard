import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"


export const AuthContext=createContext()

function AuthContextProvider({children}) {
  const [isLogin,setIsLogin]=useState(false)
  const [id,setId]=useState(null)
  
  
  const isTokenValid=(token)=>{
    if(!token) return false ;
    
    try {
       const decoded=jwtDecode(token)
       const currentTime=Date.now()/1000
       return decoded.exp>currentTime
    } catch (error) {
      return false
    }
  }

  useEffect(()=>{
     const token=localStorage.getItem("token")
     if(isTokenValid(token)){
      const decoded=jwtDecode(token)
      setId(decoded.id)
      setIsLogin(true)
     }else{
      localStorage.removeItem("token")
      setIsLogin(false)
     }
  },[])

  return (
    <AuthContext.Provider value={{isLogin,setIsLogin,id}}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;