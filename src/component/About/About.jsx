import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext'

export default function About() {

  const { tkn } = useContext(AuthContext);
  console.log('Token from context:', tkn);
  return (
    <div>

      {tkn ? <p>Token: {tkn}</p> : <p>No token found</p>}

    </div>
  )
}
