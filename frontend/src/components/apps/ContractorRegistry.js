import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Shield, Award, TrendingUp, RefreshCw, Star, CheckCircle, AlertTriangle } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContractorRegistry = () => {
  const [contractors, setContractors] = useState([]);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [filters, setFilters] = useState({
    specialization: 'all',
    verifiedOnly: false,
    minRating: 0
  });

  const fetchContractors = async () => {
    try {
      let url = `${API}/contractors/`;
      const params = new URLSearchParams();
      
      if (filters.specialization !== 'all') params.append('specialization', filters.specialization);
      if (filters.verifiedOnly) params.append('verified_only', 'true');
      if (filters.minRating > 0) params.append('min_rating', filters.minRating);
      
      if (params.toString()) url += `?${params.toString()}`;
      
      const response = await axios.get(url);
      setContractors(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchReviews = async (contractorId) => {
    try {
      const response = await axios.get(`${API}/contractors/reviews/${contractorId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const seedData = async () => {
    try {
      await axios.post(`${API}/contractors/seed-data`);
      fetchContractors();
      alert('✅ Sample contractors loaded!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchContractors();
  }, [filters]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
    ));
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Contractor Registry</h1>
            <p className="text-slate-600">Database Kontraktor Terverifikasi & Akuntabel</p>
          </div>
        </div>
        <button onClick={seedData} className="bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-700 flex items-center gap-2">
          <RefreshCw className="w-5 h-5" /> Load Sample
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select value={filters.specialization} onChange={(e) => setFilters({...filters, specialization: e.target.value})} className="px-4 py-2 border border-slate-300 rounded-lg">
            <option value="all">Semua Spesialisasi</option>
            <option value="Sipil">Sipil</option>
            <option value="Arsitektur">Arsitektur</option>
            <option value="MEP">MEP</option>
            <option value="Infrastruktur">Infrastruktur</option>
          </select>

          <select value={filters.minRating} onChange={(e) => setFilters({...filters, minRating: parseFloat(e.target.value)})} className="px-4 py-2 border border-slate-300 rounded-lg">
            <option value="0">Semua Rating</option>
            <option value="4">⭐ 4+ Stars</option>
            <option value="4.5">⭐ 4.5+ Stars</option>
          </select>

          <label className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50">
            <input type="checkbox" checked={filters.verifiedOnly} onChange={(e) => setFilters({...filters, verifiedOnly: e.target.checked})} className="w-4 h-4" />
            <span className="text-sm font-semibold text-slate-700">Verified Only</span>
          </label>
        </div>
      </div>

      {/* Contractors List */}
      {contractors.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">Tidak Ada Kontraktor</h3>
          <p className="text-slate-500 mb-4">Klik "Load Sample" untuk memuat data contoh</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {contractors.map((contractor) => (
            <div key={contractor.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => { setSelectedContractor(contractor); fetchReviews(contractor.id); }} data-testid="contractor-card">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-slate-800">{contractor.company_name}</h3>
                    {contractor.is_verified && (
                      <CheckCircle className="w-5 h-5 text-green-500" title="Verified" />
                    )}
                  </div>
                  <p className="text-sm text-slate-600">LPJK: {contractor.license_number}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {contractor.specialization.map((spec, idx) => (
                      <span key={idx} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-semibold">{spec}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-600">Rating</p>
                  <div className="flex items-center gap-1">
                    {renderStars(contractor.average_rating)}
                    <span className="text-sm font-bold text-slate-800 ml-2">{contractor.average_rating}</span>
                    <span className="text-xs text-slate-500">({contractor.rating_count})</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Proyek Selesai</p>
                  <p className="text-lg font-bold text-slate-800">{contractor.completed_projects}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {contractor.has_insurance && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Insured
                  </span>
                )}
                {contractor.k3_certified && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center gap-1">
                    <Award className="w-3 h-3" /> K3
                  </span>
                )}
                {contractor.iso_certified && (
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded flex items-center gap-1">
                    <Award className="w-3 h-3" /> ISO
                  </span>
                )}
                {!contractor.is_verified && (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Unverified
                  </span>
                )}
              </div>

              <div className="text-sm text-slate-600">
                <p>📍 {contractor.address}</p>
                <p>📞 {contractor.phone}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedContractor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedContractor(null)}>
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-200">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-slate-800">{selectedContractor.company_name}</h2>
                    {selectedContractor.is_verified && <CheckCircle className="w-6 h-6 text-green-500" />}
                  </div>
                  <p className="text-slate-600">Berdiri sejak {selectedContractor.established_year}</p>
                </div>
                <button onClick={() => setSelectedContractor(null)} className="text-slate-600 hover:text-slate-800 text-3xl">×</button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-50 p-4 rounded-lg text-center">
                  <p className="text-xs text-slate-600 mb-1">Rating</p>
                  <p className="text-2xl font-bold text-orange-600">{selectedContractor.average_rating}⭐</p>
                  <p className="text-xs text-slate-500">{selectedContractor.rating_count} reviews</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg text-center">
                  <p className="text-xs text-slate-600 mb-1">Proyek Selesai</p>
                  <p className="text-2xl font-bold text-green-600">{selectedContractor.completed_projects}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg text-center">
                  <p className="text-xs text-slate-600 mb-1">Nilai Proyek</p>
                  <p className="text-lg font-bold text-blue-600">Rp {(selectedContractor.total_value_completed / 1000000000).toFixed(1)}M</p>
                </div>
              </div>

              {reviews.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-3">Reviews dari Klien</h3>
                  <div className="space-y-3">
                    {reviews.slice(0, 3).map((review) => (
                      <div key={review.id} className="bg-slate-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-slate-800">{review.reviewer_name}</p>
                            <p className="text-xs text-slate-600">{review.reviewer_company}</p>
                          </div>
                          <div className="flex">{renderStars(review.overall_rating)}</div>
                        </div>
                        <p className="text-sm text-slate-700">{review.review_text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractorRegistry;
