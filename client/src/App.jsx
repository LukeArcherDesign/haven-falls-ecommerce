import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";

import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";

import Cart from "./pages/Cart";
import Campfire from "./pages/Campfire";
import ProductDetail from "./pages/ProductDetail";

const App = () => {
  const [kitItems, setKitItems] = useState(() => {
    const saved = localStorage.getItem("havenFallsKit");
    return saved ? JSON.parse(saved) : [];
  });

  const [campfireList, setCampfireList] = useState(() => {
    const saved = localStorage.getItem("havenFallsCampfire");
    return saved ? JSON.parse(saved) : [];
  });

  const [addedProduct, setAddedProduct] = useState(null);
  const toastTimer = useRef(null);
  const [toastKey, setToastKey] = useState(0);

  // ---------------------------- JWT AUTO-LOGOUT SECURITY ----------------------------
  useEffect(() => {
    const token = localStorage.getItem("havenToken");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = payload.exp * 1000;
      const timeRemaining = expirationTime - Date.now();

      const enforceLogout = () => {
        localStorage.removeItem("havenToken");
        localStorage.removeItem("havenFallsCampfire");
        localStorage.removeItem("havenFallsKit");
        window.location.href = "/login?session=expired";
      };

      if (timeRemaining <= 0) {
        enforceLogout();
      } else {
        const securityTimer = setTimeout(enforceLogout, timeRemaining);
        return () => clearTimeout(securityTimer);
      }
    } catch (error) {
      console.error("Security vault error: Invalid token structure.");
      localStorage.removeItem("havenToken");
    }
  }, []);

  // Sync Kit items with localStorage
  useEffect(() => {
    localStorage.setItem("havenFallsKit", JSON.stringify(kitItems));
  }, [kitItems]);

  // Sync Campfire items with localStorage
  useEffect(() => {
    localStorage.setItem("havenFallsCampfire", JSON.stringify(campfireList));
  }, [campfireList]);

  // Sync Campfire with Database
  useEffect(() => {
    const token = localStorage.getItem("havenToken");

    if (token) {
      const syncCampfire = async () => {
        try {
          const response = await fetch(
            "http://localhost:5001/api/auth/campfire/sync",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ campfireList }),
            },
          );

          if (!response.ok) {
            console.error("Failed to secure campfire in the vault.");
          } else {
            console.log("Campfire securely synced to database.");
          }
        } catch (error) {
          console.error("Network error during campfire sync:", error);
        }
      };

      syncCampfire();
    }
  }, [campfireList]);

  const addToKit = (product) => {
    setKitItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });

    setAddedProduct(product);
    setToastKey(Date.now());
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    toastTimer.current = setTimeout(() => {
      setAddedProduct(null);
    }, 5000);
  };

  const updateQuantity = (id, amount) => {
    setKitItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + amount;
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      }),
    );
  };

  const removeFromKit = (id) => {
    setKitItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const toggleCampfire = (product) => {
    setCampfireList((prevList) => {
      const exists = prevList.find((item) => item.id === product.id);
      if (exists) {
        return prevList.filter((item) => item.id !== product.id);
      }
      return [...prevList, product];
    });
  };

  return (
    <Router>
      <Navbar
        kitItems={kitItems}
        campfireList={campfireList}
        closeToast={() => setAddedProduct(null)}
      />
      <Toast key={toastKey} product={addedProduct} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/shop"
          element={
            <Shop
              addToKit={addToKit}
              toggleCampfire={toggleCampfire}
              campfireList={campfireList}
            />
          }
        />
        <Route
          path="/shop/:id"
          element={
            <ProductDetail
              addToKit={addToKit}
              toggleCampfire={toggleCampfire}
              campfireList={campfireList}
            />
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/campfire"
          element={
            <Campfire
              campfireList={campfireList}
              toggleCampfire={toggleCampfire}
              addToKit={addToKit}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/account"
          element={<Account kitItems={kitItems} campfireList={campfireList} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              kitItems={kitItems}
              updateQuantity={updateQuantity}
              removeFromKit={removeFromKit}
            />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
