import './Header.css'
import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Swiper , { Pagination } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';

function Header(){
  const [swiper, setSwiper] = useState(null);
    useEffect(() =>{ 
        document.title = "Motile"
        setTimeout(() => {
          let swiper = new Swiper('#hd-swiper', {
            modules: [Pagination],
            spaceBetween: 50,
            allowTouchMove: true,
            pagination: {
              el: '#hd-pagination',
              type: 'bullets',
              clickable: true,
            },
          }, 25);    
          swiper.on('slideChange', () => {
            setSwiper(swiper.activeIndex);
          });    
          setSwiper(swiper);
        }, 10);
    }, []);
  
    return (
        <div className="Header">
          <section className="hd-section1" style={{backgroundImage: "url('/Assets/Header.png')"}}>
             <div className="section1-container">
                  <h2>Nachhaltig, individuell und aufrüstbar.</h2>
                  <p>Ein vollständig modulares Smartphone. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
                  <Link to="/Konfigurator" className="hd-link1"><button>Jetzt konfigurieren</button></Link>
              </div>
          </section>

          <section className="hd-section2">            
              <h2 className="col-12">Lass dich inspirieren</h2>
              <div id="hd-swiper" className="swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide col-12">
                  <div className="grid-container">
                    <img className="col-8" src={process.env.PUBLIC_URL+'/Assets/Kickstand.jpg'} alt=""/>
                    <div className="col-4 section2-container">
                      <h3>Multimedia</h3>
                      <p>Das beste Display mit großen Lautsprechern und einem Aufsteller - lehn dich zurück und genieße Filme... oder so. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
                      <p className="hd-price">ab 350€</p>
                      <Link to="/Konfigurator" className="hd-link2">Preset öffnen</Link>
                   </div>
                   </div>
                  </div>
                  <div className="swiper-slide col-12">
                  <div className="grid-container">
                  <img className="col-8" src={process.env.PUBLIC_URL+'/Assets/Kickstand.jpg'} alt=""/>
                    <div className="col-4 section2-container">
                      <h3>Fotografie</h3>
                      <p>Statte dein Smartphone mit der besten Kamera, einem großen Akku, sowie per microSD-Karte erweiterbaren Speicher aus um auf deinen Foto expeditionen bestens ausgestattet zu sein!</p>
                      <p className="hd-price">ab 350€</p>
                      <Link to="/Konfigurator" className="hd-link2">Preset öffnen</Link>
                   </div>
                  </div>
                  </div>
                  <div className="swiper-slide col-12">
                  <div className="grid-container">
                  <img className="col-8" src={process.env.PUBLIC_URL+'/Assets/Kickstand.jpg'} alt=""/>
                    <div className="col-4 section2-container">
                      <h3>Basic</h3>
                      <p>ein budget freundliche zusammenstellung die alles Nötige für den Allteg bietet</p>
                      <p className="hd-price">ab 350€</p>
                      <Link to="/Konfigurator" className="hd-link2">Preset öffnen</Link>
                   </div>
                  </div>
                  </div>
                </div>
                <div id="hd-pagination" className="col-4"></div>
              </div>
          </section>

          <section className="hd-section3">
            <div className="grid-container">
            <h2 className="col-12">Komplett individualisierbar</h2>
              <a href="#core" className="col-3 col-m-6">
                  <span className="material-icons-outlined icon-medium">memory</span>
                  <h3>Core</h3>
                  <p>Nutze den Top end Soc für die beste Leistung, oder nutze einen effizienten Prozessor für längere Akkulaufzeit.</p>
                  <span className="material-icons-outlined">expand_more</span>
              </a>
              <a href="#camera"  className="col-3 col-m-6">
                  <span className="material-icons-outlined icon-medium">photo_camera</span>
                  <h3>Kamera</h3>
                  <p>Wähle aus einer Auswahl an verschiedenen Kameras.</p>
                  <span className="material-icons-outlined">expand_more</span>
              </a>
              <a href="#display" className="col-3 col-m-6">
                  <span className="material-icons-outlined icon-medium">light_mode</span>
                  <h3>Display</h3>
                  <p>Wähle zwischen verschiedenen display technologien, auflösungen und bildwiederholraten - frei nach deinen Bedürfnissen.</p>
                  <span className="material-icons-outlined">expand_more</span>
              </a>
              <a href="#optional" className="col-3 col-m-6">
                  <span className="material-icons-outlined icon-medium">add_box</span>
                  <h3>Optional</h3>
                  <p>Wähle aus einenr Auswahl an optionalen Zusatzmodulen um dein Smartphone zu individualisieren.</p>
                  <span className="material-icons-outlined">expand_more</span>
              </a>
            </div>  
          </section>     
           
          <section id="core" className="hd-section4 image-right" style={{backgroundImage: "url('/Assets/image-section4.png')"}}>
          <div className="grid-container centered">
            <div className="col-4 col-m-4">
              <span className="material-icons-outlined icon-header">memory</span>
              <h3>Core</h3>
              <p>Nutze den Top end Soc für die beste Leistung, oder nutze einen effizienten Prozessor für längere Akkulaufzeit</p>
            </div>
            <div className="col-4  col-m-4">
              <img src={process.env.PUBLIC_URL+'/Assets/akku.png'} alt=""/>
            </div>
            <div className="col-4  col-m-4 col-s-0">
              <img src={process.env.PUBLIC_URL+'/Assets/image-section4.png'} alt=""/>
            </div>
            </div>
          </section>

          <section id="camera" className="hd-section5">
          <div className="grid-container">
            <div className="col-12">
              <span className="material-icons-outlined icon-header">photo_camera</span>
              <h3>Kamera</h3>
              <p className="feature">Die Kamera blabla Rhabarber Ein vollständig modulares Smartphone. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. </p>
            </div>
                <div className="col-3 col-m-3 col-s-6">
                  <img src={process.env.PUBLIC_URL+'/Assets/photos/IMG_9125.jpg'} alt=""/>
                  <img src={process.env.PUBLIC_URL+'/Assets/photos/IMG_6986.jpg'} alt=""/>
                </div>
                <div className="col-3 col-m-3 col-s-6">
                  <img src={process.env.PUBLIC_URL+'/Assets/photos/IMG_3146.jpg'} alt=""/>
                  <img src={process.env.PUBLIC_URL+'/Assets/photos/IMG_8823.jpg'} alt=""/>
                </div>
                <div className="col-3 col-m-3 col-s-0">
                  <img src={process.env.PUBLIC_URL+'/Assets/photos/IMG_20200811_150814~2.jpg'} alt=""/>
                  <img src={process.env.PUBLIC_URL+'/Assets/photos/IMG_6986.jpg'} alt=""/>
                </div>
                <div className="col-3 col-m-3 col-s-0">
                  <img src={process.env.PUBLIC_URL+'/Assets/photos/IMG_0048.jpg'} alt=""/>
                  <img src={process.env.PUBLIC_URL+'/Assets/photos/IMG_8329.jpg'} alt=""/>
                </div>
              
            </div>
           </section>

           <section id="display" className="hd-section6 image-right">
           <div className="grid-container centered">
              <div className="col-6">
                <span className="material-icons-outlined icon-header">light_mode</span>
                <h3>Display</h3>
                <p>Das Display hat eine Größe von 6,5". Auflösung, Bildwiederholrate und Technologie kannst du frei nach deinen Vorlieben zusammenstellen. Prozessor für längere Akkulaufzeit</p>
              </div>
              <img className="col-6" src={process.env.PUBLIC_URL+'/Assets/screen.jpg'} alt=""/>
              <div className="col-3">
              <p className="p-section6">6.5" Display (167mm)<br/>Seitenverhältnis 20:9<br/>FHD+ (1080 x 2400) mit OLED<br/>411 ppi<br/>Smooth display (120hz)<br/>Kontrastverhältnis: &gt;1.000.000:1<br/>HDR-Unterstützung<br/>24-Bit-Farbtiefe</p>
              </div>
           </div>
           </section>

           <section id="optional" className="hd-section7">
           <div className="grid-container">
              <div className="col-12">
                <span className="material-icons-outlined icon-header">add_box</span>
                <h3>Zusatz</h3>
                <p>Die Kamera blabla Rhabarber Ein vollständig modulares Smartphone. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. </p>
              </div>
              <div className="col-12">
                <img src={process.env.PUBLIC_URL+'/Assets/akku2.png'  } alt=""/>                
                <img src={process.env.PUBLIC_URL+'/Assets/camera1.png'} alt=""/>
                <img src={process.env.PUBLIC_URL+'/Assets/camera2.png'} alt=""/>
                <img src={process.env.PUBLIC_URL+'/Assets/camera3.png'} alt=""/>
              </div>              
          </div>
           </section>

           <section className="hd-section8" >
           <div className="grid-container">
               <h2 className="col-12">Technische Daten</h2>
               <div className="col-12 section8-container">
                  <img src={process.env.PUBLIC_URL+'/Assets/dimensions.svg'} alt="" className="img-section8"/>
               </div>
               </div>
           </section>            
        </div>
    );
    }

export default Header;
