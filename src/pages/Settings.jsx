import { useState, useEffect } from 'react';
import API from '../services/api';

export default function Settings() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [savedMessage, setSavedMessage] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch profile from backend to ensure synchronization
    API.get('/auth/profile')
      .then((res) => {
        setFullName(res.data.fullName || res.data.name || '');
        setEmail(res.data.email || '');
        setRole(res.data.role || '');
      })
      .catch(() => {
        // Fallback to local storage if API call fails
        try {
          const storedUser = JSON.parse(localStorage.getItem('user'));
          if (storedUser) {
            setFullName(storedUser.fullName || storedUser.name || '');
            setEmail(storedUser.email || '');
            setRole(storedUser.role || '');
          }
        } catch (e) {
          console.error('Failed to load user settings', e);
        }
      });
  }, []);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Sends PUT request to backend using your existing axios API instance
      const response = await API.put('/auth/profile', {
        fullName,
        email,
        role,
      });

      // Update local storage with the fresh database response
      const updatedUser = response.data;
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setSavedMessage(true);
      setTimeout(() => setSavedMessage(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save changes');
    }
  };

  return (
    <div style={{ padding: '0 10px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1a202c', margin: '0 0 6px 0' }}>
          Settings ⚙️
        </h2>
        <p style={{ color: '#718096', fontSize: '14px', margin: 0 }}>
          Manage your profile preferences and account credentials.
        </p>
      </div>

      {savedMessage && (
        <div style={{ background: '#e6f4ea', border: '1px solid #ceead6', color: '#137333', padding: '12px 16px', borderRadius: '12px', fontSize: '13px', marginBottom: '20px', fontWeight: '600', maxWidth: '680px' }}>
          Changes saved successfully to database!
        </div>
      )}

      {error && (
        <div style={{ background: '#fce8e6', border: '1px solid #fad2cf', color: '#c5221f', padding: '12px 16px', borderRadius: '12px', fontSize: '13px', marginBottom: '20px', fontWeight: '600', maxWidth: '680px' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* Profile Information Card */}
        <div style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #f2e4dc', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1a202c', marginTop: 0, marginBottom: '24px' }}>
            Profile Information
          </h3>

          <form onSubmit={handleSaveChanges} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#4a5568', marginBottom: '8px' }}>
                Full Name
              </label>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ width: '100%', background: '#f7fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '14px', fontSize: '14px', color: '#2d3748', outline: 'none', boxSizing: 'border-box' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#4a5568', marginBottom: '8px' }}>
                Email Address
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', background: '#f7fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '14px', fontSize: '14px', color: '#2d3748', outline: 'none', boxSizing: 'border-box' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#4a5568', marginBottom: '8px' }}>
                Role / Title
              </label>
              <input 
                type="text" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. UI/UX Designer"
                style={{ width: '100%', background: '#f7fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '14px', fontSize: '14px', color: '#2d3748', outline: 'none', boxSizing: 'border-box' }} 
              />
            </div>

            <div style={{ marginTop: '8px' }}>
              <button 
                type="submit"
                style={{ background: '#ff6b6b', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '14px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', boxShadow: '0 6px 15px rgba(255, 107, 107, 0.3)' }}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Workspace Card */}
        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '24px', border: '1px solid #f2e4dc', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1a202c', marginTop: 0, marginBottom: '16px' }}>
            Workspace
          </h3>
          <div style={{ fontSize: '13px', color: '#4a5568', marginBottom: '12px' }}>
            Current environment: <span style={{ color: '#137333', fontWeight: '700' }}>Production</span>
          </div>
          <div style={{ fontSize: '13px', color: '#4a5568' }}>
            Theme: <span style={{ color: '#ff6b6b', fontWeight: '700' }}>Light Peach & Coral</span>
          </div>
        </div>

      </div>
    </div>
  );
}