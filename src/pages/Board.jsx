import { useState, useEffect } from 'react';
import API from '../services/api';

export default function Board() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await API.get('/tasks');
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || err.message || 'Failed to load tasks from database');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Map database tasks into columns based on their status property
  const columns = [
    {
      id: 'todo',
      title: 'To Do',
      badgeColor: '#e2e8f0',
      textColor: '#4a5568',
      accentColor: '#cbd5e0',
      tasks: tasks.filter((t) => !t.status || t.status === 'To Do'),
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      badgeColor: '#feebc8',
      textColor: '#c05621',
      accentColor: '#f6ad55',
      tasks: tasks.filter((t) => t.status === 'In Progress'),
    },
    {
      id: 'completed',
      title: 'Completed',
      badgeColor: '#c6f6d5',
      textColor: '#22543d',
      accentColor: '#48bb78',
      tasks: tasks.filter((t) => t.status === 'Completed'),
    },
  ];

  return (
    <div style={{ padding: '0 10px', maxWidth: '1400px' }}>
      {/* Header section */}
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1a202c', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Kanban Board <span style={{ fontSize: '24px' }}>📌</span>
          </h2>
          <p style={{ color: '#718096', fontSize: '14px', margin: 0 }}>
            Organize, prioritize, and track cards across progress columns from your database.
          </p>
        </div>
      </div>

      {error && (
        <div style={{ background: '#fce8e6', border: '1px solid #fad2cf', color: '#c5221f', padding: '12px 16px', borderRadius: '12px', fontSize: '13px', marginBottom: '20px', fontWeight: '600' }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ color: '#718096', fontSize: '15px', fontWeight: '600', padding: '40px 0' }}>
          Loading tasks from database...
        </div>
      ) : (
        /* Kanban Board Grid */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(300px, 1fr))', gap: '24px', alignItems: 'start' }}>
          {columns.map((col) => (
            <div 
              key={col.id} 
              style={{ 
                background: '#f8fafc', 
                borderRadius: '24px', 
                border: '1px solid #edf2f7', 
                boxShadow: '0 4px 20px rgba(0,0,0,0.01)',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: 'calc(100vh - 180px)',
                overflowY: 'auto',
                padding: '16px'
              }}
            >
              {/* Column Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', padding: '0 4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: col.accentColor }}></span>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#2d3748', margin: 0 }}>
                    {col.title}
                  </h3>
                </div>
                <span style={{ background: col.badgeColor, color: col.textColor, fontSize: '12px', fontWeight: '800', padding: '3px 10px', borderRadius: '20px' }}>
                  {col.tasks.length}
                </span>
              </div>

              {/* Cards Container */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {col.tasks.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '24px', color: '#a0aec0', fontSize: '13px', fontStyle: 'italic' }}>
                    No tasks in this column
                  </div>
                ) : (
                  col.tasks.map((task) => (
                    <div 
                      key={task._id || task.id}
                      style={{ 
                        background: '#ffffff', 
                        borderRadius: '18px', 
                        padding: '20px', 
                        border: '1px solid #e2e8f0', 
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)';
                        e.currentTarget.style.borderColor = col.accentColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)';
                        e.currentTarget.style.borderColor = '#e2e8f0';
                      }}
                    >
                      {/* Priority Tag & Category info */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ 
                          fontSize: '11px', 
                          fontWeight: '700', 
                          textTransform: 'uppercase', 
                          letterSpacing: '0.5px',
                          color: task.priority === 'High' ? '#e53e3e' : task.priority === 'Medium' ? '#d69e2e' : '#3182ce',
                          background: task.priority === 'High' ? '#fff5f5' : task.priority === 'Medium' ? '#fffaf0' : '#ebf8ff',
                          padding: '2px 8px',
                          borderRadius: '6px'
                        }}>
                          {task.priority || 'Normal'} Priority
                        </span>
                      </div>

                      {/* Task Title */}
                      <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#1a202c', margin: '0 0 8px 0', lineHeight: '1.4' }}>
                        {task.title}
                      </h4>

                      {/* Task Description */}
                      <p style={{ fontSize: '13px', color: '#718096', margin: '0 0 16px 0', lineHeight: '1.5' }}>
                        {task.description}
                      </p>

                      {/* Footer / Due Date */}
                      {task.dueDate && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#a0aec0', fontWeight: '600', borderTop: '1px solid #f7fafc', paddingTop: '12px' }}>
                          <span>📅 Due: {task.dueDate.split('T')[0]}</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}