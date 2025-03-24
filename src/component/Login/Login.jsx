import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from "yup"
export default function Login() {
  const [err, seterr] = useState(null)
  const navigate = useNavigate()

  async function LoginForm(values) {

    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then(function (res) {


      localStorage.setItem("tkn", res.data.token)
      
      seterr(null)
      navigate("/")

    }).catch(function (error) {
        seterr(error.response.data.message)
      })
  }

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: LoginForm,
    validationSchema: yup.object().shape({

      email: yup.string().email('Invalid email address').required('Email is required'),
      password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),

    }),

  });

  return (
    <>
      <div className='text-center text-blue-600 mt-6 '><h1>Login Form</h1></div>

      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
        {seterr && (
          <div className="text-red-500 text-sm pb-10">{err}</div>
        )}

        <div className="relative z-0 w-full mb-5 group">
          <input type="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
        </div>
        {formik.errors.email && formik.touched.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}

        <div className="relative z-0 w-full mb-5 group">
          <input type="password" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">password</label>
        </div>
        {formik.errors.password && formik.touched.password && (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        )}

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
      </form>





    </>
  )
}
