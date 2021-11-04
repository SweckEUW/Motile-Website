import './BackConfiguration.css';
import React, {useState ,useEffect} from 'react';
import ServerRequest from '../../../../services/ServerRequest';
import ComponentSelector from '../ComponentSelector/ComponentSelector'
import Swiper from 'swiper';
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'

function BackConfiguration(){
  const [motileParts, setMotileParts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [swiper, setSwiper] = useState(null);

  useEffect(() =>{ 
    getMotileParts();
    
    // Works only with Timeout?
    setTimeout(() => {
      let swiper = new Swiper('#bc-Swiper',{
        spaceBetween: 50,
        allowTouchMove: false,
        observer: true
      });
      
      swiper.on('slideChange', () => {
        setCurrentPage(swiper.activeIndex);
      });

      setSwiper(swiper);
    }, 0);

  }, []);

  function changeSwiperPage(index){
    setCurrentPage(index);
    swiper.slideTo(index);
  }

  async function getMotileParts(){
    let motilePartsResponse = await ServerRequest.getAllMotileParts();
    setMotileParts(motilePartsResponse.data.filter(part => part.side === "Back"))
  }

  function sendSignal(name){
    document.dispatchEvent(new CustomEvent("spawnComponent", {detail:{name: name}}));
  }

  return (
    <div className="BackConfiguration">

      <h2>Rückseite</h2>

      {/* MotilePart Icons */}
      <div className="mp-icons">
        {motileParts.map((motilePart,index) =>{return(
          <div key={index} className="mp-icon" onClick={() =>{changeSwiperPage(index)}} style={{
            opacity: index === currentPage ? '1' : '0.5',
            /*height:  index === currentPage ? '30px' : '15px'*/
          }}>
            <span className="material-icons">{motilePart.metaData.icon}</span>
            {/*<img className="mp-icon-img" src={motilePart.metaData.icon} alt=""/>*/}
          </div>
        )})}
      </div>
      
      <div id="bc-Swiper" className="swiper"> 
        <div className="swiper-wrapper">
          {motileParts.map((motilePart,index) =>{return(
            <div key={index} className="swiper-slide">

              {/* Info Panel */}
              <div className="mp-info">
                <div className="mp-info-left">
                  <div className="mp-name">{motilePart.name}</div>
                  <div className="mp-price">{motilePart.metaData.price}</div>
                  {motilePart.metaData.colorways.map((colorway,index) =>{return(
                    <div key={index} className="mp-dot" style={{background: colorway}}/>
                  )})} 
                </div>
                
                <div className="mp-info-right">
                  <img className="mp-thumbnail" src={motilePart.metaData.thumbnail} alt=""/>
                </div>
              </div>
              <div className="mp-settings">
                <div className="mp-description">{motilePart.metaData.description}</div>

                {motilePart.metaData.options.map((option, index) => {
                  return <ComponentSelector key={option.name} type={option.type} options={option.selections} heading={option.name}/>
                })}

                {/* Spawn Button */}
                <div className="mp-button" onClick={() =>{sendSignal(motilePart.name)}}>Einbauen</div>
              </div>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
}

export default BackConfiguration;
