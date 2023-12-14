import './App.css';
import CustomRadarChart from "./CustomRadarChart";
import Route from "./Route";

function App() {
    const apikey = ''
  return (
    <div className="App">
      <Route apiKey={apikey} />
      <CustomRadarChart />
    </div>
  );
}

export default App;
