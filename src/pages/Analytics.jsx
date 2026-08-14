import { useEffect, useState } from 'react';
import API from '../services/api';

export default function Analytics() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    // Attempt backend fetch first, fallback to localStorage instantly
    API.get('/tasks')
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setTasks(res.data);
        } else {
          loadFromLocalStorage();
        }
      })
      .catch(() => {
        loadFromLocalStorage();
      });
  };

  const loadFromLocalStorage = () => {
    try {
      const localTasks = JSON.parse(localStorage.getItem('local_tasks')) || [];
      setTasks(localTasks);
    } catch {
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
    // Optional: Listen to storage updates if tasks are modified in other tabs/components
    window.addEventListener('storage', fetchTasks);
    return () => window.removeEventListener('storage', fetchTasks);
  }, []);

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const inProgress = tasks.filter(t => t.status === 'In Progress').length;
  const pending = tasks.filter(t => t.status === 'Pending' || t.status === 'To Do' || !t.status).length;

  // Calculate angles for the SVG Donut Chart
  const completedPercent = total > 0 ? (completed / total) * 100 : 0;
  const inProgressPercent = total > 0 ? (inProgress / total) * 100 : 0;
  const pendingPercent = total > 0 ? (pending / total) * 100 : 0;

  const compOffset = 0;
  const progOffset = compOffset + completedPercent;
  const pendOffset = progOffset + inProgressPercent;

  return (
    <div style={{ paddingBottom: '40px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1a202c', margin: '0 0 6px 0' }}>
          Analytics & Reports 📊
        </h1>
        <p style={{ color: '#718096', fontSize: '14px', margin: 0 }}>
          Real-time metrics and performance insights for your tasks.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '24px' }}>
        
        {/* Task Breakdown Card */}
        <div style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid #f2e4dc', padding: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1a202c', marginTop: 0, marginBottom: '24px' }}>
              Task Breakdown
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #edf2f7' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Total Tasks</span>
                <span style={{ fontSize: '18px', fontWeight: '800', color: '#1a202c' }}>{total}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#f0fdf4', borderRadius: '16px', border: '1px solid #dcfce7' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#15803d' }}>Completed Tasks</span>
                <span style={{ fontSize: '18px', fontWeight: '800', color: '#15803d' }}>{completed}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#eff6ff', borderRadius: '16px', border: '1px solid #dbeafe' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#1d4ed8' }}>In Progress Tasks</span>
                <span style={{ fontSize: '18px', fontWeight: '800', color: '#1d4ed8' }}>{inProgress}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#fffbeb', borderRadius: '16px', border: '1px solid #fef3c7' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#b45309' }}>To Do / Pending</span>
                <span style={{ fontSize: '18px', fontWeight: '800', color: '#b45309' }}>{pending}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Task Overview Donut Chart Card */}
        <div style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid #f2e4dc', padding: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: '100%', textAlign: 'left' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1a202c', margin: 0 }}>
              Task Overview
            </h3>
          </div>

          {/* Graphical Donut Container */}
          <div style={{ position: 'relative', width: '160px', height: '160px', margin: '15px 0' }}>
            <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              {/* Background Ring */}
              <path
                className="circle-bg"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#edf2f7"
                strokeWidth="3.8"
              />
              {/* Completed Segment */}
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#22c55e"
                strokeWidth="3.8"
                strokeDasharray={`${completedPercent}, 100`}
                strokeDashoffset={-compOffset}
              />
              {/* In Progress Segment */}
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3.8"
                strokeDasharray={`${inProgressPercent}, 100`}
                strokeDashoffset={-progOffset}
              />
              {/* Pending Segment */}
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3.8"
                strokeDasharray={`${pendingPercent}, 100`}
                strokeDashoffset={-pendOffset}
              />
            </svg>

            {/* Inner Center Label */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '26px', fontWeight: '800', color: '#1a202c', lineHeight: 1 }}>{total}</span>
              <span style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8', marginTop: '4px', letterSpacing: '0.5px' }}>TOTAL TASKS</span>
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600', color: '#4a5568' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span> Completed
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600', color: '#4a5568' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }}></span> In Progress
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600', color: '#4a5568' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }}></span> To Do
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}