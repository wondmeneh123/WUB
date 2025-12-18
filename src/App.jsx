import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import BottomNavigation from "./componenets/BottomNavigation";
import { Auth } from "./Screens/Auth";
import Shop from "./Screens/Shop";
import Add from "./Screens/Add";
import Profile from "./Screens/Profile";
import Cart from "./Screens/Cart";
import Notifications from "./Screens/Notifications";
import ItemDetail from "./Screens/ItemDetail";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check local storage for existing session
    const authData = localStorage.getItem("auth");
    setIsAuthenticated(!!authData);
  }, []);

  return (
    <Router>
      <div className="App bg-gray-50 min-h-screen">
        {!isAuthenticated ? (
          /* Render Auth screen if user is not logged in */
          <Auth />
        ) : (
          <>
            {/* Main content area with padding for bottom nav */}
            <div className="pb-24">
              <Routes>
                {/* Redirect root path to shop */}
                <Route path="/" element={<Navigate to="/shop" />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/add" element={<Add />} />
                <Route path="/cart" element={<Cart cart={[]} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/item-detail" element={<ItemDetail />} />
                {/* Catch-all route for undefined paths */}
                <Route path="*" element={<Navigate to="/shop" />} />
              </Routes>
            </div>
            {/* Sticky bottom navigation menu */}
            <BottomNavigation />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
