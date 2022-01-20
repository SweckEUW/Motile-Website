import './SizeChooser.css';
import React, {useState, useEffect} from 'react';
import {CSSTransition} from 'react-transition-group';
import history from '../../../services/RouterHistory';

function SizeChooser(){
  const [sizeChooserVisible, setSizeChooserVisible] = useState(true);

  useEffect(() =>{ 
    if(history.location.state && history.location.state.editMode)
      setSizeChooserVisible(false);
  }, []);

  return (
    <CSSTransition in={sizeChooserVisible} classNames="fade" timeout={400} unmountOnExit>
      <div className="SizeChooser">
        <div className="grid-container sc-container">
          <h2 className="col-12 sc-title">Größe Wählen</h2>
          <p className="col-12 sc-text">Mächtest du ein smartphone oder ein Tablet?</p>

            <span className="col-6 sc-element" onClick={() =>{setSizeChooserVisible(false)}}>
              <img className="sc-img" src={process.env.PUBLIC_URL+'/Assets/smartphone_size.svg'} alt="" />
              <p>Smartphone</p>
            </span>
            <span className="col-6 sc-element" onClick={() =>{setSizeChooserVisible(false)}}>
              <img className="sc-img" src={process.env.PUBLIC_URL+'/Assets/tablet_size.svg'} alt="" />
              <p>Tablet</p>
            </span>

        </div>
      </div>
    </CSSTransition>
  );

}

export default SizeChooser;
