import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Plus, Filter, RefreshCw, ExternalLink } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Blueprints = () => {
  const [blueprints, setBlueprints] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'architectural',
    image_url: '',
    version: '1.0',
    notes: '',
    uploaded_by: ''
  });

  const categories = ['all', 'architectural', 'structural', 'electrical', 'plumbing'];
  const categoryLabels = {
    all: 'Semua',
    architectural: 'Arsitektural',
    structural: 'Struktural',
    electrical: 'Elektrikal',
    plumbing: 'Plumbing'
  };

  const fetchBlueprints = async () => {
    try {
      const url = selectedCategory === 'all' 
        ? `${API}/blueprints/`
        : `${API}/blueprints/?category=${selectedCategory}`;
      const response = await axios.get(url);
      setBlueprints(response.data);
    } catch (error) {
      console.error('Error fetching blueprints:', error);
    }
  };

  const seedData = async () => {
    try {
      await axios.post(`${API}/blueprints/seed-data`);
      fetchBlueprints();
      alert('✅ Sample blueprints loaded!');
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  };

  useEffect(() => {
    fetchBlueprints();
  }, [selectedCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/blueprints/`, formData);
      setShowModal(false);
      setFormData({
        title: '',
        category: 'architectural',
        image_url: '',
        version: '1.0',
        notes: '',
        uploaded_by: ''
      });
      fetchBlueprints();
      alert('✅ Blueprint berhasil ditambahkan!');
    } catch (error) {
      console.error('Error creating blueprint:', error);
      alert('❌ Gagal menambahkan blueprint');
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'architectural': return 'bg-blue-100 text-blue-700';
      case 'structural': return 'bg-green-100 text-green-700';
      case 'electrical': return 'bg-yellow-100 text-yellow-700';
      case 'plumbing': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Blueprints</h1>
            <p className="text-slate-600">Gambar Kerja & Dokumen Teknis</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={seedData}
            className="bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-700 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Load Sample
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
            data-testid="blueprints-add-button"
          >
            <Plus className="w-5 h-5" />
            Upload
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-6 flex items-center gap-2">
        <Filter className="w-5 h-5 text-slate-600" />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          data-testid="blueprints-category-filter"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {categoryLabels[cat]}
            </option>
          ))}
        </select>
      </div>

      {/* Blueprints Grid */}
      {blueprints.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">Belum Ada Blueprint</h3>
          <p className="text-slate-500 mb-4">Upload gambar kerja atau klik "Load Sample" untuk contoh</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blueprints.map((bp) => (
            <div
              key={bp.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedImage(bp)}
              data-testid="blueprint-card"
            >
              <div className="h-48 bg-slate-100 overflow-hidden">
                <img 
                  src={bp.image_url} 
                  alt={bp.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=Blueprint';
                  }}
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-800">{bp.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getCategoryColor(bp.category)}`}>
                    {categoryLabels[bp.category]}
                  </span>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <p>Version: {bp.version}</p>
                  {bp.uploaded_by && <p>By: {bp.uploaded_by}</p>}
                </div>
                {bp.notes && (
                  <p className="text-sm text-slate-600 mt-2 line-clamp-2">{bp.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Blueprint Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Upload Blueprint</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Judul</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Contoh: Denah Lantai 1"
                    data-testid="blueprint-title-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    data-testid="blueprint-category-select"
                  >
                    <option value="architectural">Arsitektural</option>
                    <option value="structural">Struktural</option>
                    <option value="electrical">Elektrikal</option>
                    <option value="plumbing">Plumbing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    required
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="https://example.com/image.jpg"
                    data-testid="blueprint-url-input"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Gunakan URL gambar dari Unsplash, Imgur, atau hosting lainnya
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Version</label>
                  <input
                    type="text"
                    value={formData.version}
                    onChange={(e) => setFormData({...formData, version: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="1.0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Uploaded By</label>
                  <input
                    type="text"
                    value={formData.uploaded_by}
                    onChange={(e) => setFormData({...formData, uploaded_by: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Nama uploader"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Catatan</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows="3"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Deskripsi atau catatan tambahan..."
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
                  data-testid="blueprint-submit-button"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Viewer Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg text-slate-800">{selectedImage.title}</h3>
                  <p className="text-sm text-slate-600">Version {selectedImage.version}</p>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-slate-600 hover:text-slate-800 text-2xl"
                >
                  ×
                </button>
              </div>
              <img 
                src={selectedImage.image_url} 
                alt={selectedImage.title}
                className="w-full max-h-[70vh] object-contain bg-slate-50"
              />
              {selectedImage.notes && (
                <div className="p-4 bg-slate-50">
                  <p className="text-sm text-slate-700">{selectedImage.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blueprints;
