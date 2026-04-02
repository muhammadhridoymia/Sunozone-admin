import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaStar, 
  FaCalendarWeek, 
  FaCalendarAlt, 
  FaTrophy, 
  FaUsers, 
  FaUserEdit,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { path: '/', name: 'All Stories', icon: <FaHome /> },
    { path: '/top-stories', name: 'Top Stories', icon: <FaStar /> },
    { path: '/this-week', name: 'This Week', icon: <FaCalendarWeek /> },
    { path: '/this-month', name: 'This Month', icon: <FaCalendarAlt /> },
    { path: '/years-best', name: "Year's Best", icon: <FaTrophy /> },
    { path: '/all-users', name: 'All Users', icon: <FaUsers /> },
    { path: '/writers', name: 'Writers', icon: <FaUserEdit /> },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="mobile-menu-btn" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => 
                `nav-item ${isActive ? 'active' : ''}`
              }
              onClick={() => setIsOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;