import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await API.post('/auth/register', { fullName: name, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fdf6f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#ffffff', padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '400px', border: '1px solid #f2e4dc', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}>
        
        {/* Logo Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: '800', fontSize: '18px', boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)' }}>
            A
          </div>
          <span style={{ fontSize: '22px', fontWeight: '800', color: '#1a202c', letterSpacing: '-0.5px' }}>
            Aura<span style={{ color: '#ff6b6b' }}>.</span>
          </span>
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1a202c', margin: '0 0 6px 0' }}>Create Account</h2>
        <p style={{ color: '#718096', fontSize: '14px', margin: '0 0 24px 0' }}>Sign up to start organizing your workflow.</p>

        {error && <div style={{ background: '#fff5f5', color: '#e53e3e', padding: '10px 14px', borderRadius: '12px', fontSize: '13px', marginBottom: '16px', fontWeight: '600' }}>{error}</div>}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a5568', marginBottom: '6px' }}>Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              placeholder="Shaik"
              style={{ width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '14px', fontSize: '14px', color: '#2d3748', outline: 'none', boxSizing: 'border-box' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a5568', marginBottom: '6px' }}>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="name@example.com"
              style={{ width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '14px', fontSize: '14px', color: '#2d3748', outline: 'none', boxSizing: 'border-box' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a5568', marginBottom: '6px' }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="••••••••"
              style={{ width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '14px', fontSize: '14px', color: '#2d3748', outline: 'none', boxSizing: 'border-box' }} 
            />
          </div>

          <button 
            type="submit" 
            style={{ background: '#ff6b6b', color: '#fff', border: 'none', padding: '14px', borderRadius: '14px', fontWeight: '700', fontSize: '15px', cursor: 'pointer', boxShadow: '0 8px 20px rgba(255, 107, 107, 0.3)', marginTop: '8px' }}
          >
            Sign Up
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '14px', color: '#718096', marginTop: '20px' }}>
          Already have an account? <Link to="/login" style={{ color: '#ff6b6b', fontWeight: '700', textDecoration: 'none' }}>Sign in</Link>
        </p>

      </div>
    </div>
  );
}