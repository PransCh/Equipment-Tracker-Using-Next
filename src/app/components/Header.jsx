import React from 'react';
import './Header.css'; // Assuming you have a separate CSS file for styling

const Header = () => {
    const logout = () => {
        // Clear the authentication token (example)
        localStorage.removeItem('token');
        
        // Redirect to the login page
        window.location.href = '/';
    };

    const goHome = () => {
        window.location.href = '/Home';
    };

    return (
        <div className="header">
            <div className="left">
                <span className="app-name">Celanix</span>
            </div>
            <div className="middle">
                <button onClick={goHome}>Home</button>
            </div>
            <div className="right">
                <button onClick={logout}>Log Out</button>
            </div>
        </div>
    );
};

export default Header;