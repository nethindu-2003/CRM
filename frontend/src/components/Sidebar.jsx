import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, TrendingUp, Kanban } from 'lucide-react';

const Sidebar = ({ onLogout }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <TrendingUp size={28} color="#818cf8" />
        <h2>Nexus CRM</h2>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/leads" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
          <Users size={20} />
          <span>Leads</span>
        </NavLink>
        <NavLink to="/board" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Kanban size={20} />
          <span>Pipeline Board</span>
        </NavLink>
      </nav>
      <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
        <button onClick={onLogout} className="btn btn-secondary" style={{ width: '100%' }}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
