import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CartContext } from '../../context/cartContext';

export default function SingleProduct() {

    const { id } = useParams();
    const [myData, setmyData] = useState([])
    const { imageCover, title, quantity, price, description, _id } = myData
    const { postCart } = useContext(CartContext)

    async function getApi() {

        const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        setmyData(res.data.data)
        console.log(myData);

    }
    useEffect(function () {
        getApi()

    }, [])
function handleAddToCart() {

    postCart(_id)
}
    return (
        <>


            <div className='grid grid-cols-2 gap-2'>
                <div className='ps-3'><img className='h-96 w-96' src={imageCover}></img></div>
                <div className='pe-6 pt-20' >
                    <h1 className='pb-3 text-xl'>{title}</h1>
                    <p>description: {description}</p>
                    <p>Quantity: {quantity}</p>
                    <p>Price: {price}</p>

                    <button onClick={handleAddToCart} className='w-full bg-blue-600 text-white'> add to cart </button>


                </div>
            </div>
        </>
    )
}
