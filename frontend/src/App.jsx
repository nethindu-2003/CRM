import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import LeadDetails from './pages/LeadDetails';
import KanbanBoard from './pages/KanbanBoard';
import Sidebar from './components/Sidebar';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    // Firebase auth removed; authentication check bypassed.
    const mockToken = localStorage.getItem('token');
    if (mockToken) {
      setToken(mockToken);
      const savedUser = localStorage.getItem('user');
      if (savedUser) setUser(JSON.parse(savedUser));
    }
    setLoadingAuth(false);
  }, []);

  const handleLogin = (newToken, userData) => {
    // Handled by onAuthStateChanged listener, but we can set it here too for immediate UI update
    setToken(newToken);
    setUser(userData);
  };

  const handleLogout = async () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (loadingAuth) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!token ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/register" 
          element={!token ? <Register onLogin={handleLogin} /> : <Navigate to="/" />} 
        />
        
        {/* Protected Routes */}
        <Route 
          path="/*" 
          element={
            token ? (
              <div className="app-container">
                <Sidebar onLogout={handleLogout} />
                <main className="main-content fade-in">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/leads" element={<Leads />} />
                    <Route path="/board" element={<KanbanBoard />} />
                    <Route path="/leads/:id" element={<LeadDetails user={user} />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </main>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
