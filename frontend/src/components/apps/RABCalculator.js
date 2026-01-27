import React, { useState } from 'react';
import axios from 'axios';
import { Calculator, Save, FolderPlus } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const RABCalculator = () => {
  const [category, setCategory] = useState('umum');
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [showProjectModal, setShowProjectModal] = useState(false);

  // Configuration for different calculation types
  const configs = {
    umum: {
      name: 'Umum (Manual)',
      inputs: [
        { id: 'volume', label: 'Volume Manual', type: 'number', placeholder: 'Masukkan volume', unit: 'm³' }
      ],
      calculate: (data) => parseFloat(data.volume || 0)
    },
    pondasi: {
      name: 'Pondasi (Sipil)',
      inputs: [
        { id: 'panjang', label: 'Panjang Pondasi (m)', type: 'number', placeholder: '0' },
        { id: 'lebar', label: 'Lebar Pondasi (m)', type: 'number', placeholder: '0' },
        { id: 'tinggi', label: 'Tinggi Pondasi (m)', type: 'number', placeholder: '0' },
        { id: 'waste', label: 'Waste (%)', type: 'number', placeholder: '10' }
      ],
      calculate: (data) => {
        const p = parseFloat(data.panjang || 0);
        const l = parseFloat(data.lebar || 0);
        const t = parseFloat(data.tinggi || 0);
        const w = parseFloat(data.waste || 0);
        const baseVolume = p * l * t;
        return baseVolume + (baseVolume * w / 100);
      }
    },
    'jalan-aspal': {
      name: 'Jalan Aspal (Sipil)',
      inputs: [
        { id: 'lebar', label: 'Lebar Jalan (m)', type: 'number', placeholder: '0' },
        { id: 'panjang', label: 'Panjang Jalan (m)', type: 'number', placeholder: '0' },
        { id: 'tebal', label: 'Tebal Aspal (cm)', type: 'number', placeholder: '5' }
      ],
      calculate: (data) => {
        const w = parseFloat(data.lebar || 0);
        const len = parseFloat(data.panjang || 0);
        const thick = parseFloat(data.tebal || 0);
        return w * len * (thick / 100);
      }
    }
  };

  const currentConfig = configs[category];

  const handleInputChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const calculateRAB = async () => {
    const volume = currentConfig.calculate(formData);
    const pricePerUnit = parseFloat(formData.price || 0);
    const totalCost = volume * pricePerUnit;

    const inputs = currentConfig.inputs.map(inp => ({
      field_id: inp.id,
      label: inp.label,
      value: parseFloat(formData[inp.id] || 0)
    }));

    const rabData = {
      category,
      inputs,
      volume: parseFloat(volume.toFixed(3)),
      unit: 'm³',
      price_per_unit: pricePerUnit,
      total_cost: parseFloat(totalCost.toFixed(2))
    };

    try {
      const response = await axios.post(`${API}/rab/calculate`, rabData);
      setResult(response.data);
    } catch (error) {
      console.error('Error calculating RAB:', error);
      alert('Gagal menyimpan perhitungan. Silakan coba lagi.');
    }
  };

  const createProject = async () => {
    if (!projectName.trim()) {
      alert('Nama proyek harus diisi!');
      return;
    }

    if (!result) {
      alert('Hitung RAB terlebih dahulu!');
      return;
    }

    try {
      await axios.post(`${API}/rab/projects`, {
        name: projectName,
        description: `Proyek dari RAB ${currentConfig.name}`,
        rab_id: result.id
      });
      alert('✅ Proyek berhasil dibuat!');
      setShowProjectModal(false);
      setProjectName('');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Gagal membuat proyek. Silakan coba lagi.');
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">RAB Calculator</h1>
          <p className="text-slate-600">Rencana Anggaran Biaya - Perhitungan Dinamis</p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Hitung RAB Dinamis</h3>

        {/* Category Selector */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Pilih Kategori Pekerjaan
          </label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setFormData({});
              setResult(null);
            }}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            data-testid="rab-category-select"
          >
            <option value="umum">Umum (Manual)</option>
            <option value="pondasi">Pondasi (Sipil)</option>
            <option value="jalan-aspal">Jalan Aspal (Sipil)</option>
          </select>
        </div>

        {/* Dynamic Inputs */}
        <div className="space-y-4 mb-6">
          {currentConfig.inputs.map((input) => (
            <div key={input.id}>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {input.label}
              </label>
              <input
                type={input.type}
                placeholder={input.placeholder}
                value={formData[input.id] || ''}
                onChange={(e) => handleInputChange(input.id, e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                data-testid={`rab-input-${input.id}`}
              />
            </div>
          ))}

          {/* Price Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Harga Satuan (Rp/m³)
            </label>
            <input
              type="number"
              placeholder="Contoh: 850000"
              value={formData.price || ''}
              onChange={(e) => handleInputChange('price', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              data-testid="rab-input-price"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateRAB}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
          data-testid="rab-calculate-button"
        >
          <Calculator className="w-5 h-5" />
          Hitung Estimasi
        </button>

        {/* Result */}
        {result && (
          <div className="mt-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 fade-in">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Save className="w-5 h-5 text-green-600" />
              Hasil Perhitungan
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Volume</p>
                <p className="text-2xl font-bold text-slate-800" data-testid="rab-result-volume">
                  {result.volume.toFixed(2)} {result.unit}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Total Biaya</p>
                <p className="text-2xl font-bold text-orange-600" data-testid="rab-result-cost">
                  Rp {result.total_cost.toLocaleString('id-ID')}
                </p>
              </div>
            </div>

            {/* Create Project Button */}
            <button
              onClick={() => setShowProjectModal(true)}
              className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              data-testid="rab-create-project-button"
            >
              <FolderPlus className="w-5 h-5" />
              Jadikan Proyek
            </button>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Buat Proyek Baru</h3>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nama Proyek
            </label>
            <input
              type="text"
              placeholder="Contoh: Proyek Pembangunan Jalan Tol"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
              data-testid="project-name-input"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowProjectModal(false)}
                className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg font-semibold hover:bg-slate-300"
              >
                Batal
              </button>
              <button
                onClick={createProject}
                className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600"
                data-testid="project-submit-button"
              >
                Buat Proyek
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RABCalculator;
