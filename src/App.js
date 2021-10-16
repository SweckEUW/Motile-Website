import './App.css';
import BabylonView from './components/BabylonView/BabylonView';
import Panel from './components/Panel/Panel';
import Login from './components/Login/Login';

function App() {
  return (
    <div className="App">
      <BabylonView/>
      <Panel/>
      <Login/>
    </div>
  );
}

export default App;
