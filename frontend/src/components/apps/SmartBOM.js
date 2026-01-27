import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, RefreshCw, Filter } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SmartBOM = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Semen', 'Agregat', 'Besi', 'Cat'];

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/bom/materials`);
      setMaterials(response.data);
    } catch (error) {
      console.error('Error fetching materials:', error);
    } finally {
      setLoading(false);
    }
  };

  const seedData = async () => {
    setLoading(true);
    try {
      await axios.post(`${API}/bom/seed-data`);
      await fetchMaterials();
      alert('✅ Data material berhasil di-refresh!');
    } catch (error) {
      console.error('Error seeding data:', error);
      alert('❌ Gagal refresh data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const filteredMaterials = selectedCategory === 'all'
    ? materials
    : materials.filter(m => m.category === selectedCategory);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
          <Package className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Smart BOM</h1>
          <p className="text-slate-600">Bill of Materials - Marketplace Material</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={seedData}
          disabled={loading}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2 disabled:opacity-50"
          data-testid="bom-refresh-button"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-slate-600" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            data-testid="bom-category-filter"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'Semua Kategori' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Materials Grid */}
      {loading && materials.length === 0 ? (
        <div className="text-center py-12">
          <RefreshCw className="w-12 h-12 text-slate-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Memuat data material...</p>
        </div>
      ) : filteredMaterials.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">Belum Ada Data Material</h3>
          <p className="text-slate-500 mb-4">Klik tombol "Refresh Data" untuk memuat katalog material</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMaterials.map((material) => (
            <div
              key={material.id}
              className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow border border-slate-200"
              data-testid="bom-material-card"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{material.name}</h3>
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-semibold">
                    {material.category}
                  </span>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-semibold ${
                  material.stock > 50 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  Stock: {material.stock}
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-3">{material.description}</p>

              <div className="border-t border-slate-200 pt-3 mt-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-600">Harga</span>
                  <span className="text-lg font-bold text-orange-600">
                    Rp {material.price.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-600">Satuan</span>
                  <span className="text-sm font-semibold text-slate-800">{material.unit}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Supplier</span>
                  <span className="text-xs text-slate-700 truncate max-w-[150px]">{material.supplier}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SmartBOM;
