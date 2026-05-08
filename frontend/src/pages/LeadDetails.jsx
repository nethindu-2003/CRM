import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { leadsAPI } from '../services/api';
import { ArrowLeft, Edit2, Check, User, Mail, Phone, Briefcase, DollarSign, Calendar, MessageSquare } from 'lucide-react';

const LeadDetails = ({ user }) => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState('');
  
  // Edit mode states
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [updateError, setUpdateError] = useState('');
  const [noteError, setNoteError] = useState('');

  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        const [leadRes, notesRes] = await Promise.all([
          leadsAPI.getLeadById(id),
          leadsAPI.getNotes(id)
        ]);
        setLead(leadRes.data);
        setEditForm(leadRes.data);
        setNotes(notesRes.data);
      } catch (err) {
        console.error('Failed to fetch lead details');
      } finally {
        setLoading(false);
      }
    };
    fetchLeadData();
  }, [id]);

  const handleUpdateLead = async () => {
    try {
      await leadsAPI.updateLead(id, editForm);
      setLead(editForm);
      setIsEditing(false);
      setUpdateError('');
    } catch (err) {
      if (err.response?.data?.details) {
        const msgs = err.response.data.details.map(d => Object.values(d)[0]).join(', ');
        setUpdateError(msgs);
      } else {
        setUpdateError(err.response?.data?.error || 'Failed to update lead');
      }
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      await leadsAPI.updateStatus(id, newStatus);
      setLead({ ...lead, status: newStatus });
      setEditForm({ ...editForm, status: newStatus });
    } catch (err) {
      console.error('Failed to update status');
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    try {
      const response = await leadsAPI.createNote(id, newNote);
      const addedNote = {
        ...response.data,
        created_by_name: user?.name || 'You',
        created_at: new Date().toISOString()
      };
      setNotes([addedNote, ...notes]);
      setNewNote('');
      setNoteError('');
    } catch (err) {
      if (err.response?.data?.details) {
        const msgs = err.response.data.details.map(d => Object.values(d)[0]).join(', ');
        setNoteError(msgs);
      } else {
        setNoteError(err.response?.data?.error || 'Failed to add note');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!lead) return <div>Lead not found</div>;

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/leads" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
          <ArrowLeft size={18} /> Back to Leads
        </Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>{lead.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>{lead.company}</span>
            <select 
              className="form-control" 
              style={{ width: 'auto', padding: '0.2rem 2rem 0.2rem 0.5rem', height: '32px' }}
              value={lead.status}
              onChange={handleStatusChange}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
        </div>
        
        {isEditing && (
          <button className="btn btn-primary" onClick={handleUpdateLead}>
            <Check size={18} /> Save Changes
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Lead Information Card */}
        <div className="glass-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2>Contact Information</h2>
            {!isEditing && (
              <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>
                <Edit2 size={16} /> Edit
              </button>
            )}
          </div>
          
          {updateError && (
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '4px', marginBottom: '1rem' }}>
              {updateError}
            </div>
          )}
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Mail size={18} color="var(--text-secondary)" />
              {isEditing ? 
                <input className="form-control" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} /> 
                : <span>{lead.email || 'N/A'}</span>}
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Phone size={18} color="var(--text-secondary)" />
              {isEditing ? 
                <input className="form-control" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} /> 
                : <span>{lead.phone || 'N/A'}</span>}
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Briefcase size={18} color="var(--text-secondary)" />
              {isEditing ? 
                <input className="form-control" value={editForm.company} onChange={e => setEditForm({...editForm, company: e.target.value})} /> 
                : <span>{lead.company || 'N/A'}</span>}
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <DollarSign size={18} color="var(--text-secondary)" />
              {isEditing ? 
                <input type="number" className="form-control" value={editForm.value} onChange={e => setEditForm({...editForm, value: e.target.value})} /> 
                : <span>LKR {lead.value?.toLocaleString() || 0}</span>}
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <User size={18} color="var(--text-secondary)" />
              {isEditing ? 
                <input className="form-control" value={editForm.salesperson} onChange={e => setEditForm({...editForm, salesperson: e.target.value})} /> 
                : <span>{lead.salesperson || 'Unassigned'}</span>}
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Calendar size={18} color="var(--text-secondary)" />
              <span>Created on {new Date(lead.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquare size={20} /> Notes
          </h2>
          
          {noteError && (
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '4px', marginBottom: '1rem' }}>
              {noteError}
            </div>
          )}
          
          <form onSubmit={handleAddNote} style={{ marginBottom: '1.5rem' }}>
            <textarea 
              className="form-control" 
              placeholder="Add a new note..."
              rows="3"
              value={newNote}
              onChange={e => setNewNote(e.target.value)}
              style={{ resize: 'vertical' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button type="submit" className="btn btn-primary" disabled={!newNote.trim()}>Add Note</button>
            </div>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', flex: 1, maxHeight: '400px', paddingRight: '0.5rem' }}>
            {notes.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>No notes yet.</p>
            ) : (
              notes.map(note => (
                <div key={note.id} style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px' }}>
                  <p style={{ margin: '0 0 0.5rem 0', whiteSpace: 'pre-wrap' }}>{note.content}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <span>{note.created_by_name}</span>
                    <span>{new Date(note.created_at).toLocaleString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
