import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Navbar.css';

function Navbar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout/', null, {
        headers: {
          Authorization: `Token ${auth.token}`,
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Blog Platform</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        {auth ? (
          <>
            <Link to="/my-posts" className="nav-link">My Posts</Link>
            <Link to="/create" className="nav-link">Create Post</Link>
            <span className="nav-user">Welcome, {auth.username}!</span>
            <button onClick={handleLogout} className="nav-link logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
