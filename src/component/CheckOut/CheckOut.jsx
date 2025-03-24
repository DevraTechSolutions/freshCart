import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { CartContext } from '../../context/cartContext';
import axios from 'axios';

export default function CheckOut() {
    const route = useNavigate();
    const [searchParams] = useSearchParams();
    const cartId = searchParams.get("cartId");
    const { setdataa } = useContext(CartContext);
    const { tkn } = useContext(AuthContext);
    const [paymentMethod, setPaymentMethod] = useState("cash"); // الحالة الافتراضية Cash

    async function handleChickoutVisa(values) {
        const shippingAddress = { shippingAddress: values };

        try {
            const res = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
                shippingAddress,
                {
                    headers: { token: tkn }
                }
            );

            console.log("Success", res.data.session.url);
            window.location.href = res.data.session.url; // التوجيه لصفحة الدفع

        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }

    async function handleChickout(values) {
        const shippingAddress = { shippingAddress: values };

        try {
            const res = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
                shippingAddress,
                {
                    headers: { token: tkn }
                }
            );

            console.log("Success", res);
            setdataa([]); // تفريغ السلة بعد الدفع

        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }

    const formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: ''
        },
        onSubmit: (values) => {
            if (paymentMethod === "visa") {
                handleChickoutVisa(values);
            } else {
                handleChickout(values);
            }
        }
    });

    return (
        <>
            <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
                {/* Address Input */}
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Details</label>
                    <input type="text" onChange={formik.handleChange} value={formik.values.details} id="details" name="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>

                {/* Phone Input */}
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Phone</label>
                    <input type="text" onChange={formik.handleChange} value={formik.values.phone} id="phone" name="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>

                {/* City Input */}
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">City</label>
                    <input type="text" onChange={formik.handleChange} id="city" value={formik.values.city} name="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>

                {/* Payment Method Selection */}
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Payment Method</label>
                    <div className="flex items-center">
                        <input type="radio" id="cash" name="paymentMethod" value="cash" checked={paymentMethod === "cash"} onChange={() => setPaymentMethod("cash")} className="mr-2" />
                        <label htmlFor="cash" className="mr-4">Cash</label>

                        <input type="radio" id="visa" name="paymentMethod" value="visa" checked={paymentMethod === "visa"} onChange={() => setPaymentMethod("visa")} className="mr-2" />
                        <label htmlFor="visa">Visa</label>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Submit
                </button>
            </form>
        </>
    );
}
