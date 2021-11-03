import './BlenderRendering.css';
import { FiCamera } from 'react-icons/fi';
import React, {useState} from 'react';
import ServerRequest from '../../services/ServerRequest'
import { CSSTransition } from 'react-transition-group';

function Login(){
  const [dialogueVisible, setDialogueVisible] = useState(false);
  const [renderingURL, setRenderingURL] = useState(null);
  const [renderingVisible, setRenderingVisible] = useState(null);
  const [loadingscreenVisible, setLoadingscreenVisible] = useState(false);

  function toggleDialogue(){
    setDialogueVisible(!dialogueVisible);
  }

  async function requestBlenderRendering(){
    setLoadingscreenVisible(true);
    let response = await ServerRequest.requestBlenderRendering({
      x: document.getElementById("x").value ? document.getElementById("x").value : 0,
      y: document.getElementById("y").value ? document.getElementById("y").value : 0,
      z: document.getElementById("z").value ? document.getElementById("z").value : 0,
      rx: document.getElementById("rx").value ? document.getElementById("rx").value : 0,
      ry: document.getElementById("ry").value ? document.getElementById("ry").value : 0,
      rz: document.getElementById("rz").value ? document.getElementById("rz").value : 0,
    });

    var reader = new FileReader();
    reader.readAsDataURL(response.data); 
    reader.onloadend = function() {
      setRenderingURL(reader.result);    
      setRenderingVisible(true); 
      setLoadingscreenVisible(false);
    }

  }



  return (
    <div className="BlenderRendering">

      {/* Button */}
      <div className="br-button" onClick={() =>{toggleDialogue()}}>
        <FiCamera className="br-button-icon"/>
      </div> 

      {/* Dialogue */}
      <CSSTransition in={dialogueVisible} classNames="fade" timeout={400} unmountOnExit>
        <div className="br-dialogue" onClick={() =>{toggleDialogue()}}>
          <div className="br-dialogue-container" onClick={(e) =>{e.stopPropagation()}}>

            <CSSTransition in={loadingscreenVisible} classNames="fade" timeout={400} unmountOnExit>
              <div className="br-loadingscreen">
                <svg className="br-animation" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100">
                  <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                    <animateTransform attributeName="transform" attributeType="XML"  type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite" />
                  </path>
                </svg>
              </div>
            </CSSTransition>

            <div>
              X<input id="x" className="br-input" type="number" placeholder="0"/>
              Y<input id="y" className="br-input" type="number" placeholder="0"/>
              Z<input id="z" className="br-input" type="number" placeholder="0"/>
            </div>

            <div>
              RX<input id="rx" className="br-input" type="number" placeholder="0"/>
              RY<input id="ry" className="br-input" type="number" placeholder="0"/>
              RZ<input id="rz" className="br-input" type="number" placeholder="0"/>
            </div>
            
            <div className="br-dialogue-button" onClick={() =>{requestBlenderRendering()}}>Render</div>
            <div className="br-dialogue-rendering-container">
              <CSSTransition in={renderingVisible} classNames="fade" timeout={400} unmountOnExit>
               <img className="br-dialogue-rendering" src={renderingURL} alt=""/>
              </CSSTransition>
            </div>
           
          </div>
        </div>
      </CSSTransition>

    </div>
  );

}

export default Login;
