import './App.css';
import React, { useState } from 'react';
import UserContext from './UserContext';
import Navbar from './Navbar';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import Trade from './pages/Trade';
import User from './pages/User';
import About from './pages/About';
import Home from './pages/Home';
import {Route, Routes} from 'react-router-dom';

function App() {
  const [userImage, setUserImage] = useState('./img/user-img.svg');
  return (
    <UserContext.Provider value={{ userImage, setUserImage }}>
    <Navbar />
    
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Trade" element={<Trade />} />
        <Route path="/Sell" element={<Sell />} />
        <Route path="/Buy" element={<Buy />} />
        <Route path="/User" element={<User />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </div>
    <div className="App">
      <header className="App-header">
      </header>
    </div>
    </UserContext.Provider>
  );
}

export default App;
