import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import Sidebar from '../components/Sidebar';
import './dashboard.css';

export default function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || { fullName: 'Shaik Kulsum' };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post('/tasks', { title, description, status, priority, dueDate })
      .then(() => navigate('/tasks'))
      .catch((err) => console.error(err));
  };

  return (
    <div className="dash-container">
      <Sidebar />

      <main className="dash-main">
        <header className="dash-header">
          <div className="dash-header-left">
            <h1 className="dash-title">Create New Task</h1>
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

        <div style={{ padding: '32px', maxWidth: '800px' }}>
          <div style={{ background: '#0f172a', borderRadius: '20px', padding: '32px', border: '1px solid #1e293b' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase' }}>Task Title</label>
                <input
                  type="text"
                  placeholder="Enter task title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #334155', background: '#1e293b', color: '#fff', fontSize: '14px', outline: 'none' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase' }}>Description</label>
                <textarea
                  placeholder="Enter task description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #334155', background: '#1e293b', color: '#fff', fontSize: '14px', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase' }}>Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #334155', background: '#1e293b', color: '#fff', fontSize: '14px', outline: 'none', fontWeight: '600' }}
                  >
                    <option value="Pending">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase' }}>Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #334155', background: '#1e293b', color: '#fff', fontSize: '14px', outline: 'none', fontWeight: '600' }}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase' }}>Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #334155', background: '#1e293b', color: '#fff', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <button type="submit" style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>Add Task</button>
                <button type="button" onClick={() => navigate('/tasks')} style={{ background: '#334155', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}