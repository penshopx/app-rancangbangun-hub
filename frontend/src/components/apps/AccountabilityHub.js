import React, { useState } from 'react';

const fmtRp = (n) => 'Rp ' + Number(n).toLocaleString('id-ID');
const fmtDate = (d) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

// ─── GUARANTEE DATA ───────────────────────────────────────────────────────────
const GUARANTEES = [
  {
    type: 'jaminan_pelaksanaan', icon: '🔒', title: 'Jaminan Pelaksanaan', color: 'blue',
    subtitle: 'Performance Bond',
    desc: 'Jaminan bahwa kontraktor menyelesaikan pekerjaan sesuai kontrak. Bila kontraktor wanprestasi, owner dapat mencairkan jaminan ini.',
    amount: 237500000, pct: '5% nilai kontrak', provider: 'Bank BCA — Cabang Sudirman',
    valid: '2025-05-15 s/d 2026-08-01',
    status: 'active',
    triggers: ['Kontraktor mangkir tanpa alasan sah', 'Kualitas pekerjaan tidak sesuai spesifikasi berulang', 'Kontraktor bangkrut / force majeure'],
    how: 'Owner mengajukan klaim ke bank dengan bukti wanprestasi. Bank verifikasi dalam 14 hari kerja dan cairkan dana.',
  },
  {
    type: 'jaminan_uang_muka', icon: '💳', title: 'Jaminan Uang Muka', color: 'purple',
    subtitle: 'Advance Payment Bond',
    desc: 'Jaminan bahwa uang muka (DP) yang diberikan owner akan digunakan sesuai peruntukan proyek, bukan disalahgunakan.',
    amount: 190000000, pct: '20% dari DP', provider: 'Bank Mandiri — Cabang Gatot Subroto',
    valid: '2025-05-15 s/d 2025-12-01',
    status: 'active',
    triggers: ['Kontraktor menggunakan DP untuk keperluan di luar proyek', 'Kontraktor tidak memulai pekerjaan dalam 30 hari setelah DP cair'],
    how: 'Jaminan dicairkan proporsional seiring progress pekerjaan. Sisa jaminan dikembalikan bila DP sudah tertutup oleh nilai pekerjaan.',
  },
  {
    type: 'retensi', icon: '🏦', title: 'Retensi 5%', color: 'orange',
    subtitle: 'Retention Money',
    desc: 'Dana yang ditahan owner selama masa pemeliharaan (12 bulan) setelah PHO sebagai jaminan atas cacat tersembunyi.',
    amount: 237500000, pct: '5% nilai kontrak', provider: 'Escrow RancangBangun',
    valid: '2026-08-01 s/d 2027-08-01',
    status: 'pending',
    triggers: ['Ada cacat tersembunyi setelah serah terima', 'Kontraktor tidak memperbaiki defect dalam waktu yang ditentukan'],
    how: 'Owner melaporkan defect. Kontraktor wajib perbaiki dalam 14 hari. Bila tidak, owner dapat potongan dari retensi.',
  },
  {
    type: 'garansi_material', icon: '📦', title: 'Garansi Material & Produk', color: 'green',
    subtitle: 'Product Warranty',
    desc: 'Jaminan dari supplier bahwa material yang dipasang memenuhi standar SNI dan bebas cacat manufaktur.',
    amount: null, pct: 'Sesuai produk', provider: 'Masing-masing supplier',
    valid: 'Bervariasi per produk',
    status: 'active',
    triggers: ['Material gagal fungsi dalam masa garansi', 'Material tidak sesuai sertifikat SNI yang tertera'],
    how: 'Kontraktor/Owner melaporkan ke supplier dengan foto bukti. Supplier wajib ganti/perbaiki dalam 7 hari.',
  },
];

// ─── QC STANDARDS ─────────────────────────────────────────────────────────────
const QC_ITEMS = [
  { category: 'Mutu Beton', items: [
    { test: 'Uji Kuat Tekan Beton (f\'c)', standard: 'Sesuai spesifikasi K225/K250', frequency: 'Setiap 50 m³ pengecoran', passed: true },
    { test: 'Slump Test', standard: '8–12 cm', frequency: 'Setiap truck mixer', passed: true },
    { test: 'Uji Tarik Besi (Rebar)', standard: 'SNI 2052:2017', frequency: 'Per batch pengiriman', passed: true },
  ]},
  { category: 'Mutu Struktur', items: [
    { test: 'Inspeksi Bekisting', standard: 'Kokoh, kedap, dimensi tepat', frequency: 'Sebelum pengecoran', passed: true },
    { test: 'Inspeksi Tulangan', standard: 'Diameter, jarak, selimut beton', frequency: 'Sebelum pengecoran', passed: false },
    { test: 'Pengujian Pondasi (Loading Test)', standard: 'Daya dukung ≥ 2x beban rencana', frequency: 'Setelah pondasi selesai', passed: true },
  ]},
  { category: 'Mutu Material', items: [
    { test: 'Semen (SNI 15-2049)', standard: 'Portland Cement Type I', frequency: 'Per kedatangan batch', passed: true },
    { test: 'Bata / Bata Ringan', standard: 'SNI 03-0349-1989', frequency: 'Sampling per 500 bata', passed: true },
    { test: 'Cat & Finishing', standard: 'ASTM D3359 (adhesion)', frequency: 'Sebelum aplikasi massal', passed: null },
  ]},
];

// ─── DISPUTE FLOW ──────────────────────────────────────────────────────────────
const DISPUTES = [
  { id: 'DSP-001', title: 'Keterlambatan penyelesaian pondasi', raised_by: 'PT Graha Mandiri (Owner)', against: 'PT Karya Beton (Kontraktor)', amount: 47500000, status: 'resolved', resolution: 'Mediasi — kontraktor setuju perpanjang masa kerja tanpa denda', date: '2025-03-15' },
  { id: 'DSP-002', title: 'Material bata tidak sesuai spesifikasi SNI', raised_by: 'PT Karya Beton (Kontraktor)', against: 'Toko Bangunan Maju (Supplier)', amount: 25000000, status: 'ongoing', resolution: null, date: '2025-04-28' },
];

// ─── COMPONENT: Guarantee Card ────────────────────────────────────────────────
const GuaranteeCard = ({ g }) => {
  const [open, setOpen] = useState(false);
  const colors = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', badge: 'bg-blue-100 text-blue-700', icon_bg: 'bg-blue-500' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800', badge: 'bg-purple-100 text-purple-700', icon_bg: 'bg-purple-500' },
    orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', badge: 'bg-orange-100 text-orange-700', icon_bg: 'bg-orange-500' },
    green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', badge: 'bg-green-100 text-green-700', icon_bg: 'bg-green-500' },
  };
  const c = colors[g.color];
  const statusMap = { active: { l: 'Aktif', cls: 'bg-green-100 text-green-700' }, pending: { l: 'Belum Dimulai', cls: 'bg-slate-100 text-slate-500' }, expired: { l: 'Kadaluarsa', cls: 'bg-red-100 text-red-700' } };

  return (
    <div className={`border rounded-xl overflow-hidden ${open ? `${c.bg} ${c.border}` : 'bg-white border-slate-100'} transition-all`}>
      <div className="p-4 cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0 ${c.icon_bg}`}>{g.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-800">{g.title}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusMap[g.status].cls}`}>{statusMap[g.status].l}</span>
            </div>
            <div className="text-xs text-slate-500">{g.subtitle} · {g.pct}</div>
            {g.amount && <div className={`font-bold text-sm mt-0.5 ${c.text}`}>{fmtRp(g.amount)}</div>}
          </div>
          <span className="text-slate-300">{open ? '▲' : '▼'}</span>
        </div>
      </div>
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-slate-100">
          <p className="text-sm text-slate-700">{g.desc}</p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div><span className="text-slate-400">Penerbit Jaminan:</span><br/><strong className="text-slate-700">{g.provider}</strong></div>
            <div><span className="text-slate-400">Masa Berlaku:</span><br/><strong className="text-slate-700">{g.valid}</strong></div>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-600 mb-2">⚠️ Dapat Dicairkan Bila:</div>
            <ul className="space-y-1">
              {g.triggers.map((t,i) => <li key={i} className="text-xs text-slate-600 flex gap-1.5"><span className="text-red-400 flex-shrink-0 mt-0.5">•</span>{t}</li>)}
            </ul>
          </div>
          <div className={`${c.bg} border ${c.border} rounded-lg p-3`}>
            <div className={`text-xs font-bold ${c.text} mb-1`}>📋 Mekanisme Pencairan:</div>
            <p className={`text-xs ${c.text}`}>{g.how}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const AccountabilityHub = () => {
  const [tab, setTab] = useState('guarantee');

  const tabs = [
    { id: 'guarantee', icon: '🔒', label: 'Jaminan & Garansi' },
    { id: 'qc',        icon: '🔬', label: 'Quality Control' },
    { id: 'dispute',   icon: '⚖️', label: 'Sengketa & Klaim' },
    { id: 'escrow',    icon: '🏦', label: 'Escrow & Pembayaran' },
  ];

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="bg-white border-b border-slate-100 px-5 py-4">
        <h1 className="text-xl font-bold text-slate-800">🛡️ Jaminan & Pertanggungjawaban</h1>
        <p className="text-slate-500 text-sm">Garansi mutu · Escrow · QC · Penyelesaian sengketa</p>
        <div className="flex gap-1 mt-3 flex-wrap">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${tab === t.id ? 'bg-orange-100 text-orange-700' : 'text-slate-500 hover:bg-slate-100'}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">

        {/* ── GUARANTEE TAB ── */}
        {tab === 'guarantee' && (
          <div className="space-y-3">
            <div className="bg-white border border-slate-100 rounded-xl p-4">
              <h2 className="font-bold text-slate-800 mb-1">Sistem Jaminan Konstruksi</h2>
              <p className="text-xs text-slate-500">4 lapisan jaminan untuk melindungi semua pihak sepanjang lifecycle proyek.</p>
              <div className="flex gap-4 mt-3 text-xs">
                <div className="text-center"><div className="font-bold text-green-600 text-lg">3</div><div className="text-slate-500">Jaminan Aktif</div></div>
                <div className="text-center"><div className="font-bold text-orange-600 text-lg">Rp 665 Jt</div><div className="text-slate-500">Nilai Terjamin</div></div>
                <div className="text-center"><div className="font-bold text-blue-600 text-lg">12 bln</div><div className="text-slate-500">Masa Garansi</div></div>
              </div>
            </div>
            {GUARANTEES.map(g => <GuaranteeCard key={g.type} g={g} />)}
          </div>
        )}

        {/* ── QC TAB ── */}
        {tab === 'qc' && (
          <div className="space-y-4">
            <div className="bg-white border border-slate-100 rounded-xl p-4">
              <h2 className="font-bold text-slate-800 mb-1">Standar Quality Control</h2>
              <p className="text-xs text-slate-500">Pengujian material dan pekerjaan sesuai standar SNI/ASTM. Hasil inspeksi tercatat di platform.</p>
              <div className="flex gap-4 mt-3 text-xs">
                <div className="text-center"><div className="font-bold text-green-600 text-lg">{QC_ITEMS.flatMap(c=>c.items).filter(i=>i.passed===true).length}</div><div className="text-slate-500">Lulus</div></div>
                <div className="text-center"><div className="font-bold text-red-600 text-lg">{QC_ITEMS.flatMap(c=>c.items).filter(i=>i.passed===false).length}</div><div className="text-slate-500">Gagal / Perlu Tindak</div></div>
                <div className="text-center"><div className="font-bold text-yellow-600 text-lg">{QC_ITEMS.flatMap(c=>c.items).filter(i=>i.passed===null).length}</div><div className="text-slate-500">Belum Diuji</div></div>
              </div>
            </div>
            {QC_ITEMS.map(cat => (
              <div key={cat.category} className="bg-white border border-slate-100 rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
                  <span className="font-bold text-slate-700 text-sm">{cat.category}</span>
                </div>
                <div className="divide-y divide-slate-50">
                  {cat.items.map((item, i) => (
                    <div key={i} className="px-4 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="font-medium text-slate-800 text-sm">{item.test}</div>
                          <div className="text-xs text-slate-400 mt-0.5">Standar: {item.standard}</div>
                          <div className="text-xs text-slate-400">Frekuensi: {item.frequency}</div>
                        </div>
                        <div className="flex-shrink-0">
                          {item.passed === true && <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">✓ Lulus</span>}
                          {item.passed === false && <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold">✗ Gagal</span>}
                          {item.passed === null && <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-bold">— Belum</span>}
                        </div>
                      </div>
                      {item.passed === false && (
                        <div className="mt-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2 text-xs text-red-700">
                          ⚠️ <strong>Tindak Lanjut:</strong> Kontraktor wajib perbaiki sebelum pengecoran dilanjutkan. Pengawas MK harus validasi ulang.
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button className="w-full py-3 border-2 border-dashed border-orange-200 text-orange-600 rounded-xl text-sm font-medium hover:bg-orange-50 transition-colors">
              + Tambah Hasil Inspeksi / Pengujian
            </button>
          </div>
        )}

        {/* ── DISPUTE TAB ── */}
        {tab === 'dispute' && (
          <div className="space-y-4">
            <div className="bg-white border border-slate-100 rounded-xl p-4">
              <h2 className="font-bold text-slate-800 mb-1">Penyelesaian Sengketa & Klaim</h2>
              <p className="text-xs text-slate-500 mb-3">Semua sengketa diselesaikan secara bertahap: Musyawarah → Mediasi → Arbitrase BANI.</p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {[['Musyawarah', '24 jam', 'bg-green-100 text-green-700'], ['Mediasi Platform', '7 hari', 'bg-blue-100 text-blue-700'], ['Arbitrase BANI', '30–60 hari', 'bg-orange-100 text-orange-700'], ['Pengadilan', 'Terakhir', 'bg-red-100 text-red-700']].map(([l,d,cls]) => (
                  <div key={l} className={`flex-shrink-0 ${cls} rounded-lg px-3 py-2 text-center text-xs`}>
                    <div className="font-bold">{l}</div>
                    <div className="opacity-70">{d}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {DISPUTES.map(d => (
                <div key={d.id} className={`bg-white border rounded-xl p-4 ${d.status === 'ongoing' ? 'border-orange-200' : 'border-slate-100'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-mono text-xs text-slate-400">{d.id}</div>
                      <h4 className="font-bold text-slate-800 text-sm">{d.title}</h4>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${d.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{d.status === 'resolved' ? '✅ Selesai' : '🔄 Proses'}</span>
                  </div>
                  <div className="space-y-1 text-xs text-slate-600 mb-2">
                    <div>Penggugat: <strong>{d.raised_by}</strong></div>
                    <div>Tergugat: <strong>{d.against}</strong></div>
                    {d.amount && <div>Nilai Klaim: <strong className="text-red-600">{fmtRp(d.amount)}</strong></div>}
                  </div>
                  {d.resolution && <div className="bg-green-50 border border-green-100 rounded-lg p-2 text-xs text-green-700">✅ {d.resolution}</div>}
                  {!d.resolution && <button className="w-full py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 text-xs rounded-lg font-medium transition-colors">Lihat Detail & Mediasi →</button>}
                </div>
              ))}
            </div>
            <button className="w-full py-3 border-2 border-dashed border-red-200 text-red-600 rounded-xl text-sm font-medium hover:bg-red-50 transition-colors">
              ⚠️ Ajukan Klaim / Sengketa Baru
            </button>
          </div>
        )}

        {/* ── ESCROW TAB ── */}
        {tab === 'escrow' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 text-white rounded-xl p-5">
              <div className="text-slate-400 text-xs mb-1">ESCROW ACCOUNT — RancangBangun</div>
              <div className="font-bold text-2xl">Rp 1.662.500.000</div>
              <div className="text-slate-300 text-sm mt-1">Dana tersimpan aman · PT Graha Mandiri ↔ PT Karya Beton</div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-white/10 rounded-lg p-2 text-center"><div className="text-green-300 font-bold">Rp 662 Jt</div><div className="text-slate-400 text-xs">Sudah Cair</div></div>
                <div className="bg-white/10 rounded-lg p-2 text-center"><div className="text-yellow-300 font-bold">Rp 1 M</div><div className="text-slate-400 text-xs">Dalam Escrow</div></div>
                <div className="bg-white/10 rounded-lg p-2 text-center"><div className="text-blue-300 font-bold">Rp 3 M+</div><div className="text-slate-400 text-xs">Belum Disetor</div></div>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-xl p-4">
              <h3 className="font-bold text-slate-800 mb-3">🔄 Mekanisme Escrow Termin</h3>
              <div className="space-y-3">
                {[
                  { step: '1', title: 'Owner setor dana termin ke Escrow', desc: 'Dana masuk ke rekening escrow RancangBangun — bukan langsung ke kontraktor', icon: '💰', done: true },
                  { step: '2', title: 'Kontraktor selesaikan milestone', desc: 'Kontraktor kerjakan dan foto/dokumentasi progress pekerjaan di lapangan', icon: '🏗️', done: true },
                  { step: '3', title: 'Konsultan / MK validasi progress', desc: 'Pengawas verifikasi kualitas & kuantitas, keluarkan Berita Acara kemajuan', icon: '📐', done: true },
                  { step: '4', title: 'Owner ACC Berita Acara', desc: 'Owner menyetujui pencairan termin berdasarkan Berita Acara yang sudah divalidasi', icon: '✅', done: false },
                  { step: '5', title: 'Dana cair ke kontraktor dalam 1×24 jam', desc: 'Setelah persetujuan owner, escrow otomatis transfer ke rekening kontraktor', icon: '🏦', done: false },
                ].map(s => (
                  <div key={s.step} className={`flex gap-3 p-3 rounded-xl ${s.done ? 'bg-green-50 border border-green-100' : 'bg-slate-50 border border-slate-100'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${s.done ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'}`}>{s.done ? '✓' : s.step}</div>
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{s.icon} {s.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="font-bold text-blue-800 mb-2">🔐 Proteksi Dana Escrow</h3>
              <ul className="space-y-2">
                {['Dana dikelola oleh rekening terpisah yang diawasi OJK', 'Tidak dapat dicairkan sepihak — butuh persetujuan kedua pihak', 'Audit trail lengkap setiap transaksi', 'Diproteksi asuransi deposito LPS sampai Rp 2 Miliar', 'Sengketa → arbiter platform yang menentukan pencairan'].map((t,i) => (
                  <li key={i} className="flex gap-2 text-xs text-blue-800"><span className="text-blue-500 flex-shrink-0">✓</span>{t}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-100 rounded-xl p-4">
              <h3 className="font-bold text-slate-800 mb-3">⚡ Aksi Termin Berikutnya</h3>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-3">
                <div className="font-bold text-orange-800 text-sm">Termin 3 — Struktur Lt.3-4</div>
                <div className="text-xs text-orange-700 mt-0.5">Nilai: Rp 712.500.000 · Menunggu Berita Acara dari Konsultan</div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 border border-slate-200 text-slate-700 text-sm rounded-xl hover:bg-slate-50 transition-colors">Lihat Berita Acara</button>
                <button className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-xl font-bold transition-colors">✅ Setujui Pencairan</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AccountabilityHub;
