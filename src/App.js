import './App.css';
import BabylonView from './components/BabylonView/BabylonView';
import Panel from './components/Panel/Panel';
import Login from './components/Login/Login';
import BlenderRendering from './components/BlenderRendering/BlenderRendering';


function App() {
  return (
    <div className="App">
      <Login/>
      <BlenderRendering/>
      <Panel/>
      <BabylonView/>
    </div>
  );
}

export default App;
