import './Login.css';
import { FaSignInAlt } from 'react-icons/fa';
import React, {useState} from 'react';
//import AxiosHelper from "./AxiosHelper.js";

function Login(){
  const [loginDialogueVisible, setLoginDialogueVisible] = useState(false);

  function toggleLoginDialogue(){
    setLoginDialogueVisible(!loginDialogueVisible);
  }

  function login(){
    let name = document.getElementById("login-name").value;
    let pw = document.getElementById("login-pw").value;
    
    // call to server to login
    // AxiosHelper.
  }

  function register(){
    let name = document.getElementById("register-name").value;
    let pw = document.getElementById("register-pw").value;
    
    // call to server if user name is taken


    // call to server to create user
    // AxiosHelper.
  }

  function LoginDialogue() {
    if(loginDialogueVisible) 
      return (
        <div className="li-dialogue" onClick={() =>{toggleLoginDialogue()}}>
          <div className="li-dialogue-container" onClick={(e) =>{e.stopPropagation()}}>

            <h1 className="li-title">Login</h1>
            <p className="li-form-title">Username</p>
            <input id="login-name" className="li-form-input" type="text"/>
            <p className="li-form-title">Passwort</p>
            <input id="login-pw" className="li-form-input" type="password"/>
            <button className="li-form-button" onClick={() =>{login()}}>Login</button>

            <h1 className="li-title">Registrieren</h1>
            <p className="li-form-title">Username</p>
            <input id="register-name" className="li-form-input" type="text"/>
            <p className="li-form-title">Passwort</p>
            <input id="register-pw" className="li-form-input" type="password"/>
            <p className="li-form-title">Passwort wiederholen</p>
            <input className="li-form-input" type="password"/>
            <button className="li-form-button" onClick={() =>{register()}}>Regisrieren</button>
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
