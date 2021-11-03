import './Navbar.css'
import React from 'react'
import Logo from '../../Assets/Logo.svg'
import Cart from '../../Assets/Cart.svg'
import Account from '../../Assets/Account.svg'
import {Link} from "react-router-dom";

const Navbar = () => {

    function toggleLoginDialogue(){
        document.dispatchEvent(new CustomEvent("toggleLoginDialogue"));
    }

    return (
        <nav className="navbar">
            <div className="nav-logo-container">
                <Link to="/">
                    <img src={Logo} className="nav-img" alt="" />
                </Link>
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
