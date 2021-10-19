import './BlenderRendering.css';
import { FiCamera } from 'react-icons/fi';
import React, {useState} from 'react';
import ServerRequest from '../../services/ServerRequest'
import { CSSTransition } from 'react-transition-group';

function Login(){
  const [dialogueVisible, setDialogueVisible] = useState(false);
  const [renderingURL, setRenderingURL] = useState(null);
  const [renderingVisible, setRenderingVisible] = useState(null);

  function toggleDialogue(){
    setDialogueVisible(!dialogueVisible);
  }

  async function requestBlenderRendering(){

    let response = await ServerRequest.requestBlenderRendering({
      x: 0,
      y: 0,
      z: 50
    });
    
    var reader = new FileReader();
    reader.readAsDataURL(response.data); 
    reader.onloadend = function() {
      setRenderingURL(reader.result);    
      setRenderingVisible(true); 
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
