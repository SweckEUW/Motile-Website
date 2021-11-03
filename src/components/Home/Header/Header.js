import './Header.css'
import {Link} from "react-router-dom";
import Background from '../../../Assets/head-backdrop.png'

const Header = () => {

    return (
        <div className="Header">
            <img src={Background} alt="" className="hd-img"/>
            <div className="hd-info">
                <p className="hd-text">Walter <br/> "Black and Gold never gets old!"</p>
                <Link to="/Konfigurator" className="hd-link">Bearbeiten</Link>
            </div>
           
        </div>
    )
}

export default Header
