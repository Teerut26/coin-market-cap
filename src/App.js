import "./App.css";
import "bulma/css/bulma.css";
import Navbar from "./Components/Navbar";
import List from "./Components/List";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="m-3" class="container">
        <List />
      </div>
    </div>
  );
}

export default App;
