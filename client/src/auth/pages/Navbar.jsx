import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';
import { useAuth } from '../hooks/useAuth';
import { InterviewContext } from '../../interview/interview.context'
import { useContext } from 'react';

const Navbar = () => {
    const {user, handleLogout, loading} = useAuth()
    const context = useContext(InterviewContext)
    const {resetReports} = context
    const handleLogoutBtn = async() =>{
        try{

            const response = await handleLogout()
            resetReports()
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