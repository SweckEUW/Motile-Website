import './SizeChooser.css';
import React, {useEffect} from 'react';
import history from '../../../services/RouterHistory';

function SizeChooser(props){

  useEffect(() =>{ 
    if(history.location.state && history.location.state.editMode)
      props.setSizeChooserVisible(false);
      
  }, []);

  function select(isTablet){
    props.setTabletSelected(isTablet);
    props.setSizeChooserVisible(false)
  }

  return (
    <div className="SizeChooser">
      <div className="grid-container sc-container">
        <h2 className="col-12 sc-title">Größe Wählen</h2>
        <p className="col-12 sc-text">Mächtest du ein smartphone oder ein Tablet?</p>
        
        <div className="sc-elements">
          <span className="sc-element" onClick={() =>{select(false)}}>
            <img className="sc-img" src={process.env.PUBLIC_URL+'/Assets/smartphone_size.svg'} alt="" />
            <p>Smartphone</p>
          </span>
          <span className="sc-element" onClick={() =>{select(true)}}>
            <img className="sc-img" src={process.env.PUBLIC_URL+'/Assets/tablet_size.svg'} alt="" />
            <p>Tablet</p>
          </span>
        </div>  

      </div>
    </div>
  );

}

export default SizeChooser;
