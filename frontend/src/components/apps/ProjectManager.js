import React, { useState } from 'react';

const SAMPLE_PROJECTS = [
  {
    id: 1, name: 'Rumah 2 Lantai - Pak Budi', client: 'Budi Santoso', contractor: 'CV Bangun Jaya',
    value: 850000000, startDate: '2025-02-01', endDate: '2025-08-01', status: 'ongoing',
    progress: 65, location: 'Bekasi, Jawa Barat', category: 'Perumahan',
    milestones: [
      { id: 1, name: 'Pekerjaan Pondasi', weight: 15, status: 'done', dueDate: '2025-02-28', completedDate: '2025-02-25', payment: 127500000 },
      { id: 2, name: 'Struktur Lantai 1', weight: 20, status: 'done', dueDate: '2025-03-31', completedDate: '2025-04-02', payment: 170000000 },
      { id: 3, name: 'Struktur Lantai 2', weight: 20, status: 'ongoing', dueDate: '2025-05-15', completedDate: null, payment: 170000000 },
      { id: 4, name: 'Atap & MEP', weight: 20, status: 'pending', dueDate: '2025-06-15', completedDate: null, payment: 170000000 },
      { id: 5, name: 'Finishing & Cat', weight: 15, status: 'pending', dueDate: '2025-07-15', completedDate: null, payment: 127500000 },
      { id: 6, name: 'Serah Terima', weight: 10, status: 'pending', dueDate: '2025-08-01', completedDate: null, payment: 85000000 },
    ],
    reports: [
      { date: '2025-05-01', desc: 'Pengecoran kolom lantai 2 selesai 80%. Cuaca cerah, tim 12 orang.', photo: '📷', by: 'Mandor Joko' },
      { date: '2025-04-30', desc: 'Pemasangan bekisting kolom lantai 2 lanjut. Material besi tiba.', photo: '📷', by: 'Mandor Joko' },
    ]
  },
  {
    id: 2, name: 'Renovasi Kantor PT Graha', client: 'PT Graha Mandiri', contractor: 'PT Konstruksi Prima',
    value: 2300000000, startDate: '2025-01-15', endDate: '2025-09-15', status: 'ongoing',
    progress: 42, location: 'Jakarta Selatan', category: 'Gedung & Perkantoran',
    milestones: [
      { id: 1, name: 'Demolisi & Persiapan', weight: 10, status: 'done', dueDate: '2025-02-15', completedDate: '2025-02-12', payment: 230000000 },
      { id: 2, name: 'Pekerjaan Struktur', weight: 25, status: 'done', dueDate: '2025-04-15', completedDate: '2025-04-20', payment: 575000000 },
      { id: 3, name: 'MEP Rough-in', weight: 20, status: 'ongoing', dueDate: '2025-06-15', completedDate: null, payment: 460000000 },
      { id: 4, name: 'Finishing Interior', weight: 30, status: 'pending', dueDate: '2025-08-01', completedDate: null, payment: 690000000 },
      { id: 5, name: 'Serah Terima', weight: 15, status: 'pending', dueDate: '2025-09-15', completedDate: null, payment: 345000000 },
    ],
    reports: [
      { date: '2025-05-01', desc: 'Pekerjaan plumbing lantai 3 lanjut. 60% selesai.', photo: '📷', by: 'Site Manager' },
    ]
  },
];

const formatRp = (n) => 'Rp ' + (n / 1e6).toFixed(0) + ' Juta';
const fmtDate = (d) => d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-';

const StatusBadge = ({ status, size = 'sm' }) => {
  const map = { done: ['✅', 'bg-green-100 text-green-700'], ongoing: ['🔄', 'bg-blue-100 text-blue-700'], pending: ['⏳', 'bg-slate-100 text-slate-500'], delayed: ['⚠️', 'bg-red-100 text-red-700'] };
  const labels = { done: 'Selesai', ongoing: 'Berjalan', pending: 'Menunggu', delayed: 'Terlambat' };
  const [icon, cls] = map[status] || map.pending;
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>{icon} {labels[status]}</span>;
};

const ProjectDetail = ({ project, onBack }) => {
  const [tab, setTab] = useState('milestones');
  const [showReport, setShowReport] = useState(false);
  const [reportText, setReportText] = useState('');

  const paid = project.milestones.filter(m => m.status === 'done').reduce((s, m) => s + m.payment, 0);
  const totalPaid = project.milestones.reduce((s, m) => s + m.payment, 0);

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="bg-white border-b border-slate-100 px-5 py-4">
        <button onClick={onBack} className="text-orange-500 text-sm mb-2 hover:underline">← Kembali ke Daftar</button>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-bold text-xl text-slate-800">{project.name}</h2>
            <p className="text-sm text-slate-500">{project.location} · {project.category}</p>
          </div>
          <StatusBadge status={project.status} />
        </div>
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-slate-700">Progress Keseluruhan</span>
            <span className="font-bold text-orange-600">{project.progress}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3">
            <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full transition-all" style={{ width: `${project.progress}%` }}></div>
          </div>
        </div>
        {/* Key Stats */}
        <div className="grid grid-cols-3 gap-3 mt-3">
          <div className="bg-slate-50 rounded-lg p-2.5 text-center"><div className="text-xs text-slate-500">Nilai Kontrak</div><div className="font-bold text-slate-800 text-sm">{formatRp(project.value)}</div></div>
          <div className="bg-green-50 rounded-lg p-2.5 text-center"><div className="text-xs text-green-600">Sudah Dibayar</div><div className="font-bold text-green-700 text-sm">{formatRp(paid)}</div></div>
          <div className="bg-blue-50 rounded-lg p-2.5 text-center"><div className="text-xs text-blue-600">Sisa Tagihan</div><div className="font-bold text-blue-700 text-sm">{formatRp(totalPaid - paid)}</div></div>
        </div>
        {/* Tabs */}
        <div className="flex gap-1 mt-3 border-b border-slate-100">
          {['milestones', 'reports', 'info'].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${tab === t ? 'border-orange-500 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
              {t === 'milestones' ? 'Milestone & Termin' : t === 'reports' ? 'Laporan Harian' : 'Info Proyek'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {tab === 'milestones' && (
          <div className="space-y-3">
            {project.milestones.map((m, i) => (
              <div key={m.id} className={`bg-white rounded-xl p-4 border ${m.status === 'done' ? 'border-green-100' : m.status === 'ongoing' ? 'border-blue-200 shadow-sm' : 'border-slate-100'}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${m.status === 'done' ? 'bg-green-100 text-green-700' : m.status === 'ongoing' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-400'}`}>{i + 1}</div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">{m.name}</h4>
                      <p className="text-xs text-slate-400">Bobot: {m.weight}% · Target: {fmtDate(m.dueDate)}</p>
                    </div>
                  </div>
                  <StatusBadge status={m.status} />
                </div>
                <div className="flex items-center justify-between bg-slate-50 rounded-lg p-2.5 mt-2">
                  <div>
                    <div className="text-xs text-slate-500">Nilai Termin</div>
                    <div className="font-bold text-slate-800 text-sm">{formatRp(m.payment)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">{m.status === 'done' ? 'Selesai' : 'Estimasi'}</div>
                    <div className="text-xs font-medium text-slate-700">{fmtDate(m.completedDate || m.dueDate)}</div>
                  </div>
                  {m.status === 'ongoing' && (
                    <button className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-lg font-medium transition-colors">
                      Cairkan Termin
                    </button>
                  )}
                  {m.status === 'done' && (
                    <span className="text-green-600 text-xs font-medium">✅ Dibayar</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'reports' && (
          <div>
            <button onClick={() => setShowReport(true)} className="w-full mb-4 px-4 py-3 border-2 border-dashed border-orange-200 text-orange-600 rounded-xl text-sm font-medium hover:bg-orange-50 transition-colors">
              + Tambah Laporan Harian
            </button>
            <div className="space-y-3">
              {project.reports.map((r, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-semibold text-slate-700">{fmtDate(r.date)}</span>
                    <span className="text-xs text-slate-400">oleh {r.by}</span>
                  </div>
                  <p className="text-sm text-slate-600">{r.desc}</p>
                  <div className="mt-2 flex gap-2">
                    <span className="bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded">{r.photo} Foto terlampir</span>
                  </div>
                </div>
              ))}
            </div>
            {showReport && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl w-full max-w-md p-5">
                  <h3 className="font-bold text-slate-800 mb-4">📋 Laporan Harian Baru</h3>
                  <textarea value={reportText} onChange={e => setReportText(e.target.value)} rows={4} placeholder="Deskripsikan progress hari ini: pekerjaan yang diselesaikan, jumlah pekerja, kondisi cuaca, material yang digunakan..." className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none mb-3" />
                  <div className="flex gap-3">
                    <button onClick={() => setShowReport(false)} className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 text-sm rounded-lg">Batal</button>
                    <button onClick={() => { setShowReport(false); setReportText(''); }} className="flex-1 px-4 py-2 bg-orange-500 text-white text-sm rounded-lg font-medium">Kirim Laporan</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'info' && (
          <div className="space-y-4">
            <div className="bg-white border border-slate-100 rounded-xl p-4 space-y-3">
              <h3 className="font-semibold text-slate-800">Detail Proyek</h3>
              {[['👔 Owner / Klien', project.client], ['🏗️ Kontraktor', project.contractor], ['📍 Lokasi', project.location], ['📁 Kategori', project.category], ['📅 Mulai', fmtDate(project.startDate)], ['🏁 Target Selesai', fmtDate(project.endDate)]].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                  <span className="text-sm text-slate-500">{k}</span>
                  <span className="text-sm font-medium text-slate-800">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectManager = () => {
  const [projects] = useState(SAMPLE_PROJECTS);
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState('all');

  if (selected) return <ProjectDetail project={selected} onBack={() => setSelected(null)} />;

  const filtered = tab === 'all' ? projects : projects.filter(p => p.status === tab);

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="bg-white border-b border-slate-100 px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold text-slate-800">📊 Manajemen Proyek</h1>
            <p className="text-slate-500 text-sm">{projects.length} proyek aktif</p>
          </div>
          <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-colors">
            + Proyek Baru
          </button>
        </div>
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[['💰', 'Total Nilai', 'Rp 3.15 M', 'text-slate-800'], ['✅', 'Selesai', '0', 'text-green-600'], ['🔄', 'Berjalan', '2', 'text-blue-600']].map(([icon, label, val, cls]) => (
            <div key={label} className="bg-slate-50 rounded-xl p-3 text-center">
              <div className="text-xl">{icon}</div>
              <div className={`font-bold text-sm ${cls}`}>{val}</div>
              <div className="text-xs text-slate-400">{label}</div>
            </div>
          ))}
        </div>
        {/* Tabs */}
        <div className="flex gap-1">
          {[['all', 'Semua'], ['ongoing', 'Berjalan'], ['pending', 'Menunggu'], ['done', 'Selesai']].map(([v, l]) => (
            <button key={v} onClick={() => setTab(v)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${tab === v ? 'bg-orange-100 text-orange-700' : 'text-slate-500 hover:bg-slate-100'}`}>{l}</button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filtered.map(project => {
          const paid = project.milestones.filter(m => m.status === 'done').reduce((s, m) => s + m.payment, 0);
          return (
            <div key={project.id} className="bg-white border border-slate-100 rounded-xl p-4 hover:shadow-md cursor-pointer transition-all hover:-translate-y-0.5" onClick={() => setSelected(project)}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <StatusBadge status={project.status} />
                    <span className="text-xs text-slate-400">{project.category}</span>
                  </div>
                  <h3 className="font-bold text-slate-800">{project.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">📍 {project.location} · 🏗️ {project.contractor}</p>
                </div>
                <div className="text-right ml-3">
                  <div className="font-bold text-slate-800 text-sm">{formatRp(project.value)}</div>
                  <div className="text-xs text-green-600">Dibayar: {formatRp(paid)}</div>
                </div>
              </div>
              {/* Progress */}
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Progress: <strong className="text-slate-700">{project.progress}%</strong></span>
                  <span>Target: {fmtDate(project.endDate)}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                </div>
              </div>
              {/* Milestone mini */}
              <div className="flex gap-1 mt-3">
                {project.milestones.map(m => (
                  <div key={m.id} className={`h-1.5 flex-1 rounded-full ${m.status === 'done' ? 'bg-green-400' : m.status === 'ongoing' ? 'bg-blue-400' : 'bg-slate-200'}`} title={m.name}></div>
                ))}
              </div>
              <div className="text-xs text-slate-400 mt-1">{project.milestones.filter(m => m.status === 'done').length}/{project.milestones.length} milestone selesai · Klik untuk detail</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectManager;
