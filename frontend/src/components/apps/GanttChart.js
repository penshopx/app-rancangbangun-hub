import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart3, Plus, Calendar, User, TrendingUp } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const GanttChart = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    task_name: '',
    start_date: '',
    end_date: '',
    assignee: '',
    priority: 'medium',
    status: 'not_started',
    progress: 0
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API}/gantt/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/gantt/tasks`, formData);
      setShowModal(false);
      setFormData({
        task_name: '',
        start_date: '',
        end_date: '',
        assignee: '',
        priority: 'medium',
        status: 'not_started',
        progress: 0
      });
      fetchTasks();
      alert('✅ Task berhasil ditambahkan!');
    } catch (error) {
      console.error('Error creating task:', error);
      alert('❌ Gagal membuat task');
    }
  };

  const updateProgress = async (taskId, newProgress) => {
    try {
      await axios.patch(`${API}/gantt/tasks/${taskId}`, {
        progress: parseFloat(newProgress),
        status: newProgress >= 100 ? 'completed' : newProgress > 0 ? 'in_progress' : 'not_started'
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const deleteTask = async (taskId) => {
    if (window.confirm('Hapus task ini?')) {
      try {
        await axios.delete(`${API}/gantt/tasks/${taskId}`);
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Gantt Chart</h1>
            <p className="text-slate-600">Timeline & Scheduling Proyek</p>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
          data-testid="gantt-add-task-button"
        >
          <Plus className="w-5 h-5" />
          Tambah Task
        </button>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">Belum Ada Task</h3>
          <p className="text-slate-500 mb-4">Mulai tambahkan task untuk tracking project timeline</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600"
          >
            Tambah Task Pertama
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              data-testid="gantt-task-card"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{task.task_name}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getPriorityColor(task.priority)}`}>
                      {task.priority.toUpperCase()}
                    </span>
                    <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full font-semibold">
                      {task.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-semibold"
                >
                  Hapus
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span>Mulai: {task.start_date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span>Selesai: {task.end_date}</span>
                </div>
                {task.assignee && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <User className="w-4 h-4" />
                    <span>{task.assignee}</span>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-slate-700">Progress</span>
                  <span className="text-sm font-bold text-orange-600">{task.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${getStatusColor(task.status)}`}
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>

              {/* Progress Slider */}
              <input
                type="range"
                min="0"
                max="100"
                value={task.progress}
                onChange={(e) => updateProgress(task.id, e.target.value)}
                className="w-full mt-2"
                data-testid="gantt-progress-slider"
              />
            </div>
          ))}
        </div>
      )}

      {/* Add Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Tambah Task Baru</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Task</label>
                  <input
                    type="text"
                    required
                    value={formData.task_name}
                    onChange={(e) => setFormData({...formData, task_name: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Contoh: Pengecoran Pondasi"
                    data-testid="gantt-task-name-input"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Tanggal Mulai</label>
                    <input
                      type="date"
                      required
                      value={formData.start_date}
                      onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      data-testid="gantt-start-date-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Tanggal Selesai</label>
                    <input
                      type="date"
                      required
                      value={formData.end_date}
                      onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      data-testid="gantt-end-date-input"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Assignee (Opsional)</label>
                  <input
                    type="text"
                    value={formData.assignee}
                    onChange={(e) => setFormData({...formData, assignee: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Nama penanggung jawab"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Prioritas</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg font-semibold hover:bg-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600"
                  data-testid="gantt-submit-button"
                >
                  Tambah Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GanttChart;
