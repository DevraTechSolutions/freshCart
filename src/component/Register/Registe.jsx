import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from "yup"
export default function () {
    const [err, seterr] = useState(null)
    const navigate = useNavigate()
    async function registerForm(values) {
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then(function (res) {


            localStorage.setItem("tkn",res.data.token)
            seterr(null)
            navigate("/")

        }).catch(function (error) {
            seterr(error.response.data.message)
        })

    }

    // Initialize Formik
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
        },
        onSubmit: registerForm,
        validationSchema: yup.object().shape({

            name: yup.string().required("this is required").min(4, "between 4 to 12 char").max(15, "between 4 to 12 char"),
            email: yup.string().email('Invalid email address').required('Email is required'),
            password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
            rePassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Please confirm your password'),
            phone: yup.string().matches(/^0[0125][0-9]{9}$/, 'Phone number must be exactly 11 digits').required("Please enter your phone number"),

        }),

    });
    return (
        <>
            <div className='text-center text-blue-600 mt-6 '><h1>Register here </h1></div>
            <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
            {seterr && (
                    <div className="text-red-500 text-sm pb-10">{err}</div>
                )}

                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User Name</label>
                </div>
                {formik.errors.name && formik.touched.name && (
                    <div className="text-red-500 text-sm">{formik.errors.name}</div>
                )}

                <div className="relative z-0 w-full mb-5 group">
                    <input type="email" name="email" id="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User Email</label>
                </div>
                {formik.errors.email && formik.touched.email && (
                    <div className="text-red-500 text-sm">{formik.errors.email}</div>
                )}
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="password" id="password" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                {formik.errors.password && formik.touched.password && (
                    <div className="text-red-500 text-sm">{formik.errors.password}</div>
                )}
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="rePassword" id="rePassword" onChange={formik.handleChange} value={formik.values.rePassword} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Re Password</label>
                </div>
                {formik.errors.rePassword && formik.touched.rePassword && (
                    <div className="text-red-500 text-sm">{formik.errors.rePassword}</div>
                )}
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="phone" id="phone" onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="PhoneNumber" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
                </div>
                {formik.errors.phone && formik.touched.phone && (
                    <div className="text-red-500 text-sm">{formik.errors.phone}</div>
                )}
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
            </form>




        </>
    )
}
