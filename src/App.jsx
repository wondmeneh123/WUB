// src/App.jsx
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
import Chat from "./Screens/Chat";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 1. ካርቱን እዚህ ጋር ፍጠር (ለ ItemDetail እና ለ BottomNavigation እንዲደርስ)
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    setIsAuthenticated(!!authData);
  }, []);

  // 2. እቃ ወደ ካርት የሚጨምር ፈንክሽን
  const addToCart = (itemToAdd) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === itemToAdd.id
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      } else {
        return [...prevCart, { ...itemToAdd, quantity: 1 }];
      }
    });
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated ? (
          <>
            <Routes>
              {/* 3. addToCart ፈንክሽኑን ለ ItemDetail አስተላልፍ */}
              <Route
                path="/item/:id"
                element={<ItemDetail addToCart={addToCart} />}
              />
              <Route path="/chat" element={<Chat />} />
              {/* 4. ካርቱን እና ሴተር ፈንክሽኑን ለ BottomNavigation አስተላልፍ */}
              <Route
                path="*"
                element={<BottomNavigation cart={cart} setCart={setCart} />}
              />
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
