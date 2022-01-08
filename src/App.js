import './App.css';
import BabylonView from './components/Configurator/BabylonView/BabylonView';
import Panel from './components/Configurator/Panel/Panel';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Home/Header/Header';
// import BlenderRendering from './components/BlenderRendering/BlenderRendering';
import {BrowserRouter as Router,Route,Switch,Redirect} from "react-router-dom";
import Configurations from './components/Profile/Configurations/Configurations';
import Settings from './components/Profile/Settings/Settings';
import Orders from './components/Profile/Orders/Orders';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import SizeChooser from './components/Configurator/SizeChooser/SizeChooser';
import {Context} from './Store.js';
import React, {useContext} from 'react';
import history from './services/RouterHistory.js';

const App = () => {

  const [state, setState] = useContext(Context);

  return (
    <Router history={history}>
      <Navbar/>
      <Login/>

      <Switch>
        {/* Home */}
        <Route exact path="/" render={() => (
          <div>
            <Header/>
          </div>
        )}/>

        {/* Konfigurator */}
        <Route exact path="/Konfigurator" render={() => (
          <div>
            <SizeChooser/>
            <Panel/>
            <BabylonView/>
            {/* <BlenderRendering/> */}
          </div>
        )}/>

        {/* Nutzer Konfigurationen */}
        <Route exact path="/Profil/Geräte" render={() => (
          !state.loggedIn ? 
          (
            <Redirect to="/"/>
          ) : (
            <div>
              <Configurations/>
            </div>
          )
        )}/>

        {/* Nutzer Bestellungen */}
        <Route exact path="/Profil/Bestellungen" render={() => (
          !state.loggedIn ? 
          (
            <Redirect to="/"/>
          ) : (
            <div>
              <Orders/>
            </div>
          )
        )}/>
        
        {/* Nutzer Konfigurationen */}
        <Route exact path="/Profil/Einstellungen" render={() => (
          !state.loggedIn ? 
          (
            <Redirect to="/"/>
          ) : (
            <div>
              <Settings/>
            </div>
          )
        )}/>

        {/* Warenkorb */}
        <Route exact path="/Warenkorb" render={() => (
          <div>
            <ShoppingCart/>
          </div>
        )}/>

        {/* 404 */}
        <Route render={() => (
          <div>
            <h1 style={{marginTop: '100px'}}>404 - Seite nicht gefunden</h1>
          </div>
        )}/>
      </Switch>

    </Router>
  );
}

export default App;
