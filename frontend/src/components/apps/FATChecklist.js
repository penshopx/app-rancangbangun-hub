import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle2, Plus, X } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const FATChecklist = () => {
  const [checklists, setChecklists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    equipment_name: '',
    test_date: new Date().toISOString().split('T')[0],
    items: [
      { description: 'Inspeksi fisik equipment', category: 'equipment', status: 'pending', notes: '' },
      { description: 'Dokumen lengkap', category: 'documentation', status: 'pending', notes: '' },
      { description: 'Performance test', category: 'performance', status: 'pending', notes: '' }
    ]
  });

  const fetchChecklists = async () => {
    try {
      const response = await axios.get(`${API}/fat/`);
      setChecklists(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchChecklists();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/fat/`, formData);
      setShowModal(false);
      fetchChecklists();
      alert('✅ Checklist created!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateItemStatus = async (checklistId, itemId, status) => {
    try {
      await axios.patch(`${API}/fat/${checklistId}/items/${itemId}?status=${status}`);
      fetchChecklists();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pass': return 'text-green-600 bg-green-100';
      case 'fail': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Uji Serah Terima (FAT)</h1>
            <p className="text-slate-600">Factory Acceptance Test Checklist</p>
          </div>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 flex items-center gap-2" data-testid="fat-add-button">
          <Plus className="w-5 h-5" /> Buat Checklist
        </button>
      </div>

      {checklists.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <CheckCircle2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">Belum Ada Checklist</h3>
          <button onClick={() => setShowModal(true)} className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600">
            Buat Checklist Pertama
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {checklists.map((checklist) => (
            <div key={checklist.id} className="bg-white rounded-lg shadow-md p-6" data-testid="fat-checklist-card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{checklist.equipment_name}</h3>
                  <p className="text-sm text-slate-600">Test Date: {new Date(checklist.test_date).toLocaleDateString('id-ID')}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${checklist.overall_status === 'approved' ? 'bg-green-100 text-green-700' : checklist.overall_status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {checklist.overall_status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2">
                {checklist.items.map((item) => (
                  <div key={item.item_id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800">{item.description}</p>
                      <span className="text-xs text-slate-600">{item.category}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => updateItemStatus(checklist.id, item.item_id, 'pass')} className={`px-3 py-1 rounded text-xs font-semibold ${item.status === 'pass' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'}`}>
                        ✓ Pass
                      </button>
                      <button onClick={() => updateItemStatus(checklist.id, item.item_id, 'fail')} className={`px-3 py-1 rounded text-xs font-semibold ${item.status === 'fail' ? 'text-red-600 bg-red-100' : 'text-gray-600 bg-gray-100'}`}>
                        ✗ Fail
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px]">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Buat Checklist Baru</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Equipment</label>
                  <input type="text" required value={formData.equipment_name} onChange={(e) => setFormData({...formData, equipment_name: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Contoh: Generator 500KVA" data-testid="fat-equipment-input" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tanggal Test</label>
                  <input type="date" required value={formData.test_date} onChange={(e) => setFormData({...formData, test_date: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg font-semibold hover:bg-slate-300">Batal</button>
                <button type="submit" className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600" data-testid="fat-submit-button">Buat</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FATChecklist;
