import { Link, useNavigate } from 'react-router-dom';
import './dashboard.css';

export default function Teams() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || { fullName: 'Shaik Kulsum', email: 'badi.kulsum06@gmail.com' };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dash-container">
      <aside className="dash-sidebar">
        <div>
          <div className="dash-logo-area">
            <div className="dash-logo-icon">TF</div>
            <span className="dash-logo-text">TaskFlow</span>
          </div>
          <nav className="dash-nav">
            <Link to="/" className="dash-nav-item">📊 Dashboard</Link>
            <Link to="/calendar" className="dash-nav-item">📅 Calendar</Link>
            <Link to="/tasks" className="dash-nav-item">📋 Task List</Link>
            <Link to="/report" className="dash-nav-item">📈 Report</Link>
            <Link to="/chat" className="dash-nav-item">💬 Chat</Link>
            <Link to="/documents" className="dash-nav-item">📁 Documents</Link>
            <Link to="/teams" className="dash-nav-item active">👥 Teams</Link>
          </nav>
        </div>
        <div className="dash-sidebar-bottom">
          <Link to="/profile" className="dash-nav-item">⚙️ Settings</Link>
          <button onClick={handleLogout} className="dash-nav-item dash-logout-btn">🚪 Logout</button>
        </div>
      </aside>

      <main className="dash-main">
        <header className="dash-header">
          <div className="dash-header-left">
            <h1 className="dash-title">Team Members</h1>
          </div>
          <div className="dash-header-right">
            <div className="dash-user-profile">
              <div className="dash-user-info">
                <span className="dash-user-name">{user.fullName}</span>
                <span className="dash-user-role">UI/UX Designer</span>
              </div>
              <div className="dash-avatar">
                {user.fullName ? user.fullName.charAt(0) : 'S'}
              </div>
            </div>
          </div>
        </header>

        <div style={{ padding: '32px' }}>
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '18px', color: '#0f172a', marginBottom: '12px' }}>Collaborators</h3>
            <p style={{ color: '#64748b', fontSize: '14px' }}>Manage project roles, assignees, and workspace members.</p>
          </div>
        </div>
      </main>
    </div>
  );
}