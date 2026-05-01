import React, { useState } from 'react';

const formatRp = (n) => {
  if (n >= 1e9) return 'Rp ' + (n / 1e9).toFixed(2) + ' M';
  if (n >= 1e6) return 'Rp ' + (n / 1e6).toFixed(0) + ' Jt';
  return 'Rp ' + n.toLocaleString('id-ID');
};

const PROJECTS = [
  {
    id: 1, name: 'Rumah 2 Lantai - Pak Budi', rab: 850000000,
    categories: [
      { name: 'Pekerjaan Persiapan', rab: 25000000, actual: 27500000, items: [{ name: 'Pembersihan Lahan', rab: 5000000, actual: 5000000 }, { name: 'Bouwplank & Pengukuran', rab: 8000000, actual: 9500000 }, { name: 'Mobilisasi Alat', rab: 12000000, actual: 13000000 }] },
      { name: 'Pekerjaan Pondasi', rab: 120000000, actual: 115000000, items: [{ name: 'Galian Tanah Pondasi', rab: 18000000, actual: 17000000 }, { name: 'Urugan Pasir', rab: 12000000, actual: 11500000 }, { name: 'Pondasi Batu Kali', rab: 45000000, actual: 42000000 }, { name: 'Sloof Beton', rab: 45000000, actual: 44500000 }] },
      { name: 'Pekerjaan Struktur Lt.1', rab: 180000000, actual: 188000000, items: [{ name: 'Kolom Beton', rab: 65000000, actual: 70000000 }, { name: 'Balok & Plat Lantai', rab: 80000000, actual: 82000000 }, { name: 'Dinding Bata', rab: 35000000, actual: 36000000 }] },
      { name: 'Pekerjaan Struktur Lt.2', rab: 165000000, actual: 0, items: [{ name: 'Kolom Beton Lt.2', rab: 55000000, actual: 0 }, { name: 'Balok & Plat Lantai', rab: 75000000, actual: 0 }, { name: 'Dinding Bata Lt.2', rab: 35000000, actual: 0 }] },
      { name: 'Pekerjaan Atap', rab: 85000000, actual: 0, items: [{ name: 'Rangka Baja Ringan', rab: 45000000, actual: 0 }, { name: 'Penutup Atap Genteng', rab: 30000000, actual: 0 }, { name: 'Talang & Lisplank', rab: 10000000, actual: 0 }] },
      { name: 'Pekerjaan MEP', rab: 120000000, actual: 0, items: [{ name: 'Instalasi Listrik', rab: 55000000, actual: 0 }, { name: 'Instalasi Air Bersih', rab: 35000000, actual: 0 }, { name: 'Instalasi Sanitasi', rab: 30000000, actual: 0 }] },
      { name: 'Pekerjaan Finishing', rab: 155000000, actual: 0, items: [{ name: 'Plester & Acian', rab: 45000000, actual: 0 }, { name: 'Pemasangan Keramik', rab: 55000000, actual: 0 }, { name: 'Cat Interior & Eksterior', rab: 35000000, actual: 0 }, { name: 'Pintu & Jendela', rab: 20000000, actual: 0 }] },
    ]
  }
];

const BudgetTracker = () => {
  const [project] = useState(PROJECTS[0]);
  const [expandedCat, setExpandedCat] = useState(null);
  const [addItem, setAddItem] = useState(null);

  const totalRAB = project.categories.reduce((s, c) => s + c.rab, 0);
  const totalActual = project.categories.reduce((s, c) => s + c.actual, 0);
  const totalDiff = totalActual - totalRAB;
  const overallPct = totalRAB > 0 ? (totalActual / totalRAB) * 100 : 0;

  const alerts = project.categories.filter(c => c.actual > c.rab * 1.05 && c.actual > 0);

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="bg-white border-b border-slate-100 px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold text-slate-800">💰 Budget Tracker</h1>
            <p className="text-slate-500 text-sm">{project.name}</p>
          </div>
          <button className="px-4 py-2 border border-slate-200 text-slate-600 text-sm rounded-xl hover:bg-slate-50 transition-colors">
            📊 Export Excel
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-center">
            <div className="text-xs text-blue-600 font-medium mb-1">Total RAB</div>
            <div className="font-bold text-blue-800 text-sm">{formatRp(totalRAB)}</div>
          </div>
          <div className={`${totalActual > totalRAB ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'} border rounded-xl p-3 text-center`}>
            <div className={`text-xs font-medium mb-1 ${totalActual > totalRAB ? 'text-red-600' : 'text-green-600'}`}>Aktual Terpakai</div>
            <div className={`font-bold text-sm ${totalActual > totalRAB ? 'text-red-800' : 'text-green-800'}`}>{formatRp(totalActual)}</div>
          </div>
          <div className={`${totalDiff > 0 ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'} border rounded-xl p-3 text-center`}>
            <div className={`text-xs font-medium mb-1 ${totalDiff > 0 ? 'text-red-600' : 'text-green-600'}`}>{totalDiff > 0 ? '⚠ Overspend' : '✅ Hemat'}</div>
            <div className={`font-bold text-sm ${totalDiff > 0 ? 'text-red-800' : 'text-green-800'}`}>{totalDiff > 0 ? '+' : ''}{formatRp(Math.abs(totalDiff))}</div>
          </div>
        </div>

        {/* Overall Progress */}
        <div>
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Serapan Anggaran</span>
            <span className={`font-bold ${overallPct > 100 ? 'text-red-600' : 'text-slate-700'}`}>{overallPct.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5">
            <div className={`h-2.5 rounded-full transition-all ${overallPct > 100 ? 'bg-red-500' : overallPct > 80 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${Math.min(overallPct, 100)}%` }}></div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3">
            <div className="font-semibold text-red-800 text-sm mb-2">⚠️ Peringatan Overspend</div>
            {alerts.map((a, i) => (
              <div key={i} className="text-xs text-red-700 flex justify-between">
                <span>{a.name}</span>
                <span className="font-bold">+{formatRp(a.actual - a.rab)} ({(((a.actual - a.rab) / a.rab) * 100).toFixed(1)}%)</span>
              </div>
            ))}
          </div>
        )}

        {/* Category Breakdown */}
        {project.categories.map((cat, idx) => {
          const diff = cat.actual - cat.rab;
          const pct = cat.rab > 0 ? (cat.actual / cat.rab) * 100 : 0;
          const isOver = diff > 0 && cat.actual > 0;
          const isExpanded = expandedCat === idx;

          return (
            <div key={idx} className="bg-white border border-slate-100 rounded-xl overflow-hidden">
              <div className="p-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => setExpandedCat(isExpanded ? null : idx)}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs">{isExpanded ? '▼' : '▶'}</span>
                    <h3 className="font-semibold text-slate-800 text-sm">{cat.name}</h3>
                    {isOver && <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">Overspend</span>}
                    {cat.actual === 0 && <span className="text-xs bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-full">Belum dimulai</span>}
                  </div>
                  <div className="text-right">
                    {cat.actual > 0 && (
                      <span className={`text-xs font-bold ${isOver ? 'text-red-600' : 'text-green-600'}`}>
                        {isOver ? '+' : '-'}{formatRp(Math.abs(diff))}
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-2">
                  <span>RAB: <strong>{formatRp(cat.rab)}</strong></span>
                  <span>Aktual: <strong className={cat.actual > 0 ? (isOver ? 'text-red-600' : 'text-green-700') : 'text-slate-400'}>{cat.actual > 0 ? formatRp(cat.actual) : '—'}</strong></span>
                </div>
                {cat.actual > 0 && (
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${pct > 100 ? 'bg-red-500' : pct > 90 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${Math.min(pct, 100)}%` }}></div>
                  </div>
                )}
              </div>

              {isExpanded && (
                <div className="border-t border-slate-100 px-4 pb-3">
                  <table className="w-full text-xs mt-2">
                    <thead>
                      <tr className="text-slate-400">
                        <th className="text-left py-1">Item Pekerjaan</th>
                        <th className="text-right py-1">RAB</th>
                        <th className="text-right py-1">Aktual</th>
                        <th className="text-right py-1">Selisih</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cat.items.map((item, i) => {
                        const d = item.actual - item.rab;
                        return (
                          <tr key={i} className="border-t border-slate-50">
                            <td className="py-1.5 text-slate-700">{item.name}</td>
                            <td className="text-right text-slate-600">{formatRp(item.rab)}</td>
                            <td className="text-right font-medium">{item.actual > 0 ? formatRp(item.actual) : '—'}</td>
                            <td className={`text-right font-bold ${d > 0 ? 'text-red-500' : d < 0 ? 'text-green-600' : 'text-slate-300'}`}>
                              {item.actual > 0 ? (d > 0 ? '+' : '') + formatRp(d) : '—'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <button className="mt-2 text-xs text-orange-500 hover:underline">+ Tambah Item Aktual</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetTracker;
