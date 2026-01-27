import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calculator, FileSpreadsheet, Download, CheckCircle, AlertCircle, Building2, TrendingUp } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const RABEnhanced = () => {
  const [step, setStep] = useState(1);
  const [templates, setTemplates] = useState({});
  const [selectedLPJK, setSelectedLPJK] = useState('');
  const [projectName, setProjectName] = useState('');
  const [templateItems, setTemplateItems] = useState([]);
  const [volumes, setVolumes] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await axios.get(`${API}/rab-enhanced/templates`);
      setTemplates(response.data.templates);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const selectTemplate = async (lpjkCode) => {
    setSelectedLPJK(lpjkCode);
    setLoading(true);
    try {
      const response = await axios.get(`${API}/rab-enhanced/templates/${lpjkCode}`);
      setTemplateItems(response.data.items);
      setStep(2);
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal load template');
    } finally {
      setLoading(false);
    }
  };

  const handleVolumeChange = (kode, value) => {
    setVolumes(prev => ({...prev, [kode]: parseFloat(value) || 0}));
  };

  const calculateRAB = async () => {
    if (!projectName.trim()) {
      alert('Nama proyek harus diisi!');
      return;
    }

    setLoading(true);
    try {
      const items = templateItems
        .filter(item => volumes[item.kode] > 0)
        .map(item => ({
          kode: item.kode,
          volume: volumes[item.kode]
        }));

      if (items.length === 0) {
        alert('Minimal harus ada 1 item dengan volume > 0');
        setLoading(false);
        return;
      }

      const response = await axios.post(`${API}/rab-enhanced/calculate`, {
        lpjk_code: selectedLPJK,
        project_name: projectName,
        items
      });

      setResult(response.data);
      setStep(3);
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal menghitung RAB');
    } finally {
      setLoading(false);
    }
  };

  const groupByKategori = (items) => {
    const grouped = {};
    items.forEach(item => {
      if (!grouped[item.kategori]) grouped[item.kategori] = [];
      grouped[item.kategori].push(item);
    });
    return grouped;
  };

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">RAB Calculator Professional</h1>
          <p className="text-slate-600">Standard Level - WBS 2 Level dengan 100 Item Database</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-3 ${step >= 1 ? 'text-orange-600' : 'text-slate-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-orange-500 text-white' : 'bg-slate-200'}`}>1</div>
            <span className="font-semibold">Pilih Template</span>
          </div>
          <div className="flex-1 h-1 bg-slate-200 mx-4"></div>
          <div className={`flex items-center gap-3 ${step >= 2 ? 'text-orange-600' : 'text-slate-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-orange-500 text-white' : 'bg-slate-200'}`}>2</div>
            <span className="font-semibold">Input Volume</span>
          </div>
          <div className="flex-1 h-1 bg-slate-200 mx-4"></div>
          <div className={`flex items-center gap-3 ${step >= 3 ? 'text-orange-600' : 'text-slate-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-orange-500 text-white' : 'bg-slate-200'}`}>3</div>
            <span className="font-semibold">Hasil RAB</span>
          </div>
        </div>
      </div>

      {/* Step 1: Template Selection */}
      {step === 1 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Pilih Template RAB Berdasarkan LPJK</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(templates).map(([code, template]) => (
              <div
                key={code}
                onClick={() => selectTemplate(code)}
                className="border-2 border-slate-200 rounded-lg p-6 hover:border-orange-500 hover:bg-orange-50 cursor-pointer transition-all"
                data-testid={`template-${code}`}
              >
                <div className="flex items-start gap-3">
                  <Building2 className="w-8 h-8 text-orange-500" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded font-semibold">{code}</span>
                    </div>
                    <h4 className="font-bold text-slate-800 mb-2">{template.nama}</h4>
                    <p className="text-sm text-slate-600">
                      {template.items.length} kategori pekerjaan • Lengkap dengan breakdown M/U/A
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Volume Input */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800">Input Volume Pekerjaan</h3>
              <button onClick={() => setStep(1)} className="text-sm text-slate-600 hover:text-slate-800">← Ganti Template</button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Proyek</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Contoh: Gedung Kantor PT ABC Jakarta"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                data-testid="project-name-input"
              />
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-orange-800">
                <strong>💡 Tips:</strong> Isi volume untuk item yang relevan saja. Item dengan volume 0 akan diabaikan. Total {templateItems.length} item tersedia.
              </p>
            </div>
          </div>

          {/* Group by Kategori */}
          {Object.entries(groupByKategori(templateItems)).map(([kategori, items]) => (
            <div key={kategori} className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-md font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-orange-500" />
                {kategori}
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left p-2 font-semibold">Kode</th>
                      <th className="text-left p-2 font-semibold">Uraian Pekerjaan</th>
                      <th className="text-center p-2 font-semibold">Satuan</th>
                      <th className="text-right p-2 font-semibold">Material</th>
                      <th className="text-right p-2 font-semibold">Upah</th>
                      <th className="text-right p-2 font-semibold">Alat</th>
                      <th className="text-right p-2 font-semibold">Total/Satuan</th>
                      <th className="text-center p-2 font-semibold">Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.kode} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="p-2 font-mono text-xs">{item.kode}</td>
                        <td className="p-2">{item.uraian}</td>
                        <td className="p-2 text-center">{item.satuan}</td>
                        <td className="p-2 text-right text-xs">{formatRupiah(item.material)}</td>
                        <td className="p-2 text-right text-xs">{formatRupiah(item.upah)}</td>
                        <td className="p-2 text-right text-xs">{formatRupiah(item.alat)}</td>
                        <td className="p-2 text-right font-semibold">{formatRupiah(item.total)}</td>
                        <td className="p-2">
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={volumes[item.kode] || ''}
                            onChange={(e) => handleVolumeChange(item.kode, e.target.value)}
                            className="w-24 px-2 py-1 border border-slate-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="0"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          <div className="bg-white rounded-lg shadow-md p-6">
            <button
              onClick={calculateRAB}
              disabled={loading}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              data-testid="calculate-rab-button"
            >
              {loading ? '⏳ Menghitung...' : <><Calculator className="w-5 h-5" /> Hitung RAB</>}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Result */}
      {step === 3 && result && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">{result.project_name}</h3>
                <p className="text-orange-100">LPJK: {result.lpjk_code}</p>
              </div>
              <CheckCircle className="w-16 h-16" />
            </div>
            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="bg-white/20 rounded-lg p-4">
                <p className="text-orange-100 text-sm mb-1">Material</p>
                <p className="text-2xl font-bold">{formatRupiah(result.summary.total_material)}</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <p className="text-orange-100 text-sm mb-1">Upah</p>
                <p className="text-2xl font-bold">{formatRupiah(result.summary.total_upah)}</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <p className="text-orange-100 text-sm mb-1">Alat</p>
                <p className="text-2xl font-bold">{formatRupiah(result.summary.total_alat)}</p>
              </div>
              <div className="bg-white/30 rounded-lg p-4">
                <p className="text-orange-100 text-sm mb-1">TOTAL BIAYA</p>
                <p className="text-3xl font-bold">{formatRupiah(result.summary.grand_total)}</p>
              </div>
            </div>
          </div>

          {/* Detail Items */}
          {Object.entries(groupByKategori(result.items)).map(([kategori, items]) => (
            <div key={kategori} className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-md font-bold text-slate-800 mb-4">{kategori}</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left p-2">Kode</th>
                      <th className="text-left p-2">Uraian</th>
                      <th className="text-center p-2">Volume</th>
                      <th className="text-center p-2">Satuan</th>
                      <th className="text-right p-2">Harga Satuan</th>
                      <th className="text-right p-2">Jumlah</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.kode} className="border-b border-slate-100">
                        <td className="p-2 font-mono text-xs">{item.kode}</td>
                        <td className="p-2">{item.uraian}</td>
                        <td className="p-2 text-center font-semibold">{item.volume.toFixed(2)}</td>
                        <td className="p-2 text-center">{item.satuan}</td>
                        <td className="p-2 text-right">{formatRupiah(item.harga_satuan.total)}</td>
                        <td className="p-2 text-right font-bold text-orange-600">{formatRupiah(item.jumlah.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          <div className="bg-white rounded-lg shadow-md p-6 flex gap-4">
            <button
              onClick={() => {setStep(1); setResult(null); setVolumes({});}}
              className="flex-1 bg-slate-200 text-slate-700 py-3 rounded-lg font-semibold hover:bg-slate-300"
            >
              Buat RAB Baru
            </button>
            <button
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" /> Export PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RABEnhanced;
