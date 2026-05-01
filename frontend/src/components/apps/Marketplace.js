import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = '/api';

const CATEGORIES = ['Semua', 'Gedung & Perkantoran', 'Perumahan', 'Jalan & Jembatan', 'Instalasi MEP', 'Pabrik & Industri', 'Renovasi', 'Pemerintahan'];
const BUDGETS = ['Semua', '< Rp 100 Juta', 'Rp 100–500 Juta', 'Rp 500 Juta–2 M', '> Rp 2 Miliar'];
const STATUSES = { open: { label: 'Terbuka', color: 'green' }, negotiating: { label: 'Negosiasi', color: 'yellow' }, ongoing: { label: 'Berlangsung', color: 'blue' }, closed: { label: 'Selesai', color: 'slate' } };

const SAMPLE_PROJECTS = [
  { id: 1, title: 'Pembangunan Rumah 2 Lantai', category: 'Perumahan', budget: 'Rp 850 Juta', location: 'Bekasi, Jawa Barat', deadline: '6 bulan', status: 'open', bids: 5, description: 'Bangun rumah tinggal 2 lantai LT 200m², LB 300m². Struktur beton bertulang, atap genteng metal, finishing premium. Tersedia gambar arsitek dan IMB.', owner: 'Budi S.', posted: '2 hari lalu', tags: ['Struktur Beton', 'Finishing Premium', 'IMB Tersedia'] },
  { id: 2, title: 'Renovasi Gedung Kantor 4 Lantai', category: 'Gedung & Perkantoran', budget: 'Rp 2.3 Miliar', location: 'Jakarta Selatan', deadline: '8 bulan', status: 'open', bids: 3, description: 'Renovasi total gedung kantor 4 lantai luas 1.200m². Meliputi pekerjaan sipil, MEP, interior, dan fasad. Operasional tetap berjalan selama renovasi.', owner: 'PT Graha Mandiri', posted: '5 hari lalu', tags: ['Renovasi Total', 'MEP', 'Gedung Aktif'] },
  { id: 3, title: 'Kawasan Pabrik Manufaktur', category: 'Pabrik & Industri', budget: 'Rp 15 Miliar', location: 'Karawang, Jawa Barat', deadline: '12 bulan', status: 'open', bids: 2, description: 'Pembangunan kawasan pabrik di lahan 5 Ha — pabrik utama 8.000m², gudang 3.000m², kantor, pos security, utilitas lengkap. Kontraktor harus berpengalaman pabrik.', owner: 'PT Indo Mfg', posted: '1 minggu lalu', tags: ['Skala Besar', 'Pabrik', 'Infrastruktur'] },
  { id: 4, title: 'Komplek Perumahan 30 Unit', category: 'Perumahan', budget: 'Rp 9 Miliar', location: 'Depok, Jawa Barat', deadline: '18 bulan', status: 'negotiating', bids: 7, description: 'Developer membutuhkan kontraktor untuk 30 unit rumah type 45/72 dan type 60/90. Termasuk infrastruktur jalan dalam kawasan dan fasilitas umum.', owner: 'CV Berkah Properti', posted: '3 hari lalu', tags: ['Mass Housing', 'Infrastruktur', 'Developer'] },
  { id: 5, title: 'Jembatan Beton Desa Sukamaju', category: 'Jalan & Jembatan', budget: 'Rp 450 Juta', location: 'Bogor, Jawa Barat', deadline: '4 bulan', status: 'open', bids: 4, description: 'Pembangunan jembatan beton span 18m, lebar 4m, untuk akses desa. Dana APBD Desa. Kontraktor wajib punya SBU BS002 dan pengalaman jembatan.', owner: 'Pemdes Sukamaju', posted: '1 hari lalu', tags: ['APBD', 'Sipil', 'SBU BS002'] },
  { id: 6, title: 'Instalasi Listrik & HVAC Mal', category: 'Instalasi MEP', budget: 'Rp 3.5 Miliar', location: 'Tangerang Selatan', deadline: '10 bulan', status: 'open', bids: 1, description: 'Pekerjaan mekanikal elektrikal untuk mal baru 5 lantai: sistem listrik, HVAC, fire protection, CCTV, dan BAS. Wajib berpengalaman proyek mal.', owner: 'PT Mall Developer', posted: '4 hari lalu', tags: ['MEP', 'HVAC', 'Mal'] },
];

const StatusBadge = ({ status }) => {
  const s = STATUSES[status] || STATUSES.open;
  const colors = { green: 'bg-green-100 text-green-700', yellow: 'bg-yellow-100 text-yellow-700', blue: 'bg-blue-100 text-blue-700', slate: 'bg-slate-100 text-slate-600' };
  return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${colors[s.color]}`}>{s.label}</span>;
};

const ProjectCard = ({ project, onBid, onView }) => (
  <div className="bg-white border border-slate-100 rounded-xl p-5 hover:shadow-md transition-all hover:-translate-y-0.5">
    <div className="flex justify-between items-start mb-3">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <StatusBadge status={project.status} />
          <span className="text-xs text-slate-400">{project.posted}</span>
        </div>
        <h3 className="font-bold text-slate-800 text-base leading-tight">{project.title}</h3>
      </div>
      <div className="text-right ml-3">
        <div className="font-bold text-green-600 text-sm">{project.budget}</div>
        <div className="text-xs text-slate-400">{project.bids} penawaran</div>
      </div>
    </div>

    <p className="text-slate-600 text-sm mb-3 line-clamp-2">{project.description}</p>

    <div className="flex flex-wrap gap-1.5 mb-3">
      {project.tags.map((t, i) => (
        <span key={i} className="bg-orange-50 text-orange-700 text-xs px-2 py-0.5 rounded-full border border-orange-100">{t}</span>
      ))}
    </div>

    <div className="flex items-center justify-between text-xs text-slate-500 mb-4 border-t border-slate-50 pt-3">
      <span>📍 {project.location}</span>
      <span>⏱ {project.deadline}</span>
      <span>👤 {project.owner}</span>
    </div>

    <div className="flex gap-2">
      <button onClick={() => onView(project)} className="flex-1 px-3 py-2 border border-slate-200 text-slate-700 text-sm rounded-lg hover:bg-slate-50 transition-colors font-medium">
        Detail
      </button>
      {project.status === 'open' && (
        <button onClick={() => onBid(project)} className="flex-1 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg transition-colors font-semibold">
          Ajukan Penawaran
        </button>
      )}
    </div>
  </div>
);

const PostProjectModal = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({ title: '', category: 'Perumahan', location: '', budget: '', deadline: '', description: '', contact: '' });
  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-lg text-slate-800">📋 Posting Proyek Baru</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Judul Proyek *</label>
            <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="cth: Pembangunan Rumah 2 Lantai di Bekasi" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Kategori</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300">
                {CATEGORIES.filter(c => c !== 'Semua').map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Lokasi *</label>
              <input value={form.location} onChange={e => set('location', e.target.value)} placeholder="Kota, Provinsi" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Estimasi Budget</label>
              <input value={form.budget} onChange={e => set('budget', e.target.value)} placeholder="cth: Rp 500 Juta" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Target Selesai</label>
              <input value={form.deadline} onChange={e => set('deadline', e.target.value)} placeholder="cth: 6 bulan" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Deskripsi Proyek *</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={4} placeholder="Jelaskan detail proyek: luas, jenis pekerjaan, spesifikasi khusus, dokumen yang tersedia (gambar, IMB, dll)..." className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Kontak Anda</label>
            <input value={form.contact} onChange={e => set('contact', e.target.value)} placeholder="Nomor HP / Email" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
          </div>
        </div>
        <div className="p-5 border-t border-slate-100 flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 text-sm rounded-lg hover:bg-slate-50">Batal</button>
          <button onClick={() => onSubmit(form)} disabled={!form.title || !form.location || !form.description} className="flex-1 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg font-semibold disabled:opacity-50 transition-colors">
            🚀 Posting Proyek
          </button>
        </div>
      </div>
    </div>
  );
};

const BidModal = ({ project, onClose, onSubmit }) => {
  const [form, setForm] = useState({ price: '', duration: '', approach: '', company: '' });
  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="font-bold text-slate-800">⚖️ Ajukan Penawaran</h2>
            <p className="text-xs text-slate-500 mt-0.5">{project.title}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
        </div>
        <div className="p-5 space-y-4">
          <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 text-sm text-orange-800">
            💡 Budget owner: <strong>{project.budget}</strong> · Sudah ada {project.bids} penawaran
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Harga Penawaran *</label>
              <input value={form.price} onChange={e => set('price', e.target.value)} placeholder="Rp ..." className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Durasi Estimasi</label>
              <input value={form.duration} onChange={e => set('duration', e.target.value)} placeholder="cth: 5 bulan" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Nama / Perusahaan</label>
            <input value={form.company} onChange={e => set('company', e.target.value)} placeholder="Nama kontraktor / CV / PT" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Pendekatan & Pengalaman *</label>
            <textarea value={form.approach} onChange={e => set('approach', e.target.value)} rows={3} placeholder="Jelaskan pengalaman relevan, metode kerja, keunggulan Anda untuk proyek ini..." className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none" />
          </div>
        </div>
        <div className="p-5 border-t border-slate-100 flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 text-sm rounded-lg hover:bg-slate-50">Batal</button>
          <button onClick={() => onSubmit(form)} disabled={!form.price || !form.approach} className="flex-1 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg font-semibold disabled:opacity-50 transition-colors">
            Kirim Penawaran ✓
          </button>
        </div>
      </div>
    </div>
  );
};

const Marketplace = () => {
  const [projects, setProjects] = useState(SAMPLE_PROJECTS);
  const [filtered, setFiltered] = useState(SAMPLE_PROJECTS);
  const [catFilter, setCatFilter] = useState('Semua');
  const [search, setSearch] = useState('');
  const [showPost, setShowPost] = useState(false);
  const [bidProject, setBidProject] = useState(null);
  const [viewProject, setViewProject] = useState(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    let res = projects;
    if (catFilter !== 'Semua') res = res.filter(p => p.category === catFilter);
    if (search) res = res.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()));
    setFiltered(res);
  }, [catFilter, search, projects]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handlePostProject = async (form) => {
    try { await axios.post(`${API}/marketplace/projects`, form); } catch {}
    const newProject = { ...form, id: Date.now(), status: 'open', bids: 0, posted: 'Baru saja', owner: 'Anda', tags: [form.category] };
    setProjects(prev => [newProject, ...prev]);
    setShowPost(false);
    showToast('✅ Proyek berhasil diposting! Kontraktor segera menghubungi Anda.');
  };

  const handleBid = async (form) => {
    try { await axios.post(`${API}/marketplace/bids`, { project_id: bidProject.id, ...form }); } catch {}
    setProjects(prev => prev.map(p => p.id === bidProject.id ? { ...p, bids: p.bids + 1 } : p));
    setBidProject(null);
    showToast('✅ Penawaran berhasil dikirim! Owner akan segera menghubungi Anda.');
  };

  const openProjects = filtered.filter(p => p.status === 'open').length;

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-pulse">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-5 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-800">🏗️ Marketplace Proyek</h1>
            <p className="text-slate-500 text-sm">{openProjects} proyek terbuka dari {filtered.length} total</p>
          </div>
          <button onClick={() => setShowPost(true)} className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
            + Posting Proyek
          </button>
        </div>

        {/* Search & Filter */}
        <div className="mt-3 flex flex-col sm:flex-row gap-2">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Cari proyek, lokasi, kategori..." className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
          <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300">
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCatFilter(c)} className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium transition-colors ${catFilter === c ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Project Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <div className="text-5xl mb-3">🔍</div>
            <p className="font-medium">Tidak ada proyek ditemukan</p>
            <p className="text-sm mt-1">Coba ubah filter atau kata kunci pencarian</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(p => (
              <ProjectCard key={p.id} project={p} onBid={setBidProject} onView={setViewProject} />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showPost && <PostProjectModal onClose={() => setShowPost(false)} onSubmit={handlePostProject} />}
      {bidProject && <BidModal project={bidProject} onClose={() => setBidProject(null)} onSubmit={handleBid} />}
      {viewProject && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setViewProject(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b border-slate-100 flex justify-between">
              <div>
                <StatusBadge status={viewProject.status} />
                <h2 className="font-bold text-slate-800 mt-1">{viewProject.title}</h2>
              </div>
              <button onClick={() => setViewProject(null)} className="text-slate-400 text-xl">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 rounded-lg p-3"><div className="text-xs text-green-600 font-medium">Budget</div><div className="font-bold text-green-700">{viewProject.budget}</div></div>
                <div className="bg-blue-50 rounded-lg p-3"><div className="text-xs text-blue-600 font-medium">Target</div><div className="font-bold text-blue-700">{viewProject.deadline}</div></div>
                <div className="bg-slate-50 rounded-lg p-3"><div className="text-xs text-slate-500 font-medium">Lokasi</div><div className="font-bold text-slate-700 text-sm">{viewProject.location}</div></div>
                <div className="bg-slate-50 rounded-lg p-3"><div className="text-xs text-slate-500 font-medium">Penawaran</div><div className="font-bold text-slate-700">{viewProject.bids} kontraktor</div></div>
              </div>
              <div><h3 className="font-semibold text-slate-700 mb-2">Deskripsi Proyek</h3><p className="text-slate-600 text-sm leading-relaxed">{viewProject.description}</p></div>
              <div className="flex flex-wrap gap-2">{viewProject.tags.map((t, i) => <span key={i} className="bg-orange-50 text-orange-700 text-xs px-2.5 py-1 rounded-full border border-orange-100">{t}</span>)}</div>
              <div className="text-xs text-slate-400 flex items-center gap-1">👤 Diposting oleh <strong className="text-slate-600">{viewProject.owner}</strong> · {viewProject.posted}</div>
            </div>
            <div className="p-5 border-t border-slate-100 flex gap-3">
              <button onClick={() => setViewProject(null)} className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 text-sm rounded-lg hover:bg-slate-50">Tutup</button>
              {viewProject.status === 'open' && (
                <button onClick={() => { setViewProject(null); setBidProject(viewProject); }} className="flex-1 px-4 py-2.5 bg-orange-500 text-white text-sm rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                  Ajukan Penawaran →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
