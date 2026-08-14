import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import Sidebar from '../components/Sidebar';
import './dashboard.css';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || { fullName: 'Shaik Kulsum' };

  // Fetch all tasks for the user when the component loads
  useEffect(() => {
    API.get('/tasks')
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => console.error('Error fetching tasks:', err));
  }, []);

  // Compute metrics securely by treating both 'Pending' and 'To Do' under the To-Do / Pending umbrella
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
  const toDoTasks = tasks.filter((t) => t.status === 'Pending' || t.status === 'To Do').length;

  return (
    <div className="dash-container">
      <Sidebar />

      <main className="dash-main">
        <header className="dash-header">
          <div className="dash-header-left">
            <h1 className="dash-title">Welcome back, {user.fullName ? user.fullName.split(' ')[0] : 'Shaik'} 👋</h1>
            <p className="dash-subtitle">Here's what's happening with your tasks today.</p>
          </div>
          <div className="dash-header-right">
            <button 
              onClick={() => navigate('/add-task')} 
              style={{ background: '#ff5c5c', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: '600', cursor: 'pointer' }}
            >
              + Create Task
            </button>
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

        {/* Metrics Overview Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Total Tasks</span>
            <h2 style={{ fontSize: '32px', fontWeight: '700', marginTop: '8px', color: '#0f172a' }}>{totalTasks}</h2>
          </div>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <span style={{ color: '#10b981', fontSize: '14px', fontWeight: '600' }}>Completed</span>
            <h2 style={{ fontSize: '32px', fontWeight: '700', marginTop: '8px', color: '#0f172a' }}>{completedTasks}</h2>
          </div>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <span style={{ color: '#3b82f6', fontSize: '14px', fontWeight: '600' }}>In Progress</span>
            <h2 style={{ fontSize: '32px', fontWeight: '700', marginTop: '8px', color: '#0f172a' }}>{inProgressTasks}</h2>
          </div>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <span style={{ color: '#d97706', fontSize: '14px', fontWeight: '600' }}>To Do / Pending</span>
            <h2 style={{ fontSize: '32px', fontWeight: '700', marginTop: '8px', color: '#0f172a' }}>{toDoTasks}</h2>
          </div>
        </div>

        {/* Task List Section */}
        <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: '#0f172a' }}>My Tasks</h2>
          
          {tasks.length === 0 ? (
            <p style={{ color: '#64748b', textAlign: 'center', padding: '40px 0' }}>No tasks found. Create your first task!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {tasks.map((task) => (
                <div 
                  key={task._id || task.id} 
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                >
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', marginBottom: '4px' }}>{task.title}</h3>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>{task.description || 'No description provided.'}</p>
                  </div>
                  <div>
                    <span style={{ 
                      padding: '6px 12px', 
                      borderRadius: '8px', 
                      fontSize: '12px', 
                      fontWeight: '600',
                      background: task.status === 'Completed' ? '#d1fae5' : task.status === 'In Progress' ? '#dbeafe' : '#fef3c7',
                      color: task.status === 'Completed' ? '#065f46' : task.status === 'In Progress' ? '#1e40af' : '#b45309'
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
