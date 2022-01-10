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
                  <h2 className="hd-headline1 hd-h2">Nachhaltig, individuell und aufrüstbar.</h2>
                  <p className="hd-paragraph1 hd-p">Ein vollständig modulares Smartphone. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                  <Link to="/Konfigurator" className="hd-link1">Jetzt konfigurieren</Link>
              </div>
          </section>

          <section className="hd-section2">
            <img src={process.env.PUBLIC_URL+'/Assets/image-section2.png'} alt="" className="hd-img"/>
              <h2 className="hd-headline2 hd-h2">Komplett individualisierbar</h2>
              <div className="section2-container">
                <h3 className="hd-headline3 hd-h3">Multimedia</h3>
                <p className="hd-paragraph2 hd-p">Das beste Display mit großen Lautsprechern und einem Aufsteller - lehn dich zurück und genieße Filme... oder so</p>
                <p className="hd-price hd-p">ab 350€</p>
                <Link className="hd-link2">Preset öffnen</Link>
              </div>
              
          </section>

          <section className="hd-section3">
              <div className="section3-container">
                  <h2 className="material-icons icon-medium">memory</h2>
                  <h3 className="hd-h3">Core</h3>
                  <p>Nutze den Top end Soc für die beste Leistung, oder nutze einen effizienten Prozessor für längere Akkulaufzeit.</p>
              </div>
              <div className="section3-container">
                  <h2 className="material-icons icon-medium">photo_camera</h2>
                  <h3 className="hd-h3">Kamera</h3>
                  <p>Nutze den Top end Soc für die beste Leistung, oder nutze einen effizienten Prozessor für längere Akkulaufzeit.</p>
              </div>
              <div className="section3-container">
                  <h2 className="material-icons icon-medium">light_mode</h2>
                  <h3 className="hd-h3">Display</h3>
                  <p>Nutze den Top end Soc für die beste Leistung, oder nutze einen effizienten Prozessor für längere Akkulaufzeit.</p>
              </div>
              <div className="section3-container">
                  <h2 className="material-icons icon-medium">add_box</h2>
                  <h3 className="hd-h3">Optional</h3>
                  <p>Nutze den Top end Soc für die beste Leistung, oder nutze einen effizienten Prozessor für längere Akkulaufzeit.</p>
              </div>
          </section>     
           
          <section className="hd-section4">
            <div className="section4-container section4-padding">
              <h2 className="material-icons icon-header">memory</h2>
              <h3 className="hd-h3">Core</h3>
              <p>Nutze den Top end Soc für die beste Leistung, oder nutze einen effizienten Prozessor für längere Akkulaufzeit</p>
            </div>
            <div className="section4-container">
            <img src={process.env.PUBLIC_URL+'/Assets/akku.png'} alt=""/>
            </div>
            <div className="section4-container">
              <img src={process.env.PUBLIC_URL+'/Assets/image-section4.png'} alt="" className="img-section4"/>
            </div>
          </section>

           <section className="hd-section5">
            <h2 className="material-icons icon-header">photo_camera</h2>
            <h3 className="hd-h3">Kamera</h3>
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
              <div className="section6-container1">
                <h2 className="material-icons icon-header">light_mode</h2>
                <h3 className="hd-h3">Display</h3>
                <p>Das Display hat eine Größe von 6,5". Auflösung, Bildwiederholrate und Technologie kannst du frei nach deinen Vorlieben zusammenstellen.Prozessor für längere Akkulaufzeit</p>
              </div>
              <div className="section6-container2">
                <img src={process.env.PUBLIC_URL+'/Assets/image-section6.png'} alt="" className="img-section6"/>
              </div>
              <p className="p-section6">6.5" Display (167mm)<br/>Seitenverhältnis 20:9<br/>FHD+ (1080 x 2400) mit OLED<br/>411 ppi<br/>Smooth display (120hz)<br/>Kontrastverhältnis: &gt;1.000.000:1<br/>HDR-Unterstützung<br/>24-Bit-Farbtiefe</p>
           </section>

           <section className="hd-section7">
              <div className="section7-container1">
                <h2 className="material-icons icon-header">add_box</h2>
                <h3 className="hd-h3">Zusatz</h3>
                <p>Die Kamera blabla Rhabarber Ein vollständig modulares Smartphone. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. </p>
              </div>
              <div className="section7-container2">
                <img src={process.env.PUBLIC_URL+'/Assets/akku2.png'} alt="" className="img-section7"/>
                <img src={process.env.PUBLIC_URL+'/Assets/akku3.png'} alt="" className="img-section7"/>
                <img src={process.env.PUBLIC_URL+'/Assets/camera1.png'} alt="" className="img-section7"/>
              </div>
              <div className="section7-container3">
                <img src={process.env.PUBLIC_URL+'/Assets/camera2.png'} alt="" className="img-section7"/>
                <img src={process.env.PUBLIC_URL+'/Assets/camera3.png'} alt="" className="img-section7"/>
                <img src={process.env.PUBLIC_URL+'/Assets/small.png'} alt="" className="img-section7"/>
                <img src={process.env.PUBLIC_URL+'/Assets/speaker.png'} alt="" className="img-section7"/>
              </div>
           </section>

           <section className="hd-section8">
               <h2 className="hd-h2">Technische Daten</h2>
               <div className="section8-container">
                  <img src={process.env.PUBLIC_URL+'/Assets/image-section8.png'} alt="" className="img-section8"/>
               </div>
           </section>

           <section className="hd-section9">
               <h2 className="hd-h2">Neue Motile-Produkte</h2>
           </section>
            
        </div>
    )
}

export default Header
