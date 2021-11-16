import './Overview.css';
import React, {useContext} from 'react';
import {Context} from '../../../../Store'

function Overview(){
  const [state, setState] = useContext(Context);

  return (
    <div className="Overview">

      <h2>Übersicht</h2>

      <span className="ov-header">  
        <span className="ov-header-name">Rüdiger</span>
        <span className="material-icons">edit</span>
      </span>
      
      <div className="ov-box">

        <span className="ov-side">Rückseite</span> 
        {state.components.filter(component => component.component.side === "Back").map((component,index) =>{return(
          <div key={index} className="ov-component">
            <span className="material-icons">{component.component.metaData.icon}</span>
            <span className="ov-component-details">
              <div className="ov-component-name">{component.component.name}</div>
              {component.settings.map((setting,index) =>{return(
                <div key={index} className="ov-component-setting">{setting}</div>
              )})}
            </span>
            <span className="ov-component-price">{component.component.metaData.price}</span>
          </div>
        )})}

        <span className="ov-side">Forderseite</span> 
        {state.components.filter(component => component.component.side === "Front").map((component,index) =>{return(
          <div key={index} className="ov-component">
            <span className="material-icons">{component.component.metaData.icon}</span>
            <span className="ov-component-details">
              <div className="ov-component-name">{component.component.name}</div>
              {component.settings.map((setting,index) =>{return(
                <div key={index} className="ov-component-setting">{setting}</div>
              )})}
            </span>
            <span className="ov-component-price">{component.component.metaData.price}</span>
          </div>
        )})}

        <span className="ov-price">
          <span>Gesamt:</span>
          <span className="ov-price-number">{state.components.reduce((pv, component) => pv + parseInt(component.component.metaData.price), 0) + " €"}</span>
        </span>
      </div>
      <span className="ov-button">Speichern</span>

    </div>
  );
}

export default Overview;
