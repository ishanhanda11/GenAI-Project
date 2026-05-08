import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';
import { useAuth } from '../hooks/useAuth';
const Navbar = () => {
    const {user, handleLogout, loading} = useAuth()
  // Static UI - no logic for authentication state
  // This would normally come from auth context
    const handleLogoutBtn = async() =>{
        try{

            const response = await handleLogout()
            return response
        }catch(err){
            console.log(err)
        }
    }
    
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">
            Resume Builder
          </Link>
        </div>

        <div className="navbar-right">
          {user ? (
            <button onClick={handleLogoutBtn} className="navbar-button navbar-button-logout">
              Logout
            </button>
          ) : (
            <div className="navbar-auth-buttons">
              <Link to="/login" className="navbar-button navbar-button-login">
                Login
              </Link>
              <Link to="/register" className="navbar-button navbar-button-signup">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;