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
        <div className="sc-container">
          <p className="sc-title">Größe Wählen</p>
          <p className="sc-text">Ein vollständig modulares Smartphone. Lorem ipsum dolor sit atmet, consenttetur sadicsvin eltir, sed diam nomumy eirmond tempor invidunt ut labore et dolore magna.</p>
          <div className="sc-elements">
            <span className="sc-element" onClick={() =>{setSizeChooserVisible(false)}}>
              <img className="sc-img" src={process.env.PUBLIC_URL+'/Assets/smartphone_size.png'} alt="" />
              <p>Smartphone</p>
            </span>
            <span className="sc-element" onClick={() =>{setSizeChooserVisible(false)}}>
              <img className="sc-img" src={process.env.PUBLIC_URL+'/Assets/tablet_size.png'} alt="" />
              <p>Tablet</p>
            </span>
          </div>
        </div>
      </div>
    </CSSTransition>
  );

}

export default SizeChooser;
