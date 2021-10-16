import './Login.css';
import { FaSignInAlt } from 'react-icons/fa';
import React, {useState} from 'react';

function Login(){
  const [loginDialogueVisible, setLoginDialogueVisible] = useState(false);

  function toggleLoginDialogue(){
    setLoginDialogueVisible(!loginDialogueVisible);
  }

  function LoginDialogue() {
    if(loginDialogueVisible) 
      return (
        <div className="li-dialogue" onClick={() =>{toggleLoginDialogue()}}>
          <div className="li-dialogue-container" onClick={(e) =>{e.stopPropagation()}}>

            <h1 className="li-title">Login</h1>
            <p className="li-form-title">Username</p>
            <input className="li-form-input" type="text"/>
            <p className="li-form-title">Passwort</p>
            <input className="li-form-input" type="password"/>
            <button className="li-form-button">Login</button>

            <h1 className="li-title">Registrieren</h1>
            <p className="li-form-title">Username</p>
            <input className="li-form-input" type="text"/>
            <p className="li-form-title">Passwort</p>
            <input className="li-form-input" type="password"/>
            <p className="li-form-title">Passwort wiederholen</p>
            <input className="li-form-input" type="password"/>
            <button className="li-form-button">Regisrieren</button>
          </div>
        </div>
      )
    return ""
  }

  return (
    <div className="Login">
      <div className="li-button" onClick={() =>{toggleLoginDialogue()}}>
        <FaSignInAlt className="li-button-icon"/>
      </div>
      <LoginDialogue/>
    </div>
  );

}

export default Login;
