import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff9f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ background: '#ffffff', padding: '40px', borderRadius: '24px', border: '1px solid #f2e4dc', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', width: '100%', maxWidth: '420px', boxSizing: 'border-box' }}>
        
        {/* Aura Branding Logo Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: '800', fontSize: '18px', boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)' }}>
            A
          </div>
          <span style={{ fontSize: '22px', fontWeight: '800', color: '#1a202c', letterSpacing: '-0.5px' }}>
            Aura<span style={{ color: '#ff6b6b' }}>.</span>
          </span>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#1a202c', margin: '0 0 6px 0' }}>Welcome Back 👋</h1>
          <p style={{ color: '#718096', fontSize: '14px', margin: 0 }}>Log in to manage your tasks seamlessly.</p>
        </div>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 16px', borderRadius: '12px', fontSize: '13px', marginBottom: '20px', fontWeight: '600', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a5568', marginBottom: '6px' }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              style={{ width: '100%', background: '#f7fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '14px', fontSize: '14px', color: '#2d3748', outline: 'none', boxSizing: 'border-box' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a5568', marginBottom: '6px' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{ width: '100%', background: '#f7fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '14px', fontSize: '14px', color: '#2d3748', outline: 'none', boxSizing: 'border-box' }} 
            />
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '13px', color: '#ff6b6b', fontWeight: '600', cursor: 'pointer' }}>Forgot Password?</span>
          </div>

          <button 
            type="submit" 
            style={{ background: '#ff6b6b', color: '#fff', border: 'none', padding: '14px', borderRadius: '14px', fontWeight: '700', fontSize: '15px', cursor: 'pointer', boxShadow: '0 6px 15px rgba(255, 107, 107, 0.3)', width: '100%', marginTop: '4px' }}
          >
            Log In
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '13px', color: '#718096', marginTop: '28px' }}>
          Don't have an account? <Link to="/register" style={{ color: '#ff6b6b', fontWeight: '700', textDecoration: 'none' }}>Sign Up here</Link>
        </div>

      </div>
    </div>
  );
}