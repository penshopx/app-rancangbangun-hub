import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, Plus, Cloud, Users, TrendingUp, Calendar } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SiteControl = () => {
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    report_date: new Date().toISOString().split('T')[0],
    weather: 'cerah',
    progress_percentage: 0,
    workers_count: 0,
    notes: '',
    photos: []
  });

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${API}/site-reports/`);
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/site-reports/`, formData);
      setShowModal(false);
      setFormData({
        report_date: new Date().toISOString().split('T')[0],
        weather: 'cerah',
        progress_percentage: 0,
        workers_count: 0,
        notes: '',
        photos: []
      });
      fetchReports();
      alert('✅ Laporan harian berhasil dibuat!');
    } catch (error) {
      console.error('Error creating report:', error);
      alert('❌ Gagal membuat laporan');
    }
  };

  const getWeatherEmoji = (weather) => {
    switch(weather.toLowerCase()) {
      case 'cerah': return '☀️';
      case 'berawan': return '⛅';
      case 'hujan': return '🌧️';
      case 'mendung': return '☁️';
      default: return '🌤️';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Site Control</h1>
            <p className="text-slate-600">Laporan Harian dari Lapangan</p>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
          data-testid="site-control-add-button"
        >
          <Plus className="w-5 h-5" />
          Lapor Harian
        </button>
      </div>

      {/* Reports List */}
      {reports.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">Belum Ada Laporan</h3>
          <p className="text-slate-500 mb-4">Mulai buat laporan harian dari lapangan</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600"
          >
            Buat Laporan Pertama
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              data-testid="site-report-card"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">
                    {new Date(report.report_date).toLocaleDateString('id-ID', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Cloud className="w-4 h-4" />
                    <span>{getWeatherEmoji(report.weather)} {report.weather}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>Progress</span>
                  </div>
                  <span className="text-lg font-bold text-orange-600">{report.progress_percentage}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Users className="w-4 h-4" />
                    <span>Pekerja</span>
                  </div>
                  <span className="font-semibold text-slate-800">{report.workers_count} orang</span>
                </div>

                {report.notes && (
                  <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-700">{report.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Report Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Laporan Harian Baru</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tanggal</label>
                  <input
                    type="date"
                    required
                    value={formData.report_date}
                    onChange={(e) => setFormData({...formData, report_date: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    data-testid="site-date-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Cuaca</label>
                  <select
                    value={formData.weather}
                    onChange={(e) => setFormData({...formData, weather: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    data-testid="site-weather-select"
                  >
                    <option value="cerah">☀️ Cerah</option>
                    <option value="berawan">⛅ Berawan</option>
                    <option value="mendung">☁️ Mendung</option>
                    <option value="hujan">🌧️ Hujan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Progress (%): {formData.progress_percentage}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.progress_percentage}
                    onChange={(e) => setFormData({...formData, progress_percentage: parseFloat(e.target.value)})}
                    className="w-full"
                    data-testid="site-progress-slider"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Jumlah Pekerja</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.workers_count}
                    onChange={(e) => setFormData({...formData, workers_count: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Masukkan jumlah pekerja"
                    data-testid="site-workers-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Catatan</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows="4"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Observasi, kendala, atau hal penting hari ini..."
                    data-testid="site-notes-textarea"
                  />
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
                  data-testid="site-submit-button"
                >
                  Simpan Laporan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteControl;
