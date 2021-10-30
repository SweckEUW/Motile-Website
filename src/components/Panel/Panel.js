import './Panel.css';
import React, {useState ,useEffect} from 'react';
import ServerRequest from '../../services/ServerRequest';
import Swiper , { Pagination } from 'swiper';
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'

function Panel(){
  const [motileParts, setMotileParts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() =>{ 
    getMotileParts();
    
    // Works only with Timeout?
    setTimeout(() => {
      let swiper = new Swiper('#mySwiper',{
        modules: [Pagination],
        spaceBetween: 50,
        pagination: {
          el: '#swiper-pagination',
          clickable: true,
        },
      });
      swiper.on('slideChange', () => {
        setCurrentPage(swiper.activeIndex);
      });
    }, 0);

  }, []);

  async function getMotileParts(){
    let motilePartsResponse = await ServerRequest.getAllMotileParts();
    setMotileParts(motilePartsResponse.data)
  }

  function sendSignal(name){
    document.dispatchEvent(new CustomEvent("spawnComponent", {detail:{name: name}}));
  }

  return (
    <div className="Panel">
      <div id="swiper-pagination"/>

      {/* MotilePart Icons */}
      <div className="mp-icons">
        {motileParts.map((motilePart,index) =>{return(
          <div key={index} className="mp-icon" style={{
            opacity: index == currentPage ? '1' : '0.5',
            height: index == currentPage ? '30px' : '15px'
          }}>
            <img className="mp-icon-img" src={motilePart.metaData.icon} alt=""/>
          </div>
        )})}
      </div>
      
      <div id="mySwiper" className="swiper">
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

              <div className="mp-description">{motilePart.metaData.description}</div>

              {/* Spawn Button */}
              <div className="mp-button" onClick={() =>{sendSignal(motilePart.name)}}>Einbauen</div>
        
            </div>
          )})}
        </div>
      </div>
    </div>
  );
}

export default Panel;
