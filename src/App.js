import './App.css';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Login from './components/Login/Login';
import Loadingscreen from './components/Loadingscreen/Loadingscreen';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Home/Header/Header';
import Footer from './components/Footer/Footer';
import Configurator from './components/Configurator/Configurator';
import Configurations from './components/Profile/Configurations/Configurations';
import Settings from './components/Profile/Settings/Settings';
import Orders from './components/Profile/Orders/Orders';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';

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
          <div>
            <Header/>
            <Footer/>
          </div>
        )}/>

        {/* Konfigurator */}
        <Route exact path="/Konfigurator" render={() => (
          <div>
            <Configurator/>
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
