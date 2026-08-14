import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '⚡' },
    { name: 'My Tasks', path: '/tasks', icon: '🎯' },
    { name: 'Board', path: '/board', icon: '📌' },
    { name: 'Calendar', path: '/calendar', icon: '📅' },
    { name: 'Analytics', path: '/analytics', icon: '📈' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
  ];

  return (
    <aside style={{ width: '260px', height: '100vh', backgroundColor: '#07090e', borderRight: '1px solid rgba(255, 255, 255, 0.06)', position: 'fixed', top: 0, left: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '28px 16px', boxSizing: 'border-box', zIndex: 100 }}>
      <div>
        {/* Logo Area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 12px 32px 12px' }}>
          <div style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: '#fff', fontSize: '18px', boxShadow: '0 6px 20px rgba(99, 102, 241, 0.5)' }}>
            N
          </div>
          <span style={{ fontSize: '20px', fontWeight: '800', color: '#fff', letterSpacing: '-0.5px' }}>Nova<span style={{ color: '#818cf8' }}>.</span></span>
        </div>

        {/* Nav Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  color: isActive ? '#fff' : '#94a3b8',
                  fontSize: '14px',
                  fontWeight: isActive ? '600' : '500',
                  textDecoration: 'none',
                  background: isActive ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))' : 'transparent',
                  border: isActive ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
                  boxShadow: isActive ? '0 4px 16px rgba(99, 102, 241, 0.15)' : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '16px' }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            color: '#f87171',
            padding: '12px 16px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(248, 113, 113, 0.1)')}
          onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}