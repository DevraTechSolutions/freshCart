import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Product from '../product/Product'
import { CartContext } from '../../context/cartContext'
import { AuthContext } from '../../context/authContext';


export default function Home() {
    const { tkn } = useContext(AuthContext);

    // https://ecommerce.routemisr.com/api/v1/categories
    const [myData, setmyData] = useState([])

    async function getApi() {

        const res = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
        setmyData(res.data.data)

    }
    useEffect(function () {
        getApi()


    }, [])

    return (
        <>

            {tkn ?<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-hidden">

                {myData.map(function (el) {


                    return <Product key={el.id} product={el} />
                })}
            </div> : <div></div>
            }


        </>
    )
}
