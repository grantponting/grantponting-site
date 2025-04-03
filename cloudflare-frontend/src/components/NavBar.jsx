import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-link">
                Home
            </Link>
            <Link to="/Login" className="navbar-link">
                Login
            </Link>
            {/* 
            NEED TO IMPLEMENT ACCESS TOKEN
            <Link to="/" className="navbar-link">
                User Profile
            </Link> */}
        </nav>
    );
};

export default NavBar;
