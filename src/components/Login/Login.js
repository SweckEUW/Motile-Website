import './Login.css';
import React, {useContext,useEffect,useState} from 'react';
import ServerRequest from '../../services/ServerRequest'
import {CSSTransition} from 'react-transition-group';
import {Context} from '../../Store'
import history from '../../services/RouterHistory';

function Login(){
  const [state, setState] = useContext(Context);
  const [loginDialogueVisible, setLoginDialogueVisible] = useState(false);
  const [showRegister, toggleRegister] = useState(false);
  const [errorMessageTree, setErrorMessageTree] = useState({
    loginError: null,
    loginEmail: null,
    loginPW: null,

    registerError: null,
    registerFirstName: null,
    registerLastName: null,
    registerEmail: null,
    registerPW1: null,
    registerPW2: null
  });
  let stayAliveID = null;

  useEffect(() => {
    tryJWTLogin();
  },[state])

  // Try logging in with jwt token
  async function tryJWTLogin(){
    let loginJWTResponse = await ServerRequest.loginJWT();
    console.log(loginJWTResponse.data.message)
    if(loginJWTResponse.data.success){
      if(!state.loggedIn)
        setState(prevState => ({...prevState,loggedIn: true}));
      clearInterval(stayAliveID);  
      stayAliveID = setInterval(() => {
        stayAliveCall();
      }, 300000);
    }else{
      switch(window.location.pathname) {
        case "/Profil/Ger%C3%A4te":
        case "/Profil/Einstellungen":
        case "/Profil/Bestellungen":
          history.push({pathname: '/'});
          console.log("redirect to Home");
          break;
      }
    }
      
  }
  
  document.addEventListener("toggleLoginDialogue", toggleLoginDialogue);
  function toggleLoginDialogue(){
    setLoginDialogueVisible(!loginDialogueVisible);
  }

  function resetErrorMessageTree(){
    setErrorMessageTree({
      loginError: null,
      loginEmail: null,
      loginPW: null,
  
      registerError: null,
      registerEmail: null,
      registerPW1: null,
      registerPW2: null
    });
  }

  async function login(){
    resetErrorMessageTree();
    let email = document.getElementById("login-email").value.toLowerCase();
    let password = document.getElementById("login-pw").value;
    
    if(!email)
      setErrorMessageTree(prevState => ({...prevState,loginEmail: 'Bitte eine E-Mail angeben'}));
    if(!password)
      setErrorMessageTree(prevState => ({...prevState,loginPW: 'Bitte ein Passwort angeben'}));
    
    if(email && password){
      // call to server to login
      let loginResponse = await ServerRequest.login({
        email: email,
        password: password
      });

      if(loginResponse.data.success){
        localStorage.setItem('token', loginResponse.data.token);
        setState(prevState => ({...prevState,loggedIn: true}));
        console.log(loginResponse.data.message);
        setLoginDialogueVisible(false);

        clearInterval(stayAliveID);  
        stayAliveID = setInterval(() => {
          stayAliveCall();
        }, 300000);
      }else{
        setErrorMessageTree(prevState => ({...prevState,loginError: loginResponse.data.message}));
      }
    }
  }

  async function stayAliveCall(){
    console.log("Stay alive call");
    let stayAliveResponse = await ServerRequest.stayAlive();
    console.log(stayAliveResponse.data.message);
    localStorage.setItem('token', stayAliveResponse.data.token); 
  }

  async function register(){
    resetErrorMessageTree();
    let firstName = document.getElementById("register-first-name").value;
    let lastName = document.getElementById("register-last-name").value;
    let email = document.getElementById("register-email").value.toLowerCase();
    let pw1 = document.getElementById("register-pw1").value;
    let pw2 = document.getElementById("register-pw2").value;
    
    if(!firstName)
      setErrorMessageTree(prevState => ({...prevState,registerFirstName: 'Bitte einem Namen angeben'}));
    if(!lastName)
      setErrorMessageTree(prevState => ({...prevState,registerLastName: 'Bitte einem Namen angeben'}));
    if(!email)
      setErrorMessageTree(prevState => ({...prevState,registerEmail: 'Bitte eine E-Mail angeben'}));
    if(!pw1)
      setErrorMessageTree(prevState => ({...prevState,registerPW1: 'Bitte ein Passwort angeben'}));
    if(pw1 !== pw2)
      setErrorMessageTree(prevState => ({...prevState,registerPW2: 'Passwörter stimmen nicht überein'}));
    
    if(firstName && lastName && email && pw1 && pw1 === pw2){
      // call to server to register
      let registerResponse = await ServerRequest.register({firstName: firstName, lastName: lastName, email: email, password: pw1})
      setErrorMessageTree(prevState => ({...prevState,registerError: registerResponse.data.message}));  
      console.log(registerResponse.data.message) 
    }
  }

  return (
    <div className="Login">
      {/* Login/Register Dialogue */}
      <CSSTransition in={loginDialogueVisible} classNames="fade" timeout={400} unmountOnExit>
        <div className="li-dialogue" onClick={() =>{toggleLoginDialogue()}}>
          <div className="li-dialogue-container" onClick={(e) =>{e.stopPropagation()}}>

            {/* Login */}
            <div className="li-login-container" style={{marginLeft: showRegister ? "-550px" : ""}}>
              <h1 className="li-title">Login</h1>

              <div className="li-input-info">
                <p className="li-form-title">E-Mail</p>
                <CSSTransition in={errorMessageTree.loginEmail != null} classNames="fade" timeout={400} unmountOnExit>
                  <p className="li-input-err">{errorMessageTree.loginEmail}</p>
                </CSSTransition>
              </div>
              <input id="login-email" className="li-form-input" type="text"/>

              <div className="li-input-info">
                <p className="li-form-title">Passwort</p>
                <CSSTransition in={errorMessageTree.loginPW != null} classNames="fade" timeout={400} unmountOnExit>
                  <p className="li-input-err">{errorMessageTree.loginPW}</p>
                </CSSTransition>
              </div>
              <input id="login-pw" className="li-form-input" type="password"/>

              <CSSTransition in={errorMessageTree.loginError != null} classNames="slide-up" timeout={400} unmountOnExit>
                <div className="li-error">{errorMessageTree.loginError}</div>
              </CSSTransition>

              <button className="li-form-button" onClick={() =>{login()}}>Login</button>

              <p className="li-register-toggle" onClick={() => {toggleRegister(true)}}>Noch kein Account? Jetzt registrieren</p>
            </div>
              
            {/* Register */}
            <div className="li-register-container">
              <h1 className="li-title">Registrieren</h1>

              <div className="li-input-info">
                <p className="li-form-title">Vorname</p>
                <CSSTransition in={errorMessageTree.registerFirstName != null} classNames="fade" timeout={400} unmountOnExit>
                  <p className="li-input-err">{errorMessageTree.registerFirstName}</p>
                </CSSTransition>
              </div>  
              <input id="register-first-name" className="li-form-input" type="text"/>

              <div className="li-input-info">
                <p className="li-form-title">Nachname</p>
                <CSSTransition in={errorMessageTree.registerLastName != null} classNames="fade" timeout={400} unmountOnExit>
                  <p className="li-input-err">{errorMessageTree.registerLastName}</p>
                </CSSTransition>
              </div>  
              <input id="register-last-name" className="li-form-input" type="text"/>

              <div className="li-input-info">
                <p className="li-form-title">E-Mail</p>
                <CSSTransition in={errorMessageTree.registerEmail != null} classNames="fade" timeout={400} unmountOnExit>
                  <p className="li-input-err">{errorMessageTree.registerEmail}</p>
                </CSSTransition>
              </div>  
              <input id="register-email" className="li-form-input" type="text"/>

              <div className="li-input-info">
                <p className="li-form-title">Passwort</p>
                <CSSTransition in={errorMessageTree.registerPW1 != null} classNames="fade" timeout={400} unmountOnExit>
                  <p className="li-input-err">{errorMessageTree.registerPW1}</p>
                </CSSTransition>
              </div>
              <input id="register-pw1" className="li-form-input" type="password"/>

              <div className="li-input-info">
                <p className="li-form-title">Passwort wiederholen</p>
                <CSSTransition in={errorMessageTree.registerPW2 != null} classNames="fade" timeout={400} unmountOnExit>
                  <p className="li-input-err">{errorMessageTree.registerPW2}</p>
                </CSSTransition>
              </div>
              <input id="register-pw2" className="li-form-input" type="password"/>

              <CSSTransition in={errorMessageTree.registerError != null} classNames="slide-up" timeout={400} unmountOnExit>
                <div className="li-error">{errorMessageTree.registerError}</div>
              </CSSTransition>

              <button className="li-form-button" onClick={() =>{register()}}>Registrieren</button>

              <p className="li-register-toggle" onClick={() => {toggleRegister(false)}}>Schon einen Account? Jetzt Einloggen</p>

            </div> 

          </div>
        </div>
      </CSSTransition>

    </div>
  );

}

export default Login;
