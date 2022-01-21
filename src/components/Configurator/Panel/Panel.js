import './Panel.css';
import React, {useEffect,useState} from 'react';
import Swiper , { Pagination } from 'swiper';
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import Overview from './Overview/Overview';
import PanelElement from "./PanelElement/PanelElement"

function Panel(){
  const [swiper, setSwiper] = useState(null);

  useEffect(() =>{ 
    // Works only with Timeout?
    setTimeout(() => {
      let swiper = new Swiper('#pl-Swiper',{
        modules: [Pagination],
        spaceBetween: 50,
        allowTouchMove: false,
        pagination: {
          el: '#swiper-pagination',
          clickable: true
        },
        observer: true
      });

      setSwiper(swiper);
    }, 10);
  }, []);


  return (
    <div className="Panel">
      <div id="swiper-pagination"/>

      <div id="pl-Swiper" className="swiper"> 
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <PanelElement side="Back" swiper={swiper}/>
          </div>
          <div className="swiper-slide">
            <PanelElement side="Front" swiper={swiper}/>  
          </div>
          <div className="swiper-slide">
            <Overview/>  
          </div> 
        </div>
      </div>
    </div>
  );
}

export default Panel;
