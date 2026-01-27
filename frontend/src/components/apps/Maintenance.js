import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Wrench, Plus, RefreshCw, Calendar, AlertCircle } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Maintenance = () => {
  const [schedules, setSchedules] = useState([]);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(`${API}/maintenance/`);
      setSchedules(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const seedData = async () => {
    try {
      await axios.post(`${API}/maintenance/seed-data`);
      fetchSchedules();
      alert('✅ Sample maintenance schedules loaded!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'overdue': return 'bg-red-100 text-red-700';
      case 'scheduled': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getFrequencyBadge = (frequency) => {
    const colors = {
      daily: 'bg-purple-100 text-purple-700',
      weekly: 'bg-blue-100 text-blue-700',
      monthly: 'bg-green-100 text-green-700',
      yearly: 'bg-orange-100 text-orange-700'
    };
    return colors[frequency] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
            <Wrench className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Maintenance</h1>
            <p className="text-slate-600">Preventive Maintenance Scheduler</p>
          </div>
        </div>
        <button onClick={seedData} className="bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-700 flex items-center gap-2">
          <RefreshCw className="w-5 h-5" /> Load Sample
        </button>
      </div>

      {schedules.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Wrench className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">Belum Ada Jadwal Maintenance</h3>
          <p className="text-slate-500 mb-4">Klik "Load Sample" untuk memuat data contoh</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schedules.map((schedule) => (
            <div key={schedule.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow" data-testid="maintenance-card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{schedule.equipment_name}</h3>
                  <p className="text-sm text-slate-600">{schedule.equipment_type}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(schedule.status)}`}>
                  {schedule.status === 'overdue' ? '⚠️ OVERDUE' : schedule.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Frequency</span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getFrequencyBadge(schedule.frequency)}`}>
                    {schedule.frequency.toUpperCase()}
                  </span>
                </div>
                
                {schedule.last_maintenance && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Last Maintenance</span>
                    <span className="text-sm font-semibold text-slate-800">
                      {new Date(schedule.last_maintenance).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Next Due</span>
                  <span className={`text-sm font-bold ${schedule.status === 'overdue' ? 'text-red-600' : 'text-slate-800'}`}>
                    {new Date(schedule.next_due).toLocaleDateString('id-ID')}
                  </span>
                </div>

                {schedule.assigned_to && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Assigned To</span>
                    <span className="text-sm font-semibold text-slate-800">{schedule.assigned_to}</span>
                  </div>
                )}
              </div>

              {schedule.notes && (
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-700">{schedule.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Maintenance;
