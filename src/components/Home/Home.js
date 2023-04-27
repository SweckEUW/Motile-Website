import './Home.css'
import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import Swiper , { Pagination } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import history from '../../services/RouterHistory';

function Home(){
  useEffect(() =>{ 
    document.title = "Motile"
    setTimeout(() => {
      new Swiper('#hd-swiper', {
        modules: [Pagination],
        spaceBetween: 50,
        allowTouchMove: true,
        pagination: {
          el: '#hd-pagination',
          type: 'bullets',
          clickable: true,
        },
      }, 25);    
    }, 10);
  }, []);

  async function loadPreset(type){
    let configuration = await (await fetch('http://localhost:5000/Presets.json')).json();

    history.push({
      pathname: '/Konfigurator',
      state: {
        editMode: true,
        configuration: configuration[type]
      }
    })
  }

  return (
      <div className="Home">
        <section className="hd-section1" style={{backgroundImage: "url('./Assets/Home.png')"}}>
            <div className="section1-container">
                <h2>Nachhaltig, individuell und aufrüstbar.</h2>
                <div className="section1-text">
                  <p>Ein vollständig modulares Smartphone. Ganz nach deinen Bedürfnissen und Vorlieben. Wähle Module aus, die perfekt zu deinen Vorstellungen passen. Und das beste: Durch die modulare Bauweise ist es problemlos möglich dein Smartphone zukünftig aufzurüsten, ohne das ganze Gerät austauschen zu müssen.</p>
                  <Link to="/Konfigurator" className="hd-link1"><button className="btn-grad">Jetzt konfigurieren</button></Link>
                </div>
            </div>
        </section>

        <section className="hd-section2">            
            <h2 className="col-12">Lass dich inspirieren</h2>
            <div id="hd-swiper" className="swiper">
              <div className="swiper-wrapper">
                <div className="swiper-slide col-12">
                <div className="grid-container">
                  <img className="col-8" src={process.env.PUBLIC_URL+'/Assets/presets/Kickstand.png'} alt=""/>
                  <div className="col-4 section2-container">
                    <h3>Entertainment</h3>
                    <p>Ausgestattet mit einem hochauflösenden Display, großen kraftvollen Lautsprechern sowie einem robusten Standfuß. Die beste Art, um sich entspannt zurückzulehnen und die Unterhaltung zu genießen.</p>
                    <p className="hd-price">ab 350€</p>
                    <div className="hd-link2" onClick={() =>{loadPreset(0)}}>Preset öffnen</div>
                  </div>
                  </div>
                </div>
                <div className="swiper-slide col-12">
                <div className="grid-container">
                <img className="col-8" src={process.env.PUBLIC_URL+'/Assets/presets/Camera.png'} alt=""/>
                  <div className="col-4 section2-container">
                    <h3>Erlebnis</h3>
                    <p>Unermüdliche Laufzeit, maximaler Platz sowie die ausgetüfteltste Kamera im Gepäck. Die beste Ausstattung, um unterwegs zu sein und unzählige Erinnerungen zu schaffen.</p>
                    <p className="hd-price">ab 350€</p>
                    <div className="hd-link2" onClick={() =>{loadPreset(1)}}>Preset öffnen</div>
                  </div>
                </div>
                </div>
                <div className="swiper-slide col-12">
                <div className="grid-container">
                <img className="col-8" src={process.env.PUBLIC_URL+'/Assets/presets/Basic.png'} alt=""/>
                  <div className="col-4 section2-container">
                    <h3>Einsteiger</h3>
                    <p>Schonend für den Geldbeutel und trotzdem leistungsfähig: Unser Basismodell bietet alles, was du brauchst. Kein Schnickschnack, kein wenn und aber. </p>
                    <p className="hd-price">ab 350€</p>
                    <div className="hd-link2" onClick={() =>{loadPreset(2)}}>Preset öffnen</div>
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
                <p>Wähle den Top end SoC für die beste Leistung, oder nutze einen effizienten Prozessor für längere Akkulaufzeit.</p>
                <span className="material-icons-outlined">expand_more</span>
            </a>
            <a href="#camera"  className="col-3 col-m-6">
                <span className="material-icons-outlined icon-medium">photo_camera</span>
                <h3>Kamera</h3>
                <p>Wähle hier aus verschiedenen verfügbaren Alternativen aus. Wie scharf dürfen deine Erinnerungen werden?</p>
                <span className="material-icons-outlined">expand_more</span>
            </a>
            <a href="#display" className="col-3 col-m-6">
                <span className="material-icons-outlined icon-medium">light_mode</span>
                <h3>Display</h3>
                <p>Wähle zwischen verschiedenen Technologien, Auflösungen und Bildwiederholungsraten - frei nach deinen Bedürfnissen.</p>
                <span className="material-icons-outlined">expand_more</span>
            </a>
            <a href="#optional" className="col-3 col-m-6">
                <span className="material-icons-outlined icon-medium">add_box</span>
                <h3>Zusatz</h3>
                <p>Wähle für deine Bedürfnisse optimierte Zusatzmodule aus, um dein Smartphone zu individualisieren.</p>
                <span className="material-icons-outlined">expand_more</span>
            </a>
          </div>  
        </section>     
        <a id="core" className="anchor"/>
        <section className="hd-section4 image-right anchor" style={{backgroundImage: "url('/Assets/image-section4.png')"}}>
        <div className="grid-container centered">
          <div className="col-4 col-m-4">
            <span className="material-icons-outlined icon-Home">memory</span>
            <h2>Core</h2>
            <p>Das Herzstück des Smartphones. Auf welchen Chip die Wahl auch fällt: Das Nutzungserlebnis erreicht garantiert Höchstleistungen.</p>
          </div>
          <div className="col-4  col-m-4">
            <img src={process.env.PUBLIC_URL+'/Assets/core.png'} alt=""/>
          </div>
          <div className="col-4  col-m-4 col-s-0">
            <img src={process.env.PUBLIC_URL+'/Assets/image-section4.png'} alt=""/>
          </div>
          </div>
        </section>
        <a id="camera" className="anchor"/>
        <section className="hd-section5">
        <div className="grid-container">
          <div className="col-12">
            <span className="material-icons-outlined icon-Home">photo_camera</span>
            <h2>Kamera</h2>
            <p className="feature">Du hast die Wahl zwischen verschiedenen Linsen, Brennweiten und und und. Halte deine liebsten Momente so genau fest, wie du sie möchtest. </p>
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
                <img src={process.env.PUBLIC_URL+'/Assets/photos/IMG_4591.jpg'} alt=""/>
              </div>
              <div className="col-3 col-m-3 col-s-0">
                <img src={process.env.PUBLIC_URL+'/Assets/photos/IMG_0048.jpg'} alt=""/>
                <img src={process.env.PUBLIC_URL+'/Assets/photos/IMG_8329.jpg'} alt=""/>
              </div>
            
          </div>
          </section>

          <a id="display" className="anchor"/>
          <section className="hd-section6 image-right">
          <div className="grid-container centered">
            <div className="col-6">
              <span className="material-icons-outlined icon-Home">light_mode</span>
              <h2>Display</h2>
              <p>Das Display hat eine feste Größe von 6,5". Die Auflösung, die Bildwiederholungsrate und die Darstellungstechnologie kannst du frei nach deinen Vorlieben zusammenstellen.</p>
            </div>
            <img className="col-6" src={process.env.PUBLIC_URL+'/Assets/screen.jpg'} alt=""/>
            <div className="col-3">
            <p className="p-section6">6.5" Display (167mm)<br/>Seitenverhältnis 20:9<br/>FHD+ (1080 x 2400) mit OLED<br/>411 ppi<br/>Smooth display (120hz)<br/>Kontrastverhältnis: &gt;1.000.000:1<br/>HDR-Unterstützung<br/>24-Bit-Farbtiefe</p>
            </div>
          </div>
          </section>

          <a id="optional" className="anchor"/>
          <section className="hd-section7">
          <div className="grid-container">
            <div className="col-12">
              <span className="material-icons-outlined icon-Home">add_box</span>
              <h2>Zusatz</h2>
              <p>Mit der Auswahl an verschiedenen optionalen Modulen wie etwa Lautsprecher, zusätzlichen Displays, einem Kickstand, einem DAC oder auch einem Fingerabdruckleser lässt sich das Smartphone individualisieren und für deine persönliche Nutzung optimieren.</p>
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

export default Home;
