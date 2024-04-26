import './App.css';
import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';
import Navbar from './Navbar';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import Trade from './pages/Trade';
import User from './pages/User';
import About from './pages/About';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import asiimov from './pages/img/asiimov-mw.png';
import stiletto from './pages/img/stiletto-knife-vanilla.png';

function App() {
  const [userImage, setUserImage] = useState('./img/pim.jpg');
  {/*dummy data for the userContext */}
  const [userName, setUserName] = useState('John Doe');
  const [accountName, setAccountName] = useState('theRealJohn4');
  const [inventory, setInventory] = useState([{ 
    id: 1, 
    name: 'Asiimov-MW', 
    price: 50.16, 
    image: asiimov, 
    color: 'Black', 
    previousPrice: 55.00, 
    averagePrice: 52.00, 
    minPrice: 45.00, 
    maxPrice: 60.00,
    group: 'Rifle', 
    type: 'AK-47', 
    rarity: 'Covert', 
    quality: 'Factory New' 
},
{ 
    id: 2, 
    name: 'Stiletto Knife "Vanilla"', 
    price: 400.05, 
    image: stiletto, 
    color: 'Silver', 
    previousPrice: 420.00, 
    averagePrice: 410.00, 
    minPrice: 390.00, 
    maxPrice: 430.00,
    group: 'Melee', 
    type: 'Knife', 
    rarity: 'Covert', 
    quality: 'Minimal Wear' 
}]);
    const [recentActivity, setRecentActivity] = useState([]);
  return (
    <UserContext.Provider value={{ userImage, setUserImage, userName, setUserName, accountName, setAccountName, inventory, setInventory, recentActivity, setRecentActivity }}>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/sell" element={<Sell />} />
          <Route path="/buy" element={<Buy />} />


          
        </Routes>
      </div>
      <div className="App">
        <header className="App-header">
          {/* You can add header content here if needed */}
        </header>

      </div>
    </UserContext.Provider>
  );
}

export default App;
