import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './authContext';
import axios from 'axios';




export const CartContext = createContext();

export default function CartContextProvider({ children }) {
    const { tkn } = useContext(AuthContext);
    const [dataa, setdataa] = useState([])
    async function postCart(_id) {

        const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId: _id
        }, {
            headers: {
                token: tkn
            }

        })
        setdataa(res.data)
        
    }
    async function getcart() {
        console.log('dataa', dataa);

        const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: {
                token: tkn
            }

        })
        setdataa(res.data)

    }

    useEffect(function () {
        
        getcart()

    }, [tkn])
    return (<CartContext.Provider value={{
        dataa,
        postCart,
        setdataa
    }}>
        {children}
    </CartContext.Provider>

    )
}
