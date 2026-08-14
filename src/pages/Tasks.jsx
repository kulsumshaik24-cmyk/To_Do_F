import { useEffect, useState } from 'react';
import API from '../services/api';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  
  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

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

  const handleDelete = (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    API.delete(`/tasks/${taskId}`)
      .then(() => fetchTasks())
      .catch(() => {
        const localTasks = JSON.parse(localStorage.getItem('local_tasks')) || [];
        const updated = localTasks.filter(t => (t._id || t.id) !== taskId);
        localStorage.setItem('local_tasks', JSON.stringify(updated));
        setTasks(updated);
      });
  };

  const handleOpenEdit = (task) => {
    setCurrentTask(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    const taskId = currentTask._id || currentTask.id;

    API.put(`/tasks/${taskId}`, currentTask)
      .then(() => {
        setIsEditModalOpen(false);
        fetchTasks();
      })
      .catch(() => {
        const localTasks = JSON.parse(localStorage.getItem('local_tasks')) || [];
        const updated = localTasks.map(t => (t._id || t.id) === taskId ? currentTask : t);
        localStorage.setItem('local_tasks', JSON.stringify(updated));
        setTasks(updated);
        setIsEditModalOpen(false);
      });
  };

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
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1a202c', margin: '0 0 6px 0' }}>
            My Tasks 🎯
          </h1>
          <p style={{ color: '#718096', fontSize: '14px', margin: 0 }}>
            Manage, filter, and track all your active task items.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <input 
          type="text" 
          placeholder="Search tasks..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, background: '#ffffff', border: '1px solid #f2e4dc', padding: '12px 16px', borderRadius: '14px', fontSize: '14px', color: '#2d3748', outline: 'none' }}
        />
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ background: '#ffffff', border: '1px solid #f2e4dc', padding: '12px 16px', borderRadius: '14px', fontSize: '14px', color: '#2d3748', outline: 'none', cursor: 'pointer' }}
        >
          <option value="All Status">All Status</option>
          <option value="Pending">Pending / To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Tasks Table Container */}
      <div style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid #f2e4dc', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '16px 24px', borderBottom: '1px solid #edf2f7', fontSize: '12px', fontWeight: '700', color: '#a0aec0', textTransform: 'uppercase' }}>
          <div>Task Title</div>
          <div>Status</div>
          <div>Due Date</div>
          <div style={{ textAlign: 'right' }}>Actions</div>
        </div>

        {filteredTasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#a0aec0', fontSize: '14px' }}>
            No tasks found matching your criteria.
          </div>
        ) : (
          filteredTasks.map((t) => (
            <div key={t._id || t.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '18px 24px', borderBottom: '1px solid #f7fafc', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#2d3748' }}>{t.title}</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#718096' }}>{t.description || 'No description'}</p>
              </div>
              <div>
                <span style={{ fontSize: '12px', fontWeight: '700', padding: '6px 12px', borderRadius: '8px', background: t.status === 'Completed' ? '#e6f4ea' : t.status === 'In Progress' ? '#e8f0fe' : '#fff8e1', color: t.status === 'Completed' ? '#137333' : t.status === 'In Progress' ? '#1a73e8' : '#b06000' }}>
                  {t.status}
                </span>
              </div>
              <div style={{ fontSize: '14px', color: '#4a5568', fontWeight: '600' }}>
                {t.dueDate ? t.dueDate.split('T')[0] : 'No date'}
              </div>
              <div style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button 
                  onClick={() => handleOpenEdit(t)} 
                  style={{ background: 'none', border: 'none', color: '#1a73e8', fontWeight: '700', fontSize: '13px', cursor: 'pointer', padding: 0 }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(t._id || t.id)} 
                  style={{ background: 'none', border: 'none', color: '#ff6b6b', fontWeight: '700', fontSize: '13px', cursor: 'pointer', padding: 0 }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Task Modal */}
      {isEditModalOpen && currentTask && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', width: '100%', maxWidth: '450px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', boxSizing: 'border-box' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1a202c', marginTop: 0, marginBottom: '20px' }}>Edit Task</h2>
            
            <form onSubmit={handleUpdateTask} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a5568', marginBottom: '6px' }}>Task Title</label>
                <input 
                  type="text" 
                  value={currentTask.title} 
                  onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })} 
                  required 
                  style={{ width: '100%', background: '#f7fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '14px', fontSize: '14px', color: '#2d3748', outline: 'none', boxSizing: 'border-box' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a5568', marginBottom: '6px' }}>Description</label>
                <textarea 
                  value={currentTask.description || ''} 
                  onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })} 
                  style={{ width: '100%', background: '#f7fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '14px', fontSize: '14px', color: '#2d3748', outline: 'none', boxSizing: 'border-box', minHeight: '80px', resize: 'vertical' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a5568', marginBottom: '6px' }}>Status</label>
                  <select 
                    value={currentTask.status} 
                    onChange={(e) => setCurrentTask({ ...currentTask, status: e.target.value })}
                    style={{ width: '100%', background: '#f7fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '14px', fontSize: '14px', color: '#2d3748', outline: 'none', boxSizing: 'border-box' }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a5568', marginBottom: '6px' }}>Due Date</label>
                  <input 
                    type="date" 
                    value={currentTask.dueDate ? currentTask.dueDate.split('T')[0] : ''} 
                    onChange={(e) => setCurrentTask({ ...currentTask, dueDate: e.target.value })} 
                    style={{ width: '100%', background: '#f7fafc', border: '1px solid #e2e8f0', padding: '11px 16px', borderRadius: '14px', fontSize: '14px', color: '#2d3748', outline: 'none', boxSizing: 'border-box' }} 
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)}
                  style={{ background: '#edf2f7', color: '#4a5568', border: 'none', padding: '12px 20px', borderRadius: '14px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ background: '#ff6b6b', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '14px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', boxShadow: '0 6px 15px rgba(255, 107, 107, 0.3)' }}
                >
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
