import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home";
import About from "../Pages/About";
import Shop from "../Pages/Shop";
import Contact from "../Pages/Contact";

import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Account from "../Pages/Account";

import Cart from "../Pages/Cart";
import Campfire from "../Pages/Campfire";
import ProductDetail from "../Pages/ProductDetail";

interface AppRoutesProps {
  kitItems: any[];
  campfireList: any[];
  addToKit: (product: any) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  removeFromKit: (id: string | number) => void;
  toggleCampfire: (product: any) => void;
}

const AppRoutes = ({
  kitItems,
  campfireList,
  addToKit,
  updateQuantity,
  removeFromKit,
  toggleCampfire,
}: AppRoutesProps) => {
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
