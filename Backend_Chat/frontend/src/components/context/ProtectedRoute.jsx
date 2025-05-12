import React, { useContext } from 'react'
import { chatContext } from './ContextApi'
import { Navigate } from 'react-router-dom'
const ProtectedRoute = ({children}) => {
    const userContext = useContext(chatContext)
    const {user} = userContext
    if(user?.token){
      return  children
    }else{
        return <Navigate to="/" />
    }
 
}

export default ProtectedRoute