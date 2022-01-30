import './PanelElement.css';
import React, {useContext,useEffect,useState,useReducer} from 'react';
import ServerRequest from '../../../../services/ServerRequest';
import ComponentSelector from '../ComponentSelector/ComponentSelector'
import Swiper from 'swiper';
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import {Context} from '../../../../Store'

function PanelElement(props){
  const [state, setState] = useContext(Context);
  const [motileParts, setMotileParts] = useState([]);
  const [allMotileParts, setAllMotileParts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [swiper, setSwiper] = useState(null);
  const [currentSettings, setCurrentSettings] = useState(null);
  const [currentColors, setCurrentColors] = useState(null);
  const [currentPrices, setCurrentPrices] = useState(null);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

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

  function changeSwiperPageToIndex(index){
    if(props.ignoreSwiperLimits){
      setCurrentPage(index);
      swiper.slideTo(index);
    }

    if(props.availableSwipes < index)
      return;

    if(index != motileParts.length){
      setCurrentPage(index);
      swiper.slideTo(index);
    }else{
      props.swiper.slideNext();
    }
  }

  function changeSwiperPageNextIndex(){
    props.setAvailableSwipes(currentPage + 1);
    if(currentPage != motileParts.length - 1){
      setCurrentPage(currentPage + 1);
      swiper.slideTo(currentPage + 1);
    }else{
      props.swiper.slideNext();
    }
  }

  async function getMotileParts(){
    let motilePartsResponse = await ServerRequest.getAllMotileParts();
    if(motilePartsResponse.data.success){
      setAllMotileParts(motilePartsResponse.data.parts);
      let localMotileParts = motilePartsResponse.data.parts.filter(part => part.side === props.side && !part.optional);
      setMotileParts(localMotileParts);
      setupCurrentSettings(localMotileParts);
      setupCurrentColors(localMotileParts);
      setupCurrentPrices(localMotileParts);
      props.setMaxAvailableSwipes(localMotileParts.length);
    }
  }

  function setupCurrentColors(localMotileParts){
    let newCurrentColors = [];
    localMotileParts.forEach(motilePart => {
      newCurrentColors.push(motilePart.metaData.colorways[0]);
    });
    setCurrentColors(newCurrentColors);
  }

  function setupCurrentPrices(localMotileParts){
    let newCurrentPrices = [];
    localMotileParts.forEach(motilePart => {
      newCurrentPrices.push(Array(motilePart.metaData.options.length));
    });
    setCurrentPrices(newCurrentPrices);
  }

  function setupCurrentSettings(localMotileParts){
    let newCurrentSettings = [];
    localMotileParts.forEach((motilePart,index) => {
      newCurrentSettings.push([]);
      motilePart.metaData.options.forEach(option => {
        if(option.type === "columns")
          option.selectedOptions = [option.selections[0].name];
        if(option.type === "switch")
          option.selectedOptions = Array(option.selections.length);
        if(option.type === "rows")
          option.selectedOptions = [option.selections[0].additionalInfo ? option.selections[0].additionalInfo : option.selections[0].head, option.selections[0].motilePart];
        if(option.type === "addon")
          option.selectedOptions = [""];
        newCurrentSettings[index].push(option);
      });
    });
    setCurrentSettings(newCurrentSettings);
  }

  function updateCurrentSettings(index1,index2,index3,selectedOption){
    let newCurrentSettings = currentSettings;
    newCurrentSettings[index1][index2].selectedOptions[index3] = selectedOption;
    setCurrentSettings(newCurrentSettings);
  }

  function updateCurrentPrices(index1,index2,price){
    let newCurrentPrices = currentPrices;
    newCurrentPrices[index1][index2] = price;
    setCurrentPrices(newCurrentPrices);
    forceUpdate();
  }

  function updateCurrentColors(index,color){
    let newCurrentColors = currentColors;
    newCurrentColors[index] = color;
    setCurrentColors(newCurrentColors);
  }

  function handleNewComponent(motilePart,index,optional){
    let rowSettings = currentSettings[index].find(setting => setting.type === "rows");

    if(rowSettings){
      motilePart = allMotileParts.find(part => part.name === rowSettings.selectedOptions[1]);
      let isPlaced = false;
      rowSettings.selections.forEach(selection => {
        if(state.components.find(component => component.component.name === selection.motilePart))
          isPlaced = true;
      });

      if(isPlaced){
        removeComponent(motilePart,rowSettings);
        setTimeout(() => {
          addComponent(motilePart,index,optional);
        }, 300);
      }else{
        addComponent(motilePart,index,optional);
      }

    }else{
      if(state.components.find(component => component.component.name === motilePart.name)){
        removeComponent(motilePart);
        setTimeout(() => {
          addComponent(motilePart,index,optional);
        }, 300);
      }else{
        addComponent(motilePart,index,optional);
      }

    if(props.side === "Back" && index === motileParts.length-1) {
      document.dispatchEvent(new CustomEvent("placeDummys", {detail:{stateOutside: state}}));
    }
    }
  }

  function removeComponent(motilePart,rowSettings){
    if(rowSettings){
      rowSettings.selections.forEach(selection => {
        // Update State
        if(state.components.find(component => component.component.name == selection.motilePart)){
          let components = state.components.splice(state.components.indexOf(state.components.find(component => component.component.name == selection.motilePart)), 1); 
          setState(prevState => ({...prevState,components: components}));
        }
      
        // Update Scene
        document.dispatchEvent(new CustomEvent("removeComponentFromScene", {detail:{name: selection.motilePart}}));
      });
    }else{
      // Update State
      let components = state.components.splice(state.components.indexOf(state.components.find(component => component.component.name == motilePart.name)), 1); 
      setState(prevState => ({...prevState,components: components}));

      // Update Scene
      document.dispatchEvent(new CustomEvent("removeComponentFromScene", {detail:{name: motilePart.name}}));
    }
  }

  function addComponent(motilePart,index,optional){
    if(props.side === "Back" && index === motileParts.length-1 && !optional){
      changeSwiperPageNextIndex();
      return
    }
    
    if(!optional)
      changeSwiperPageNextIndex();  

    // Update State
    let component = {component: motilePart, settings: currentSettings[index], color: currentColors[index], price: getPriceOfComponent(index)}
    let components = state.components;
    components.push(component);
    setState(prevState => ({...prevState,components: components}));

    // Update Scene
    document.dispatchEvent(new CustomEvent("addComponentToScene", {detail:{name: motilePart.name, settings: currentSettings[index], color: currentColors[index]}}));
  }

  function getButtonText(index,motilePart){
    if(currentSettings)
      currentSettings[index].forEach(setting => {
        if(setting.type == "rows")
          motilePart = allMotileParts.find(part => part.name === setting.selectedOptions[1]);
      });

    if(state.components.find(component => component.component.name === motilePart.name))
      return "Update"
    if(props.side === "Back" && index === motileParts.length-1)
      return "Weiter"
    
    return "Einbauen"
  }

  function getPriceOfComponent(index){
    if(currentPrices && motileParts){  
      let price = parseInt(motileParts[index].metaData.price);
      currentPrices[index].forEach(currentPrice => {
        price += currentPrice;
      });
      return price + " €";
    } 
    return ""
  }

  return (
    <div className="PanelElement">

      <p className="side">{props.side === "Back" ? "Rückseite" : "Vorderseite"}</p>

      {/* MotilePart Icons */}
      <div className="mp-icons">
        {motileParts.map((motilePart,index) =>{return(
          <span key={index} className="mp-icon material-icons" onClick={() =>{changeSwiperPageToIndex(index)}} style={{
            opacity: index === currentPage || props.availableSwipes > index || props.ignoreSwiperLimits ? '1' : '0.1',
            fontSize: index === currentPage ? '40px' : '24px',
            cursor: index === currentPage || props.availableSwipes > index || props.ignoreSwiperLimits ? 'pointer' : ''
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
                  <h2 className="mp-name">{motilePart.name}</h2>
                  <p className="mp-price">{getPriceOfComponent(index)}</p>
                  <div className="mp-colors">
                    {motilePart.metaData.colorways.map((colorway,index2) => {return(
                      <input type="radio" name={motilePart.name+"_Radio"} key={index2} className="mp-dot" defaultChecked={index2 === 0} style={{background: colorway}} onClick={() =>{updateCurrentColors(index,colorway)}}/>
                    )})}
                  </div>
                </div>
                <div className="mp-description">{motilePart.metaData.description}</div>
                <div className='mp-selectors'>
                  {motilePart.metaData.options.map((option, index2) => {
                    return <ComponentSelector key={index2} type={option.type} options={option.selections} heading={option.name} index1={index} index2={index2} updateCurrentSettings={updateCurrentSettings} addComponent={addComponent} updateCurrentPrices={updateCurrentPrices} motileParts={allMotileParts}/>
                  })}
                </div>
              </div>
              <div className="mp-button" onClick={() =>{handleNewComponent(motilePart,index)}}>{getButtonText(index,motilePart)}</div>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
}

export default PanelElement;
