import './App.css';
import BabylonView from './components/Configurator/BabylonView/BabylonView';
import Panel from './components/Configurator/Panel/Panel';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Home/Header/Header';
// import BlenderRendering from './components/BlenderRendering/BlenderRendering';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Configurations from './components/Profile/Configurations/Configurations';
import Settings from './components/Profile/Settings/Settings';
import Orders from './components/Profile/Orders/Orders';
import Store from './Store';

function App() {
  return (
    <Store>
      <Router>
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
              <Panel/>
              <BabylonView/>
              {/* <BlenderRendering/> */}
            </div>
          )}/>

          {/* Nutzer Konfigurationen */}
          <Route exact path="/Profil/Geräte" render={() => (
            <div>
              <Configurations/>
            </div>
          )}/>

          {/* Nutzer Bestellungen */}
          <Route exact path="/Profil/Bestellungen" render={() => (
            <div>
              <Orders/>
            </div>
          )}/>

          {/* Nutzer Konfigurationen */}
          <Route exact path="/Profil/Einstellungen" render={() => (
            <div>
              <Settings/>
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
    </Store>
    
  );
}

export default App;
