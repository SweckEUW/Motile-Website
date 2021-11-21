import './Panel.css';
import React, {useEffect} from 'react';
import Swiper , { Pagination } from 'swiper';
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import BackConfiguration from './BackConfiguration/BackConfiguration';
import FrontConfiguration from './FrontConfiguration/FrontConfiguration';
import Overview from './Overview/Overview';

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
          clickable: false
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
            <BackConfiguration/>
          </div>
          <div className="swiper-slide">
            <FrontConfiguration/>  
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
