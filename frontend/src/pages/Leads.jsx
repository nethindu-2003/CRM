import React, { useState, useEffect, useRef } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, Filter, Download, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { leadsAPI } from '../services/api';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [salespersonFilter, setSalespersonFilter] = useState('');
  
  // Form Modal
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '', source: 'Website', salesperson: '', status: 'New', value: 0
  });
  const [formError, setFormError] = useState('');

  const fileInputRef = useRef(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      if (sourceFilter) params.source = sourceFilter;
      if (salespersonFilter) params.salesperson = salespersonFilter;
      
      const response = await leadsAPI.getLeads(params);
      setLeads(response.data);
    } catch (err) {
      console.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, sourceFilter, salespersonFilter]);

  // Handle Search Input Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeads();
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await leadsAPI.deleteLead(id);
        fetchLeads();
      } catch (err) {
        console.error('Failed to delete lead');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await leadsAPI.createLead(formData);
      setShowModal(false);
      setFormError('');
      fetchLeads();
    } catch (err) {
      if (err.response?.data?.details) {
        const msgs = err.response.data.details.map(d => Object.values(d)[0]).join(', ');
        setFormError(msgs);
      } else {
        console.error('Failed to create lead');
        setFormError(err.response?.data?.error || 'Failed to create lead');
      }
    }
  };

  const handleExportCSV = async () => {
    try {
      const response = await leadsAPI.exportCSV();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'leads.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Failed to export leads', err);
    }
  };

  const handleImportCSV = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const importFormData = new FormData();
    importFormData.append('file', file);

    try {
      await leadsAPI.importCSV(importFormData);
      fetchLeads(); // Refresh leads
      alert('CSV Imported Successfully!');
    } catch (err) {
      console.error('Failed to import CSV', err);
      alert('Failed to import CSV');
    }
    // reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getStatusBadge = (status) => {
    const className = `badge badge-${status?.toLowerCase().replace(' ', '')}`;
    return <span className={className}>{status}</span>;
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Leads</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="file" 
            accept=".csv" 
            style={{ display: 'none' }} 
            ref={fileInputRef} 
            onChange={handleImportCSV} 
          />
          <button className="btn btn-secondary" onClick={() => fileInputRef.current.click()}>
            <Upload size={18} /> Import CSV
          </button>
          <button className="btn btn-secondary" onClick={handleExportCSV}>
            <Download size={18} /> Export CSV
          </button>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={18} /> Add New Lead
          </button>
        </div>
      </div>

      <div className="glass-panel" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search by name, company, email..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>
          
          <select className="form-control" style={{ width: 'auto' }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>
          
          <select className="form-control" style={{ width: 'auto' }} value={sourceFilter} onChange={e => setSourceFilter(e.target.value)}>
            <option value="">All Sources</option>
            <option value="Website">Website</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Referral">Referral</option>
            <option value="Cold Email">Cold Email</option>
            <option value="Event">Event</option>
          </select>

          <input 
            type="text" 
            className="form-control" 
            style={{ width: '200px' }}
            placeholder="Filter by Salesperson" 
            value={salespersonFilter}
            onChange={(e) => setSalespersonFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Lead Name</th>
              <th>Company</th>
              <th>Source</th>
              <th>Salesperson</th>
              <th>Status</th>
              <th>Value</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" style={{ textAlign: 'center' }}>Loading...</td></tr>
            ) : leads.length === 0 ? (
              <tr><td colSpan="7" style={{ textAlign: 'center' }}>No leads found.</td></tr>
            ) : (
              leads.map(lead => (
                <tr key={lead.id}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{lead.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{lead.email}</div>
                  </td>
                  <td>{lead.company || '-'}</td>
                  <td>{lead.source || '-'}</td>
                  <td>{lead.salesperson || '-'}</td>
                  <td>{getStatusBadge(lead.status)}</td>
                  <td>LKR {lead.value?.toLocaleString() || 0}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <Link to={`/leads/${lead.id}`} className="btn btn-secondary" style={{ padding: '0.4rem 0.6rem' }} title="View/Edit Details">
                        <Eye size={16} />
                      </Link>
                      <button className="btn btn-danger" style={{ padding: '0.4rem 0.6rem' }} onClick={() => handleDelete(lead.id)} title="Delete Lead">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '2rem 0' }}>
          <div className="glass-panel fade-in" style={{ width: '100%', maxWidth: '500px', background: 'var(--bg-secondary)', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Add New Lead</h2>
            {formError && (
              <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '4px', marginBottom: '1rem' }}>
                {formError}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Name *</label>
                  <input type="text" className="form-control" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Company</label>
                  <input type="text" className="form-control" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Phone</label>
                  <input type="text" className="form-control" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} pattern="\d{10}" title="Phone number must be exactly 10 digits" />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Source</label>
                  <select className="form-control" value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})}>
                    <option value="Website">Website</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Referral">Referral</option>
                    <option value="Cold Email">Cold Email</option>
                    <option value="Event">Event</option>
                  </select>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Salesperson</label>
                  <input type="text" className="form-control" value={formData.salesperson} onChange={e => setFormData({...formData, salesperson: e.target.value})} />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Status</label>
                  <select className="form-control" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Deal Value (LKR)</label>
                  <input type="number" min="0" className="form-control" value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})} />
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
