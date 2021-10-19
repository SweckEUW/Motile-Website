import './Login.css';
import { FaSignInAlt } from 'react-icons/fa';
import React, {useState} from 'react';
import UserService from '../../services/UserService'
import { CSSTransition } from 'react-transition-group';

function Login(){
  const [loginDialogueVisible, setLoginDialogueVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showRegister, toggleRegister] = useState(false);
  const [showRegisterPrompt, toggleRegisterPrompt] = useState(true);
  const [errorMessageTree, setErrorMessageTree] = useState({
    loginEmail: "E-Mail nicht gefunden",
    loginPW: "Passwort stimmt nicht mit E-Mail überein",
    registerEmail:"Geben Sie eine valide E-Mail ein",
    registerPW1: "Passwort invalide",
    registerPW2:"Passwörter stimmen nicht überein"
  });
  const [showLogEmailErr, toggleLogEmailErr] = useState(false);
  const [showLogPWErr, toggleLogPWErr] = useState(false);
  const [showRegEmailErr, toggleRegEmailErr] = useState(false);
  const [showPW1Err, togglePW1Err] = useState(false);
  const [showPW2Err, togglePW2Err] = useState(false);

  function toggleLoginDialogue(){
    setLoginDialogueVisible(!loginDialogueVisible);
  }

  function changeErrorMessage(errorMessage){
    setErrorMessage(errorMessage);
    setTimeout(() => {
      setErrorMessage(null)
    }, 2000);
  }

  function updateErrorMessageTree(msgToUpdate, message) {
    setErrorMessageTree((prevState)=> {
      return {...prevState, [msgToUpdate]: message}
    }) 
  }

  function checkMatchingPasswords(event) {
    const pw1 = document.getElementById("register-pw1").value;
    const pw2 = document.getElementById("register-pw2").value;

    if (pw1 !== pw2) {
      togglePW2Err(true);
      document.getElementById("register-pw2").style.borderColor = "red";
    }
    else {
      togglePW2Err(false);
      document.getElementById("register-pw2").style.borderColor = "#ccc";
    }
  }

  async function login(){
    let email = document.getElementById("login-email").value;
    let pw = document.getElementById("login-pw").value;
    
    if(!email){
      toggleLogEmailErr(true);
    }else if(!pw){
      toggleLogPWErr(true);
    }else{
      // call to server to login
      let loginResponse = await UserService.login(email,pw);
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
      toggleRegEmailErr(true);
      document.getElementById("register-email").style.borderColor = "red";
    }else if(!pw1){
      toggleRegEmailErr(false);
      document.getElementById("register-email").style.borderColor = "#ccc";

      togglePW1Err(true);
      document.getElementById("register-pw1").style.borderColor = "red";
    }else if(pw1 === pw2){
      // call to server if user name is taken
      const userExcist = await UserService.validateEmail(email);
      if(userExcist.data.success){
        changeErrorMessage("E-Mail bereits vergeben!")        
      }else{
        // call to server to create user
        let createUserResponse = await UserService.createUser({email: email, password: pw1})
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

            <div className="li-login-container">
              <h1 className="li-title">Login</h1>

              <div className="li-input-info">
                <p className="li-form-title">E-Mail</p>
                { showLogEmailErr ? <p className="li-input-err">{errorMessageTree.loginEmail}</p> : null }
              </div>
              <input id="login-email" className="li-form-input" type="text"/>

              <div className="li-input-info">
                <p className="li-form-title">Passwort</p>
                { showLogPWErr ? <p className="li-input-err">{errorMessageTree.loginPW}</p> : null }
              </div>
              <input id="login-pw" className="li-form-input" type="password"/>

              <button className="li-form-button" onClick={() =>{login()}}>Login</button>

              { showRegisterPrompt ? <p className="li-register-toggle" onClick={() => {
                toggleRegister(true); toggleRegisterPrompt(false)
                }
              }>Noch kein Account? Jetzt registrieren</p> : null}
            </div>

            {showRegister ? 
              <div className="li-register-container">
              <h1 className="li-title">Registrieren</h1>

              <div className="li-input-info">
                <p className="li-form-title">E-Mail</p>
                { showRegEmailErr ? <p className="li-input-err">{errorMessageTree.registerEmail}</p> : null }
              </div>  
              <input id="register-email" className="li-form-input" type="text"/>

              <div className="li-input-info">
                <p className="li-form-title">Passwort</p>
                { showPW1Err ? <p className="li-input-err">{errorMessageTree.registerPW1}</p> : null }
              </div>
              <input id="register-pw1" className="li-form-input" type="password" onChange={(e) => {
                  checkMatchingPasswords(e);
                  togglePW1Err(false);
                  document.getElementById("register-pw1").style.borderColor = "#ccc";
                }
              }/>

              <div className="li-input-info">
                <p className="li-form-title">Passwort wiederholen</p>
                { showPW2Err ? <p className="li-input-err">{errorMessageTree.registerPW2}</p> : null }
              </div>
              <input id="register-pw2" className="li-form-input" type="password" onChange={(e) => checkMatchingPasswords(e)}/>

              <CSSTransition in={errorMessage != null} classNames="fade" timeout={400} unmountOnExit>
                <div className="li-error">
                  <p>{errorMessage}</p>
                </div>
              </CSSTransition>

              <button className="li-form-button" onClick={() =>{register()}}>Registrieren</button>
            </div> 
            : null
            }
          </div>
        </div>
      </CSSTransition>

    </div>
  );

}

export default Login;
