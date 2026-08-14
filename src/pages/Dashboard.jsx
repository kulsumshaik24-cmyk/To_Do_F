import { useEffect, useState } from 'react';
import API from '../services/api';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [userName, setUserName] = useState('User');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [dueDate, setDueDate] = useState('');

  // Fetch logged-in user details dynamically
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.fullName) {
        // Extract first name or use full name
        const firstName = storedUser.fullName.split(' ')[0];
        setUserName(firstName);
      }
    } catch (e) {
      setUserName('User');
    }
  }, []);

  const fetchTasks = () => {
    API.get('/tasks')
      .then((res) => setTasks(res.data))
      .catch(() => {
        const localTasks = JSON.parse(localStorage.getItem('local_tasks')) || [];
        setTasks(localTasks);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title,
      description,
      status,
      dueDate
    };

    API.post('/tasks', newTask)
      .then(() => {
        setIsModalOpen(false);
        setTitle('');
        setDescription('');
        setStatus('Pending');
        setDueDate('');
        fetchTasks();
      })
      .catch(() => {
        const localTasks = JSON.parse(localStorage.getItem('local_tasks')) || [];
        const updated = [newTask, ...localTasks];
        localStorage.setItem('local_tasks', JSON.stringify(updated));
        setTasks(updated);
        setIsModalOpen(false);
        setTitle('');
        setDescription('');
        setStatus('Pending');
        setDueDate('');
      });
  };

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const inProgress = tasks.filter(t => t.status === 'In Progress').length;
  const todo = tasks.filter(t => t.status === 'Pending' || t.status === 'To Do' || !t.status).length;

  return (
    <div style={{ position: 'relative' }}>
      
      {/* Header section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1a202c', margin: '0 0 6px 0' }}>
            Welcome back, {userName} 👋
          </h1>
          <p style={{ color: '#718096', fontSize: '14px', margin: 0 }}>
            Here's what's happening with your tasks today.
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ background: '#ff6b6b', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '16px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', boxShadow: '0 8px 20px rgba(255, 107, 107, 0.3)' }}
        >
          + Create Task
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '24px', border: '1px solid #f2e4dc', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#718096' }}>Total Tasks</span>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#1a202c', marginTop: '8px' }}>{total}</div>
        </div>

        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '24px', border: '1px solid #f2e4dc', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#137333' }}>Completed</span>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#137333', marginTop: '8px' }}>{completed}</div>
        </div>

        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '24px', border: '1px solid #f2e4dc', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#1a73e8' }}>In Progress</span>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#1a73e8', marginTop: '8px' }}>{inProgress}</div>
        </div>

        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '24px', border: '1px solid #f2e4dc', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#b06000' }}>To Do</span>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#b06000', marginTop: '8px' }}>{todo}</div>
        </div>
      </div>

      {/* Task List Section */}
      <div style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid #f2e4dc', padding: '28px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1a202c', marginTop: 0, marginBottom: '20px' }}>
          My Tasks
        </h3>

        {tasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#a0aec0', fontSize: '14px' }}>
            No tasks created yet. Click "+ Create Task" to get started!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {tasks.map(t => (
              <div key={t._id || t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', background: '#fcfcfc', border: '1px solid #edf2f7', borderRadius: '16px' }}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#2d3748', fontWeight: '700' }}>{t.title}</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#718096' }}>{t.description || 'No description provided'}</p>
                </div>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: '700', padding: '6px 14px', borderRadius: '10px', background: t.status === 'Completed' ? '#e6f4ea' : t.status === 'In Progress' ? '#e8f0fe' : '#fff8e1', color: t.status === 'Completed' ? '#137333' : t.status === 'In Progress' ? '#1a73e8' : '#b06000' }}>
                    {t.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Task Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', width: '100%', maxWidth: '450px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', boxSizing: 'border-box' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1a202c', marginTop: 0, marginBottom: '20px' }}>Create New Task</h2>
            
            <form onSubmit={handleCreateTask} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a5568', marginBottom: '6px' }}>Task Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required 
                  placeholder="e.g., Complete project documentation"
                  style={{ width: '100%', background: '#f7fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '14px', fontSize: '14px', color: '#2d3748', outline: 'none', boxSizing: 'border-box' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a5568', marginBottom: '6px' }}>Description</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Add details about your task..."
                  style={{ width: '100%', background: '#f7fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '14px', fontSize: '14px', color: '#2d3748', outline: 'none', boxSizing: 'border-box', minHeight: '80px', resize: 'vertical' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a5568', marginBottom: '6px' }}>Status</label>
                  <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                    style={{ width: '100%', background: '#f7fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '14px', fontSize: '14px', color: '#2d3748', outline: 'none', boxSizing: 'border-box', cursor: 'pointer' }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a5568', marginBottom: '6px' }}>Due Date</label>
                  <input 
                    type="date" 
                    value={dueDate} 
                    onChange={(e) => setDueDate(e.target.value)} 
                    style={{ width: '100%', background: '#f7fafc', border: '1px solid #e2e8f0', padding: '11px 16px', borderRadius: '14px', fontSize: '14px', color: '#2d3748', outline: 'none', boxSizing: 'border-box' }} 
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  style={{ background: '#edf2f7', color: '#4a5568', border: 'none', padding: '12px 20px', borderRadius: '14px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ background: '#ff6b6b', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '14px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', boxShadow: '0 6px 15px rgba(255, 107, 107, 0.3)' }}
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
