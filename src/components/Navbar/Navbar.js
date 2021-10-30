import './Navbar.css'
import React from 'react'
import Logo from '../../Assets/Logo.svg'
import Cart from '../../Assets/Cart.svg'
import Account from '../../Assets/Account.svg'

const Navbar = () => {

    function toggleLoginDialogue(){
        document.dispatchEvent(new CustomEvent("toggleLoginDialogue"));
    }

    return (
        <nav className="navbar">
            <div className="nav-logo-container">
                <img src={Logo} className="nav-img" alt="" />
            </div>
            
            <div className="nav-links">
                <div className="nav-shopping-cart">
                    <img src={Cart} className="nav-img"  alt="" />
                </div>
                <div className="nav-account" onClick={() =>{toggleLoginDialogue()}}>
                    <img src={Account} className="nav-img"  alt="" />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
