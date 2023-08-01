import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../styles/pages/App.css";
import Header from '../components/Header.jsx'
import Home from "home";
import ProductDetails from "./product-details";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/:product_id" element={<ProductDetails/>} />
      </Routes>
    </Router>
  );
}
