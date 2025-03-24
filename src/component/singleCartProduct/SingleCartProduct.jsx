import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function SingleCartProduct(props) {
    const { data, pricee } = props;
    const productId = data.product
    // /api/v1/products/6428ebc6dc1175abc65ca0b9
    const [myData, setmyData] = useState([])

    async function getApi() {

        const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
        setmyData(res.data.data)

    }
    useEffect(function () {
        getApi()

    }, [productId])
    const { count } = data
    const { title, quantity, price, imageCover } = myData

    return (
        <tbody>

            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <img src={imageCover} className='h-52'></img>
                </th>
                <td class="px-6 py-4">
                    {title}
                </td>
                <td class="px-6 py-4">
                    <i class="fa-solid fa-minus"></i>
                </td>
                <td class="px-6 py-4">
                    {count}
                </td>


                <td class="px-6 py-4">

                    <i class="fa-solid fa-plus"></i>
                </td>
        
            </tr>
        </tbody>
    )
}
