import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      Header component
      <div><Link to="/">Home</Link></div>
      <div><Link to="/login">Login</Link></div>
    </div>
  )
}

export default Header