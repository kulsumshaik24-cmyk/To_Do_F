import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import './Dashboard.css';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || { fullName: 'Shaik Kulsum' };

  useEffect(() => {
    API.get('/tasks')
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.error('Error fetching tasks:', err);
        const localTasks = JSON.parse(localStorage.getItem('local_tasks')) || [];
        setTasks(localTasks);
      });
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
  const toDoTasks = tasks.filter((t) => t.status === 'Pending' || t.status === 'To Do').length;

  return (
    <div className="dash-container">
      <main className="dash-main">
        
        <header className="dash-header">
          <div>
            <h1 className="dash-title">
              Welcome back, {user.fullName ? user.fullName.split(' ')[0] : 'Shaik'} 👋
            </h1>
            <p className="dash-subtitle">
              Here's what's happening with your tasks today.
            </p>
          </div>
          <div className="dash-header-right">
            <button 
              onClick={() => navigate('/tasks')} 
              style={{ background: '#ff5c5c', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 12px rgba(255,92,92,0.3)' }}
            >
              View All Tasks
            </button>
            <div className="dash-user-profile">
              <div className="dash-user-info">
                <span className="dash-user-name">{user.fullName}</span>
                <span className="dash-user-role">Developer</span>
              </div>
              <div className="dash-avatar">
                {user.fullName ? user.fullName.charAt(0) : 'S'}
              </div>
            </div>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #f2e4dc' }}>
            <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Total Tasks</span>
            <h2 style={{ fontSize: '32px', fontWeight: '700', marginTop: '8px', color: '#0f172a', margin: '8px 0 0 0' }}>{totalTasks}</h2>
          </div>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #f2e4dc' }}>
            <span style={{ color: '#137333', fontSize: '14px', fontWeight: '600' }}>Completed</span>
            <h2 style={{ fontSize: '32px', fontWeight: '700', marginTop: '8px', color: '#0f172a', margin: '8px 0 0 0' }}>{completedTasks}</h2>
          </div>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #f2e4dc' }}>
            <span style={{ color: '#1a73e8', fontSize: '14px', fontWeight: '600' }}>In Progress</span>
            <h2 style={{ fontSize: '32px', fontWeight: '700', marginTop: '8px', color: '#0f172a', margin: '8px 0 0 0' }}>{inProgressTasks}</h2>
          </div>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #f2e4dc' }}>
            <span style={{ color: '#b06000', fontSize: '14px', fontWeight: '600' }}>Pending / To Do</span>
            <h2 style={{ fontSize: '32px', fontWeight: '700', marginTop: '8px', color: '#0f172a', margin: '8px 0 0 0' }}>{toDoTasks}</h2>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #f2e4dc' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: '#0f172a' }}>Recent Tasks Overview</h2>
          
          {tasks.length === 0 ? (
            <p style={{ color: '#a0aec0', textAlign: 'center', padding: '40px 0', fontSize: '14px' }}>No tasks found. Create your first task!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {tasks.map((task) => (
                <div 
                  key={task._id || task.id} 
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#f8fafc', borderRadius: '14px', border: '1px solid #edf2f7' }}
                >
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#2d3748', marginBottom: '4px', margin: '0 0 4px 0' }}>{task.title}</h3>
                    <p style={{ fontSize: '13px', color: '#718096', margin: 0 }}>{task.description || 'No description provided.'}</p>
                  </div>
                  <div>
                    <span style={{ 
                      padding: '6px 12px', 
                      borderRadius: '8px', 
                      fontSize: '12px', 
                      fontWeight: '700',
                      background: task.status === 'Completed' ? '#e6f4ea' : task.status === 'In Progress' ? '#e8f0fe' : '#fff8e1',
                      color: task.status === 'Completed' ? '#137333' : task.status === 'In Progress' ? '#1a73e8' : '#b06000'
                    }}>
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
