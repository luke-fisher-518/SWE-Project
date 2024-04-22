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

function App() {
  const [userImage, setUserImage] = useState('./img/user-img.svg');
  const [apiResponse, setApiResponse] = useState("");

  const callAPI = () => {
      fetch("http://localhost:9000/testAPI")
          .then(res => res.text())
          .then(res => setApiResponse(res))
          .catch(err => console.error("Error fetching data:", err));
  };

  useEffect(() => {
      callAPI();
  }, []);  // Empty dependency array means this effect will only run once, similar to componentDidMount

  return (
    <UserContext.Provider value={{ userImage, setUserImage }}>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/user" element={<User />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <div className="App">
        <header className="App-header">
          {/* You can add header content here if needed */}
        </header>
        <p className="App-intro">{apiResponse}</p>
      </div>
    </UserContext.Provider>
  );
}

export default App;
