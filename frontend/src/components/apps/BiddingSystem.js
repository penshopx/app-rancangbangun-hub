import React, { useState } from 'react';

// ─── DATA ────────────────────────────────────────────────────────────────────
const FLOW_STEPS = [
  { id: 'posting',   num: '01', icon: '📋', label: 'Posting Proyek',   who: 'Owner',       color: 'blue'   },
  { id: 'listing',   num: '02', icon: '📢', label: 'Listing & Undang', who: 'Platform',    color: 'indigo' },
  { id: 'bidding',   num: '03', icon: '⚖️', label: 'Bidding',          who: 'Kontraktor',  color: 'purple' },
  { id: 'evaluate',  num: '04', icon: '🔍', label: 'Evaluasi & Nego',  who: 'Owner',       color: 'yellow' },
  { id: 'award',     num: '05', icon: '🏆', label: 'Penetapan Pemenang', who: 'Owner',     color: 'orange' },
  { id: 'contract',  num: '06', icon: '📝', label: 'Kontrak Digital',  who: 'Kedua Pihak', color: 'green'  },
];

const SAMPLE_PROJECT = {
  id: 'PRJ-2025-042',
  title: 'Pembangunan Gedung Kantor 4 Lantai',
  owner: 'PT Graha Mandiri',
  consultant: 'CV Arsitek Prima (Perencana)',
  value_est: 'Rp 4.5 – 5.5 Miliar',
  location: 'Jakarta Selatan',
  deadline: '12 bulan',
  scope: ['Pekerjaan Sipil & Struktur', 'Arsitektur & Finishing', 'Instalasi MEP', 'Landscaping'],
  requirements: ['SBU BG002', 'ISO 9001:2015', 'K3 Umum', 'Pengalaman min 5 gedung', 'Modal kerja Rp 500 Juta'],
  docs_available: ['DED (Detail Engineering Design)', 'RKS (Rencana Kerja & Syarat)', 'Bill of Quantity', 'Site Plan'],
  bid_deadline: '2025-06-01',
  bid_opening: '2025-06-03',
  posted: '2025-05-01',
};

const BIDS = [
  { rank: 1, company: 'PT Karya Beton Nusantara', grade: 'B2', price: 4750000000, duration: '11 bulan', approach: 'Metode konstruksi modular, tim 60 orang, alat berat milik sendiri. Pengalaman 8 gedung serupa.', score_tech: 92, score_price: 88, score_total: 90.4, status: 'winner', verified: true },
  { rank: 2, company: 'CV Konstruksi Maju Bersama', grade: 'M1', price: 4520000000, duration: '12 bulan', approach: 'Harga kompetitif dengan subkon berpengalaman. Tim 40 orang.', score_tech: 78, score_price: 95, score_total: 85.1, status: 'runner_up', verified: true },
  { rank: 3, company: 'PT Bangun Prima Sejahtera', grade: 'B2', price: 5100000000, duration: '10 bulan', approach: 'Kualitas premium dengan material impor. Timeline ketat tapi harga lebih tinggi.', score_tech: 85, score_price: 72, score_total: 79.7, status: 'not_selected', verified: true },
  { rank: 4, company: 'CV Jaya Konstruksi', grade: 'K1', price: 4200000000, duration: '14 bulan', approach: 'Harga terendah tapi pengalaman gedung baru 2 proyek.', score_tech: 62, score_price: 98, score_total: 76.2, status: 'not_selected', verified: false },
];

const CONTRACT_TERMS = [
  { title: 'Nilai Kontrak', value: 'Rp 4.750.000.000 (termasuk PPN 11%)' },
  { title: 'Uang Muka (DP)', value: '20% = Rp 950.000.000 setelah penandatanganan kontrak' },
  { title: 'Jaminan Pelaksanaan', value: '5% nilai kontrak = Rp 237.500.000 (Bank Garansi BCA)' },
  { title: 'Jaminan Uang Muka', value: '20% dari DP = Rp 190.000.000 (Bank Garansi)' },
  { title: 'Retensi', value: '5% ditahan hingga masa pemeliharaan selesai (12 bulan)' },
  { title: 'Denda Keterlambatan', value: '0,1% per hari dari nilai kontrak, maksimum 5%' },
  { title: 'Penyelesaian Sengketa', value: 'BANI (Badan Arbitrase Nasional Indonesia)' },
];

const TERMIN_SCHEDULE = [
  { no: 1, milestone: 'Uang Muka (DP)', pct: 20, amount: 950000000, trigger: 'Penandatanganan kontrak + penyerahan Bank Garansi', status: 'paid' },
  { no: 2, milestone: 'Termin 1 — Pondasi selesai', pct: 15, amount: 712500000, trigger: 'Berita Acara progres pondasi 100%', status: 'paid' },
  { no: 3, milestone: 'Termin 2 — Struktur Lt.1-2', pct: 20, amount: 950000000, trigger: 'Berita Acara progres struktur 50%', status: 'ongoing' },
  { no: 4, milestone: 'Termin 3 — Struktur Lt.3-4', pct: 15, amount: 712500000, trigger: 'Berita Acara progres struktur 100%', status: 'pending' },
  { no: 5, milestone: 'Termin 4 — MEP & Finishing', pct: 20, amount: 950000000, trigger: 'Berita Acara MEP & finishing 90%', status: 'pending' },
  { no: 6, milestone: 'PHO (Provisional Handover)', pct: 5, amount: 237500000, trigger: 'Serah terima pertama, retensi 5% ditahan', status: 'pending' },
  { no: 7, milestone: 'FHO (Final Handover)', pct: 5, amount: 237500000, trigger: 'Selesai masa pemeliharaan 12 bulan', status: 'pending' },
];

const fmtRp = (n) => 'Rp ' + Number(n).toLocaleString('id-ID');
const COLOR = {
  blue: 'bg-blue-500', indigo: 'bg-indigo-500', purple: 'bg-purple-500',
  yellow: 'bg-yellow-500', orange: 'bg-orange-500', green: 'bg-green-500'
};
const LIGHT = {
  blue: 'bg-blue-50 border-blue-200 text-blue-800', indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800',
  purple: 'bg-purple-50 border-purple-200 text-purple-800', yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  orange: 'bg-orange-50 border-orange-200 text-orange-800', green: 'bg-green-50 border-green-200 text-green-800'
};

// ─── POSTING TAB ─────────────────────────────────────────────────────────────
const PostingTab = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ title: '', category: 'Gedung & Perkantoran', location: '', budget_min: '', budget_max: '', duration: '', consultant: '', scope: '', requirements: '', docs: '' });

  const steps = ['Info Proyek', 'Lingkup & Syarat', 'Dokumen & Jadwal', 'Preview & Publish'];

  return (
    <div className="space-y-4">
      {/* Step Indicator */}
      <div className="flex items-center gap-0">
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${step === i+1 ? 'bg-orange-100 text-orange-700' : step > i+1 ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
              <span>{step > i+1 ? '✓' : i+1}</span> {s}
            </div>
            {i < steps.length-1 && <div className="flex-1 h-0.5 bg-slate-200 mx-1"></div>}
          </React.Fragment>
        ))}
      </div>

      {step === 1 && (
        <div className="bg-white border border-slate-100 rounded-xl p-4 space-y-3">
          <h3 className="font-bold text-slate-800">📋 Informasi Dasar Proyek</h3>
          <div><label className="text-xs font-medium text-slate-600 mb-1 block">Judul Proyek *</label><input value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} placeholder="cth: Pembangunan Gedung Kantor 4 Lantai di Jakarta Selatan" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"/></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-slate-600 mb-1 block">Kategori Pekerjaan</label><select value={form.category} onChange={e=>setForm(p=>({...p,category:e.target.value}))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"><option>Gedung & Perkantoran</option><option>Perumahan</option><option>Jalan & Jembatan</option><option>Instalasi MEP</option><option>Pabrik & Industri</option><option>Renovasi</option><option>Infrastruktur Pemerintah</option></select></div>
            <div><label className="text-xs font-medium text-slate-600 mb-1 block">Lokasi Proyek *</label><input value={form.location} onChange={e=>setForm(p=>({...p,location:e.target.value}))} placeholder="Kota, Provinsi" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"/></div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div><label className="text-xs font-medium text-slate-600 mb-1 block">Budget Min (Rp)</label><input value={form.budget_min} onChange={e=>setForm(p=>({...p,budget_min:e.target.value}))} placeholder="4.500.000.000" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"/></div>
            <div><label className="text-xs font-medium text-slate-600 mb-1 block">Budget Max (Rp)</label><input value={form.budget_max} onChange={e=>setForm(p=>({...p,budget_max:e.target.value}))} placeholder="5.500.000.000" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"/></div>
            <div><label className="text-xs font-medium text-slate-600 mb-1 block">Target Durasi</label><input value={form.duration} onChange={e=>setForm(p=>({...p,duration:e.target.value}))} placeholder="12 bulan" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"/></div>
          </div>
          <div><label className="text-xs font-medium text-slate-600 mb-1 block">Konsultan Perencana (opsional)</label><input value={form.consultant} onChange={e=>setForm(p=>({...p,consultant:e.target.value}))} placeholder="Nama firma konsultan / perencana yang sudah ditunjuk" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"/></div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-xs text-blue-800">
            💡 <strong>Tips:</strong> Proyek dengan konsultan perencana dan dokumen lengkap mendapat penawaran 3x lebih banyak dari kontraktor berkualitas.
          </div>
          <button onClick={()=>setStep(2)} className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold transition-colors">Lanjut →</button>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white border border-slate-100 rounded-xl p-4 space-y-3">
          <h3 className="font-bold text-slate-800">🔧 Lingkup Pekerjaan & Persyaratan Kontraktor</h3>
          <div><label className="text-xs font-medium text-slate-600 mb-1 block">Lingkup Pekerjaan</label><textarea value={form.scope} onChange={e=>setForm(p=>({...p,scope:e.target.value}))} rows={3} placeholder="Deskripsikan pekerjaan secara detail: sipil, arsitektur, MEP, landscaping, dll." className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none"/></div>
          <div>
            <label className="text-xs font-medium text-slate-600 mb-2 block">Persyaratan Kontraktor (centang yang dibutuhkan)</label>
            <div className="grid grid-cols-2 gap-2">
              {['SBU BG002 (Gedung Perkantoran)', 'SBU BG001 (Hunian)', 'SBU BS001 (Jalan)', 'ISO 9001:2015', 'K3 Umum / K3 Konstruksi', 'OHSAS 18001', 'Pengalaman min 5 proyek', 'Modal kerja > Rp 500 Jt', 'Alat berat milik sendiri', 'Sertifikat LPJK aktif'].map(r => (
                <label key={r} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input type="checkbox" className="accent-orange-500" /> {r}
                </label>
              ))}
            </div>
          </div>
          <div><label className="text-xs font-medium text-slate-600 mb-1 block">Persyaratan tambahan</label><textarea rows={2} placeholder="Persyaratan khusus lainnya..." className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none"/></div>
          <div className="flex gap-3">
            <button onClick={()=>setStep(1)} className="flex-1 py-2.5 border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50">← Kembali</button>
            <button onClick={()=>setStep(3)} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold">Lanjut →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white border border-slate-100 rounded-xl p-4 space-y-3">
          <h3 className="font-bold text-slate-800">📁 Dokumen & Jadwal Lelang</h3>
          <div>
            <label className="text-xs font-medium text-slate-600 mb-2 block">Dokumen yang Tersedia</label>
            <div className="grid grid-cols-2 gap-2">
              {['DED (Detail Engineering Design)', 'RKS (Rencana Kerja & Syarat)', 'Bill of Quantity (BQ)', 'Gambar Arsitek', 'Gambar Struktur', 'Gambar MEP', 'Dokumen Teknis Lainnya', 'Anggaran RAB Owner', 'IMB / PBG sudah ada', 'Lahan siap bangun'].map(d => (
                <label key={d} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input type="checkbox" className="accent-orange-500" /> {d}
                </label>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-slate-600 mb-1 block">Batas Pengajuan Penawaran</label><input type="date" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"/></div>
            <div><label className="text-xs font-medium text-slate-600 mb-1 block">Tanggal Pembukaan Penawaran</label><input type="date" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"/></div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 mb-2 block">Metode Pemilihan Kontraktor</label>
            <div className="space-y-2">
              {[['tender_terbuka', '🌐 Tender Terbuka', 'Semua kontraktor verified bisa mengajukan penawaran'], ['tender_terbatas', '🔒 Tender Terbatas', 'Hanya kontraktor yang diundang secara spesifik'], ['penunjukan_langsung', '🤝 Penunjukan Langsung', 'Owner langsung menunjuk kontraktor tertentu']].map(([v,l,d]) => (
                <label key={v} className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-orange-50 hover:border-orange-200 transition-colors">
                  <input type="radio" name="method" value={v} className="mt-0.5 accent-orange-500" />
                  <div><div className="text-sm font-medium text-slate-800">{l}</div><div className="text-xs text-slate-500">{d}</div></div>
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={()=>setStep(2)} className="flex-1 py-2.5 border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50">← Kembali</button>
            <button onClick={()=>setStep(4)} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold">Preview →</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-3">
          <div className="bg-white border border-slate-100 rounded-xl p-4">
            <h3 className="font-bold text-slate-800 mb-3">👁 Preview Proyek</h3>
            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div><h4 className="font-bold text-slate-800">{form.title || SAMPLE_PROJECT.title}</h4><p className="text-xs text-slate-500 mt-0.5">{form.location || SAMPLE_PROJECT.location} · {form.category}</p></div>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">Terbuka</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white rounded-lg p-2"><span className="text-slate-400">Budget:</span> <strong>{form.budget_min ? `Rp ${form.budget_min}` : SAMPLE_PROJECT.value_est}</strong></div>
                <div className="bg-white rounded-lg p-2"><span className="text-slate-400">Durasi:</span> <strong>{form.duration || SAMPLE_PROJECT.deadline}</strong></div>
              </div>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="font-bold text-green-800 mb-1">✅ Siap dipublikasikan!</div>
            <p className="text-sm text-green-700">Proyek akan langsung terlihat oleh 2.500+ kontraktor verified di platform. Rata-rata proyek mendapat 5-15 penawaran dalam 48 jam.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={()=>setStep(3)} className="flex-1 py-2.5 border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50">← Edit</button>
            <button className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold shadow-md">🚀 Publish Proyek Sekarang</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── BIDDING TAB ─────────────────────────────────────────────────────────────
const BiddingTab = () => {
  const [selected, setSelected] = useState(null);

  const statusMap = { winner: { label: 'Pemenang', cls: 'bg-green-100 text-green-700' }, runner_up: { label: 'Cadangan', cls: 'bg-blue-100 text-blue-700' }, not_selected: { label: 'Tidak Dipilih', cls: 'bg-slate-100 text-slate-500' } };

  return (
    <div className="space-y-4">
      {/* Project Summary */}
      <div className="bg-white border border-slate-100 rounded-xl p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="text-xs text-slate-400 font-mono mb-1">{SAMPLE_PROJECT.id}</div>
            <h3 className="font-bold text-slate-800">{SAMPLE_PROJECT.title}</h3>
            <p className="text-xs text-slate-500">Pemilik: {SAMPLE_PROJECT.owner} · Perencana: {SAMPLE_PROJECT.consultant}</p>
          </div>
          <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold">Pemenang Dipilih</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-blue-50 rounded-lg p-2 text-center"><div className="text-blue-500">Penawaran Masuk</div><div className="font-bold text-blue-800 text-lg">{BIDS.length}</div></div>
          <div className="bg-orange-50 rounded-lg p-2 text-center"><div className="text-orange-500">Rentang Harga</div><div className="font-bold text-orange-800">4.2 – 5.1 M</div></div>
          <div className="bg-green-50 rounded-lg p-2 text-center"><div className="text-green-500">Harga Terpilih</div><div className="font-bold text-green-800">Rp 4.75 M</div></div>
        </div>
      </div>

      {/* Evaluation Criteria */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
        <div className="text-xs font-bold text-slate-600 mb-2">⚖️ KRITERIA PENILAIAN PENAWARAN</div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          {[['Teknis & Metodologi', '40%'], ['Pengalaman & Kualifikasi', '30%'], ['Harga Penawaran', '30%']].map(([k,v]) => (
            <div key={k} className="bg-white rounded-lg p-2 text-center"><div className="font-bold text-orange-600 text-base">{v}</div><div className="text-slate-500 mt-0.5">{k}</div></div>
          ))}
        </div>
      </div>

      {/* Bids Table */}
      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase">Daftar Penawaran</div>
        <div className="divide-y divide-slate-50">
          {BIDS.map(bid => (
            <div key={bid.rank} className={`p-4 cursor-pointer hover:bg-orange-50 transition-colors ${bid.status === 'winner' ? 'bg-green-50 border-l-4 border-green-500' : ''}`} onClick={() => setSelected(selected?.rank === bid.rank ? null : bid)}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${bid.rank === 1 ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-600'}`}>{bid.rank}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-sm">{bid.company}</span>
                      {bid.verified && <span className="text-green-600 text-xs">✓ Verified</span>}
                    </div>
                    <div className="text-xs text-slate-400">Grade {bid.grade} · Durasi: {bid.duration}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-800">{fmtRp(bid.price)}</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusMap[bid.status].cls}`}>{statusMap[bid.status].label}</span>
                </div>
              </div>
              {/* Score Bar */}
              <div className="grid grid-cols-3 gap-2 text-xs mt-2">
                {[['Teknis', bid.score_tech], ['Pengalaman', bid.score_price], ['Total', bid.score_total]].map(([l,s]) => (
                  <div key={l}>
                    <div className="flex justify-between mb-0.5"><span className="text-slate-400">{l}</span><span className="font-bold text-slate-700">{s}</span></div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5"><div className={`h-1.5 rounded-full ${s >= 90 ? 'bg-green-500' : s >= 75 ? 'bg-blue-500' : 'bg-yellow-500'}`} style={{width: `${s}%`}}></div></div>
                  </div>
                ))}
              </div>
              {selected?.rank === bid.rank && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div className="text-xs font-medium text-slate-600 mb-1">Pendekatan & Metodologi:</div>
                  <p className="text-xs text-slate-600 italic">{bid.approach}</p>
                  {bid.status === 'winner' && (
                    <div className="mt-2 flex gap-2">
                      <button className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white text-xs rounded-lg font-bold transition-colors">✅ Konfirmasi Pemenang</button>
                      <button className="flex-1 py-2 border border-slate-200 text-slate-600 text-xs rounded-lg hover:bg-slate-50">💬 Negosiasi Harga</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── CONTRACT TAB ─────────────────────────────────────────────────────────────
const ContractTab = () => {
  const [signed, setSigned] = useState(false);

  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4 text-white">
          <div className="text-xs text-slate-400 mb-1">SURAT PERJANJIAN KERJA (SPK)</div>
          <div className="font-bold text-lg">Kontrak No. SPK-2025-042</div>
          <div className="text-slate-300 text-sm mt-1">{SAMPLE_PROJECT.title}</div>
          <div className="flex items-center gap-4 mt-3 text-xs text-slate-300">
            <span>👔 {SAMPLE_PROJECT.owner}</span>
            <span>↔</span>
            <span>🏗️ PT Karya Beton Nusantara</span>
          </div>
        </div>
        <div className="p-4 space-y-3">
          {CONTRACT_TERMS.map((t, i) => (
            <div key={i} className="flex justify-between py-2 border-b border-slate-50 last:border-0 text-sm">
              <span className="text-slate-500 font-medium">{t.title}</span>
              <span className="text-slate-800 font-semibold text-right max-w-xs">{t.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Termin Schedule */}
      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 text-sm">💰 Jadwal Pembayaran Termin</h3>
          <p className="text-xs text-slate-500 mt-0.5">Total: {fmtRp(4750000000)} · 7 termin pembayaran</p>
        </div>
        <div className="divide-y divide-slate-50">
          {TERMIN_SCHEDULE.map(t => (
            <div key={t.no} className={`px-4 py-3 flex items-center gap-3 ${t.status === 'paid' ? 'bg-green-50' : t.status === 'ongoing' ? 'bg-blue-50' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${t.status === 'paid' ? 'bg-green-500 text-white' : t.status === 'ongoing' ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-500'}`}>{t.status === 'paid' ? '✓' : t.no}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-800 text-sm">{t.milestone}</div>
                <div className="text-xs text-slate-400 truncate">{t.trigger}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-bold text-sm text-slate-800">{t.pct}%</div>
                <div className={`text-xs font-medium ${t.status === 'paid' ? 'text-green-600' : t.status === 'ongoing' ? 'text-blue-600' : 'text-slate-400'}`}>{fmtRp(t.amount)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Digital Signing */}
      {!signed ? (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <h3 className="font-bold text-orange-800 mb-2">✍️ Tanda Tangan Digital</h3>
          <p className="text-sm text-orange-700 mb-3">Kedua pihak menandatangani kontrak secara digital. Tanda tangan akan diverifikasi dan disimpan di blockchain untuk keabsahan hukum.</p>
          <div className="grid grid-cols-2 gap-3">
            <button className="py-2.5 border-2 border-dashed border-green-300 bg-green-50 text-green-700 text-sm rounded-xl font-medium hover:bg-green-100 transition-colors">✅ PT Graha Mandiri<br/><span className="text-xs font-normal">sudah tanda tangan</span></button>
            <button onClick={() => setSigned(true)} className="py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-xl font-bold transition-colors">✍️ Tandatangani Kontrak<br/><span className="text-xs font-normal">PT Karya Beton Nusantara</span></button>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <div className="text-4xl mb-2">🎉</div>
          <div className="font-bold text-green-800">Kontrak Sudah Ditandatangani!</div>
          <div className="text-sm text-green-700 mt-1">Kontrak sah secara hukum. Dana DP Rp 950 Juta akan dicairkan dalam 1x24 jam ke rekening kontraktor.</div>
        </div>
      )}
    </div>
  );
};

// ─── SUBCHAIN TAB ─────────────────────────────────────────────────────────────
const SubchainTab = () => {
  const [expandedNode, setExpandedNode] = useState(null);

  const nodes = [
    {
      id: 'owner', role: 'Owner', icon: '👔', name: 'PT Graha Mandiri', color: 'blue',
      desc: 'Pemberi kerja. Bertanggung jawab atas pembayaran termin, penyediaan lahan, dan persetujuan milestone.',
      obligations: ['Bayar sesuai jadwal termin', 'Sediakan akses lahan & utilitas', 'Tunjuk pengawas/MK', 'Setujui perubahan scope (CCO)', 'Bayar retensi setelah FHO'],
      rights: ['Tahan retensi 5% selama pemeliharaan', 'Minta denda keterlambatan', 'Inspeksi pekerjaan kapan saja', 'Putus kontrak jika kontraktor lalai'],
    },
    {
      id: 'consultant', role: 'Konsultan MK', icon: '📐', name: 'CV Arsitek Prima', color: 'indigo',
      desc: 'Manajemen Konstruksi (MK) & Pengawas. Bertanggung jawab atas desain, pengawasan mutu, dan validasi progress.',
      obligations: ['Awasi kualitas pekerjaan harian', 'Validasi Berita Acara termin', 'Keluarkan instruksi teknis', 'Rekomendasikan CCO kepada Owner', 'Uji material sebelum dipakai'],
      rights: ['Stop pekerjaan jika tidak sesuai spek', 'Tolak material tidak standar', 'Rekomendasikan penggantian subkon'],
    },
    {
      id: 'kontraktor', role: 'Kontraktor Utama', icon: '🏗️', name: 'PT Karya Beton Nusantara', color: 'orange',
      desc: 'Pelaksana utama. Bertanggung jawab penuh atas seluruh pekerjaan, manajemen subkon/mandor, dan masa garansi.',
      obligations: ['Kerjakan sesuai kontrak & spek teknis', 'Manage subkon & mandor', 'Laporan harian & mingguan', 'Jamin keselamatan K3', 'Tanggung jawab garansi 12 bulan'],
      rights: ['Terima pembayaran sesuai termin', 'Ajukan CCO jika ada perubahan', 'Pilih subkon & supplier sendiri'],
    },
    {
      id: 'subkon', role: 'Subkontraktor', icon: '⚙️', name: 'Sub MEP, Sub Finishing, dll.', color: 'purple',
      desc: 'Pelaksana pekerjaan spesialis yang dikontrak oleh Kontraktor Utama. Bertanggung jawab ke kontraktor.',
      obligations: ['Kerjakan sesuai scope subkontrak', 'Koordinasi dengan mandor & tukang', 'Laporan ke kontraktor utama', 'Tanggung jawab pekerjaan sendiri'],
      rights: ['Terima pembayaran dari kontraktor', 'Ajukan klaim jika scope berubah'],
    },
    {
      id: 'mandor', role: 'Mandor / Tukang', icon: '👷', name: 'Tim Lapangan', color: 'yellow',
      desc: 'Pelaksana langsung pekerjaan fisik di lapangan. Bertanggung jawab atas kualitas & keselamatan tim tukang.',
      obligations: ['Kerjakan sesuai gambar teknis', 'Jaga keselamatan tukang (APD)', 'Laporan harian ke pengawas', 'Bertanggung jawab atas rework'],
      rights: ['Terima upah harian/mingguan', 'Dapatkan APD & fasilitas K3', 'Laporkan masalah teknis ke mandor'],
    },
    {
      id: 'supplier', role: 'Supplier Material', icon: '📦', name: 'Toko Bangunan, Distributor', color: 'green',
      desc: 'Penyedia material bangunan. Bertanggung jawab atas kualitas, kuantitas, dan ketepatan waktu pengiriman.',
      obligations: ['Supply material sesuai spesifikasi', 'Sertakan sertifikat material (SNI)', 'Kirim tepat waktu sesuai jadwal', 'Tanggung jawab material cacat/reject'],
      rights: ['Terima pembayaran sesuai PO', 'Retur barang yang tidak diterima'],
    },
  ];

  const colorMap = { blue: 'bg-blue-50 border-blue-200', indigo: 'bg-indigo-50 border-indigo-200', orange: 'bg-orange-50 border-orange-200', purple: 'bg-purple-50 border-purple-200', yellow: 'bg-yellow-50 border-yellow-200', green: 'bg-green-50 border-green-200' };
  const textMap = { blue: 'text-blue-800', indigo: 'text-indigo-800', orange: 'text-orange-800', purple: 'text-purple-800', yellow: 'text-yellow-800', green: 'text-green-800' };
  const badgeMap = { blue: 'bg-blue-500', indigo: 'bg-indigo-500', orange: 'bg-orange-500', purple: 'bg-purple-500', yellow: 'bg-yellow-500', green: 'bg-green-500' };

  return (
    <div className="space-y-3">
      <div className="bg-white border border-slate-100 rounded-xl p-3 text-xs text-slate-600">
        💡 <strong>Rantai Kontraktual:</strong> Klik setiap pihak untuk melihat kewajiban, hak, dan hubungan kontraktual mereka dalam proyek.
      </div>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-slate-200 z-0"></div>
        <div className="space-y-2 relative z-10">
          {nodes.map((node, idx) => (
            <div key={node.id}>
              <div className={`border rounded-xl p-3 cursor-pointer transition-all ${expandedNode === node.id ? colorMap[node.color] : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm'}`} onClick={() => setExpandedNode(expandedNode === node.id ? null : node.id)}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg flex-shrink-0 ${badgeMap[node.color]}`}>{node.icon}</div>
                  <div className="flex-1">
                    <div className={`font-bold text-sm ${expandedNode === node.id ? textMap[node.color] : 'text-slate-800'}`}>{node.role}</div>
                    <div className="text-xs text-slate-500">{node.name}</div>
                  </div>
                  <span className="text-slate-300 text-sm">{expandedNode === node.id ? '▲' : '▼'}</span>
                </div>
                {expandedNode === node.id && (
                  <div className="mt-3 pt-3 border-t border-slate-200 space-y-3">
                    <p className="text-xs text-slate-600">{node.desc}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-xs font-bold text-slate-600 mb-1.5">✅ KEWAJIBAN</div>
                        <ul className="space-y-1">
                          {node.obligations.map((o,i) => <li key={i} className="text-xs text-slate-600 flex gap-1.5"><span className="text-green-500 flex-shrink-0">•</span>{o}</li>)}
                        </ul>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-600 mb-1.5">⚖️ HAK</div>
                        <ul className="space-y-1">
                          {node.rights.map((r,i) => <li key={i} className="text-xs text-slate-600 flex gap-1.5"><span className="text-blue-500 flex-shrink-0">•</span>{r}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {idx < nodes.length-1 && (
                <div className="ml-5 pl-5 py-1 flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-slate-300"></div>
                  <span className="text-xs text-slate-400 italic">→ mengontrak / memerintah</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const BiddingSystem = () => {
  const [tab, setTab] = useState('posting');
  const tabs = [
    { id: 'posting',   icon: '📋', label: 'Posting Proyek' },
    { id: 'bidding',   icon: '⚖️', label: 'Proses Bidding' },
    { id: 'contract',  icon: '📝', label: 'Kontrak & Termin' },
    { id: 'subchain',  icon: '🔗', label: 'Rantai Kontraktual' },
  ];

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="bg-white border-b border-slate-100 px-5 py-4">
        <h1 className="text-xl font-bold text-slate-800">⚖️ Sistem Pengadaan & Kontrak</h1>
        <p className="text-slate-500 text-sm">Posting proyek · Bidding · Kontrak digital · Rantai tanggung jawab</p>
        <div className="flex gap-1 mt-3">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${tab === t.id ? 'bg-orange-100 text-orange-700' : 'text-slate-500 hover:bg-slate-100'}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {tab === 'posting'  && <PostingTab />}
        {tab === 'bidding'  && <BiddingTab />}
        {tab === 'contract' && <ContractTab />}
        {tab === 'subchain' && <SubchainTab />}
      </div>
    </div>
  );
};

export default BiddingSystem;
