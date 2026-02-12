import React from 'react'
import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid gray" }}>
      
      <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
      <Link to="/products" style={{ marginRight: "15px" }}>Shop</Link>
      <Link to="/cart" style={{ marginRight: "15px" }}>Cart</Link>
      <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
      <Link to="/register">Register</Link>

    </nav>
  )
}
