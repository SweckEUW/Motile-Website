import './App.css';
import BabylonView from './components/Configurator/BabylonView/BabylonView';
import Panel from './components/Configurator/Panel/Panel';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Home/Header/Header';
// import BlenderRendering from './components/BlenderRendering/BlenderRendering';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar/>

      {/* Home */}
      <Route exact path="/" render={() => (
        <div className="Home">
          <Header/>
        </div>
      )}/>

      {/* Konfigurator */}
      <Route exact path="/Konfigurator" render={() => (
        <div className="Configurator">
          <Login/>
          <Panel/>
          <BabylonView/>
          {/* <BlenderRendering/> */}
        </div>
      )}/>

    </Router>
  );
}

export default App;
