import './Header.css'
import {Link} from "react-router-dom";

const Header = () => {

    return (
        <div className="Header">
            <img src={process.env.PUBLIC_URL+'/Assets/Header.png'} alt="" className="hd-img"/>
            <div className="hd-info">
                <p className="hd-text">Walter <br/> "Black and Gold never gets old!"</p>
                <Link to="/Konfigurator" className="hd-link">Bearbeiten</Link>
            </div>
           
        </div>
    )
}

export default Header
