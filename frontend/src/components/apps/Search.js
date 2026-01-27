import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search as SearchIcon, Filter, RefreshCw, MapPin, DollarSign, Calendar } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Search = () => {
  const [tenders, setTenders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    minBudget: '',
    maxBudget: ''
  });
  const [loading, setLoading] = useState(false);

  const categories = ['all', 'Infrastruktur', 'Bangunan', 'Pengadaan'];
  const statuses = ['all', 'open', 'closed', 'awarded'];

  const fetchTenders = async () => {
    setLoading(true);
    try {
      let url = `${API}/tenders/`;
      const params = new URLSearchParams();
      
      if (searchQuery) params.append('search', searchQuery);
      if (filters.category !== 'all') params.append('category', filters.category);
      if (filters.status !== 'all') params.append('status', filters.status);
      if (filters.minBudget) params.append('min_budget', filters.minBudget);
      if (filters.maxBudget) params.append('max_budget', filters.maxBudget);
      
      if (params.toString()) url += `?${params.toString()}`;
      
      const response = await axios.get(url);
      setTenders(response.data);
    } catch (error) {
      console.error('Error fetching tenders:', error);
    } finally {
      setLoading(false);
    }
  };

  const seedData = async () => {
    try {
      await axios.post(`${API}/tenders/seed-data`);
      fetchTenders();
      alert('✅ Sample tenders loaded!');
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  };

  useEffect(() => {
    fetchTenders();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'open': return 'bg-green-100 text-green-700';
      case 'closed': return 'bg-gray-100 text-gray-700';
      case 'awarded': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
            <SearchIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Search</h1>
            <p className="text-slate-600">Pencarian Tender & Pengadaan</p>
          </div>
        </div>
        <button
          onClick={seedData}
          className="bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-700 transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Load Sample
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari tender berdasarkan judul atau deskripsi..."
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              data-testid="search-input"
            />
          </div>
          <button
            onClick={fetchTenders}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            data-testid="search-button"
          >
            Cari
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        <select
          value={filters.category}
          onChange={(e) => setFilters({...filters, category: e.target.value})}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="all">Semua Kategori</option>
          {categories.filter(c => c !== 'all').map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) => setFilters({...filters, status: e.target.value})}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="all">Semua Status</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
          <option value="awarded">Awarded</option>
        </select>

        <input
          type="number"
          placeholder="Budget Min (Rp)"
          value={filters.minBudget}
          onChange={(e) => setFilters({...filters, minBudget: e.target.value})}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <input
          type="number"
          placeholder="Budget Max (Rp)"
          value={filters.maxBudget}
          onChange={(e) => setFilters({...filters, maxBudget: e.target.value})}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-12">
          <RefreshCw className="w-12 h-12 text-slate-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Mencari tender...</p>
        </div>
      ) : tenders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <SearchIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">Tidak Ada Tender</h3>
          <p className="text-slate-500 mb-4">Klik "Load Sample" untuk memuat data contoh</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">Ditemukan {tenders.length} tender</p>
          {tenders.map((tender) => (
            <div
              key={tender.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              data-testid="tender-card"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{tender.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-semibold">
                      {tender.category}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(tender.status)}`}>
                      {tender.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-slate-700 mb-4">{tender.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-xs text-slate-600">Budget</p>
                    <p className="font-bold text-slate-800">{formatCurrency(tender.budget)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-xs text-slate-600">Lokasi</p>
                    <p className="font-semibold text-slate-800">{tender.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-xs text-slate-600">Deadline</p>
                    <p className="font-semibold text-slate-800">
                      {new Date(tender.deadline).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-600">Owner</p>
                  <p className="font-semibold text-slate-800">{tender.owner}</p>
                </div>
              </div>

              <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                Lihat Detail
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
