import React from 'react'
import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid gray" }}>
      
      <Link to="/" style={{ marginRight: "15px" }}>Főoldal</Link>
      <Link to="/products" style={{ marginRight: "15px" }}>Cipőink</Link>
      <Link to="/cart" style={{ marginRight: "15px" }}>Kosár</Link>
      <Link to="/login" style={{ marginRight: "15px" }}>Bejelentkezés</Link>
      <Link to="/register">Regisztráció</Link>
      <Link to="/"></Link>

    </nav>
  )
}
