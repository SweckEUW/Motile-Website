import './App.css';
import BabylonView from './components/BabylonView/BabylonView';
import Panel from './components/Panel/Panel';
// import Login from './components/Login/Login';
// import BlenderRendering from './components/BlenderRendering/BlenderRendering';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      {/* <Login/> */}
      {/* <BlenderRendering/> */}
      <Panel/>
      <BabylonView/>
    </div>
  );
}

export default App;
