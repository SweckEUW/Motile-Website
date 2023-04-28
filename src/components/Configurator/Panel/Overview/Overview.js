import './Overview.css';
import React, {useContext,useEffect,useState} from 'react';
import {Context} from '../../../../Store'
import ServerRequest from '../../../../services/ServerRequest'
import { useLocation } from "react-router-dom";
import history from '../../../../services/RouterHistory';

function Overview(props){
  const [state, setState] = useContext(Context);
  const [configName, setConfigName] = useState("Meine Konfiguration");
  const [configNameEditEnabled, setConfigNameEditEnabled] = useState(false);

  const location = useLocation();

  useEffect(() =>{ 
    setState(prevState => ({...prevState,components: []}));

    if(location.state && location.state.editMode)
      setConfigName(location.state.configuration.name)  
  },[]);

  async function saveConfiguration(){
    if(state.loggedIn){   
      let allComponentsPlaced = true;
      state.components.forEach(component => {
        if(!component.position && component.component.name != "Display"&& component.component.name != "Hörmuschel"){
          allComponentsPlaced = false;
          setState(prevState => ({...prevState,configuratorErrorMessage: "Du hast nicht alle Komponenten auf dem Gerät platziert!"}));
          setTimeout(() => {
            setState(prevState => ({...prevState,configuratorErrorMessage: null}));
          }, 8000);
        }
      });

      if(allComponentsPlaced){
        setState(prevState => ({...prevState,showLoadingscreen: true}));
   
        let data = {
          name: configName,
          number: Math.floor(Math.random() * 1000000000),
          orderDate: new Date().toLocaleDateString('de-DE', {year: 'numeric', month: 'long', day: 'numeric' }),
          deliveryDate: new Date().addDays(7).toLocaleDateString('de-DE', {year: 'numeric', month: 'long', day: 'numeric' }),
          price: getPrice(),
          bought:  false,
          parts: state.components,
          isTablet: props.tabletSelected
        }

        let saveResponse = await ServerRequest.saveUserConfiguration(data); 
        console.log(saveResponse.data.message);
        if(saveResponse.data.success){
          history.push({pathname: '/Profil/Geräte'});
          setState(prevState => ({...prevState,showLoadingscreen: false}));
        }
      }
    }else{
      document.dispatchEvent(new CustomEvent("toggleLoginDialogue", {detail: {information: 'Sie müssen eingeloggt sein, um eine Konfiguration zu speichern'}}));
    }
  }

  function toggleNameEdit(){
    setConfigNameEditEnabled(!configNameEditEnabled);
    document.getElementById("ov-header-input").focus();
    document.getElementById("ov-header-input").select();
  }

  function updateConfigurationName(e){
    setConfigName(e.target.value);
    e.target.style.width = e.target.value.length + 2 +'ch';
  }

  function getPrice(){
    let price = 0;
    state.components.forEach(component => {
      if(component.price)
        price += parseInt(component.price);
    });
    return price + " €";
  }

  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  } 

  return (
    <div className="Overview">
      
      <p className='ov-title'>Übersicht</p>

      <span className="ov-header" onClick={() =>{toggleNameEdit()}}>  
        <input id='ov-header-input' maxLength="26" className="ov-header-input" type="text" value={configName} onChange={e => updateConfigurationName(e)}/>
        <span className="material-icons-outlined">edit</span>
      </span>
      
      <div className="ov-box">
        <span className="ov-side">Rückseite</span> 
        {state.components.filter(component => component.component.side !== "Front").map((component,index) =>{return(
          <div key={index} className="ov-component">
            <span className="material-icons-outlined">{component.component.metaData.icon}</span>
            <span className="ov-component-details">
              <h4 className="ov-component-name">{component.component.name}</h4>
              {component.settings.map((setting,index) =>
                <div key={index} className="ov-component-setting">{setting.selectedOptions[0]}</div>
              )}
            </span>
            <span className="ov-component-price">{component.price}</span>
          </div>
        )})}

        <span className="ov-side">Vorderseite</span> 
        {state.components.filter(component => component.component.side === "Front").map((component,index) =>{return(
          <div key={index} className="ov-component">
            <span className="material-icons-outlined">{component.component.metaData.icon}</span>
            <span className="ov-component-details">
              <h4 className="ov-component-name">{component.component.name}</h4>
              {component.settings.map(setting =>{return(
                setting.selectedOptions.map((selectedOption,index) => 
                  <div key={index} className="ov-component-setting">{selectedOption}</div>
                )
              )})}
            </span>
            <span className="ov-component-price">{component.price}</span>
          </div>
        )})}

        <span className="ov-price">
          <span>Gesamt:</span>
          <span className="ov-price-number">{getPrice()}</span>
        </span>
      </div>
      <button className="btn-grad" onClick={() =>{saveConfiguration()}}>Speichern</button>

    </div>
  );
}

export default Overview;
