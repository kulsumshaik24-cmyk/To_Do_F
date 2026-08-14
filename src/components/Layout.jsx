import { Outlet, useNavigate, useLocation } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '⚡' },
    { name: 'My Tasks', path: '/tasks', icon: '🎯' },
    { name: 'Board', path: '/board', icon: '📌' },
    { name: 'Calendar', path: '/calendar', icon: '📅' },
    { name: 'Analytics', path: '/analytics', icon: '📈' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#ffeade', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Light Sidebar */}
      <aside style={{ width: '260px', background: '#ffffff', padding: '32px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '1px solid #f2e4dc', boxSizing: 'border-box' }}>
        <div>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
            <div style={{ width: '36px', height: '36px', background: '#ff6b6b', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800' }}>N</div>
            <span style={{ fontSize: '20px', fontWeight: '800', color: '#ff6b6b' }}>Nova<span style={{ color: '#ffa8a8' }}>.</span></span>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    border: 'none',
                    background: isActive ? '#ff6b6b' : 'transparent',
                    color: isActive ? '#ffffff' : '#4a5568',
                    fontWeight: isActive ? '700' : '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 6px 15px rgba(255, 107, 107, 0.3)' : 'none'
                  }}
                >
                  <span>{item.icon}</span>
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            padding: '12px 16px',
            borderRadius: '14px',
            border: 'none',
            background: '#fff5f5',
            color: '#e53e3e',
            fontWeight: '700',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          <span>🚪</span> Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '40px', boxSizing: 'border-box', overflowY: 'auto' }}>
        <Outlet />
      </main>

    </div>
  );
}