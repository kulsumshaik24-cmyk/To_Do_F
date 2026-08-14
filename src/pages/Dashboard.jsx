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
        setTasks(Array.isArray(res.data) ? res.data : res.data.tasks || []);
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
            <button className="dash-view-btn" onClick={() => navigate('/tasks')}>
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

        <div className="dash-metrics-grid">
          <div className="dash-card">
            <span>Total Tasks</span>
            <h2>{totalTasks}</h2>
          </div>
          <div className="dash-card">
            <span>Completed</span>
            <h2>{completedTasks}</h2>
          </div>
          <div className="dash-card">
            <span>In Progress</span>
            <h2>{inProgressTasks}</h2>
          </div>
          <div className="dash-card">
            <span>Pending / To Do</span>
            <h2>{toDoTasks}</h2>
          </div>
        </div>

        <div className="dash-tasks-section">
          <h2>Recent Tasks Overview</h2>
          {tasks.length === 0 ? (
            <p className="dash-empty">No tasks found. Create your first task!</p>
          ) : (
            <div className="dash-task-list">
              {tasks.map((task) => (
                <div key={task._id || task.id} className="dash-task-item">
                  <div>
                    <h3>{task.title}</h3>
                    <p>{task.description || 'No description provided.'}</p>
                  </div>
                  <span className={`dash-status-badge ${task.status === 'Completed' ? 'completed' : task.status === 'In Progress' ? 'in-progress' : 'pending'}`}>
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
