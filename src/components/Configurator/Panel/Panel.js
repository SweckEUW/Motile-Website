import './Panel.css';
import React, {useEffect,useState} from 'react';
import Swiper , { Pagination } from 'swiper';
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import Overview from './Overview/Overview';
import PanelElement from "./PanelElement/PanelElement"

function Panel(){
  const [swiper, setSwiper] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [availableSwipesBack, setAvailableSwipesBack] = useState(0);
  const [maxAvailableSwipesBack, setMaxAvailableSwipesBack] = useState(0);
  const [availableSwipesFront, setAvailableSwipesFront] = useState(0);
  const [maxAvailableSwipesFront, setMaxAvailableSwipesFront] = useState(0);

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
      });
      
      setSwiper(swiper);
    }, 10);
  }, []);

  function changeSwiperPageToIndex(index){
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
            opacity: index === currentPage || maxAvailableSwipesBack - 1 < availableSwipesBack && index <= 1 || maxAvailableSwipesFront - 1 < availableSwipesFront && index <= 2 ? '1' : '0.1',
            cursor: index === currentPage || maxAvailableSwipesBack - 1 < availableSwipesBack && index <= 1 || maxAvailableSwipesFront - 1 < availableSwipesFront && index <= 2 ? 'pointer' : '',
            width: index === currentPage ? '18px' : '14px',
            height: index === currentPage ? '18px' : '14px',
          }}/>
        )}
      </div>

      <div id="pl-Swiper" className="swiper"> 
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <PanelElement side="Back" swiper={swiper} availableSwipes={availableSwipesBack} setAvailableSwipes={setAvailableSwipesBack} setMaxAvailableSwipes={setMaxAvailableSwipesBack}/>
          </div>
          <div className="swiper-slide">
            <PanelElement side="Front" swiper={swiper} availableSwipes={availableSwipesFront} setAvailableSwipes={setAvailableSwipesFront} setMaxAvailableSwipes={setMaxAvailableSwipesFront}/>  
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
