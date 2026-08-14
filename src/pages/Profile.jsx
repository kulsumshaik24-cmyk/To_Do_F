import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
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
    <div style={{ minHeight: '100vh', background: '#ffeade', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ width: '460px', background: '#ffffff', borderRadius: '32px', padding: '50px 48px', boxSizing: 'border-box', boxShadow: '0 20px 60px rgba(255, 150, 120, 0.15)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontWeight: '800', fontSize: '20px', color: '#ff6b6b', letterSpacing: '-0.5px', marginBottom: '16px' }}>
            Nova<span style={{ color: '#ffa8a8' }}>.</span>
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#1a202c', margin: 0 }}>Login</h2>
        </div>

        {error && (
          <div style={{ background: '#fff5f5', border: '1px solid #feb2b2', color: '#c53030', padding: '10px 14px', borderRadius: '12px', fontSize: '13px', marginBottom: '16px', textAlign: 'center', fontWeight: '500' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a5568', marginBottom: '6px' }}>Email</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <span style={{ position: 'absolute', left: '16px', fontSize: '15px', color: '#a0aec0' }}>✉️</span>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="daniel21fisher@gmail.com" 
                style={{ width: '100%', background: '#f7fafc', border: '1px solid #e2e8f0', padding: '14px 16px 14px 46px', borderRadius: '16px', fontSize: '14px', color: '#2d3748', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a5568', marginBottom: '6px' }}>Password</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', left: '14px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px', padding: 0 }}
              >
                {showPassword ? '👁️' : '🔒'}
              </button>
              <input 
                type={showPassword ? 'text' : 'password'} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********" 
                style={{ width: '100%', background: '#f7fafc', border: '1px solid #e2e8f0', padding: '14px 16px 14px 46px', borderRadius: '16px', fontSize: '14px', color: '#2d3748', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ textAlign: 'right', marginTop: '6px' }}>
              <span onClick={() => alert('Password reset link sent!')} style={{ fontSize: '12px', color: '#ff6b6b', textDecoration: 'none', fontWeight: '600', cursor: 'pointer' }}>Forgot Password?</span>
            </div>
          </div>

          <button 
            type="submit"
            style={{ width: '100%', background: '#ff6b6b', color: '#ffffff', border: 'none', padding: '15px', borderRadius: '16px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 20px rgba(255, 107, 107, 0.35)', marginTop: '4px' }}
          >
            Log In
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', color: '#cbd5e0', fontSize: '12px' }}>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
          <span style={{ padding: '0 12px', color: '#a0aec0', fontWeight: '500' }}>Or Continue With</span>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button type="button" onClick={() => alert('Google login integration pending backend setup')} style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#f7fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '15px', fontWeight: '700', color: '#4a5568' }}>G</button>
          <button type="button" onClick={() => alert('Facebook login integration pending backend setup')} style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#f7fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '15px', fontWeight: '700', color: '#4a5568' }}>f</button>
          <button type="button" onClick={() => alert('Apple login integration pending backend setup')} style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#f7fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '15px', fontWeight: '700', color: '#4a5568' }}>🌐</button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '22px', fontSize: '13px', color: '#718096' }}>
          Don't have an account? <Link to="/register" style={{ color: '#ff6b6b', fontWeight: '700', textDecoration: 'none' }}>Sign Up here</Link>
        </div>

      </div>
    </div>
  );
}