import './App.css';
// import ThreeView from './components/ThreeView/ThreeView';
import BabylonView from './components/BabylonView/BabylonView';
import Panel from './components/Panel/Panel';

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
