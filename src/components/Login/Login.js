import './Login.css';
import { FaSignInAlt } from 'react-icons/fa';
import React, {useState} from 'react';
import ServerRequest from '../../services/ServerRequest'
import { CSSTransition } from 'react-transition-group';

function Login(){
  const [loginDialogueVisible, setLoginDialogueVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  function toggleLoginDialogue(){
    setLoginDialogueVisible(!loginDialogueVisible);
  }

  function changeErrorMessage(errorMessage){
    setErrorMessage(errorMessage);
    setTimeout(() => {
      setErrorMessage(null)
    }, 2000);
  }

  async function login(){
    let email = document.getElementById("login-email").value;
    let pw = document.getElementById("login-pw").value;
    
    if(!email){
      changeErrorMessage("E-Mail fehlt!")
    }else if(!pw){
      changeErrorMessage("Passwort fehlt!")
    }else{
      // call to server to login
      let loginResponse = await ServerRequest.login(email,pw);
      changeErrorMessage(loginResponse.data.message);
      if(loginResponse.data.success){
        // TODO: do something after login successfull
      } 
    }
  }

  async function register(){
    let email = document.getElementById("register-email").value;
    let pw1 = document.getElementById("register-pw1").value;
    let pw2 = document.getElementById("register-pw2").value;
    
    if(!email){
      changeErrorMessage("E-Mail fehlt!")
    }else if(!pw1){
      changeErrorMessage("Passwort fehlt!")
    }else if(pw1 !== pw2){
      changeErrorMessage("Passwörter stimmen nicht überein!")
    }else{
      // call to server if user name is taken
      const userExcist = await ServerRequest.validateEmail(email);
      if(userExcist.data.success){
        changeErrorMessage("E-Mail bereits vergeben!")        
      }else{
        // call to server to create user
        let createUserResponse = await ServerRequest.createUser({email: email, password: pw1})
        changeErrorMessage(createUserResponse.data.message);
      } 
    }
  }

  return (
    <div className="Login">

      {/* Login Button */}
      <div className="li-button" onClick={() =>{toggleLoginDialogue()}}>
        <FaSignInAlt className="li-button-icon"/>
      </div> 

      {/* Login Dialogue */}
      <CSSTransition in={loginDialogueVisible} classNames="fade" timeout={400} unmountOnExit>
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

            <CSSTransition in={errorMessage != null} classNames="fade" timeout={400} unmountOnExit>
              <div className="li-error">
                <p>{errorMessage}</p>
              </div>
            </CSSTransition>

            <button className="li-form-button" onClick={() =>{register()}}>Regisrieren</button>
          </div>
        </div>
      </CSSTransition>

    </div>
  );

}

export default Login;
