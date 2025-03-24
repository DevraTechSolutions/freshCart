import React from 'react'
import { Link } from 'react-router-dom';

export default function (props) {

    const { title, description, imageCover, price, _id } = props.product
    const shortDescription = description.length > 50 ? description.slice(0, 50) + "..." : description;

    return (
        <>

            <Link to={`singleproduct/${_id}`} className='p-4 border rounded-lg'>
                <img src={imageCover} className="h-fit w-full" alt="image" />
                <p className='text-green-700'>{shortDescription}</p>
                <h4>{title}</h4>
                <p>{price}</p>
            </Link>

        </>
    )
}
