import { useState, useEffect } from 'react';
import API from '../services/api';

export default function Calendar() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Track currently selected year and month (0 = January, 7 = August, etc.)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1)); // August 2026 default

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await API.get('/tasks');
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load tasks for calendar');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Handle month switching
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get month name and total days in current month
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthName = monthNames[month];
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOffset = new Date(year, month, 1).getDay(); // Day of week the month starts on

  const calendarDays = [];
  // Padding for previous month blank slots
  for (let i = 0; i < startDayOffset; i++) {
    calendarDays.push({ dayNumber: null, dateString: null });
  }
  // Actual month days
  for (let i = 1; i <= daysInMonth; i++) {
    const formattedDay = i < 10 ? `0${i}` : `${i}`;
    const formattedMonth = (month + 1) < 10 ? `0${month + 1}` : `${month + 1}`;
    calendarDays.push({
      dayNumber: i,
      dateString: `${year}-${formattedMonth}-${formattedDay}`
    });
  }

  return (
    <div style={{ padding: '0 10px', maxWidth: '1400px' }}>
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1a202c', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Calendar Schedule <span style={{ fontSize: '24px' }}>📅</span>
          </h2>
          <p style={{ color: '#718096', fontSize: '14px', margin: 0 }}>
            Manage your timeline and track task deadlines from your database.
          </p>
        </div>

        {/* Month Navigation Control with Brackets */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '6px 12px', borderRadius: '12px', fontWeight: '700', color: '#2d3748', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
          <button 
            onClick={handlePrevMonth} 
            style={{ background: '#f7fafc', border: '1px solid #e2e8f0', borderRadius: '8px', width: '30px', height: '30px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4a5568' }}
            title="Previous Month"
          >
            &lt;
          </button>
          <span style={{ fontSize: '14px', minWidth: '110px', textAlign: 'center' }}>
            {currentMonthName} {year}
          </span>
          <button 
            onClick={handleNextMonth} 
            style={{ background: '#f7fafc', border: '1px solid #e2e8f0', borderRadius: '8px', width: '30px', height: '30px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4a5568' }}
            title="Next Month"
          >
            &gt;
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 16px', borderRadius: '12px', fontSize: '13px', marginBottom: '20px', fontWeight: '600' }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ color: '#718096', fontSize: '15px', fontWeight: '600', padding: '40px 0' }}>
          Loading calendar deadlines...
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontWeight: '700', color: '#a0aec0', fontSize: '12px', textTransform: 'uppercase', marginBottom: '16px' }}>
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px' }}>
            {calendarDays.map((slot, index) => {
              const dayTasks = slot.dateString 
                ? tasks.filter(t => t.dueDate && t.dueDate.slice(0, 10) === slot.dateString)
                : [];

              return (
                <div 
                  key={index} 
                  style={{ 
                    minHeight: '120px', 
                    background: slot.dayNumber ? '#f8fafc' : 'transparent', 
                    border: slot.dayNumber ? '1px solid #edf2f7' : 'none',
                    borderRadius: '16px', 
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    overflowY: 'auto'
                  }}
                >
                  {slot.dayNumber && (
                    <>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#4a5568' }}>
                        {slot.dayNumber}
                      </span>
                      
                      {dayTasks.map(task => {
                        const priority = task.priority || 'Medium';
                        const badgeBg = priority === 'High' ? '#fff5f5' : priority === 'Medium' ? '#fffaf0' : '#ebf8ff';
                        const borderColor = priority === 'High' ? '#e53e3e' : priority === 'Medium' ? '#d69e2e' : '#3182ce';
                        const textColor = priority === 'High' ? '#c53030' : priority === 'Medium' ? '#b7791f' : '#2b6cb0';

                        return (
                          <div 
                            key={task._id}
                            style={{
                              background: badgeBg,
                              borderLeft: `3px solid ${borderColor}`,
                              padding: '6px 8px',
                              borderRadius: '8px',
                              fontSize: '11px',
                              fontWeight: '700',
                              color: '#2d3748',
                              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '3px'
                            }}
                            title={`${task.title} (${priority} Priority)`}
                          >
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {task.title}
                            </span>
                            <span style={{ fontSize: '9px', fontWeight: '800', color: textColor, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                              {priority}
                            </span>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
}