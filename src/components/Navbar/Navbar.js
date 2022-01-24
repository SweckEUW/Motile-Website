import './Navbar.css'
import React, {useContext,useEffect,useState} from 'react';
import ServerRequest from '../../services/ServerRequest'
import {Link} from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import {Context} from '../../Store'
import history from '../../services/RouterHistory';

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
        getUserData();
    }

    function toggleLoginDialogue(){
        if(state.loggedIn)
            toggleDropDown();
        else
            document.dispatchEvent(new CustomEvent("toggleLoginDialogue"));
    }

    function logout(){
        switch(window.location.pathname) {
            case "/Profil/Ger%C3%A4te":
            case "/Profil/Einstellungen":
            case "/Profil/Bestellungen":
                history.push({pathname: '/'});
                console.log("redirect to Home");
                break;
        }

        setState(prevState => ({...prevState,loggedIn: false}));
        localStorage.removeItem('token');
        console.log("Logout");
    }

    return (
        <nav className="navbar">
        <div className="nav-container">
                <Link to="/">
                    <img src={process.env.PUBLIC_URL+'/Assets/Logo.svg'}  className="nav-img" alt="" />
                </Link>
            
            <div className="nav-links">
                <Link to="/Konfigurator"><button>konfigurieren</button></Link>
                <Link to="/Warenkorb" className="material-icons-outlined nav-shopping">shopping_cart</Link>
                <div className="nav-account-container" onClick={() =>{toggleLoginDialogue()}}>
                <span className="material-icons-outlined nav-account">account_circle</span>
                    <CSSTransition in={state.loggedIn} classNames="slide-right" timeout={400} unmountOnExit>                        
                    <img className="nav-user-img pfp" src={userData ? userData.profilePic : ''} alt="" />
                    </CSSTransition>
                </div>
            </div>

            <CSSTransition in={dropDownVisible} classNames="slide-down" timeout={400} unmountOnExit>
                <div className="nav-dropDown">
                    <div className="nav-dropDown-arrow"/>
                    <div className="nav-user">
                        <img className="nav-user-img" src={userData ? userData.profilePic : ''} alt="" />
                        <span className="nav-user-info">
                            <span className="nav-user-name">{userData ? userData.firstName : ''}</span>
                            <span className="nav-user-email">{userData ? userData.email : ''}</span>
                        </span>
                    </div>

                    <div className="nav-dropDown-links">             
                        <Link to="/Profil/Geräte" className="nav-dropDown-link" onClick={() =>{toggleDropDown()}}>
                            <span className="material-icons nav-dropDown-icon">smartphone</span>
                            Geräte
                        </Link>
                        <Link to="/Profil/Bestellungen" className="nav-dropDown-link" onClick={() =>{toggleDropDown()}}>
                            <span className="material-icons nav-dropDown-icon">receipt_long</span>
                            Bestellungen
                        </Link>
                        <Link to="/Profil/Einstellungen" className="nav-dropDown-link" onClick={() =>{toggleDropDown()}}>
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
            </div>
        </nav>
    )
}

export default Navbar