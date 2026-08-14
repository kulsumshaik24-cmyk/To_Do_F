import { useState, useEffect } from 'react';
import API from '../services/api';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

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

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
                          (t.description && t.description.toLowerCase().includes(search.toLowerCase()));

    // Flexible status matching: Group 'To Do' and 'Pending' together so nothing gets hidden
    let matchesStatus = true;
    if (statusFilter !== 'All Status') {
      if (statusFilter === 'Pending') {
        matchesStatus = t.status === 'Pending' || t.status === 'To Do';
      } else {
        matchesStatus = t.status === statusFilter;
      }
    }

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="tasks-container" style={{ padding: '32px' }}>
      <h1>Tasks Management</h1>
      
      <div className="tasks-controls" style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <input 
          type="text" 
          placeholder="Search tasks..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All Status">All Status</option>
          <option value="Pending">Pending / To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="tasks-list">
        {filteredTasks.length === 0 ? (
          <p>No matching tasks found.</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task._id || task.id} className="task-item">
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>
              <span className="task-status">
                {task.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
