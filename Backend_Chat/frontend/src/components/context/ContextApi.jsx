import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const chatContext = createContext()

const ContextApi = ({children}) => {
    const [user,setUser] = useState()
    const navigate = useNavigate()
    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo)
        if(!userInfo){
            navigate("/")
        }
    },[navigate])
  return (
    <>
        <chatContext.Provider value={{user , setUser}}>
            {children}
        </chatContext.Provider>
    </>
  )
}

export default ContextApi