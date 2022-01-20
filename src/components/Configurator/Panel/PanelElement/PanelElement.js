import './PanelElement.css';
import React, {useContext,useEffect,useState} from 'react';
import ServerRequest from '../../../../services/ServerRequest';
import ComponentSelector from '../ComponentSelector/ComponentSelector'
import Swiper from 'swiper';
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import {Context} from '../../../../Store'

function PanelElement(props){
  const [state, setState] = useContext(Context);
  const [motileParts, setMotileParts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [swiper, setSwiper] = useState(null);

  useEffect(() =>{ 
    getMotileParts();
    
    // Works only with Timeout?
    setTimeout(() => {
      let swiper = new Swiper('#'+props.side,{
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
    setMotileParts(motilePartsResponse.data.filter(part => part.side === props.side))
  }

  function addComponent(motilePart){
    document.dispatchEvent(new CustomEvent("spawnComponent", {detail:{name: motilePart.name}}));
    let components = state.components;
    let component = {
      component: motilePart,
      settings: ["ToDo"]
    }
    components.push(component);
    setState(prevState => ({...prevState,components: components}));
    swiper.slideNext();
  }

  return (
    <div className="PanelElement">

      <h2>{props.side == "Back" ? "Rückseite" : "Frontseite"}</h2>

      {/* MotilePart Icons */}
      <div className="mp-icons">
        {motileParts.map((motilePart,index) =>{return(
          <span key={index} className="mp-icon material-icons" onClick={() =>{changeSwiperPage(index)}} style={{
            opacity: index === currentPage ? '1' : '0.3',
            fontSize: index === currentPage ? '48px' : '24px'
          }}>
            {motilePart.metaData.icon}
          </span>
        )})}
      </div>                
      
      <div id={props.side} className="swiper"> 
        <div className="swiper-wrapper">
          {motileParts.map((motilePart,index) =>{return(
            <div key={index} className='swiper-slide'>
              <div className="mp-settings">
                <div className="mp-info" style={{backgroundImage: "url("+motilePart.metaData.thumbnail+")"}}>
                  <div className="mp-name">{motilePart.name}</div>
                  <div className="mp-price">{motilePart.metaData.price}</div>
                  <div className="mp-colors">
                    {motilePart.metaData.colorways.map((colorway,index) =>{return(
                      <div key={index} className="mp-dot" style={{background: colorway}}/>
                    )})}
                  </div>
                </div>
                <div className="mp-description">{motilePart.metaData.description}</div>
                <div className='mp-selectors'>
                  {motilePart.metaData.options.map((option, index) => {
                    return <ComponentSelector key={index} type={option.type} options={option.selections} heading={option.name}/>
                  })}
                </div>
              </div>
              <div className="mp-button" onClick={() =>{addComponent(motilePart)}}>Einbauen</div>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
}

export default PanelElement;
