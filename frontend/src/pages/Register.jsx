import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      onLogin(token, {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        name: userCredential.user.displayName || userCredential.user.email.split('@')[0]
      });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
      <div className="glass-panel fade-in" style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ background: 'linear-gradient(135deg, #a5b4fc, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Nexus CRM
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>Create a new account</p>
        </div>
        
        {error && <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input 
              id="email"
              type="email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              id="password"
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required 
              minLength="6"
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Creating account...' : <><UserPlus size={18} /> Register</>}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link to="/login" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
