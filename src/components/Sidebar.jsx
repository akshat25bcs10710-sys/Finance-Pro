import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiPieChart, FiList, FiPlusSquare, FiTarget, FiActivity } from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = () => {
  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <FiPieChart /> },
    { path: '/transactions', name: 'Transactions', icon: <FiList /> },
    { path: '/transactions/new', name: 'Add Transaction', icon: <FiPlusSquare /> },
    { path: '/budget', name: 'Budget', icon: <FiTarget /> },
    { path: '/analytics', name: 'Analytics', icon: <FiActivity /> },
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <h2 className="text-gradient">FinancePro</h2>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
