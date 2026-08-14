import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';
import Layout from '../components/Layout';

export default function EditTask() {
  const [form, setForm] = useState({ title: '', description: '', status: 'Pending', priority: 'Medium', dueDate: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/tasks')
      .then((res) => {
        const task = res.data.find((t) => t._id === id);
        if (task) {
          setForm({
            title: task.title || '',
            description: task.description || '',
            status: task.status || 'Pending',
            priority: task.priority || 'Medium',
            dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
          });
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    API.put(`/tasks/${id}`, form)
      .then(() => navigate('/tasks'))
      .catch((err) => console.error(err));
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white border border-slate-200 p-8 rounded-xl shadow-xs">
        <h1 className="text-xl font-bold text-slate-900 mb-6">Edit Task</h1>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Task Title</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-indigo-600"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Description</label>
            <textarea
              rows="4"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-indigo-600"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-sm bg-white"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-sm bg-white"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Due Date</label>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => navigate('/tasks')} className="px-4 py-2 rounded-lg text-sm border border-slate-300 text-slate-600">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg text-sm bg-indigo-600 text-white font-medium hover:bg-indigo-700">Update Task</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}