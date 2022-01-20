import './Panel.css';
import React, {useEffect} from 'react';
import Swiper , { Pagination } from 'swiper';
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import Overview from './Overview/Overview';
import PanelElement from "./PanelElement/PanelElement"

function Panel(){

  useEffect(() =>{ 
    // Works only with Timeout?
    setTimeout(() => {
      new Swiper('#pl-Swiper',{
        modules: [Pagination],
        spaceBetween: 50,
        allowTouchMove: false,
        pagination: {
          el: '#swiper-pagination',
          clickable: true
        },
        observer: true
      });
    }, 10);
  }, []);


  return (
    <div className="Panel">
      <div id="swiper-pagination"/>

      <div id="pl-Swiper" className="swiper"> 
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <PanelElement side="Back"/>
          </div>
          <div className="swiper-slide">
            <PanelElement side="Front"/>  
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
