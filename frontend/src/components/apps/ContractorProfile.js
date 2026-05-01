import React, { useState } from 'react';

const SBU_LIST = {
  'BG001': { name: 'Gedung Hunian', icon: '🏠', desc: 'Rumah, Apartemen, Kost' },
  'BG002': { name: 'Gedung Perkantoran', icon: '🏢', desc: 'Kantor, Coworking' },
  'BG003': { name: 'Gedung Industri', icon: '🏭', desc: 'Pabrik, Gudang, Workshop' },
  'BG004': { name: 'Gedung Perbelanjaan', icon: '🏬', desc: 'Mal, Ruko, Pasar' },
  'BG005': { name: 'Gedung Kesehatan', icon: '🏥', desc: 'RS, Klinik, Puskesmas' },
  'BG006': { name: 'Gedung Pendidikan', icon: '🏫', desc: 'Sekolah, Kampus' },
  'BS001': { name: 'Jalan', icon: '🛣️', desc: 'Jalan Aspal, Hotmix, Beton' },
  'BS002': { name: 'Jembatan', icon: '🌉', desc: 'Jembatan Beton, Baja' },
  'IN001': { name: 'Instalasi Listrik', icon: '⚡', desc: 'Panel, Kabel, Genset' },
  'IN002': { name: 'Mekanikal', icon: '⚙️', desc: 'HVAC, Plumbing, Pompa' },
};

const CONTRACTORS = [
  {
    id: 1, name: 'PT Karya Beton Nusantara', type: 'PT', grade: 'B2', verified: true,
    rating: 4.8, reviews_count: 32, projects_done: 47, years_exp: 12,
    location: 'Jakarta Selatan', phone: '021-7654321', email: 'tender@karya-beton.co.id',
    npwp: '01.234.567.8-123.000', lpjk_no: 'LPJK-BG-2019-0012345',
    sbu: ['BG002', 'BG003', 'IN001'],
    specializations: ['Gedung Bertingkat', 'Struktur Beton', 'Renovasi Komersial'],
    description: 'Kontraktor berpengalaman dengan spesialisasi gedung perkantoran dan industri di Jabodetabek. Tim profesional 50+ orang, peralatan lengkap, track record terbukti.',
    certifications: ['ISO 9001:2015', 'OHSAS 18001', 'K3 Umum'],
    portfolio: [
      { name: 'Gedung Kantor 8 Lantai - Sudirman', year: 2024, value: 'Rp 18 M', status: 'Selesai', category: 'Gedung Perkantoran' },
      { name: 'Pabrik Manufaktur - Karawang', year: 2023, value: 'Rp 12 M', status: 'Selesai', category: 'Gedung Industri' },
      { name: 'Renovasi Hotel 4 Lantai - Gatot Subroto', year: 2023, value: 'Rp 6.5 M', status: 'Selesai', category: 'Renovasi' },
      { name: 'Kompleks Perkantoran - BSD', year: 2022, value: 'Rp 25 M', status: 'Selesai', category: 'Gedung Perkantoran' },
    ],
    reviews: [
      { name: 'PT Graha Mandiri', rating: 5, text: 'Kualitas sangat memuaskan, selesai tepat waktu. Sangat profesional dalam komunikasi dan laporan progress.', date: 'Mar 2024' },
      { name: 'Developer XYZ', rating: 5, text: 'Tim solid, pengawasan ketat, material quality. Akan pakai lagi untuk proyek berikutnya.', date: 'Jan 2024' },
      { name: 'PT Industri Maju', rating: 4, text: 'Pekerjaan bagus, sedikit delay karena cuaca. Overall sangat merekomendasikan.', date: 'Nov 2023' },
    ],
    monthly_capacity: 'Rp 5–20 Miliar',
    workers: 55, equipment: ['Tower Crane', 'Concrete Pump', 'Excavator'],
  },
  {
    id: 2, name: 'CV Bangun Jaya Mandiri', type: 'CV', grade: 'M1', verified: true,
    rating: 4.6, reviews_count: 18, projects_done: 23, years_exp: 7,
    location: 'Bekasi, Jawa Barat', phone: '021-8876543', email: 'info@bangunja.ya',
    npwp: '02.345.678.9-234.000', lpjk_no: 'LPJK-BG-2020-0023456',
    sbu: ['BG001', 'BG006'],
    specializations: ['Perumahan', 'Renovasi Rumah', 'Gedung Pendidikan'],
    description: 'CV spesialis perumahan dan gedung pendidikan di wilayah Jabodetabek. Pengalaman 7 tahun dengan 23 proyek selesai. Tim ahli struktur, arsitektur, dan MEP.',
    certifications: ['K3 Umum', 'LPJK Terdaftar'],
    portfolio: [
      { name: 'Komplek Perumahan 30 Unit - Bekasi', year: 2024, value: 'Rp 9 M', status: 'Selesai', category: 'Perumahan' },
      { name: 'SD Negeri 12 Ruang - Depok', year: 2023, value: 'Rp 4.2 M', status: 'Selesai', category: 'Gedung Pendidikan' },
      { name: 'Renovasi Rumah Mewah - Sentul', year: 2024, value: 'Rp 1.8 M', status: 'Selesai', category: 'Renovasi' },
    ],
    reviews: [
      { name: 'Pak Budi S.', rating: 5, text: 'Rumah impian kami selesai tepat waktu dan sesuai spesifikasi. Terima kasih CV Bangun Jaya!', date: 'Apr 2024' },
      { name: 'Dinas Pendidikan Kota', rating: 4, text: 'Pekerjaan sekolah memuaskan, komunikasi baik, tidak ada masalah berarti.', date: 'Des 2023' },
    ],
    monthly_capacity: 'Rp 500 Juta–3 Miliar',
    workers: 22, equipment: ['Concrete Mixer', 'Scaffolding Set', 'Alat Tukang Lengkap'],
  },
  {
    id: 3, name: 'PT Infra Jalan Nusantara', type: 'PT', grade: 'B1', verified: true,
    rating: 4.9, reviews_count: 41, projects_done: 62, years_exp: 15,
    location: 'Bandung, Jawa Barat', phone: '022-5544332', email: 'tender@infrajalan.id',
    npwp: '03.456.789.0-345.000', lpjk_no: 'LPJK-BS-2017-0034567',
    sbu: ['BS001', 'BS002'],
    specializations: ['Jalan Hotmix', 'Jembatan Beton', 'Infrastruktur Perkotaan'],
    description: 'Kontraktor spesialis jalan dan jembatan berpengalaman 15 tahun. Sudah mengerjakan 62 proyek jalan/jembatan di Jabar dan Jateng. Alat berat lengkap milik sendiri.',
    certifications: ['ISO 9001:2015', 'K3 Konstruksi', 'LPJK BS001', 'LPJK BS002'],
    portfolio: [
      { name: 'Jalan Hotmix 8 KM - Cirebon', year: 2024, value: 'Rp 5.6 M', status: 'Selesai', category: 'Jalan' },
      { name: 'Jembatan Beton 25m - Garut', year: 2024, value: 'Rp 2.3 M', status: 'Selesai', category: 'Jembatan' },
      { name: 'Pelebaran Jalan 5 KM - Tasik', year: 2023, value: 'Rp 3.8 M', status: 'Selesai', category: 'Jalan' },
    ],
    reviews: [
      { name: 'Dinas PU Kab. Bandung', rating: 5, text: 'Hasil pekerjaan jalan sangat bagus, sesuai spesifikasi teknis. Rekomendasi tinggi!', date: 'Feb 2024' },
      { name: 'Pemda Cirebon', rating: 5, text: 'Profesional, on-time, dan kualitas terjaga. Sudah 3x pakai untuk proyek jalan.', date: 'Jan 2024' },
    ],
    monthly_capacity: 'Rp 3–15 Miliar',
    workers: 78, equipment: ['Asphalt Finisher', 'Vibro Roller', 'Dump Truck 10 unit', 'Motor Grader'],
  },
  {
    id: 4, name: 'CV Mekanikal Elektrikal Prima', type: 'CV', grade: 'M1', verified: true,
    rating: 4.7, reviews_count: 24, projects_done: 35, years_exp: 9,
    location: 'Tangerang, Banten', phone: '021-5533221', email: 'project@meprima.co.id',
    npwp: '04.567.890.1-456.000', lpjk_no: 'LPJK-IN-2019-0045678',
    sbu: ['IN001', 'IN002'],
    specializations: ['Instalasi Listrik', 'HVAC', 'Fire Protection', 'Plumbing'],
    description: 'Spesialis MEP (Mekanikal Elektrikal Plumbing) untuk gedung komersial dan industri. Pengalaman 9 tahun di wilayah Jabodetabek. Teknisi bersertifikat PUIL dan HVAC.',
    certifications: ['PUIL 2011', 'K3 Listrik', 'LPJK IN001', 'Sertifikat HVAC'],
    portfolio: [
      { name: 'MEP Mal 5 Lantai - Serpong', year: 2024, value: 'Rp 3.5 M', status: 'Berlangsung', category: 'MEP' },
      { name: 'HVAC Pabrik Farmasi - Tangerang', year: 2023, value: 'Rp 2.1 M', status: 'Selesai', category: 'HVAC' },
      { name: 'Instalasi Listrik Gedung Kantor - BSD', year: 2023, value: 'Rp 1.2 M', status: 'Selesai', category: 'Listrik' },
    ],
    reviews: [
      { name: 'PT Mall Developer', rating: 5, text: 'Tim MEP sangat berpengalaman, koordinasi dengan kontraktor sipil bagus.', date: 'Mei 2024' },
      { name: 'PT Farmasi Nusantara', rating: 4, text: 'Hasil HVAC memuaskan, responsif saat ada issue teknis.', date: 'Des 2023' },
    ],
    monthly_capacity: 'Rp 500 Juta–5 Miliar',
    workers: 30, equipment: ['Panel Assembly Tools', 'HVAC Equipment', 'Thermal Camera'],
  },
  {
    id: 5, name: 'PT Bangun Konstruksi Abadi', type: 'PT', grade: 'B2', verified: false,
    rating: 4.2, reviews_count: 8, projects_done: 12, years_exp: 5,
    location: 'Surabaya, Jawa Timur', phone: '031-3322110', email: 'bid@bkabadi.com',
    npwp: '05.678.901.2-567.000', lpjk_no: 'LPJK-BG-2022-0056789',
    sbu: ['BG001', 'BG002'],
    specializations: ['Rumah Tinggal', 'Gedung Sederhana', 'Renovasi'],
    description: 'Kontraktor muda berbasis Surabaya dengan pengalaman 5 tahun. Spesialis perumahan dan gedung menengah di Jawa Timur.',
    certifications: ['K3 Umum'],
    portfolio: [
      { name: 'Rumah 2 Lantai Cluster - Sidoarjo', year: 2024, value: 'Rp 1.2 M', status: 'Selesai', category: 'Perumahan' },
      { name: 'Ruko 3 Lantai - Surabaya Selatan', year: 2023, value: 'Rp 800 Juta', status: 'Selesai', category: 'Komersial' },
    ],
    reviews: [
      { name: 'Pak Ahmad', rating: 4, text: 'Cukup memuaskan, ada beberapa finishing yang perlu diperbaiki tapi cepat ditangani.', date: 'Mar 2024' },
    ],
    monthly_capacity: 'Rp 200 Juta–1 Miliar',
    workers: 14, equipment: ['Concrete Mixer', 'Scaffolding'],
  },
];

const GradeInfo = { 'B2': { label: 'Besar Kelas 2', color: 'purple' }, 'B1': { label: 'Besar Kelas 1', color: 'purple' }, 'M1': { label: 'Menengah', color: 'blue' }, 'K1': { label: 'Kecil', color: 'green' } };

const StarRating = ({ rating, size = 'sm' }) => (
  <span className="flex items-center gap-0.5">
    {[1,2,3,4,5].map(i => (
      <span key={i} className={size === 'lg' ? 'text-lg' : 'text-sm'} style={{ color: i <= Math.round(rating) ? '#FBBF24' : '#D1D5DB' }}>★</span>
    ))}
  </span>
);

const ContractorCard = ({ c, onClick }) => {
  const grade = GradeInfo[c.grade] || { label: c.grade, color: 'slate' };
  const gradeColors = { purple: 'bg-purple-100 text-purple-700', blue: 'bg-blue-100 text-blue-700', green: 'bg-green-100 text-green-700' };
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-5 hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer" onClick={() => onClick(c)}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {c.verified && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">✓ Verified</span>}
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${gradeColors[grade.color]}`}>{grade.label}</span>
          </div>
          <h3 className="font-bold text-slate-800">{c.name}</h3>
          <p className="text-xs text-slate-500 mt-0.5">📍 {c.location} · {c.years_exp} tahun pengalaman</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 justify-end">
            <StarRating rating={c.rating} />
            <span className="font-bold text-slate-700 text-sm">{c.rating}</span>
          </div>
          <p className="text-xs text-slate-400">{c.reviews_count} ulasan</p>
        </div>
      </div>
      <p className="text-slate-600 text-sm mb-3 line-clamp-2">{c.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {c.sbu.map(s => (
          <span key={s} className="bg-orange-50 border border-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full font-medium">
            {s} {SBU_LIST[s]?.icon} {SBU_LIST[s]?.name}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-50">
        <span>🏗️ {c.projects_done} proyek selesai</span>
        <span>👷 {c.workers} pekerja</span>
        <button className="text-orange-500 font-semibold hover:underline">Lihat Profil →</button>
      </div>
    </div>
  );
};

const ContractorDetail = ({ c, onBack }) => {
  const [tab, setTab] = useState('profile');
  const [contactOpen, setContactOpen] = useState(false);
  const grade = GradeInfo[c.grade] || { label: c.grade, color: 'slate' };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="bg-white border-b border-slate-100 px-5 py-4">
        <button onClick={onBack} className="text-orange-500 text-sm mb-3 hover:underline">← Kembali ke Direktori</button>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              {c.verified ? (
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">✓ VERIFIED LPJK</span>
              ) : (
                <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2.5 py-1 rounded-full">⚠ Menunggu Verifikasi</span>
              )}
              <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-0.5 rounded-full">{grade.label}</span>
              <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full">{c.type}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-800">{c.name}</h2>
            <p className="text-sm text-slate-500">📍 {c.location}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 justify-end mb-1">
              <StarRating rating={c.rating} size="lg" />
            </div>
            <div className="text-2xl font-bold text-slate-800">{c.rating}<span className="text-sm text-slate-400 font-normal">/5</span></div>
            <div className="text-xs text-slate-400">{c.reviews_count} ulasan · {c.projects_done} proyek</div>
          </div>
        </div>
        {/* Key Stats */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[['🏗️', c.projects_done, 'Proyek'], ['👷', c.workers, 'Pekerja'], ['📅', c.years_exp + 'th', 'Pengalaman'], ['💰', c.monthly_capacity, 'Kapasitas/bln']].map(([icon, val, label]) => (
            <div key={label} className="bg-slate-50 rounded-lg p-2 text-center">
              <div className="text-base">{icon}</div>
              <div className="font-bold text-slate-800 text-xs">{val}</div>
              <div className="text-slate-400 text-xs">{label}</div>
            </div>
          ))}
        </div>
        {/* Tabs */}
        <div className="flex gap-1 border-b border-slate-100">
          {[['profile', 'Profil & SBU'], ['portfolio', 'Portofolio'], ['reviews', 'Ulasan'], ['certif', 'Sertifikat']].map(([v, l]) => (
            <button key={v} onClick={() => setTab(v)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === v ? 'border-orange-500 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>{l}</button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {tab === 'profile' && (
          <div className="space-y-4">
            <div className="bg-white border border-slate-100 rounded-xl p-4">
              <h3 className="font-semibold text-slate-800 mb-2">Tentang Perusahaan</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{c.description}</p>
            </div>
            <div className="bg-white border border-slate-100 rounded-xl p-4">
              <h3 className="font-semibold text-slate-800 mb-3">Klasifikasi SBU / LPJK</h3>
              <div className="space-y-2">
                {c.sbu.map(s => {
                  const info = SBU_LIST[s];
                  return (
                    <div key={s} className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-lg p-3">
                      <span className="text-xl">{info?.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-orange-800 text-sm">{s} — {info?.name}</div>
                        <div className="text-xs text-orange-600">{info?.desc}</div>
                      </div>
                      {c.verified && <span className="text-green-600 text-xs font-bold">✓ Aktif</span>}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-white border border-slate-100 rounded-xl p-4">
              <h3 className="font-semibold text-slate-800 mb-2">Spesialisasi</h3>
              <div className="flex flex-wrap gap-2">
                {c.specializations.map(s => <span key={s} className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full">{s}</span>)}
              </div>
            </div>
            <div className="bg-white border border-slate-100 rounded-xl p-4">
              <h3 className="font-semibold text-slate-800 mb-2">Alat Berat / Equipment</h3>
              <div className="flex flex-wrap gap-2">
                {c.equipment.map(e => <span key={e} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-100">🔧 {e}</span>)}
              </div>
            </div>
            <div className="bg-white border border-slate-100 rounded-xl p-4">
              <h3 className="font-semibold text-slate-800 mb-3">Informasi Legal</h3>
              <div className="space-y-2">
                {[['NPWP', c.npwp], ['No. LPJK', c.lpjk_no], ['Tipe Badan Usaha', c.type], ['Grade LPJK', grade.label]].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm py-1.5 border-b border-slate-50">
                    <span className="text-slate-500">{k}</span>
                    <span className="font-medium text-slate-700">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'portfolio' && (
          <div className="space-y-3">
            {c.portfolio.map((p, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-slate-800">{p.name}</h4>
                    <p className="text-xs text-slate-500">{p.category} · {p.year}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600 text-sm">{p.value}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.status === 'Selesai' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{p.status}</span>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg h-24 flex items-center justify-center text-slate-300 text-sm border-2 border-dashed border-slate-200">
                  📷 Foto Proyek
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'reviews' && (
          <div className="space-y-3">
            <div className="bg-white border border-slate-100 rounded-xl p-4 flex items-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-800">{c.rating}</div>
                <StarRating rating={c.rating} size="lg" />
                <div className="text-xs text-slate-400 mt-1">{c.reviews_count} ulasan</div>
              </div>
              <div className="flex-1">
                {[5,4,3,2,1].map(star => {
                  const count = c.reviews.filter(r => r.rating === star).length;
                  const pct = c.reviews.length > 0 ? (count / c.reviews.length) * 100 : (star === 5 ? 70 : star === 4 ? 20 : 5);
                  return (
                    <div key={star} className="flex items-center gap-2 text-xs mb-1">
                      <span className="text-slate-500 w-4">{star}★</span>
                      <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                        <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                      <span className="text-slate-400 w-4">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {c.reviews.map((r, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-semibold text-slate-800 text-sm">{r.name}</div>
                    <StarRating rating={r.rating} />
                  </div>
                  <span className="text-xs text-slate-400">{r.date}</span>
                </div>
                <p className="text-slate-600 text-sm italic">"{r.text}"</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'certif' && (
          <div className="space-y-3">
            {c.certifications.map((cert, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-xl">🏅</div>
                <div>
                  <div className="font-semibold text-slate-800">{cert}</div>
                  <div className="text-xs text-green-600">✓ Terverifikasi</div>
                </div>
              </div>
            ))}
            {c.verified && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <div className="text-2xl">🔒</div>
                <div>
                  <div className="font-bold text-green-800">LPJK Verified Contractor</div>
                  <div className="text-sm text-green-700">No. {c.lpjk_no}</div>
                  <div className="text-xs text-green-600 mt-1">Kontraktor ini telah diverifikasi oleh RancangBangun melalui sistem LPJK</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* CTA Footer */}
      <div className="bg-white border-t border-slate-100 p-4 flex gap-3">
        <a href={`tel:${c.phone}`} className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 text-sm rounded-xl font-medium text-center hover:bg-slate-50 transition-colors">
          📞 {c.phone}
        </a>
        <button onClick={() => setContactOpen(true)} className="flex-1 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-xl font-bold transition-colors">
          💬 Hubungi & Undang Tender
        </button>
      </div>

      {contactOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5">
            <h3 className="font-bold text-slate-800 mb-3">📨 Undang ke Proyek</h3>
            <p className="text-sm text-slate-500 mb-4">Kirim undangan tender ke <strong>{c.name}</strong></p>
            <textarea rows={3} placeholder="Deskripsikan proyek Anda secara singkat..." className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none mb-3" />
            <div className="flex gap-2">
              <button onClick={() => setContactOpen(false)} className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 text-sm rounded-lg">Batal</button>
              <button onClick={() => setContactOpen(false)} className="flex-1 px-4 py-2 bg-orange-500 text-white text-sm rounded-lg font-medium">Kirim Undangan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ContractorProfile = () => {
  const [contractors, setContractors] = useState(CONTRACTORS);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('Semua');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [search, setSearch] = useState('');

  const sbuOptions = ['Semua', 'BG001', 'BG002', 'BG003', 'BS001', 'BS002', 'IN001', 'IN002'];

  const filtered = contractors.filter(c => {
    if (verifiedOnly && !c.verified) return false;
    if (filter !== 'Semua' && !c.sbu.includes(filter)) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.location.toLowerCase().includes(search.toLowerCase()) && !c.specializations.some(s => s.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  if (selected) return <ContractorDetail c={selected} onBack={() => setSelected(null)} />;

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="bg-white border-b border-slate-100 px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold text-slate-800">✅ Direktori Kontraktor</h1>
            <p className="text-slate-500 text-sm">{filtered.length} kontraktor · {filtered.filter(c => c.verified).length} terverifikasi LPJK</p>
          </div>
        </div>
        <div className="flex gap-2 mb-3">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Cari nama, lokasi, spesialisasi..." className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
          <label className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 text-sm whitespace-nowrap">
            <input type="checkbox" checked={verifiedOnly} onChange={e => setVerifiedOnly(e.target.checked)} className="accent-orange-500" />
            Verified only
          </label>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {sbuOptions.map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium transition-colors ${filter === s ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {s === 'Semua' ? 'Semua SBU' : `${SBU_LIST[s]?.icon} ${s}`}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map(c => <ContractorCard key={c.id} c={c} onClick={setSelected} />)}
        </div>
      </div>
    </div>
  );
};

export default ContractorProfile;
