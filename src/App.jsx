import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BottomNavigation from "./componenets/BottomNavigation";
import { Auth } from "./Screens/Auth";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    setIsAuthenticated(!!authData); // Set to true if authData exists
  }, []);

  return (
    <Router>
      <div className="App">
        {isAuthenticated ? <BottomNavigation /> : <Auth />}
      </div>
    </Router>
  );
}

export default App;
