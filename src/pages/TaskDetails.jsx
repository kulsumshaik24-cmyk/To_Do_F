import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';

export default function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    API.get('/tasks')
      .then((res) => {
        const found = res.data.find((t) => t._id === id);
        setTask(found);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!task) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen max-w-2xl mx-auto">
      <Link to="/tasks" className="text-blue-600 mb-4 inline-block">&larr; Back to Tasks</Link>
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
        <p className="text-gray-600 mb-4">{task.description || 'No description provided.'}</p>
        <div className="grid grid-cols-2 gap-4 border-t pt-4">
          <div>
            <p className="text-gray-500">Status</p>
            <p className="font-semibold">{task.status}</p>
          </div>
          <div>
            <p className="text-gray-500">Priority</p>
            <p className="font-semibold">{task.priority}</p>
          </div>
          <div>
            <p className="text-gray-500">Due Date</p>
            <p className="font-semibold">{new Date(task.dueDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Created On</p>
            <p className="font-semibold">{new Date(task.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}