import './App.css';
import BabylonView from './components/Configurator/BabylonView/BabylonView';
import Panel from './components/Configurator/Panel/Panel';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Home/Header/Header';
import Footer from './components/Footer/Footer';
// import BlenderRendering from './components/BlenderRendering/BlenderRendering';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Configurations from './components/Profile/Configurations/Configurations';
import Settings from './components/Profile/Settings/Settings';
import Orders from './components/Profile/Orders/Orders';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Checkout from './components/Checkout/Checkout';
import BuyConfirmation from './components/Checkout/BuyConfirmation/BuyConfirmation';
import SizeChooser from './components/Configurator/SizeChooser/SizeChooser';
import React from 'react';
import history from './services/RouterHistory.js';

const App = () => {

  return (
    <Router history={history}>
      <Navbar/>
      <Login/>

      <Switch>
        {/* Home */}
        <Route exact path="/" render={() => (
          <div>
            <Header/>
            <Footer/>
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
            <div>
              <Configurations/>
              <Footer/>
            </div>
        )}/>

        {/* Nutzer Bestellungen */}
        <Route exact path="/Profil/Bestellungen" render={() => (
            <div>
              <Orders/>
              <Footer/>
            </div>
        )}/>
        
        {/* Nutzer Konfigurationen */}
        <Route exact path="/Profil/Einstellungen" render={() => (
            <div>
              <Settings/>
              <Footer/>
            </div>
        )}/>

        {/* Warenkorb */}
        <Route exact path="/Warenkorb" render={() => (
          <div>
            <ShoppingCart/>
            <Footer/>
          </div>
        )}/>

        {/* Checkout */}
        <Route exact path="/Kasse" render={() => (
          <div>
            <Checkout/>
            <Footer/>
          </div>
        )}/>

        {/* Kaufbestätigung */}
        <Route exact path="/Kaufbestätigung" render={() => (
          <div>
            <BuyConfirmation/>
            <Footer/>
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
