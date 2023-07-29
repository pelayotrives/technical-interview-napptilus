import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../styles/pages/App.css";
import Header from '../components/Header.jsx'
import Home from "./home";
import Test from "./test";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Test" element={<Test />} />
      </Routes>
    </Router>
  );
}
