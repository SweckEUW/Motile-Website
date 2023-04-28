import './Panel.css';
import React, {useEffect,useState} from 'react';
import Swiper , { Pagination } from 'swiper';
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import Overview from './Overview/Overview';
import PanelElement from "./PanelElement/PanelElement"
import { useLocation } from "react-router-dom";

function Panel(props){
  const [swiper, setSwiper] = useState(null);
  const [ignoreSwiperLimits, setIgnoreSwiperLimits] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [availableSwipesBack, setAvailableSwipesBack] = useState(0);
  const [maxAvailableSwipesBack, setMaxAvailableSwipesBack] = useState(0);
  const [availableSwipesFront, setAvailableSwipesFront] = useState(0);
  const [maxAvailableSwipesFront, setMaxAvailableSwipesFront] = useState(0);

  const location = useLocation();

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

      swiper.on('slideChange', () => {
        setCurrentPage(swiper.activeIndex);
        document.dispatchEvent(new CustomEvent("rotatePhone", {detail:{side: swiper.activeIndex == 1 ? "Front" : "Back"}}));
      });
      
      setSwiper(swiper);

      if(location.state && location.state.editMode){
        setIgnoreSwiperLimits(true);
        swiper.slideTo(2);
      }
        
    }, 10);
  }, []);

  function changeSwiperPageToIndex(index){
    if(ignoreSwiperLimits){
      setCurrentPage(index);
      swiper.slideTo(index);
    }
    if(maxAvailableSwipesBack - 1 < availableSwipesBack && index <= 1){
      setCurrentPage(index);
      swiper.slideTo(index);
    }
    if(maxAvailableSwipesFront - 1 < availableSwipesFront && index <= 2){
      setCurrentPage(index);
      swiper.slideTo(index);
    }
  }

  return (
    <div className="Panel">
  
      <div className='pl-dots'>
        {[...Array(3)].map((x,index) =>
          <div key={index} onClick={() =>{changeSwiperPageToIndex(index)}} style={{
            opacity: index === currentPage || maxAvailableSwipesBack - 1 < availableSwipesBack && index <= 1 || maxAvailableSwipesFront - 1 < availableSwipesFront && index <= 2 || ignoreSwiperLimits ? '1' : '0.1',
            cursor: index === currentPage || maxAvailableSwipesBack - 1 < availableSwipesBack && index <= 1 || maxAvailableSwipesFront - 1 < availableSwipesFront && index <= 2 || ignoreSwiperLimits ? 'pointer' : '',
            width: index === currentPage ? '16px' : '10px',
            height: index === currentPage ? '16px' : '10px',
          }}/>
        )}
      </div>

      <div id="pl-Swiper" className="swiper"> 
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <PanelElement side="Back" swiper={swiper} availableSwipes={availableSwipesBack} setAvailableSwipes={setAvailableSwipesBack} setMaxAvailableSwipes={setMaxAvailableSwipesBack} ignoreSwiperLimits={ignoreSwiperLimits}/>
          </div>
          <div className="swiper-slide">
            <PanelElement side="Front" swiper={swiper} availableSwipes={availableSwipesFront} setAvailableSwipes={setAvailableSwipesFront} setMaxAvailableSwipes={setMaxAvailableSwipesFront} ignoreSwiperLimits={ignoreSwiperLimits}/>  
          </div>
          <div className="swiper-slide">
            <Overview  tabletSelected={props.tabletSelected}/>  
          </div> 
        </div>
      </div>
    </div>
  );
}

export default Panel;
