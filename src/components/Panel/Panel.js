import './Panel.css';
import React, {useState ,useEffect} from 'react';
import ServerRequest from '../../services/ServerRequest';
import Swiper , { Pagination } from 'swiper';
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'

function Panel(){
  const [motileParts, setMotileParts] = useState([]);

  useEffect(() =>{ 
    getMotileParts();
    
    // Works only with Timeout?
    setTimeout(() => {
      new Swiper('#mySwiper',{
        modules: [Pagination],
        pagination: {
          el: '#swiper-pagination',
          clickable: true,
        },
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

      <div className="mp-icons">
        {motileParts.map((motilePart,index) =>{return(
          <div key={index} className="mp-icon">
            <img  className="mp-icon-img" src={motilePart.metaData.icon} alt=""/>
          </div>
        )})}
      </div>

      <div id="mySwiper" className="swiper">
        <div className="swiper-wrapper">

        {motileParts.map((motilePart,index) =>{return(
          <div key={index} className="swiper-slide">
            <h1>{motilePart.name}</h1>
            <div className="pa-button" onClick={() =>{sendSignal(motilePart.name)}}>{'Spawn ' + motilePart.name}</div>
          </div>
        )})}

        </div>
      </div>
    </div>
  );
}

export default Panel;
