import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Shop from "../pages/Shop";
import Contact from "../pages/Contact";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Account from "../pages/Account";

import Cart from "../pages/Cart";
import Campfire from "../pages/Campfire";
import ProductDetail from "../pages/ProductDetail";

const AppRoutes = ({
  kitItems,
  campfireList,
  addToKit,
  updateQuantity,
  removeFromKit,
  toggleCampfire,
}) => {
  return (
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
  );
};

export default AppRoutes;
