import React from "react";
import "./App.css";
import Admin from "./components/Admin";
import Navbar from "./components/Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./hoc/Layout";
import Home from "./components/Home";
import Manufacturer from "./components/Manufacturer";
import CheckDrug from "./components/CheckDrug";
import Sell from "./components/Sell";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          
          <Route path="/sell" element={<Sell />} />
          
          <Route path="/manufacturer" element={<Manufacturer />} />
          <Route path="/checkDrug" element={<CheckDrug />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;