import React, { useState } from 'react';

const formatRp = (n) => 'Rp ' + Number(n).toLocaleString('id-ID');
const fmtDate = (d) => d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-';

const INVOICES = [
  { id: 'INV-2025-001', project: 'Rumah 2 Lantai - Pak Budi', client: 'Budi Santoso', contractor: 'CV Bangun Jaya', termin: 'Termin 1 - Pekerjaan Pondasi', amount: 127500000, tax: 14025000, total: 141525000, status: 'paid', issued: '2025-03-01', due: '2025-03-15', paid: '2025-03-12', bank: 'BCA - 1234567890 a.n. CV Bangun Jaya' },
  { id: 'INV-2025-002', project: 'Rumah 2 Lantai - Pak Budi', client: 'Budi Santoso', contractor: 'CV Bangun Jaya', termin: 'Termin 2 - Struktur Lantai 1', amount: 170000000, tax: 18700000, total: 188700000, status: 'paid', issued: '2025-04-05', due: '2025-04-20', paid: '2025-04-18', bank: 'BCA - 1234567890 a.n. CV Bangun Jaya' },
  { id: 'INV-2025-003', project: 'Rumah 2 Lantai - Pak Budi', client: 'Budi Santoso', contractor: 'CV Bangun Jaya', termin: 'Termin 3 - Struktur Lantai 2', amount: 170000000, tax: 18700000, total: 188700000, status: 'pending', issued: '2025-05-01', due: '2025-05-15', paid: null, bank: 'BCA - 1234567890 a.n. CV Bangun Jaya' },
  { id: 'INV-2025-004', project: 'Renovasi Kantor PT Graha', client: 'PT Graha Mandiri', contractor: 'PT Konstruksi Prima', termin: 'Termin 1 - Demolisi', amount: 230000000, tax: 25300000, total: 255300000, status: 'paid', issued: '2025-02-20', due: '2025-03-05', paid: '2025-03-03', bank: 'BRI - 9876543210 a.n. PT Konstruksi Prima' },
  { id: 'INV-2025-005', project: 'Renovasi Kantor PT Graha', client: 'PT Graha Mandiri', contractor: 'PT Konstruksi Prima', termin: 'Termin 2 - Pekerjaan Struktur', amount: 575000000, tax: 63250000, total: 638250000, status: 'overdue', issued: '2025-04-22', due: '2025-05-07', paid: null, bank: 'BRI - 9876543210 a.n. PT Konstruksi Prima' },
];

const STATUS_MAP = {
  paid: { label: 'Lunas', color: 'bg-green-100 text-green-700', icon: '✅' },
  pending: { label: 'Menunggu', color: 'bg-yellow-100 text-yellow-700', icon: '⏳' },
  overdue: { label: 'Jatuh Tempo', color: 'bg-red-100 text-red-700', icon: '⚠️' },
  draft: { label: 'Draft', color: 'bg-slate-100 text-slate-600', icon: '📝' },
};

const InvoiceDetail = ({ inv, onClose }) => (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
      {/* Invoice Header */}
      <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-t-2xl">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-2xl font-bold">🏗️ RancangBangun</div>
            <div className="text-slate-400 text-xs mt-1">Platform Konstruksi Indonesia</div>
          </div>
          <div className="text-right">
            <div className="text-orange-400 font-bold text-lg">{inv.id}</div>
            <div className={`mt-1 inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${STATUS_MAP[inv.status].color}`}>
              {STATUS_MAP[inv.status].icon} {STATUS_MAP[inv.status].label}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Parties */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-slate-400 font-medium mb-1">DARI (Kontraktor)</div>
            <div className="font-bold text-slate-800 text-sm">{inv.contractor}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium mb-1">KEPADA (Owner/Klien)</div>
            <div className="font-bold text-slate-800 text-sm">{inv.client}</div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-3">
          <div className="text-xs text-slate-500 mb-1">Proyek</div>
          <div className="font-semibold text-slate-800 text-sm">{inv.project}</div>
          <div className="text-xs text-slate-500 mt-1">{inv.termin}</div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center bg-slate-50 rounded-lg p-2"><div className="text-slate-400">Tanggal Invoice</div><div className="font-bold text-slate-700 mt-0.5">{fmtDate(inv.issued)}</div></div>
          <div className="text-center bg-yellow-50 rounded-lg p-2"><div className="text-yellow-600">Jatuh Tempo</div><div className="font-bold text-yellow-700 mt-0.5">{fmtDate(inv.due)}</div></div>
          <div className="text-center bg-green-50 rounded-lg p-2"><div className="text-green-600">Tanggal Bayar</div><div className="font-bold text-green-700 mt-0.5">{inv.paid ? fmtDate(inv.paid) : '—'}</div></div>
        </div>

        {/* Amount Breakdown */}
        <div className="border border-slate-100 rounded-xl overflow-hidden">
          <div className="bg-slate-50 px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wide">Rincian Pembayaran</div>
          <div className="p-4 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-slate-600">Nilai Pekerjaan</span><span className="font-medium">{formatRp(inv.amount)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-600">PPN 11%</span><span className="font-medium">{formatRp(inv.tax)}</span></div>
            <div className="flex justify-between font-bold text-base border-t border-slate-100 pt-2 mt-2"><span>Total Tagihan</span><span className="text-orange-600">{formatRp(inv.total)}</span></div>
          </div>
        </div>

        {/* Bank Info */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
          <div className="text-xs text-blue-600 font-medium mb-1">Rekening Pembayaran</div>
          <div className="font-semibold text-blue-800 text-sm">{inv.bank}</div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-100 flex gap-3">
        <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 text-sm rounded-xl hover:bg-slate-50">Tutup</button>
        <button className="flex-1 px-4 py-2.5 bg-orange-500 text-white text-sm rounded-xl font-bold hover:bg-orange-600 transition-colors">🖨️ Cetak / Unduh PDF</button>
      </div>
    </div>
  </div>
);

const InvoiceManager = () => {
  const [invoices] = useState(INVOICES);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showNew, setShowNew] = useState(false);

  const filtered = filter === 'all' ? invoices : invoices.filter(i => i.status === filter);
  const totalTagihan = invoices.filter(i => i.status !== 'paid').reduce((s, i) => s + i.total, 0);
  const totalLunas = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0);
  const overdue = invoices.filter(i => i.status === 'overdue').length;

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="bg-white border-b border-slate-100 px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold text-slate-800">📄 Manajemen Invoice</h1>
            <p className="text-slate-500 text-sm">{invoices.length} invoice · {overdue > 0 ? <span className="text-red-500">{overdue} jatuh tempo</span> : 'Tidak ada jatuh tempo'}</p>
          </div>
          <button onClick={() => setShowNew(true)} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-colors">
            + Buat Invoice
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-green-50 border border-green-100 rounded-xl p-2.5 text-center">
            <div className="text-xs text-green-600 font-medium">Sudah Lunas</div>
            <div className="font-bold text-green-800 text-sm">{formatRp(totalLunas)}</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-2.5 text-center">
            <div className="text-xs text-yellow-600 font-medium">Belum Bayar</div>
            <div className="font-bold text-yellow-800 text-sm">{formatRp(totalTagihan)}</div>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-xl p-2.5 text-center">
            <div className="text-xs text-red-600 font-medium">Jatuh Tempo</div>
            <div className="font-bold text-red-800 text-sm">{overdue} invoice</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1">
          {[['all', 'Semua'], ['pending', 'Menunggu'], ['paid', 'Lunas'], ['overdue', 'Jatuh Tempo']].map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${filter === v ? 'bg-orange-100 text-orange-700' : 'text-slate-500 hover:bg-slate-100'}`}>{l}</button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filtered.map(inv => {
          const s = STATUS_MAP[inv.status];
          return (
            <div key={inv.id} className="bg-white border border-slate-100 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer hover:-translate-y-0.5" onClick={() => setSelected(inv)}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.color}`}>{s.icon} {s.label}</span>
                    <span className="text-xs text-slate-400 font-mono">{inv.id}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm">{inv.project}</h3>
                  <p className="text-xs text-slate-500">{inv.termin}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-800">{formatRp(inv.total)}</div>
                  <div className="text-xs text-slate-400">termasuk PPN</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-50">
                <span>📅 Terbit: {fmtDate(inv.issued)}</span>
                <span className={inv.status === 'overdue' ? 'text-red-500 font-medium' : ''}>⏰ Jatuh tempo: {fmtDate(inv.due)}</span>
                <span className="text-orange-500 font-medium">Lihat Detail →</span>
              </div>
            </div>
          );
        })}
      </div>

      {selected && <InvoiceDetail inv={selected} onClose={() => setSelected(null)} />}

      {showNew && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-5">
            <h3 className="font-bold text-slate-800 mb-4">📄 Buat Invoice Baru</h3>
            <div className="space-y-3">
              <div><label className="text-xs font-medium text-slate-600 mb-1 block">Proyek</label><select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"><option>Rumah 2 Lantai - Pak Budi</option><option>Renovasi Kantor PT Graha</option></select></div>
              <div><label className="text-xs font-medium text-slate-600 mb-1 block">Termin / Milestone</label><input placeholder="cth: Termin 3 - Pekerjaan Atap" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" /></div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Nilai (Rp)</label><input placeholder="170000000" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" /></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Jatuh Tempo</label><input type="date" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" /></div>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowNew(false)} className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 text-sm rounded-xl">Batal</button>
              <button onClick={() => setShowNew(false)} className="flex-1 px-4 py-2.5 bg-orange-500 text-white text-sm rounded-xl font-bold">Buat Invoice</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceManager;
