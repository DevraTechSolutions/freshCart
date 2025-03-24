import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import { CartContext } from '../../context/cartContext';
import logo from "../../assets/images/freshcart-logo.svg"

export default function NavBar() {

    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const { tkn, settkn } = useContext(AuthContext);
    const { dataa } = useContext(CartContext);



    function hundleLogOut() {

        localStorage.removeItem("tkn")
        settkn(null)
    }
    return (
        <>

            <nav className=' p-3 mb-2 bg-blue-300 relative w-full flex justify-between'>
                {/* <button className='md:hidden absolute right-2 top-0 mx-auto' onClick={toggleMenu}><i className="fa-solid fa-bars"></i></button> */}
                <div className=''>
                    <Link to={'/'}>
                    <img src={logo} alt="logo" />

                    </Link>
                </div>
                <div className={`text-center  md:flex justify-between   `}>

                  

                    <div className={`justify-center items-start flex `}>
                        <ul className=' flex justify-center gap-3'>


                            {tkn ? <>
                                <li>

                                    <Link to={'cart'}>
                                        <i className="text-blue-700 fa-solid fa-cart-plus"></i>
                                        {dataa.numOfCartItems}

                                    </Link>
                                </li>
                                <li className=' md:mt-0  '>
                                    <span onClick={hundleLogOut} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">log out</span>
                                </li>
                            </> : <>
                                <li className='mt-4 md:mt-0 '>
                                    <NavLink className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" to={"register"}>Register</NavLink>
                                </li>
                                <li className='mt-4 md:mt-0'>
                                    <NavLink className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" to={"login"}>login</NavLink>
                                </li>

                            </>}



                        </ul>
                    </div>
                </div>
            </nav>




        </>




    )
}
