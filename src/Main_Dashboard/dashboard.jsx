import React from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';

function Main_Dashboard() {
  const navigate = useNavigate();

  const opensignup = () => navigate("/opensignuppage");
  const openlog = () => navigate("/openloginpg");

  return (
    <div className="main-container fade-in">
      <div className="navbar">
        <p className='logo'>G2C</p>
        <div className="spacer"></div>
        <button className="btn" onClick={opensignup}>
          <FaUserPlus className="icon" /> Signup
        </button>
        <button className="btn" onClick={openlog}>
          <FaSignInAlt className="icon" /> Login
        </button>
      </div>

      <div className="hero">
        <div className="hero-text">
          <h1>From Farm to Your Home</h1>
          <p className='subtitle'>
            Delivering 100% authentic dairy, fruits & oils — directly from local growers to health-conscious consumers.
          </p>
        </div>

        <div className="hero-image">
          <img src="pics/dairy-products.png" alt="Farm fresh" />
        </div>
      </div>
    </div>
  );
}

export default Main_Dashboard;
