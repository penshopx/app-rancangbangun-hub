import React, { useState } from 'react';
import {
  TrendingUp, Zap, DollarSign, Users, Shield, BarChart3,
  ArrowRight, CheckCircle, Star, Layers, Globe, Target,
  RefreshCw, Lock, Award, CreditCard, AlertTriangle, Info,
  ChevronDown, ChevronUp, Package, Truck, Clock, Percent
} from 'lucide-react';

const tabs = [
  { id: 'flywheel',  icon: RefreshCw,   label: 'Platform Flywheel' },
  { id: 'revenue',   icon: DollarSign,  label: 'Revenue Architecture' },
  { id: 'matching',  icon: Target,      label: 'Smart Matching' },
  { id: 'fintech',   icon: CreditCard,  label: 'Supply Chain Finance' },
  { id: 'intel',     icon: BarChart3,   label: 'Market Intelligence' },
];

// ─── 1. PLATFORM FLYWHEEL ───────────────────────────────────────────────────
const FlywheelTab = () => {
  const loops = [
    {
      title: 'Growth Loop Utama',
      color: 'orange',
      steps: [
        { icon: '🏗️', label: 'Owner masuk', desc: 'Posting proyek lebih mudah & aman' },
        { icon: '⚖️', label: 'Kompetisi sehat', desc: 'Lebih banyak penawaran → harga lebih kompetitif' },
        { icon: '✅', label: 'Eksekusi terjamin', desc: 'Escrow + QC + jaminan → owner puas' },
        { icon: '⭐', label: 'Reputasi terbangun', desc: 'Track record terverifikasi mendorong kepercayaan' },
        { icon: '🔁', label: 'Referral organik', desc: 'Owner rekomendasikan ke sesama → lebih banyak proyek' },
      ]
    },
    {
      title: 'Supply Loop Kontraktor',
      color: 'blue',
      steps: [
        { icon: '👷', label: 'Kontraktor bergabung', desc: 'Akses proyek tanpa biaya marketing tradisional' },
        { icon: '📊', label: 'Data portofolio tumbuh', desc: 'Setiap proyek selesai = credit score naik' },
        { icon: '💰', label: 'Modal kerja tersedia', desc: 'Invoice factoring & working capital tanpa agunan' },
        { icon: '🚀', label: 'Kapasitas bertumbuh', desc: 'Dapat lebih banyak proyek besar & bernilai tinggi' },
        { icon: '🏆', label: 'Brand premium', desc: 'Badge terverifikasi → dipilih pertama owner baru' },
      ]
    }
  ];

  const networkEffects = [
    { metric: '2x', desc: 'Nilai proyek rata-rata naik setiap 6 bulan aktif di platform', icon: TrendingUp, color: 'orange' },
    { metric: '3.4x', desc: 'Kontraktor aktif 12 bulan menang 3.4x lebih banyak tender', icon: Award, color: 'blue' },
    { metric: '68%', desc: 'Owner kembali posting proyek berikutnya di platform yang sama', icon: RefreshCw, color: 'green' },
    { metric: '12%', desc: 'Biaya akuisisi klien turun per 1000 user baru (network density effect)', icon: Target, color: 'purple' },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <RefreshCw className="w-6 h-6 text-orange-400" />
          <h2 className="text-xl font-bold">Platform Flywheel & Network Effects</h2>
        </div>
        <p className="text-slate-300 text-sm">
          Semakin banyak transaksi → semakin kaya data → semakin baik matching → semakin menarik platform.
          Efek jaringan menciptakan <span className="text-orange-400 font-semibold">moat kompetitif yang sulit direplikasi.</span>
        </p>
      </div>

      {loops.map((loop) => (
        <div key={loop.title} className={`bg-${loop.color}-50 border border-${loop.color}-200 rounded-2xl p-5`}>
          <h3 className={`font-bold text-${loop.color}-800 mb-4 flex items-center gap-2`}>
            <RefreshCw className={`w-4 h-4 text-${loop.color}-600`} />
            {loop.title}
          </h3>
          <div className="flex items-start gap-2 overflow-x-auto pb-2">
            {loop.steps.map((step, i) => (
              <React.Fragment key={i}>
                <div className="flex-shrink-0 text-center w-28">
                  <div className={`w-14 h-14 bg-${loop.color}-100 border-2 border-${loop.color}-300 rounded-full flex items-center justify-center text-2xl mx-auto mb-2`}>
                    {step.icon}
                  </div>
                  <p className={`text-xs font-bold text-${loop.color}-800 leading-tight mb-1`}>{step.label}</p>
                  <p className="text-xs text-slate-500 leading-tight">{step.desc}</p>
                </div>
                {i < loop.steps.length - 1 && (
                  <div className="flex-shrink-0 mt-5 text-slate-400">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </React.Fragment>
            ))}
            <div className="flex-shrink-0 mt-5 text-slate-400">
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="flex-shrink-0 mt-2">
              <div className={`w-10 h-10 bg-${loop.color}-500 rounded-full flex items-center justify-center`}>
                <RefreshCw className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {networkEffects.map((e, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <e.icon className={`w-6 h-6 text-${e.color}-500 mx-auto mb-2`} />
            <div className={`text-3xl font-black text-${e.color}-600 mb-1`}>{e.metric}</div>
            <p className="text-xs text-slate-500 leading-tight">{e.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 text-sm">Strategi Defensif: Data Moat</p>
            <p className="text-xs text-amber-700 mt-1">
              Setiap proyek yang selesai menghasilkan data: harga material real, produktivitas tukang, durasi pekerjaan, 
              kualitas kontraktor. Setelah 10.000+ proyek, platform memiliki <strong>database harga konstruksi paling akurat di Indonesia</strong> — 
              aset yang tidak bisa direplikasi kompetitor baru dalam waktu singkat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── 2. REVENUE ARCHITECTURE ────────────────────────────────────────────────
const RevenueTab = () => {
  const [expanded, setExpanded] = useState(null);

  const streams = [
    {
      id: 'txfee',
      tier: 'Core',
      color: 'orange',
      icon: '💸',
      name: 'Transaction Fee',
      tagline: 'Take rate per transaksi berhasil',
      monthly: 'Rp 120-850 jt',
      mechanism: '1.5%–3% dari nilai kontrak yang berhasil ditandatangani. Fee dibayar oleh pemenang tender setelah kontrak aktif.',
      breakdown: [
        { label: 'Proyek < Rp 500 jt', value: '3.0% fee' },
        { label: 'Proyek Rp 500 jt – 5 M', value: '2.0% fee' },
        { label: 'Proyek > Rp 5 M', value: '1.5% fee (negotiated)' },
        { label: 'Target volume Th1', value: 'Rp 40 M/bulan kontrak' },
      ]
    },
    {
      id: 'subscription',
      tier: 'Core',
      color: 'blue',
      icon: '🎟️',
      name: 'Subscription Tiers',
      tagline: 'SaaS recurring revenue',
      monthly: 'Rp 45-280 jt',
      mechanism: 'Paket langganan bulanan/tahunan dengan fitur eksklusif per segmen pengguna.',
      breakdown: [
        { label: 'Starter (Tukang/Mandor)', value: 'Rp 99rb/bln — akses listing' },
        { label: 'Pro (Kontraktor kecil)', value: 'Rp 499rb/bln — bidding unlimited' },
        { label: 'Business (Kontraktor besar)', value: 'Rp 1.9 jt/bln — analytics + priority' },
        { label: 'Enterprise (Developer)', value: 'Custom — white-label + API' },
      ]
    },
    {
      id: 'fintech',
      tier: 'High-Margin',
      color: 'green',
      icon: '🏦',
      name: 'Fintech Services',
      tagline: 'Invoice factoring & working capital',
      monthly: 'Rp 200-1.2 M',
      mechanism: 'Platform memfasilitasi pencairan invoice lebih cepat. Kontraktor dapat dana dalam 24-48 jam, platform mengambil spread bunga.',
      breakdown: [
        { label: 'Invoice Factoring', value: '1.8%–3.5% per invoice' },
        { label: 'Working Capital Loan', value: '1.2%–2% per bulan' },
        { label: 'Bid Bond Digital', value: 'Rp 500rb flat per tender' },
        { label: 'Performance Bond', value: '0.8% dari nilai proyek' },
      ]
    },
    {
      id: 'procurement',
      tier: 'High-Margin',
      color: 'purple',
      icon: '📦',
      name: 'B2B Procurement',
      tagline: 'Marketplace material konstruksi',
      monthly: 'Rp 80-400 jt',
      mechanism: 'Supplier material membayar listing fee + komisi penjualan. Platform agregasi demand untuk group buying.',
      breakdown: [
        { label: 'Supplier listing', value: 'Rp 2 jt/bln per kategori' },
        { label: 'Sales commission', value: '2%–4% per transaksi material' },
        { label: 'Featured placement', value: 'Rp 5–15 jt/bulan' },
        { label: 'Group buying margin', value: '5%–8% dari selisih harga' },
      ]
    },
    {
      id: 'data',
      tier: 'Future',
      color: 'slate',
      icon: '📊',
      name: 'Data & Intelligence',
      tagline: 'B2B data licensing & API',
      monthly: 'Rp 150-500 jt (Yr2+)',
      mechanism: 'Jual insights berbasis data transaksi ke bank, asuransi, developer properti, pemerintah (PUPR, Bappenas).',
      breakdown: [
        { label: 'Harga Konstruksi Index', value: 'Lisensikan ke bank & appraisal' },
        { label: 'Kontraktor Credit API', value: 'Per-query ke lembaga keuangan' },
        { label: 'Market Report Triwulan', value: 'Berlangganan premium analyst' },
        { label: 'Regulatory reporting', value: 'API ke PUPR & LKPP' },
      ]
    },
    {
      id: 'insurance',
      tier: 'Future',
      color: 'rose',
      icon: '🛡️',
      name: 'Asuransi Konstruksi',
      tagline: 'Embedded insurance via API',
      monthly: 'Rp 100-600 jt (Yr2+)',
      mechanism: 'Partnership dengan Asuransi Jasindo/Askrindo. Platform ambil referral fee per polis terjual.',
      breakdown: [
        { label: 'CAR (Contractor All Risk)', value: '8–12% komisi referral' },
        { label: 'PLI (Public Liability)', value: '10% komisi' },
        { label: 'Jaminan Pemeliharaan', value: 'Bundled dengan kontrak' },
        { label: 'Asuransi Tukang', value: 'Rp 25rb/orang/hari' },
      ]
    },
  ];

  const tierColors = { Core: 'orange', 'High-Margin': 'green', Future: 'slate' };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-900 to-emerald-800 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <DollarSign className="w-6 h-6 text-green-300" />
          <h2 className="text-xl font-bold">Revenue Architecture — Multi-Stream Model</h2>
        </div>
        <p className="text-green-200 text-sm">
          Platform memiliki 6 aliran pendapatan yang saling memperkuat. Dimulai dari transaction fee, 
          berkembang ke fintech dan data intelligence yang margin-nya jauh lebih tinggi.
        </p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {['Core Revenue', 'High-Margin Services', 'Future Layers'].map((t, i) => (
            <div key={t} className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-xs text-green-200 mb-1">{t}</p>
              <p className="font-bold text-lg">{['Th1', 'Th2', 'Th3'][i]}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {streams.map((s) => (
          <div key={s.id} className={`border border-${s.color}-200 rounded-xl overflow-hidden`}>
            <button
              className={`w-full flex items-center gap-4 p-4 bg-${s.color}-50 hover:bg-${s.color}-100 transition-colors text-left`}
              onClick={() => setExpanded(expanded === s.id ? null : s.id)}
            >
              <span className="text-2xl">{s.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`font-bold text-${s.color}-900`}>{s.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full bg-${s.color}-200 text-${s.color}-700 font-medium`}>{s.tier}</span>
                </div>
                <p className="text-xs text-slate-500">{s.tagline}</p>
              </div>
              <div className="text-right mr-3">
                <p className={`font-bold text-${s.color}-700 text-sm`}>{s.monthly}</p>
                <p className="text-xs text-slate-400">est. potensi</p>
              </div>
              {expanded === s.id ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
            </button>
            {expanded === s.id && (
              <div className="p-4 bg-white border-t border-slate-100">
                <p className="text-sm text-slate-600 mb-3">{s.mechanism}</p>
                <div className="grid grid-cols-2 gap-2">
                  {s.breakdown.map((b, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2">
                      <span className="text-xs text-slate-600">{b.label}</span>
                      <span className={`text-xs font-bold text-${s.color}-700`}>{b.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-slate-900 text-white rounded-2xl p-5">
        <h3 className="font-bold mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /> Unit Economics Target</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'GMV Target Yr1', value: 'Rp 200 M/bln', note: 'Gross merchandise value' },
            { label: 'Take Rate Blended', value: '2.3%', note: 'Across all transaction types' },
            { label: 'Net Revenue Yr1', value: 'Rp 4.6 M/bln', note: 'Setelah platform cost' },
            { label: 'LTV:CAC Target', value: '8:1', note: 'Kontraktor aktif 24+ bulan' },
          ].map((u, i) => (
            <div key={i} className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-2xl font-black text-green-400 mb-1">{u.value}</p>
              <p className="text-xs font-semibold text-white mb-0.5">{u.label}</p>
              <p className="text-xs text-slate-400">{u.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── 3. SMART MATCHING ───────────────────────────────────────────────────────
const MatchingTab = () => {
  const [scores, setScores] = useState([
    { name: 'PT Bangun Jaya Abadi', sbu: 'M2 (Gedung)', lokasi: 'Jakarta', score: 91, teknis: 92, finansial: 88, pengalaman: 95, kecepatan: 89, harga: 91, badge: 'Top Match', color: 'orange' },
    { name: 'CV Konstruksi Maju', sbu: 'M1 (Gedung)', lokasi: 'Tangerang', score: 84, teknis: 85, finansial: 90, pengalaman: 78, kecepatan: 82, harga: 86, badge: 'Recommended', color: 'blue' },
    { name: 'PT Graha Persada', sbu: 'M2 (Sipil)', lokasi: 'Bekasi', score: 78, teknis: 80, finansial: 75, pengalaman: 82, kecepatan: 74, harga: 78, badge: null, color: 'slate' },
    { name: 'UD Mandiri Sejahtera', sbu: 'K2 (Gedung)', lokasi: 'Depok', score: 71, teknis: 70, finansial: 72, pengalaman: 68, kecepatan: 75, harga: 69, badge: null, color: 'slate' },
  ]);

  const dimensions = [
    { key: 'teknis', label: 'Kompetensi Teknis', weight: '30%', icon: '🔧', desc: 'SBU grade, sertifikasi, portofolio proyek sejenis' },
    { key: 'finansial', label: 'Kesehatan Finansial', weight: '25%', icon: '💰', desc: 'Modal kerja, rasio likuiditas, track record pembayaran' },
    { key: 'pengalaman', label: 'Pengalaman Relevan', weight: '25%', icon: '📊', desc: 'Jumlah proyek serupa, nilai proyek terbesar, durasi pengalaman' },
    { key: 'kecepatan', label: 'Track Record Waktu', weight: '10%', icon: '⚡', desc: 'Rata-rata ketepatan deadline dari proyek sebelumnya' },
    { key: 'harga', label: 'Kompetitivitas Harga', weight: '10%', icon: '🏷️', desc: 'Dibandingkan median pasar untuk scope pekerjaan serupa' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Target className="w-6 h-6 text-blue-300" />
          <h2 className="text-xl font-bold">Smart Matching Algorithm</h2>
        </div>
        <p className="text-blue-200 text-sm">
          Setiap proyek dianalisis 47 dimensi. Sistem menghasilkan <strong>Compatibility Score</strong> yang 
          mencocokkan kontraktor paling tepat berdasarkan konteks proyek spesifik — bukan sekadar filter kategori.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {dimensions.map((d) => (
          <div key={d.key} className="bg-white border border-slate-200 rounded-xl p-3 text-center">
            <div className="text-2xl mb-1">{d.icon}</div>
            <div className="font-bold text-blue-600 text-lg">{d.weight}</div>
            <div className="text-xs font-semibold text-slate-700 mb-1">{d.label}</div>
            <div className="text-xs text-slate-400 leading-tight">{d.desc}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
          <h3 className="font-bold text-slate-800">Hasil Matching — Proyek: Pembangunan Gudang 2000m² Cikarang</h3>
          <p className="text-xs text-slate-500">Nilai Rp 4.2 M · Durasi 8 bulan · SBU M1/M2 Wajib · Jaminan 5%</p>
        </div>
        <div className="divide-y divide-slate-100">
          {scores.map((c, i) => (
            <div key={i} className={`p-4 ${i === 0 ? 'bg-orange-50' : ''}`}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0 ${
                  i === 0 ? 'bg-orange-500' : i === 1 ? 'bg-blue-500' : 'bg-slate-400'
                }`}>#{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-bold text-slate-800">{c.name}</span>
                    {c.badge && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        c.badge === 'Top Match' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                      }`}>{c.badge}</span>
                    )}
                    <span className="text-xs text-slate-400">{c.sbu} · {c.lokasi}</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1 mb-2">
                    {dimensions.map((d) => (
                      <div key={d.key}>
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xs text-slate-400">{d.key.slice(0, 3)}</span>
                          <span className="text-xs font-semibold text-slate-700">{c[d.key]}</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${i === 0 ? 'bg-orange-400' : i === 1 ? 'bg-blue-400' : 'bg-slate-300'}`}
                            style={{ width: `${c[d.key]}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`text-3xl font-black ${i === 0 ? 'text-orange-600' : i === 1 ? 'text-blue-600' : 'text-slate-400'}`}>{c.score}</div>
                  <div className="text-xs text-slate-400">/ 100</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Zap, title: 'Adaptive Learning', color: 'yellow', desc: 'Setiap proyek selesai digunakan untuk melatih ulang model. Kontraktor yang sering tepat waktu otomatis mendapat boost score.' },
          { icon: Shield, title: 'Anti-Gaming', color: 'red', desc: 'Sistem mendeteksi kontraktor yang memalsukan data portofolio menggunakan cross-reference ke LPJK, SIMBG, dan referensi owner.' },
          { icon: Globe, title: 'Kontekstual Lokal', color: 'green', desc: 'Pembobotan berubah per daerah. Di Papua, prioritas logistik dan lokasi. Di Jawa, lebih ke harga dan kapasitas SDM.' },
        ].map((f) => (
          <div key={f.title} className={`bg-${f.color}-50 border border-${f.color}-200 rounded-xl p-4`}>
            <f.icon className={`w-5 h-5 text-${f.color}-600 mb-2`} />
            <h4 className={`font-bold text-${f.color}-800 mb-1 text-sm`}>{f.title}</h4>
            <p className="text-xs text-slate-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── 4. SUPPLY CHAIN FINANCE ─────────────────────────────────────────────────
const FintechTab = () => {
  const [activeProduct, setActiveProduct] = useState('factoring');

  const products = {
    factoring: {
      name: 'Invoice Factoring',
      icon: '📄',
      tagline: 'Dana cair dalam 24 jam tanpa agunan',
      color: 'green',
      how: [
        { step: '1', title: 'Kontraktor Submit Invoice', desc: 'Upload termin invoice yang sudah disetujui owner + berita acara progress' },
        { step: '2', title: 'Platform Verifikasi', desc: 'AI mengecek keaslian BA, progres, dan riwayat pembayaran owner dalam 15 menit' },
        { step: '3', title: 'Dana Dicairkan 80-90%', desc: 'Rp 800–900 jt per Rp 1 M invoice masuk ke rekening kontraktor dalam 24 jam' },
        { step: '4', title: 'Pelunasan Owner', desc: 'Saat termin jatuh tempo, owner bayar penuh ke platform — sisa 10-20% dikembalikan ke kontraktor dikurangi fee' },
      ],
      rates: [
        { label: 'Factoring fee', value: '1.8%–3.5% per invoice', note: 'Tergantung rating kontraktor' },
        { label: 'Maksimum pencairan', value: '90% nilai invoice', note: 'Sisanya dikembalikan setelah lunas' },
        { label: 'Waktu pencairan', value: '< 24 jam', note: 'Setelah verifikasi selesai' },
        { label: 'Limit awal', value: 'Rp 500 jt', note: 'Naik sesuai track record' },
      ]
    },
    working_capital: {
      name: 'Working Capital Loan',
      icon: '💼',
      tagline: 'Modal kerja untuk mobilisasi proyek baru',
      color: 'blue',
      how: [
        { step: '1', title: 'Ajukan Pinjaman', desc: 'Berdasarkan nilai kontrak SPK yang sudah ditandatangani — tidak perlu agunan fisik' },
        { step: '2', title: 'Credit Scoring Otomatis', desc: 'Model AI menganalisis 30+ variabel: riwayat proyek, pembayaran, kapasitas, dan reputasi platform' },
        { step: '3', title: 'Approval & Disbursement', desc: 'Persetujuan dalam 4 jam kerja. Dana langsung masuk rekening untuk mobilisasi' },
        { step: '4', title: 'Pelunasan Otomatis', desc: 'Cicilan dipotong dari setiap pencairan termin — tidak perlu transfer manual' },
      ],
      rates: [
        { label: 'Bunga', value: '1.2%–2.0% / bulan', note: 'Sesuai credit score kontraktor' },
        { label: 'Maksimum pinjaman', value: '30% nilai kontrak', note: 'Kenaikan bertahap per track record' },
        { label: 'Tenor', value: '3–12 bulan', note: 'Menyesuaikan durasi proyek' },
        { label: 'Agunan', value: 'Zero agunan fisik', note: 'SPK = jaminan virtual' },
      ]
    },
    bid_bond: {
      name: 'Bid Bond Digital',
      icon: '🔐',
      tagline: 'Jaminan penawaran instan tanpa antre bank',
      color: 'purple',
      how: [
        { step: '1', title: 'Kontraktor Daftar Tender', desc: 'Sistem cek credit score — jika memenuhi syarat, bid bond tersedia instan' },
        { step: '2', title: 'Bid Bond Diterbitkan', desc: 'Dokumen jaminan digital berformat resmi diterbitkan dalam < 5 menit' },
        { step: '3', title: 'Owner Verifikasi', desc: 'Owner scan QR code — keaslian dan nilai jaminan terverifikasi real-time' },
        { step: '4', title: 'Selesai/Hangus/Cair', desc: 'Otomatis hangus jika tidak menang, atau dicairkan ke escrow jika wanprestasi' },
      ],
      rates: [
        { label: 'Biaya penerbitan', value: 'Rp 250–750 rb flat', note: 'Tergantung nilai proyek' },
        { label: 'Maksimum nilai', value: 'Rp 5 M per bid bond', note: 'Naik dengan track record' },
        { label: 'Waktu terbit', value: '< 5 menit', note: 'vs 3–5 hari di bank konvensional' },
        { label: 'Berlaku', value: '30–90 hari', note: 'Menyesuaikan masa tender' },
      ]
    }
  };

  const p = products[activeProduct];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <CreditCard className="w-6 h-6 text-emerald-300" />
          <h2 className="text-xl font-bold">Supply Chain Finance — Embedded Fintech</h2>
        </div>
        <p className="text-emerald-200 text-sm">
          Masalah terbesar kontraktor Indonesia: <strong>cash flow</strong>. Termin dibayar 30-90 hari setelah pekerjaan selesai, 
          tapi material dan tukang harus dibayar cash. Platform hadir sebagai <strong>fintech layer</strong> yang memecahkan ini.
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {Object.entries(products).map(([key, prod]) => (
          <button key={key}
            onClick={() => setActiveProduct(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm border transition-all ${
              activeProduct === key
                ? `bg-${prod.color}-500 text-white border-${prod.color}-500`
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            <span>{prod.icon}</span>
            {prod.name}
          </button>
        ))}
      </div>

      <div className={`bg-${p.color}-50 border border-${p.color}-200 rounded-xl p-4`}>
        <h3 className={`font-bold text-${p.color}-800 text-lg mb-1`}>{p.icon} {p.name}</h3>
        <p className={`text-sm text-${p.color}-600 mb-4`}>{p.tagline}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {p.how.map((h) => (
            <div key={h.step} className="bg-white rounded-xl p-3 border border-slate-100">
              <div className={`w-7 h-7 rounded-full bg-${p.color}-500 text-white flex items-center justify-center text-xs font-bold mb-2`}>{h.step}</div>
              <p className="text-xs font-bold text-slate-700 mb-1">{h.title}</p>
              <p className="text-xs text-slate-500 leading-tight">{h.desc}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {p.rates.map((r, i) => (
            <div key={i} className="bg-white rounded-lg p-3 border border-slate-100">
              <p className="text-xs text-slate-500 mb-0.5">{r.label}</p>
              <p className={`font-bold text-${p.color}-700`}>{r.value}</p>
              <p className="text-xs text-slate-400">{r.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-amber-800 text-sm">Regulasi & Partnership Strategy</p>
          <p className="text-xs text-amber-700 mt-1">
            Model fintech ini dijalankan melalui <strong>partnership dengan P2P Lending berizin OJK</strong> atau 
            <strong> modal dari bank mitra</strong> (tidak langsung meminjamkan dana sendiri). 
            Platform berperan sebagai <strong>originator & underwriter</strong> berbasis data transaksi internal — 
            sebuah keunggulan yang tidak dimiliki lender konvensional manapun.
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── 5. MARKET INTELLIGENCE ──────────────────────────────────────────────────
const IntelTab = () => {
  const materials = [
    { name: 'Besi Beton D13', unit: '/kg', price: 14200, change: +3.2, trend: 'up', region: 'Jabodetabek' },
    { name: 'Semen Portland 50kg', unit: '/sak', price: 68500, change: -1.4, trend: 'down', region: 'Jabodetabek' },
    { name: 'Pasir Cor', unit: '/m³', price: 285000, change: +8.1, trend: 'up', region: 'Jabodetabek' },
    { name: 'Batu Split 2-3cm', unit: '/m³', price: 320000, change: +2.7, trend: 'up', region: 'Jabodetabek' },
    { name: 'Bata Merah', unit: '/1000 bata', price: 1250000, change: -0.8, trend: 'down', region: 'Jabodetabek' },
    { name: 'Cat Tembok Dulux 5kg', unit: '/kaleng', price: 185000, change: 0, trend: 'flat', region: 'Nasional' },
  ];

  const riskProfiles = [
    { type: 'Owner Default Risk', score: 'Rendah', pct: 12, color: 'green', desc: 'Berdasarkan histori pembayaran, aset, dan rating kredit' },
    { type: 'Contractor Delivery Risk', score: 'Sedang', pct: 34, color: 'yellow', desc: 'Kemungkinan keterlambatan > 15 hari dari schedule kontrak' },
    { type: 'Material Price Volatility', score: 'Tinggi', pct: 61, color: 'red', desc: '3 bulan ke depan: besi dan material baja diprediksi naik 8-12%' },
    { type: 'Labor Shortage Risk', score: 'Sedang', pct: 41, color: 'yellow', desc: 'Kapasitas tukang spesialis di Jabodetabek mulai ketat Q2' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-violet-900 to-purple-900 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="w-6 h-6 text-violet-300" />
          <h2 className="text-xl font-bold">Market Intelligence & Risk Engine</h2>
        </div>
        <p className="text-violet-200 text-sm">
          Data dari ribuan transaksi menghasilkan <strong>Indeks Harga Konstruksi Real-time</strong> dan 
          model prediksi risiko yang membantu semua pihak mengambil keputusan lebih cerdas.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Package className="w-4 h-4 text-purple-500" /> Indeks Harga Material — Live
          </h3>
          <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> Update harian dari 500+ supplier</span>
        </div>
        <div className="divide-y divide-slate-50">
          {materials.map((m, i) => (
            <div key={i} className="px-4 py-3 flex items-center gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">{m.name}</p>
                <p className="text-xs text-slate-400">{m.region} · per {m.unit}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-800">Rp {m.price.toLocaleString('id-ID')}</p>
                <p className={`text-xs font-semibold flex items-center justify-end gap-0.5 ${
                  m.trend === 'up' ? 'text-red-500' : m.trend === 'down' ? 'text-green-500' : 'text-slate-400'
                }`}>
                  {m.trend === 'up' ? '▲' : m.trend === 'down' ? '▼' : '—'}
                  {Math.abs(m.change)}% 30 hari
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-100 px-4 py-3">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" /> Risk Intelligence Dashboard
          </h3>
        </div>
        <div className="p-4 space-y-4">
          {riskProfiles.map((r, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className={`px-2 py-1 rounded text-xs font-bold ${
                r.color === 'green' ? 'bg-green-100 text-green-700' :
                r.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>{r.score}</div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800 mb-1">{r.type}</p>
                <div className="h-2 bg-slate-100 rounded-full mb-1">
                  <div className={`h-full rounded-full ${
                    r.color === 'green' ? 'bg-green-400' : r.color === 'yellow' ? 'bg-yellow-400' : 'bg-red-400'
                  }`} style={{ width: `${r.pct}%` }} />
                </div>
                <p className="text-xs text-slate-500">{r.desc}</p>
              </div>
              <span className={`font-bold text-sm ${
                r.color === 'green' ? 'text-green-600' : r.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'
              }`}>{r.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: '🗺️', title: 'Heatmap Demand Regional',
            desc: 'Peta panas proyek aktif per kabupaten/kota. Kontraktor bisa prediksi di mana permintaan akan meledak 3 bulan ke depan.'
          },
          {
            icon: '📉', title: 'Benchmark RAB Otomatis',
            desc: 'Input spesifikasi proyek → sistem bandingkan dengan 1000+ proyek serupa → hasilkan RAB benchmark yang realistis per kota.'
          },
          {
            icon: '🤖', title: 'Prediksi Durasi Proyek',
            desc: 'Model ML memprediksi probabilitas keterlambatan berdasarkan scope, cuaca historis, ketersediaan tukang, dan kompleksitas.'
          },
        ].map((f, i) => (
          <div key={i} className="bg-violet-50 border border-violet-200 rounded-xl p-4">
            <div className="text-3xl mb-2">{f.icon}</div>
            <h4 className="font-bold text-violet-800 text-sm mb-1">{f.title}</h4>
            <p className="text-xs text-slate-600">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 text-white rounded-2xl p-5">
        <h3 className="font-bold mb-3 flex items-center gap-2"><Layers className="w-4 h-4 text-violet-400" /> Data Assets yang Dihasilkan Platform</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          {[
            { label: 'Data Points per Proyek', value: '2,400+' },
            { label: 'Harga Material Terpantau', value: '3,800 SKU' },
            { label: 'Benchmark RAB Tersedia', value: '120 Tipe' },
            { label: 'Indikator Risiko Aktif', value: '47 var' },
          ].map((d, i) => (
            <div key={i} className="bg-white/10 rounded-xl p-3">
              <div className="text-2xl font-black text-violet-300 mb-1">{d.value}</div>
              <div className="text-xs text-slate-300">{d.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function PlatformEngine() {
  const [activeTab, setActiveTab] = useState('flywheel');

  const renderTab = () => {
    switch (activeTab) {
      case 'flywheel': return <FlywheelTab />;
      case 'revenue':  return <RevenueTab />;
      case 'matching': return <MatchingTab />;
      case 'fintech':  return <FintechTab />;
      case 'intel':    return <IntelTab />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Platform Engine</h1>
            <p className="text-xs text-slate-500">Sistem bisnis inovatif — monetisasi, network effects, fintech, intelligence</p>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-slate-200 px-6 flex-shrink-0 overflow-x-auto">
        <div className="flex gap-1 py-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {renderTab()}
      </div>
    </div>
  );
}
