import './SizeChooser.css';
import React, {useEffect} from 'react';
import { useLocation } from "react-router-dom";

function SizeChooser(props){

  const location = useLocation();
  
  useEffect(() =>{ 
    if(location.state && location.state.editMode)
      props.setSizeChooserVisible(false);
      
  }, []);

  function select(isTablet){
    props.setTabletSelected(isTablet);
    props.setSizeChooserVisible(false)
  }

  return (
    <div className="SizeChooser">
      <div className="grid-container">
        <h2 className="col-12 sc-title">Größe Wählen</h2>
        <p className="col-12 sc-text">Möchtest du ein Smartphone oder ein Tablet?</p>
        
        <div className="sc-elements">
          <span className="col-6 sc-element" onClick={() =>{select(false)}}>
            <img className="sc-img" src={process.env.PUBLIC_URL+'/Assets/smartphone_size.svg'} alt="" />
            <h3>Smartphone</h3>
          </span>
          <span className="col-6 sc-element" onClick={() =>{select(true)}}>
            <img className="sc-img" src={process.env.PUBLIC_URL+'/Assets/tablet_size.svg'} alt="" />
            <h3>Tablet</h3>
          </span>
        </div>  
      </div>
    </div>
  );

}

export default SizeChooser;
