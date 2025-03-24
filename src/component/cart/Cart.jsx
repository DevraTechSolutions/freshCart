import React, { useContext } from 'react'
import { CartContext } from '../../context/cartContext';
import SingleCartProduct from '../singleCartProduct/SingleCartProduct';
import { Link } from 'react-router-dom';

export default function Cart() {
    const { dataa } = useContext(CartContext);
    // console.log("dataa", dataa.data);
    const {cartId} = dataa
    const { totalCartPrice } = dataa.data
    const data = dataa.data.products
    return (
        <>


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                image
                            </th>
                            <th scope="col" class="px-6 py-3">
                                title
                            </th>
                            <th scope="col" class="px-6 py-3">
                                +
                            </th>
                            <th scope="col" class="px-6 py-3">
                                count
                            </th>

                            <th scope="col" class="px-6 py-3">
                                -
                            </th>
                        </tr>
                    </thead>
                    {data.map(function (el) {
                        return (
                            <SingleCartProduct data={el} pricee={totalCartPrice} />
                        )
                    }
                    )}


                </table>
                <div className='bg-slate-600 '>

                    <h4 className=' text-center'>{totalCartPrice}</h4>


                    <Link to={`/CheckOut?cartId=${cartId}`}  className=  "mt-6 flex justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">CheckOut</Link>


                </div>

            </div>


        </>
    )
}
