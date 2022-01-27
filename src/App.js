import './App.css';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Login from './components/Login/Login';
import Loadingscreen from './components/Loadingscreen/Loadingscreen';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Home/Header/Header';
import Footer from './components/Footer/Footer';
// import BlenderRendering from './components/BlenderRendering/BlenderRendering';
import Configurator from './components/Configurator/Configurator';
import Configurations from './components/Profile/Configurations/Configurations';
import Settings from './components/Profile/Settings/Settings';
import Orders from './components/Profile/Orders/Orders';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Checkout from './components/Checkout/Checkout';
import BuyConfirmation from './components/Checkout/BuyConfirmation/BuyConfirmation';
import SizeChooser from './components/Configurator/SizeChooser/SizeChooser';
import history from './services/RouterHistory.js';

import React from 'react';

const App = () => {

  return (
    <Router>
      <Loadingscreen/>
      <Navbar/>
      <Login/>
      
      <Switch>
        {/* Home */}
        <Route exact path="/" render={() => (
          <div className='pagewrapper'>
            <Header/>
            <Footer/>
          </div>
        )}/>

        {/* Konfigurator */}
        <Route exact path="/Konfigurator" render={() => (
          <div className='pagewrapper'>
            <Configurator/>
          </div>
        )}/>

        {/* Nutzer Konfigurationen */}
        <Route exact path="/Profil/Geräte" render={() => (
            <div className='pagewrapper'>
              <Configurations/>
              <Footer/>
            </div>
        )}/>

        {/* Nutzer Bestellungen */}
        <Route exact path="/Profil/Bestellungen" render={() => (
            <div className='pagewrapper'>
              <Orders/>
              <Footer/>
            </div>
        )}/>
        
        {/* Nutzer Konfigurationen */}
        <Route exact path="/Profil/Einstellungen" render={() => (
            <div className='pagewrapper'>
              <Settings/>
              <Footer/>
            </div>
        )}/>

        {/* Warenkorb */}
        <Route exact path="/Warenkorb" render={() => (
          <div className='pagewrapper'>
            <ShoppingCart/>
            <Footer/>
          </div>
        )}/>

        {/* Checkout */}
        <Route exact path="/Kasse" render={() => (
          <div className='pagewrapper'>
            <Checkout/>
            <Footer/>
          </div>
        )}/>

        {/* Kaufbestätigung */}
        <Route exact path="/Kaufbestätigung" render={() => (
          <div className='pagewrapper'>
            <BuyConfirmation/>
            <Footer/>
          </div>
        )}/>

        {/* 404 */}
        <Route render={() => (
          <div className='pagewrapper'>
            <h1 style={{marginTop: '100px'}}>404 - Seite nicht gefunden</h1>
          </div>
        )}/>
      </Switch>

    </Router>
  );
}

export default App;
