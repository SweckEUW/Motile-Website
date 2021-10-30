import './Navbar.css'
import React from 'react'
import Logo from '../../Assets/Logo.svg'
import Cart from '../../Assets/Cart.svg'
import Account from '../../Assets/Account.svg'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-logo-container">
                <img src={Logo} class="nav-img" alt="" />
            </div>
            
            <div className="nav-links">
                <div className="nav-shopping-cart">
                    <img src={Cart} class="nav-img"  alt="" />
                </div>
                <div className="nav-account">
                    <img src={Account} class="nav-img"  alt="" />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
