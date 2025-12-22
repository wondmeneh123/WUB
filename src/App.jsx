import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import BottomNavigation from "./componenets/BottomNavigation";
import { Auth } from "./Screens/Auth";
import ItemDetail from "./Screens/ItemDetail";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    setIsAuthenticated(!!authData);
  }, []);

  return (
    <Router>
      <div className="App">
        {isAuthenticated ? (
          <>
            <Routes>
              {/* 1. ምርት ሲነካ የሚከፈተው ገጽ (ይህ ከላይ መሆን አለበት) */}
              <Route path="/item/:id" element={<ItemDetail />} />

              {/* 2. ሌላ ማንኛውም አድራሻ ሲመጣ (Home/Shop) BottomNavigation እንዲታይ */}
              <Route path="*" element={<BottomNavigation />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/auth" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
