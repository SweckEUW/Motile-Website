import './App.css';
import BabylonView from './components/BabylonView/BabylonView';
import Panel from './components/Panel/Panel';
import Login from './components/Login/Login';
import BlenderRendering from './components/BlenderRendering/BlenderRendering';
import Navbar from './components/Navbar/Navbar';
import Head from './components/Home/Head';

function App() {
  return (
    <div className="App">
      <Login/>
      <BlenderRendering/>
      <Panel/>
      <BabylonView/>
    {/* <Navbar/>
    <Head/> */}
    </div>
  );
}

export default App;
