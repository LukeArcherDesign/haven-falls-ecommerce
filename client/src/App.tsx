import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import Footer from "./components/Footer";

import { useShopLogic } from "./hooks/useShopLogic";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  // Fire up custom data engine
  const {
    kitItems,
    campfireList,
    addedProduct,
    toastKey,
    addToKit,
    updateQuantity,
    removeFromKit,
    toggleCampfire,
    clearToast,
  } = useShopLogic();

  // Render core layout
  return (
    <Router>
      <Navbar
        kitItems={kitItems}
        campfireList={campfireList}
        closeToast={clearToast}
      />
      <Toast key={toastKey} product={addedProduct} />

      <AppRoutes
        kitItems={kitItems}
        campfireList={campfireList}
        addToKit={addToKit}
        updateQuantity={updateQuantity}
        removeFromKit={removeFromKit}
        toggleCampfire={toggleCampfire}
      />

      <Footer />
    </Router>
  );
};

export default App;
