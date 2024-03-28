import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import { Component } from 'react';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import Trade from './pages/Trade';
import Inventory from './pages/Inventory';
import About from './pages/About';
import Home from './pages/Home';
import {Route, Routes} from 'react-router-dom';

function App() {
  
  return (
    <>
    <Navbar />
    
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Trade" element={<Trade />} />
        <Route path="/Sell" element={<Sell />} />
        <Route path="/Buy" element={<Buy />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </div>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Steam Tracker
        </p>
      </header>
    </div>
    </>
  );
}

export default App;
