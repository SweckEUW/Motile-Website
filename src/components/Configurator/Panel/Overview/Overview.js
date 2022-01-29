import './Overview.css';
import React, {useContext,useEffect,useState} from 'react';
import {Context} from '../../../../Store'
import ServerRequest from '../../../../services/ServerRequest'
import history from '../../../../services/RouterHistory';

function Overview(props){
  const [state, setState] = useContext(Context);
  const [configName, setConfigName] = useState("Meine Konfiguration");
  const [configNameEditEnabled, setConfigNameEditEnabled] = useState(false);

  useEffect(() =>{ 
    setState(prevState => ({...prevState,components: []}));
  },[]);

  async function saveConfiguration(){
    if(state.loggedIn){   
      let allComponentsPlaced = true;
      state.components.forEach(component => {
        if(!component.position && component.component.name != "Display"&& component.component.name != "Hörmuschel"){
          allComponentsPlaced = false;
          setState(prevState => ({...prevState,configuratorErrorMessage: "Du hast nicht alle Komponenten auf das Handy platziert!"}));
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
    return state.components.reduce((pv, component) => pv + parseInt(component.component.metaData.price), 0) + " €"
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
        <input id='ov-header-input' className="ov-header-input" type="text" defaultValue={configName} onChange={e => updateConfigurationName(e)}/>
        <span className="material-icons">edit</span>
      </span>
      
      <div className="ov-box">

        <span className="ov-side">Rückseite</span> 
        {state.components.filter(component => component.component.side !== "Front").map((component,index) =>{return(
          <div key={index} className="ov-component">
            <span className="material-icons">{component.component.metaData.icon}</span>
            <span className="ov-component-details">
              <div className="ov-component-name">{component.component.name}</div>
              {component.settings.map(setting =>{return(
                setting.selectedOptions.map((selectedOption, index) => 
                  <div key={index} className="ov-component-setting">{selectedOption}</div>
                )
              )})}
            </span>
            <span className="ov-component-price">{component.component.metaData.price}</span>
          </div>
        )})}

        <span className="ov-side">Vorderseite</span> 
        {state.components.filter(component => component.component.side === "Front").map((component,index) =>{return(
          <div key={index} className="ov-component">
            <span className="material-icons">{component.component.metaData.icon}</span>
            <span className="ov-component-details">
              <div className="ov-component-name">{component.component.name}</div>
              {component.settings.map(setting =>{return(
                setting.selectedOptions.map((selectedOption, index) => 
                  <div key={index} className="ov-component-setting">{selectedOption}</div>
                )
              )})}
            </span>
            <span className="ov-component-price">{component.component.metaData.price}</span>
          </div>
        )})}

        <span className="ov-price">
          <span>Gesamt:</span>
          <span className="ov-price-number">{getPrice()}</span>
        </span>
      </div>
      <span className="ov-button" onClick={() =>{saveConfiguration()}}>Speichern</span>

    </div>
  );
}

export default Overview;
