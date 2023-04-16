import "./style/app.scss";
import Toolbar from "./components/Toolbar";
import Settingsbar from "./components/Settingsbar";
import Canvas from "./components/Canvas";

function App() {
  return (
    <div className="app">
      <Toolbar></Toolbar>
      <Settingsbar></Settingsbar>
      <Canvas></Canvas>
    </div>
  );
}

export default App;
