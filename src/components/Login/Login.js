import './Login.css';
import React, {useEffect,useState} from 'react';
import ServerRequest from '../../services/ServerRequest'
import { CSSTransition } from 'react-transition-group';

function Login(){
  const [loginDialogueVisible, setLoginDialogueVisible] = useState(false);
  const [showRegister, toggleRegister] = useState(false);

  const [errorMessageTree, setErrorMessageTree] = useState({
    loginError: null,
    loginEmail: null,
    loginPW: null,

    registerError: null,
    registerEmail: null,
    registerPW1: null,
    registerPW2: null
  });

  useEffect(() => {
    document.addEventListener("toggleLoginDialogue", toggleLoginDialogue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    let email = document.getElementById("login-email").value;
    let pw = document.getElementById("login-pw").value;
    
    if(!email){
      setErrorMessageTree(prevState => ({...prevState,loginEmail: 'Bitte eine E-Mail angeben'}));
    }else if(!pw){
      setErrorMessageTree(prevState => ({...prevState,loginPW: 'Bitte ein Passwort angeben'}));
    }else{
      // call to server to login
      let loginResponse = await ServerRequest.login(email,pw);
      setErrorMessageTree(prevState => ({...prevState,loginError: loginResponse.data.message}));
      
      if(loginResponse.data.success){
        // TODO: do something after login successfull
      } 
    }
  }

  async function register(){
    resetErrorMessageTree();
    let email = document.getElementById("register-email").value;
    let pw1 = document.getElementById("register-pw1").value;
    let pw2 = document.getElementById("register-pw2").value;
    
    if(!email){
      setErrorMessageTree(prevState => ({...prevState,registerEmail: 'Bitte eine E-Mail angeben'}));
    }else if(!pw1){
      setErrorMessageTree(prevState => ({...prevState,registerPW1: 'Bitte ein Passwort angeben'}));
    }else if(pw1 !== pw2){
      setErrorMessageTree(prevState => ({...prevState,registerPW2: 'Passwörter stimmen nicht überein'}));
    }else{
      // call to server if user name is taken
      const userExcist = await ServerRequest.validateEmail(email);
      if(userExcist.data.success){
        setErrorMessageTree(prevState => ({...prevState,registerEmail: 'Die E-Mail wurde bereits registriert'}));     
      }else{
        // call to server to create user
        let createUserResponse = await ServerRequest.createUser({email: email, password: pw1})
        setErrorMessageTree(prevState => ({...prevState,registerError: createUserResponse.data.message}));   
      } 
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
                { errorMessageTree.loginEmail != null ? <p className="li-input-err">{errorMessageTree.loginEmail}</p> : null }
              </div>
              <input id="login-email" className="li-form-input" type="text"/>

              <div className="li-input-info">
                <p className="li-form-title">Passwort</p>
                { errorMessageTree.loginPW ? <p className="li-input-err">{errorMessageTree.loginPW}</p> : null }
              </div>
              <input id="login-pw" className="li-form-input" type="password"/>

              <CSSTransition in={errorMessageTree.loginError != null} classNames="fade" timeout={400} unmountOnExit>
                <div className="li-error">
                  <p>{errorMessageTree.loginError}</p>
                </div>
              </CSSTransition>

              <button className="li-form-button" onClick={() =>{login()}}>Login</button>

              <p className="li-register-toggle" onClick={() => {toggleRegister(true)}}>Noch kein Account? Jetzt registrieren</p>
            </div>
              
            {/* Register */}
            <div className="li-register-container">
              <h1 className="li-title">Registrieren</h1>

              <div className="li-input-info">
                <p className="li-form-title">E-Mail</p>
                { errorMessageTree.registerEmail ? <p className="li-input-err">{errorMessageTree.registerEmail}</p> : null }
              </div>  
              <input id="register-email" className="li-form-input" type="text"/>

              <div className="li-input-info">
                <p className="li-form-title">Passwort</p>
                { errorMessageTree.registerPW1 ? <p className="li-input-err">{errorMessageTree.registerPW1}</p> : null }
              </div>
              <input id="register-pw1" className="li-form-input" type="password"/>

              <div className="li-input-info">
                <p className="li-form-title">Passwort wiederholen</p>
                { errorMessageTree.registerPW2 ? <p className="li-input-err">{errorMessageTree.registerPW2}</p> : null }
              </div>
              <input id="register-pw2" className="li-form-input" type="password"/>

              <CSSTransition in={errorMessageTree.registerError != null} classNames="fade" timeout={400} unmountOnExit>
                <div className="li-error">
                  <p>{errorMessageTree.registerError}</p>
                </div>
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
