import './Footer.css';
import {Link} from "react-router-dom";
import React from 'react';

const Footer = () => {


    return (
        <div className="Footer">
            <div className="grid-container">
            <hr className="ft-line"></hr>
            <div className="ft-content">
                <span className="ft-item"><Link to="/Kontakt" textDecoration="none !important">Kontakt</Link></span>
                <span className="ft-item"><Link to="/Datenschutz">Datenschutz</Link></span>
                <span className="ft-item"><Link to="/Nutzungsbedingungen">Nutzungsbedingungen</Link></span>
                <span className="ft-item"><Link to="/Impressum">Impressum</Link></span>
            </div>
            </div>
        </div>
    )
}

export default Footer;
