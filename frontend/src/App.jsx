import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Router components
import Navbar from "./components/Navbar";
import Report from "./pages/Report";
import Survivors from "./pages/Survivors";
import Inventory from "./pages/Inventory";
import "./styles/index.css";
import { SurvivorProvider } from "./context/SurvivorContext";

function App() {
  return (
    <SurvivorProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Report />} />
          <Route path="/survivors" element={<Survivors />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </div>
    </SurvivorProvider>
  );
}

export default App;
