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

  async function login(){
    let email = document.getElementById("login-email").value;
    let pw = document.getElementById("login-pw").value;
    
    if(!email){
      setErrorMessage("E-Mail fehlt!")
    }else if(!pw){
      setErrorMessage("Passwort fehlt!")
    }else{
      // call to server to login
      let loginSuccessfull = await UserService.login(email,pw);
      setErrorMessage(loginSuccessfull.data ? "Anmeldung erfolgreich!" : "Anmeldung nicht erfolgreich!")
    }
    
  }

  async function register(){
    let email = document.getElementById("register-email").value;
    let pw1 = document.getElementById("register-pw1").value;
    let pw2 = document.getElementById("register-pw2").value;
    
    if(!email){
      setErrorMessage("E-Mail fehlt!")
    }else if(!pw1){
      setErrorMessage("Passwort fehlt!")
    }else if(pw1 !== pw2){
      setErrorMessage("Passwörter stimmen nicht überein!")
    }else{
      // call to server if user name is taken
      const userExcist = await UserService.validateEmail(email);
      if(userExcist.data){
        setErrorMessage("E-Mail bereits vergeben!")        
      }else{
        // call to server to create user
        setErrorMessage("Registrierung erfolgreich!")
        UserService.createUser({email: email, password: pw1})
      } 

    }

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
            <input id="register-pw1" className="li-form-input" type="password"/>
            <p className="li-form-title">Passwort wiederholen</p>
            <input id="register-pw2" className="li-form-input" type="password"/>
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
