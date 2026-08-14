import { useState, useEffect } from 'react';
import API from '../services/api';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  useEffect(() => {
    API.get('/tasks')
      .then((res) => {
        // Ensure we always store an array
        setTasks(Array.isArray(res.data) ? res.data : res.data.tasks || []);
      })
      .catch((err) => {
        console.error('Error fetching tasks:', err);
        const localTasks = JSON.parse(localStorage.getItem('local_tasks')) || [];
        setTasks(localTasks);
      });
  }, []);

  // Safe filtering with guards against undefined values
  const filteredTasks = (Array.isArray(tasks) ? tasks : []).filter((t) => {
    const searchTerm = (search || '').toLowerCase();
    const title = (t?.title || '').toLowerCase();
    const description = (t?.description || '').toLowerCase();

    const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);

    // Flexible status matching: Group 'To Do' and 'Pending' together
    let matchesStatus = true;
    if (statusFilter && statusFilter !== 'All Status') {
      if (statusFilter === 'Pending') {
        matchesStatus = t?.status === 'Pending' || t?.status === 'To Do';
      } else {
        matchesStatus = t?.status === statusFilter;
      }
    }

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: '32px', background: '#f8fafc', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', marginBottom: '24px' }}>Tasks Management</h1>
      
      {/* Search and Filter Controls */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <input 
          type="text" 
          placeholder="Search tasks..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', flex: 1, fontSize: '14px' }}
        />
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff' }}
        >
          <option value="All Status">All Status</option>
          <option value="Pending">Pending / To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Task Grid / List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredTasks.length === 0 ? (
          <p style={{ color: '#64748b', textAlign: 'center', padding: '40px' }}>No matching tasks found.</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task._id || task.id} style={{ background: '#fff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#0f172a' }}>{task.title}</h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>{task.description}</p>
              </div>
              <span style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', background: '#e2e8f0', color: '#334155' }}>
                {task.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
