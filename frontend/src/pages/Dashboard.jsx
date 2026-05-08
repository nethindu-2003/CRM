import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';
import { Users, DollarSign, Target, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

const DashboardCard = ({ title, value, icon: Icon, color }) => (
  <div className="glass-panel fade-in" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
    <div style={{ backgroundColor: color, padding: '1rem', borderRadius: '12px', display: 'flex' }}>
      <Icon size={24} color="white" />
    </div>
    <div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem', fontWeight: 500 }}>{title}</p>
      <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalLeads: 0, newLeads: 0, qualifiedLeads: 0, 
    wonLeads: 0, lostLeads: 0, totalValue: 0, wonValue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await dashboardAPI.getMetrics();
        setMetrics(response.data);
      } catch (err) {
        console.error('Failed to fetch dashboard metrics');
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Dashboard overview</h1>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <DashboardCard title="Total Leads" value={metrics.totalLeads} icon={Users} color="#6366f1" />
        <DashboardCard title="New Leads" value={metrics.newLeads} icon={Target} color="#3b82f6" />
        <DashboardCard title="Qualified Leads" value={metrics.qualifiedLeads} icon={TrendingUp} color="#eab308" />
        <DashboardCard title="Deals Won" value={metrics.wonLeads} icon={CheckCircle} color="#22c55e" />
        <DashboardCard title="Deals Lost" value={metrics.lostLeads} icon={XCircle} color="#ef4444" />
        <DashboardCard title="Total Pipeline Value" value={`LKR ${metrics.totalValue.toLocaleString()}`} icon={DollarSign} color="#8b5cf6" />
        <DashboardCard title="Won Deal Value" value={`LKR ${metrics.wonValue.toLocaleString()}`} icon={DollarSign} color="#10b981" />
      </div>
    </div>
  );
};

export default Dashboard;
