import './Login.css';
import { FaSignInAlt } from 'react-icons/fa';
import React, {useState} from 'react';
import UserService from '../../services/UserService'

function Login(){
  const [loginDialogueVisible, setLoginDialogueVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  function toggleLoginDialogue(){
    setLoginDialogueVisible(!loginDialogueVisible);
  }

  function login(){
    let email = document.getElementById("login-email").value;
    let pw = document.getElementById("login-pw").value;

    UserService.getAllUsers().then(response => {
      console.log(response.data)
    })
    
    // call to server to login
    
  }

  function register(){
    let email = document.getElementById("register-email").value;
    let pw = document.getElementById("register-pw").value;
    
    // call to server if user name is taken
    UserService.validateEmail(email).then(response => {
      if(response.data[0])
        setErrorMessage("E-Mail bereits vergeben")
    })

    // call to server to create user
    
  }

  function ErrorMessage() {
    if(errorMessage) 
      return (
        <div className="li-error">
          <p>{errorMessage}</p>
        </div>
      )
    return ""
  }

  function LoginDialogue() {
    if(loginDialogueVisible) 
      return (
        <div className="li-dialogue" onClick={() =>{toggleLoginDialogue()}}>
          <div className="li-dialogue-container" onClick={(e) =>{e.stopPropagation()}}>

            <h1 className="li-title">Login</h1>
            <p className="li-form-title">E-Mail</p>
            <input id="login-email" className="li-form-input" type="text"/>
            <p className="li-form-title">Passwort</p>
            <input id="login-pw" className="li-form-input" type="password"/>
            <button className="li-form-button" onClick={() =>{login()}}>Login</button>

            <h1 className="li-title">Registrieren</h1>
            <p className="li-form-title">E-Mail</p>
            <input id="register-email" className="li-form-input" type="text"/>
            <p className="li-form-title">Passwort</p>
            <input id="register-pw" className="li-form-input" type="password"/>
            <p className="li-form-title">Passwort wiederholen</p>
            <input className="li-form-input" type="password"/>
            <ErrorMessage/>
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
