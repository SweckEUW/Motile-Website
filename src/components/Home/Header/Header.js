import './Header.css'
import {Link} from "react-router-dom";
import React, { useEffect} from 'react';

const Header = () => {

    useEffect(() =>{ 
        document.title = "Motile"
    }, []);

    return (
        <div className="Header">
          <section className="hd-section1">
              <img src={process.env.PUBLIC_URL+'/Assets/Header.png'} alt="" className="hd-img"/> 
              <div className="section1-container">
                  <h2 className="hd-headline1">Nachhaltig, individuell und aufrüstbar.</h2>
                  <p className="hd-paragraph1">Ein vollständig modulares Smartphone. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                  <Link to="/Konfigurator" className="hd-link">Jetzt konfigurieren</Link>
              </div>
          </section>

          <section className="hd-section2">
              <h2 className="hd-headline2">Komplett individualisierbar</h2>
              <div className="section2-container">
                <h3 className="hd-headline3">Multimedia</h3>
                <p className="hd-paragraph2">Das beste Display mit großen Lautsprechern und einem Aufsteller...</p>
                <p className="hd-price">ab 350€</p>
                <Link>Preset öffnen</Link>
              </div>
              
          </section>

          <section className="hd-section3">
              <div className="section3-container">
                  <h2 className="material-icons">memory</h2>
                  <h3>Core</h3>
                  <p>Nutze den Top end Soc für die beste Leistung, oder nutze einen effizienten Prozessor für längere Akkulaufzeit.</p>
              </div>
              <div className="section3-container">
                  <h2 className="material-icons">photo_camera</h2>
                  <h3>Kamera</h3>
                  <p>Nutze den Top end Soc für die beste Leistung, oder nutze einen effizienten Prozessor für längere Akkulaufzeit.</p>
              </div>
              <div className="section3-container">
                  <h2 className="material-icons">light_mode</h2>
                  <h3>Display</h3>
                  <p>Nutze den Top end Soc für die beste Leistung, oder nutze einen effizienten Prozessor für längere Akkulaufzeit.</p>
              </div>
              <div className="section3-container">
                  <h2 className="material-icons">add_box</h2>
                  <h3>Optional</h3>
                  <p>Nutze den Top end Soc für die beste Leistung, oder nutze einen effizienten Prozessor für längere Akkulaufzeit.</p>
              </div>
          </section>     
           
          <section className="hd-section4">
              <div className="section4-container">
                <h2 className="material-icons icon-header">memory</h2>
                <h3>Core</h3>
                <p>Nutze den Top end Soc für die beste Leistung, oder nutze einen effizienten Prozessor für längere Akkulaufzeit</p>
              </div>
          </section>

           <section className="hd-section5">
            <h2 className="material-icons icon-header">photo_camera</h2>
            <h3>Kamera</h3>
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
           </section>

           <section className="hd-section6">
               <h2 className="material-icons icon-header">light_mode</h2>
               <h3>Display</h3>
               <p>Das Display hat eine Größe von 6,5". Auflösung, Bildwiederholrate und Technologie kannst du frei nach deinen Vorlieben zusammenstellen.Prozessor für längere Akkulaufzeit</p>
               <p>6.5" Display ...</p>
           </section>

           <section className="hd-section7">
               <h2 className="material-icons icon-header">add_box</h2>
               <h3>Zusatz</h3>
               <p>blabla rhabarber</p>
           </section>

           <section className="hd-section8">
               <h2>Technische Daten</h2>
           </section>

           <section className="hd-section9">
               <h2>Neue Motile-Produkte</h2>
           </section>
            
        </div>
    )
}

export default Header
