import './App.css';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Login from './components/Login/Login';
import Loadingscreen from './components/Loadingscreen/Loadingscreen';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Configurator from './components/Configurator/Configurator';
import Configurations from './components/Profile/Configurations/Configurations';
import Settings from './components/Profile/Settings/Settings';
import Orders from './components/Profile/Orders/Orders';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Checkout from './components/Checkout/Checkout';
import BuyConfirmation from './components/Checkout/BuyConfirmation/BuyConfirmation';
import Kontakt from './components/Footer/FooterPages/Kontakt';
import Datenschutz from './components/Footer/FooterPages/Datenschutz';
import Nutzungsbedingungen from './components/Footer/FooterPages/Nutzungsbedingungen';
import Impressum from './components/Footer/FooterPages/Impressum';
import React from 'react';
import history from './services/RouterHistory';

const App = () => {

  let path = localStorage.getItem('path');
  if(path){
    localStorage.removeItem('path');
    console.log(path);
    history.push({pathname: path});
  }

  return (
    <Router basename={'/Motile-Website'} history={history}>
      <Loadingscreen/>
      <Navbar/>
      <Login/>
      
      <Switch>
        {/* Home */}
        <Route exact path="/" render={() => (
          <div className='pagewrapper'>
            <Home/>
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

          {/* Kontakt */}
        <Route exact path="/Kontakt" render={() => (
          <div className='pagewrapper'>
            <Navbar/>
            <Kontakt/>
            <Footer/>
          </div>
        )}/>

        {/* Datenschutz */}
        <Route exact path="/Datenschutz" render={() => (
          <div className='pagewrapper'>
            <Navbar/>
            <Datenschutz/>
            <Footer/>
          </div>
        )}/>

        {/* Nutzungsbedingungen */}
        <Route exact path="/Nutzungsbedingungen" render={() => (
          <div className='pagewrapper'>
            <Navbar/>
            <Nutzungsbedingungen/>
            <Footer/>
          </div>
        )}/>

        {/* Impressum */}
        <Route exact path="/Impressum" render={() => (
          <div className='pagewrapper'>
            <Navbar/>
            <Impressum/>
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
