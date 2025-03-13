import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useRouter } from 'next/router';
import './Sidebar.css'; // Assuming you have a separate CSS file for styling

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleViewCalendar = () => {
        router.push('/calendar');
        setIsOpen(false); // Close the sidebar after navigating
    };

    return (
        <div>
            {!isOpen && (
                <button className="burger-menu" onClick={toggleSidebar}>
                    <FaBars />
                </button>
            )}
            {isOpen && (
                <div className="sidebar">
                    <button className="close-sidebar" onClick={toggleSidebar}>X</button>
                    <button className="calendar-button" onClick={handleViewCalendar}>View Calendar</button>
                </div>
            )}
        </div>
    );
};

export default Sidebar;