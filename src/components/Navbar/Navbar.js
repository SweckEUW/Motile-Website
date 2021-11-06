import './Navbar.css'
import React, {useContext,useEffect,useState} from 'react';
import ServerRequest from '../../services/ServerRequest'
import Logo from '../../Assets/Logo.svg'
import {Link} from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import {Context} from '../../Store'

const Navbar = () => {
    const [state, setState] = useContext(Context);
    const [dropDownVisible, setDropDownVisible] = useState(false);
    const [userData, setUserData] = useState(null);
    
    useEffect(() => {
        getUserData();
    },[state])

    async function getUserData(){
        let userDataResponse = await ServerRequest.getUserData();
        if(userDataResponse.data.success)
            setUserData(userDataResponse.data.userData);
    }

    function toggleDropDown(){
        setDropDownVisible(!dropDownVisible);
    }

    function toggleLoginDialogue(){
        if(state.loggedIn)
            toggleDropDown();
        else
            document.dispatchEvent(new CustomEvent("toggleLoginDialogue"));
    }

    function logout(){
        setState(prevState => ({...prevState,loggedIn: false}));
        localStorage.removeItem('token');
        setUserData(null);
        console.log("Logout");
    }

    return (
        <nav className="navbar">
            <div className="nav-logo-container">
                <Link to="/">
                    <img src={Logo} className="nav-img" alt="" />
                </Link>
            </div>
            
            <div className="nav-links">
                <span className="material-icons nav-shopping">shopping_cart</span>
                <div className="nav-account-container" onClick={() =>{toggleLoginDialogue()}}>
                    <span className="material-icons nav-account">account_circle</span>
                    <CSSTransition in={userData != null} classNames="slide-right" timeout={400} unmountOnExit>
                        <span className="nav-name">{userData ? userData.name : ''}</span>
                    </CSSTransition>
                </div>
            </div>

            <CSSTransition in={dropDownVisible} classNames="slide-down" timeout={400} unmountOnExit>
                <div className="nav-dropDown">
                    <div className="nav-dropDown-arrow"/>
                    <div className="nav-user">
                        <img className="nav-user-img" src="https://t3.ftcdn.net/jpg/03/67/46/48/360_F_367464887_f0w1JrL8PddfuH3P2jSPlIGjKU2BI0rn.jpg" alt="" />
                        <span className="nav-user-info">
                            <span className="nav-user-name">{userData ? userData.name : ''}</span>
                            <span className="nav-user-email">{userData ? userData.email : ''}</span>
                        </span>
                    </div>

                    <div className="nav-dropDown-links">             
                        <Link to="/Konfigurationen" className="nav-dropDown-link" onClick={() =>{toggleDropDown()}}>
                            <span className="material-icons nav-dropDown-icon">smartphone</span>
                            Geräte
                        </Link>
                        <Link to="/" className="nav-dropDown-link" onClick={() =>{toggleDropDown()}}>
                            <span className="material-icons nav-dropDown-icon">receipt_long</span>
                            Bestellungen
                        </Link>
                        <Link to="/" className="nav-dropDown-link" onClick={() =>{toggleDropDown()}}>
                            <span className="material-icons nav-dropDown-icon">settings</span>
                            Einstellungen
                        </Link>
                        <hr className="nav-dropDown-hr"/>
                        <p className="nav-dropDown-link" onClick={() =>{logout(); toggleDropDown();}}>
                            <span className="material-icons nav-dropDown-icon">logout</span>
                            Abmelden
                        </p>
                    </div>
                </div>
            </CSSTransition>
        </nav>
    )
}

export default Navbar
