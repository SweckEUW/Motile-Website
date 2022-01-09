import './Header.css'
import {Link} from "react-router-dom";
import React, { useEffect} from 'react';

const Header = () => {

    useEffect(() =>{ 
        document.title = "Motile"
    }, []);

    return (
        <div className="Header">
            <img src={process.env.PUBLIC_URL+'/Assets/Header.png'} alt="" className="hd-img"/>
            <div className="hd-info">
                <p className="hd-text">Walter <br/> "Black and Gold never gets old!"</p>
                <Link to="/Konfigurator" className="hd-link">Bearbeiten</Link>
            </div>

            <span className="material-icons">photo_camera</span>
            <h2>Kamera</h2>
            <p className="feature">Die Kamera blabla Rhabarber Ein vollständig modulares Smartphone. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. </p>
            <div className="imggrid">
              <div className="imgrow">
                <div className="column">
                  <img src={process.env.PUBLIC_URL+'/Assets/photos/IMG_9125.jpg'} alt=""/>
                  <img src={process.env.PUBLIC_URL+'/Assets/photos/IMG_6986.jpg'} alt=""/>
                </div>
                <div className="column">
                  <img src={process.env.PUBLIC_URL+'/Assets/photos/IMG_3146.jpg'} alt=""/>
                  <img src={process.env.PUBLIC_URL+'/Assets/photos/IMG_8823.jpg'} alt=""/>
                </div>
                <div className="column">
                  <img src={process.env.PUBLIC_URL+'/Assets/photos/IMG_20200811_150814~2.jpg'} alt=""/>
                  <img src={process.env.PUBLIC_URL+'/Assets/photos/IMG_6986.jpg'} alt=""/>
                </div>
                <div className="column">
                  <img src={process.env.PUBLIC_URL+'/Assets/photos/IMG_0048.jpg'} alt=""/>
                  <img src={process.env.PUBLIC_URL+'/Assets/photos/IMG_8329.jpg'} alt=""/>
                </div>
              </div>
            </div>
        </div>
    )
}

export default Header
