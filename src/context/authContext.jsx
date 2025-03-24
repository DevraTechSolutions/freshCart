import React, { createContext, useEffect, useState } from 'react'



export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {

    const [tkn, settkn] = useState(null)
    useEffect(function () {
        if (localStorage.getItem('tkn') != null) {
            settkn(localStorage.getItem('tkn'))
        }

    }, [])
    return (
        <AuthContext.Provider value={{
            tkn,
            settkn
        }}>
            {children}
        </AuthContext.Provider>
    )
}
