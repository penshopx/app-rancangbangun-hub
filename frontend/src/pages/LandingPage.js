import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LandingPage = () => {
  const navigate = useNavigate();
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistName, setWaitlistName] = useState('');
  const [waitlistRole, setWaitlistRole] = useState('owner');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleWaitlist = async (e) => {
    e.preventDefault();
    if (!waitlistEmail || !waitlistName) return;
    setLoading(true);
    try {
      await axios.post('/api/waitlist', { name: waitlistName, email: waitlistEmail, role: waitlistRole });
    } catch {}
    setWaitlistSubmitted(true);
    setLoading(false);
  };

  const features = [
    { icon: '🏗️', title: 'Matching Owner & Kontraktor', desc: 'Temukan kontraktor verified sesuai kebutuhan proyek Anda — gedung, jalan, MEP, perumahan, pabrik.' },
    { icon: '💰', title: 'RAB & Estimasi Biaya', desc: 'Hitung Rencana Anggaran Biaya profesional dengan 100+ database harga material & upah terkini.' },
    { icon: '📊', title: 'Manajemen Proyek Real-time', desc: 'Pantau milestone, progress lapangan, dan anggaran dari mana saja secara real-time.' },
    { icon: '🔒', title: 'Escrow & Termin Aman', desc: 'Pembayaran bertahap (termin) dengan sistem escrow — uang aman, proyek berjalan.' },
    { icon: '📋', title: 'Verifikasi LPJK & SBU', desc: 'Setiap kontraktor diverifikasi sertifikat LPJK, SBU, dan track record proyek.' },
    { icon: '🤝', title: 'Ekosistem Lengkap', desc: 'Tukang, mandor, supplier material, konsultan perencana — semua terhubung dalam satu platform.' },
  ];

  const segments = [
    { icon: '🏠', title: 'Masyarakat Umum', desc: 'Bangun rumah, renovasi, perluasan — dengan kontraktor terpercaya dan harga transparan.', color: 'blue' },
    { icon: '🏢', title: 'Developer & Real Estate', desc: 'Kelola proyek kompleks perumahan & kawasan komersial dengan efisiensi penuh.', color: 'green' },
    { icon: '🏭', title: 'Kawasan Industri & Pabrik', desc: 'Pekerjaan sipil, mekanikal elektrikal, penguatan pondasi — standar industri.', color: 'orange' },
    { icon: '🏛️', title: 'Pemerintahan & Infrastruktur', desc: 'Tender proyek pemerintah dengan compliance LPJK, K3, dan regulasi penuh.', color: 'purple' },
  ];

  const steps = [
    { num: '01', title: 'Posting Proyek', desc: 'Deskripsikan kebutuhan proyek Anda — jenis, lokasi, estimasi budget, dan timeline.' },
    { num: '02', title: 'Terima Penawaran', desc: 'Kontraktor verified mengajukan proposal + RAB. Bandingkan dan pilih terbaik.' },
    { num: '03', title: 'Kontrak Digital', desc: 'Tanda tangan kontrak digital, atur termin pembayaran, dan proyek dimulai.' },
    { num: '04', title: 'Monitor Progress', desc: 'Pantau laporan harian, foto lapangan, milestone — dari HP Anda kapan saja.' },
  ];

  const testimonials = [
    { name: 'Budi Santoso', role: 'Owner — Perumahan Bekasi', text: 'RancangBangun membantu saya menemukan kontraktor yang benar-benar berpengalaman untuk kompleks 50 unit. Hemat waktu, transparan, dan aman.', rating: 5 },
    { name: 'PT Graha Mandiri', role: 'Developer — Jakarta Selatan', text: 'Manajemen proyek 3 gedung sekaligus jadi jauh lebih mudah. RAB, Gantt, dan monitoring progress dalam satu platform.', rating: 5 },
    { name: 'CV Karya Beton', role: 'Kontraktor Sipil — Bandung', text: 'Platform terbaik untuk cari proyek. Verifikasi LPJK kami langsung terlihat calon klien. Order proyek naik 3x!', rating: 5 },
  ];

  const stats = [
    { val: '2,500+', label: 'Kontraktor Verified' },
    { val: 'Rp 850M+', label: 'Nilai Proyek Dikelola' },
    { val: '1,200+', label: 'Proyek Selesai' },
    { val: '4.8★', label: 'Rating Platform' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏗️</span>
            <span className="font-bold text-xl">
              <span className="text-slate-800">Rancang</span>
              <span className="text-orange-500">Bangun</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#fitur" className="hover:text-orange-500 transition-colors">Fitur</a>
            <a href="#segmen" className="hover:text-orange-500 transition-colors">Segmen</a>
            <a href="#cara-kerja" className="hover:text-orange-500 transition-colors">Cara Kerja</a>
            <a href="#testimoni" className="hover:text-orange-500 transition-colors">Testimoni</a>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/app')}
              className="hidden sm:block px-4 py-2 text-sm text-slate-700 hover:text-orange-500 font-medium transition-colors"
            >
              Masuk
            </button>
            <a href="#waitlist">
              <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-all shadow-sm">
                Daftar Gratis
              </button>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, #f97316 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 40%)'}}></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 rounded-full px-4 py-1.5 text-sm text-orange-300 mb-6">
              🚀 Platform Konstruksi #1 Indonesia — Daftar Sekarang, Gratis!
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              Bangun Proyek Impian Anda{' '}
              <span className="text-orange-400">Lebih Cepat, Lebih Aman,</span>{' '}
              Lebih Terpercaya
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Platform marketplace konstruksi yang menghubungkan <strong className="text-white">Owner, Kontraktor, Tukang, Supplier Material,</strong> dan <strong className="text-white">Konsultan</strong> — dari bangun baru, renovasi, perluasan, hingga penguatan pondasi.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#waitlist">
                <button className="w-full sm:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-lg transition-all shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5">
                  🎯 Daftar Waitlist Gratis
                </button>
              </a>
              <button
                onClick={() => navigate('/app')}
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl text-lg transition-all"
              >
                🗓️ Lihat Demo Aplikasi →
              </button>
            </div>
            <p className="text-slate-400 text-sm mt-4">Gratis selamanya untuk proyek pertama • Tidak perlu kartu kredit</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
            {stats.map((s, i) => (
              <div key={i} className="text-center bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-2xl sm:text-3xl font-bold text-orange-400">{s.val}</div>
                <div className="text-slate-400 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Segments */}
      <section id="segmen" className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800">Untuk Semua Segmen Konstruksi</h2>
            <p className="text-slate-500 mt-2">Dari renovasi rumah hingga kawasan industri skala besar</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {segments.map((seg, i) => {
              const colors = {
                blue: 'bg-blue-50 border-blue-100 hover:border-blue-300',
                green: 'bg-green-50 border-green-100 hover:border-green-300',
                orange: 'bg-orange-50 border-orange-100 hover:border-orange-300',
                purple: 'bg-purple-50 border-purple-100 hover:border-purple-300',
              };
              return (
                <div key={i} className={`${colors[seg.color]} border rounded-xl p-5 transition-all hover:-translate-y-1 cursor-default`}>
                  <div className="text-3xl mb-3">{seg.icon}</div>
                  <h3 className="font-bold text-slate-800 mb-2">{seg.title}</h3>
                  <p className="text-slate-600 text-sm">{seg.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="fitur" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block bg-orange-100 text-orange-700 rounded-full px-3 py-1 text-sm font-medium mb-3">✨ Fitur Unggulan</div>
            <h2 className="text-3xl font-bold text-slate-800">Semua yang Anda Butuhkan dalam Satu Platform</h2>
            <p className="text-slate-500 mt-2">20+ modul terintegrasi untuk seluruh lifecycle proyek konstruksi</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className="border border-slate-100 rounded-xl p-5 hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-slate-800 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="cara-kerja" className="py-16 px-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Cara Kerja RancangBangun</h2>
            <p className="text-slate-400 mt-2">4 langkah mudah dari ide ke proyek selesai</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-orange-500/30 z-0"></div>
                )}
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center text-xl font-bold mb-4">{step.num}</div>
                  <h3 className="font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimoni" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800">Dipercaya Ribuan Pengguna</h2>
            <p className="text-slate-500 mt-2">Cerita sukses dari owner dan kontraktor nyata</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-6">
                <div className="flex mb-3">
                  {'⭐'.repeat(t.rating)}
                </div>
                <p className="text-slate-700 text-sm mb-4 italic">"{t.text}"</p>
                <div>
                  <div className="font-bold text-slate-800 text-sm">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="py-16 px-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-2xl mx-auto text-center">
          {waitlistSubmitted ? (
            <div>
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold mb-3">Anda Sudah Terdaftar!</h2>
              <p className="text-orange-100 mb-6">Terima kasih, <strong>{waitlistName}</strong>! Kami akan menghubungi Anda di <strong>{waitlistEmail}</strong> saat platform siap untuk Anda.</p>
              <button
                onClick={() => navigate('/app')}
                className="px-8 py-3 bg-white text-orange-600 font-bold rounded-xl hover:shadow-lg transition-all"
              >
                🚀 Coba Demo Sekarang →
              </button>
            </div>
          ) : (
            <div>
              <div className="text-5xl mb-4">🚀</div>
              <h2 className="text-3xl font-bold mb-3">Daftar Waitlist Sekarang</h2>
              <p className="text-orange-100 mb-8">Jadilah yang pertama mendapatkan akses eksklusif. Early adopter mendapat akses premium <strong>GRATIS 6 bulan!</strong></p>
              <form onSubmit={handleWaitlist} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Nama lengkap Anda"
                  value={waitlistName}
                  onChange={e => setWaitlistName(e.target.value)}
                  required
                  className="px-4 py-3 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                />
                <input
                  type="email"
                  placeholder="Email aktif Anda"
                  value={waitlistEmail}
                  onChange={e => setWaitlistEmail(e.target.value)}
                  required
                  className="px-4 py-3 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                />
                <select
                  value={waitlistRole}
                  onChange={e => setWaitlistRole(e.target.value)}
                  className="px-4 py-3 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                >
                  <option value="owner">👔 Owner / Pemberi Kerja</option>
                  <option value="kontraktor">🏗️ Kontraktor / Pelaksana</option>
                  <option value="developer">🏢 Developer / Real Estate</option>
                  <option value="supplier">📦 Supplier Material</option>
                  <option value="konsultan">📐 Konsultan / Perencana</option>
                  <option value="pemerintah">🏛️ Instansi Pemerintah</option>
                </select>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-white text-orange-600 font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-70"
                >
                  {loading ? 'Mendaftarkan...' : '✅ Daftar Waitlist Gratis'}
                </button>
              </form>
              <p className="text-orange-200 text-xs mt-4">🔒 Data Anda aman. Tidak ada spam. Bisa unsubscribe kapan saja.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏗️</span>
              <span className="font-bold text-white">RancangBangun</span>
              <span className="text-slate-500 text-sm">— Platform Konstruksi Indonesia</span>
            </div>
            <div className="flex gap-4 text-sm">
              <a href="#fitur" className="hover:text-white transition-colors">Fitur</a>
              <a href="#cara-kerja" className="hover:text-white transition-colors">Cara Kerja</a>
              <button onClick={() => navigate('/app')} className="hover:text-white transition-colors">Demo App</button>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-6 pt-6 text-center text-xs">
            © 2025 RancangBangun. Platform Konstruksi Terintegrasi Indonesia.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
