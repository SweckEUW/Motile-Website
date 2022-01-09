import './Footer.css';
import React from 'react';

const Footer = () => {


    return (
        <div className="Footer">
            <hr className="ft-line"></hr>
            <div className="ft-content">
                <span className="ft-item">Hilfe</span>
                <span className="ft-item">Kontakt</span>
                <span className="ft-item">Datenschutz</span>
                <span className="ft-item">Nutzungsbedingungen</span>
                <span className="ft-item">Impressum</span>
            </div>
        </div>
    )
}

export default Footer;
