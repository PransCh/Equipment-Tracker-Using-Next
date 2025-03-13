import React, { useState } from 'react';
import './Header.css'; // Assuming you have a separate CSS file for styling

const Header = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    };

    const logout = () => {
        // Clear the authentication token (example)
        localStorage.removeItem('token');
        localStorage.removeItem('userRole')
        
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
                <input
                    type="text"
                    placeholder="Search equipment..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-bar"
                />
            </div>
            <div className="right">
                <button onClick={logout}>Log Out</button>
            </div>
        </div>
    );
};

export default Header;