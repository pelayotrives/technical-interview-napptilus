import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "../styles/pages/App.css";
import Header from "../components/Header.jsx";
import Home from "./Home";
import ProductDetails from "./product-details";
import { BasketContext } from "../components/BasketContext";

export default function App() {
  const [basket, setBasket] = useState(
    localStorage.getItem("basketCount") || 0
  );

  return (
    <BasketContext.Provider value={{ basket, setBasket }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:product_id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </BasketContext.Provider>
  );
}
