import './App.css';
// import ThreeView from './Components/ThreeView/ThreeView';
import BabylonView from './Components/BabylonView/BabylonView';
import Panel from './Components/Panel/Panel';

function App() {
  return (
    <div className="App">
      {/* <ThreeView/> */}
      <BabylonView/>
      <Panel/>
    </div>
  );
}

export default App;
