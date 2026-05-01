import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, Zap } from 'lucide-react';

// ── Local knowledge base (no API needed) ──────────────────────────────────
const KB = [
  {
    patterns: ['halo', 'hai', 'hi', 'hello', 'selamat', 'pagi', 'siang', 'sore', 'malam', 'hei'],
    reply: '👋 Halo! Saya AI Assistant RancangBangun.\n\nSaya bisa bantu:\n• Cara hitung RAB\n• Cari kontraktor verified LPJK\n• Jelaskan fitur & alur platform\n• Info bidding, kontrak, jaminan\n\nAnda Owner atau Kontraktor? 🤔',
    actions: [{ label: '👔 Saya Owner', q: 'Saya owner, apa yang bisa saya lakukan?' }, { label: '🏗️ Saya Kontraktor', q: 'Saya kontraktor, bagaimana cara bergabung?' }, { label: '🎯 Lihat Semua Fitur', q: 'Fitur apa saja yang ada di platform?' }]
  },
  {
    patterns: ['rab', 'rencana anggaran', 'biaya', 'budget', 'estimasi', 'hitung', 'kalkulasi', 'anggaran'],
    reply: '💰 RAB Calculator ada di menu "RAB Calc"!\n\n✅ Fitur yang tersedia:\n• 100+ item pekerjaan (material, upah, alat)\n• Template LPJK: BG002 Gedung, BS001 Jalan\n• Breakdown otomatis per WBS\n• Export PDF untuk tender\n\nBuka RAB Calc di sidebar kiri untuk mulai hitung! 🧮',
    actions: [{ label: '📊 Cara Pakai RAB Calc', q: 'Bagaimana cara menggunakan RAB Calculator?' }, { label: '📋 Template RAB Apa Saja?', q: 'Apa saja template RAB yang tersedia?' }]
  },
  {
    patterns: ['kontraktor', 'pelaksana', 'pemborong', 'vendor', 'cari kontraktor', 'rekomendasi'],
    reply: '🏗️ Direktori Kontraktor ada di menu "Kontraktor"!\n\n✅ Database kami:\n• 5 kontraktor verified LPJK\n• Rating 4.1–4.8⭐ dari klien nyata\n• Track record 8–62 proyek\n• Sertifikasi K3, ISO, LPJK\n\nFilter berdasarkan: SBU (BG/BS/IN), lokasi, atau cari nama langsung. 🔍',
    actions: [{ label: '👥 Buka Direktori Kontraktor', q: 'Bagaimana cara memilih kontraktor yang tepat?' }, { label: '✅ Apa Itu Sertifikasi SBU?', q: 'Jelaskan apa itu SBU dan klasifikasi LPJK' }]
  },
  {
    patterns: ['lpjk', 'sbu', 'klasifikasi', 'sertifikat', 'lisensi', 'kbli', 'bg0', 'bs0', 'in0'],
    reply: '📋 Platform kami terintegrasi 73 Klasifikasi LPJK resmi!\n\n🔰 8 Kategori Utama:\n• BG — Bangunan Gedung (9 sub)\n• BS — Bangunan Sipil (20 sub)\n• IN — Instalasi Mekanikal/Elektrikal (9 sub)\n• KK — Konstruksi Khusus (16 sub)\n• PB — Penyelesaian Bangunan (8 sub)\n• PL — Persiapan Lahan (8 sub)\n• KP — Prapabrikasi (2 sub)\n• PA — Penyewaan Alat (1 sub)\n\nSemua kontraktor di platform harus punya SBU aktif. ✅',
    actions: [{ label: '👥 Cari Kontraktor per SBU', q: 'Bagaimana filter kontraktor berdasarkan SBU?' }]
  },
  {
    patterns: ['owner', 'pemilik', 'developer', 'pemberi kerja', 'saya owner'],
    reply: '🏢 Sebagai Owner, platform membantu Anda:\n\n🎯 Posting & Tender:\n• Buat tender proyek dalam 5 menit\n• Smart matching kontraktor terverifikasi\n• Evaluasi penawaran side-by-side\n\n💰 Keamanan Finansial:\n• Escrow — dana aman sampai pekerjaan selesai\n• Bayar termin hanya setelah milestone diverifikasi\n• Retensi & garansi pemeliharaan 12 bulan\n\n📊 Monitoring:\n• Progress foto harian\n• Kurva S aktual vs rencana\n• QC standar SNI terverifikasi konsultan MK\n\nMulai dari: Marketplace → Post Proyek 🚀',
    actions: [{ label: '🏗️ Cara Post Proyek', q: 'Bagaimana cara memposting proyek di marketplace?' }, { label: '🛡️ Bagaimana Escrow Bekerja?', q: 'Jelaskan mekanisme escrow dan keamanan pembayaran' }]
  },
  {
    patterns: ['kontraktor saya', 'saya kontraktor', 'bergabung kontraktor', 'daftar kontraktor'],
    reply: '👷 Sebagai Kontraktor, platform membantu Anda:\n\n📈 Akses Proyek:\n• Ribuan tender terbuka dari seluruh Indonesia\n• Smart matching sesuai kapasitas & spesialisasi\n• Bidding digital tanpa biaya marketing\n\n💼 Modal Kerja:\n• Invoice Factoring — cair 24 jam\n• Working Capital tanpa agunan berbasis SPK\n• Bid Bond digital < 5 menit\n\n🏆 Reputasi:\n• Credit Score terverifikasi\n• Badge SBU/LPJK di profil\n• Track record proyek terdokumentasi\n\nDaftar & verifikasi SBU di menu Kontraktor! 🚀',
    actions: [{ label: '⚖️ Cara Ikut Tender', q: 'Bagaimana cara mengikuti proses bidding?' }, { label: '💰 Invoice Factoring Itu Apa?', q: 'Jelaskan sistem invoice factoring dan working capital' }]
  },
  {
    patterns: ['bidding', 'tender', 'lelang', 'penawaran', 'spk', 'kontrak'],
    reply: '⚖️ Sistem Bidding & SPK di menu "Bidding & SPK"!\n\n📝 Alur Proses:\n1. Owner posting proyek + syarat\n2. Kontraktor submit penawaran teknis & harga\n3. Platform ranking otomatis (skor 0–100)\n4. Owner pilih pemenang\n5. SPK digital ditandatangani kedua pihak\n6. Dana DP masuk escrow → proyek mulai\n\n⏱️ Waktu proses: 3–7 hari kerja\n📋 Metode: Terbuka / Terbatas / Penunjukan Langsung',
    actions: [{ label: '📄 Apa Itu SPK Digital?', q: 'Jelaskan kontrak SPK digital dan klausul pentingnya' }, { label: '🛡️ Jaminan Penawaran', q: 'Apa itu bid bond dan bagaimana cara mendapatkannya?' }]
  },
  {
    patterns: ['escrow', 'jaminan', 'keamanan', 'bayar', 'pembayaran', 'termin', 'dana'],
    reply: '🛡️ Mekanisme Escrow & Pembayaran Aman!\n\n💡 Cara Kerja:\n1. Owner setor dana proyek ke escrow platform\n2. Kontraktor kerjakan sesuai milestone\n3. Konsultan MK verifikasi progress\n4. Owner setujui → dana cair dalam 24 jam\n\n✅ Perlindungan:\n• Jaminan Pelaksanaan 5% (Performance Bond)\n• Retensi 5% selama 12 bulan pemeliharaan\n• Garansi Material berbasis SNI\n• Dispute → mediasi 7 hari atau arbitrase BANI',
    actions: [{ label: '⚖️ Proses Sengketa', q: 'Bagaimana proses penyelesaian sengketa di platform?' }, { label: '📋 Jaminan Apa Saja?', q: 'Jelaskan semua jenis jaminan yang tersedia di platform' }]
  },
  {
    patterns: ['invoice', 'factoring', 'working capital', 'modal', 'pinjam', 'kredit', 'dana cair'],
    reply: '🏦 Supply Chain Finance — Solusi Cash Flow!\n\n⚡ Invoice Factoring:\n• Upload invoice + Berita Acara progress\n• Verifikasi AI dalam 15 menit\n• Dana 80–90% cair dalam 24 jam\n• Fee: 1.8–3.5% per invoice\n\n💼 Working Capital Loan:\n• Berbasis nilai SPK yang sudah ditandatangani\n• Zero agunan fisik\n• Bunga 1.2–2.0%/bulan\n• Cair dalam 4 jam kerja\n\n🔐 Bid Bond Digital:\n• Terbit < 5 menit (vs 3–5 hari di bank)\n• Fee flat Rp 250–750 ribu',
    actions: [{ label: '📊 Cara Ajukan Factoring', q: 'Bagaimana cara mengajukan invoice factoring?' }]
  },
  {
    patterns: ['fitur', 'aplikasi', 'bisa apa', 'fungsi', 'layanan', 'menu', 'ada apa'],
    reply: '🎯 Platform RancangBangun punya banyak modul!\n\n🌐 Marketplace & Kontrak:\nMarketplace · Proyek Saya · Bidding & SPK · Jaminan & QC · Direktori Kontraktor\n\n📋 Pengadaan:\nRAB Calculator · Smart Search\n\n📐 Perencanaan:\nBlueprint · Smart BOM · Gantt Chart · Budget Tracker\n\n🏗️ Pelaksanaan:\nSite Control · Team · Equipment · Safety K3\n\n✅ Quality:\nFAT · QC Inspector · Maintenance\n\n💰 Finansial:\nInvoice Manager · Document Hub\n\n💡 Bisnis & Strategi:\nPlatform Engine · Stakeholder Hub · Analytics',
    actions: [{ label: '⚖️ Buka Bidding & SPK', q: 'Jelaskan fitur Bidding dan SPK lebih detail' }, { label: '🛡️ Buka Jaminan & QC', q: 'Jelaskan fitur Jaminan dan Quality Control' }]
  },
  {
    patterns: ['harga', 'biaya platform', 'gratis', 'berbayar', 'subscription', 'paket', 'bayar berapa'],
    reply: '💎 Model Bisnis RancangBangun:\n\n🆓 GRATIS untuk Owner:\n• Posting proyek unlimited\n• Akses direktori kontraktor\n• Basic monitoring dashboard\n\n🎟️ Paket Kontraktor:\n• Starter: Rp 99rb/bln — akses listing\n• Pro: Rp 499rb/bln — bidding unlimited\n• Business: Rp 1.9 jt/bln — analytics + priority\n\n💸 Transaction Fee:\n• 1.5–3% dari nilai kontrak saat menang tender\n\n✅ Escrow fee: 0.5% (ditanggung bersama)',
    actions: [{ label: '🚀 Cara Mulai Gratis', q: 'Bagaimana cara mulai menggunakan platform secara gratis?' }]
  },
  {
    patterns: ['mulai', 'daftar', 'registrasi', 'signup', 'cara', 'langkah', 'how to', 'gimana'],
    reply: '🚀 Cara Mulai di RancangBangun:\n\n👔 Jika Anda Owner:\n1. Klik tombol "Daftar Gratis" di halaman utama\n2. Masuk ke Dashboard → Marketplace\n3. Klik "+ Post Proyek" dan isi detail\n4. Tunggu kontraktor submit penawaran\n5. Pilih pemenang → tanda tangan SPK digital\n\n👷 Jika Anda Kontraktor:\n1. Daftar dan upload dokumen SBU/LPJK\n2. Bangun profil & portofolio\n3. Browse tender di Bidding & SPK\n4. Submit penawaran teknis & harga\n5. Jika menang → aktifkan working capital',
    actions: [{ label: '🏗️ Buka Marketplace', q: 'Jelaskan lebih detail cara post proyek di marketplace' }]
  },
  {
    patterns: ['gantt', 'timeline', 'jadwal', 'schedule', 'milestone'],
    reply: '📊 Gantt Chart tersedia di menu "Gantt"!\n\nFitur:\n• Drag & drop milestone di timeline\n• Assign tim ke setiap pekerjaan\n• Ketergantungan antar task (dependencies)\n• Visualisasi Kurva S aktual vs rencana\n• Alert otomatis jika ada penyimpangan > 5%\n\nTemplate tersedia untuk: gedung, jalan, instalasi, dan proyek infrastruktur.',
    actions: [{ label: '📈 Lihat Fitur Budget', q: 'Bagaimana cara menggunakan Budget Tracker?' }]
  },
  {
    patterns: ['qc', 'quality', 'inspeksi', 'sni', 'standar', 'kualitas', 'mutu'],
    reply: '✅ Quality Control & Jaminan Mutu!\n\nMenu "Jaminan & QC" punya 4 fitur:\n\n📋 QC Standards:\n• Checklist inspeksi standar SNI\n• Uji kuat tekan beton, slump test, uji tarik besi\n• Status: Lulus ✓ / Gagal ✗ / Belum Diuji\n\n🛡️ Jaminan:\n• Jaminan Pelaksanaan 5%\n• Retensi 12 bulan\n• Garansi material SNI\n\n⚖️ Sengketa:\n• Mediasi platform 7 hari\n• Arbitrase BANI 30–60 hari',
    actions: [{ label: '🔍 Buka Jaminan & QC', q: 'Jelaskan lebih detail sistem QC dan inspeksi' }]
  },
  {
    patterns: ['sengketa', 'masalah', 'perselisihan', 'klaim', 'dispute', 'komplain'],
    reply: '⚖️ Penyelesaian Sengketa di Platform:\n\n📍 3 Jalur Tersedia:\n\n1️⃣ Musyawarah (24 jam)\n→ Kedua pihak diskusi via platform chat\n\n2️⃣ Mediasi Platform (7 hari)\n→ Mediator independent memfasilitasi\n→ Gratis untuk kasus < Rp 500 jt\n\n3️⃣ Arbitrase BANI (30–60 hari)\n→ Mengikat secara hukum\n→ Biaya: 0.5% dari nilai sengketa\n\n✅ Semua evidence (foto, BA, dokumen) tersimpan permanen di platform sebagai bukti.',
    actions: [{ label: '🛡️ Buka Accountability Hub', q: 'Apa saja yang ada di modul Accountability Hub?' }]
  },
];

const SUGGESTIONS = [
  'Apa itu RancangBangun?',
  'Cara menghitung RAB',
  'Fitur apa saja yang tersedia?',
  'Bagaimana proses bidding?',
];

function getReply(text) {
  const t = text.toLowerCase();
  for (const item of KB) {
    if (item.patterns.some(p => t.includes(p))) {
      return { reply: item.reply, actions: item.actions || [] };
    }
  }
  return {
    reply: '🤔 Saya belum sepenuhnya paham pertanyaan Anda.\n\nCoba tanyakan dengan kata kunci seperti:\n• "Cara hitung RAB"\n• "Cari kontraktor"\n• "Fitur apa saja"\n• "Proses bidding"\n• "Escrow dan pembayaran"\n\nAtau pilih topik di bawah:',
    actions: [
      { label: '💰 Cara Hitung RAB', q: 'Cara hitung RAB profesional' },
      { label: '👥 Cari Kontraktor', q: 'Cari kontraktor verified' },
      { label: '⚖️ Proses Bidding', q: 'Bagaimana proses bidding dan tender?' },
    ]
  };
}

export default function ChatbotAgentic({ isOpen, setIsOpen }) {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: '👋 Halo! Saya AI Assistant RancangBangun.\n\nSaya bisa bantu:\n• Cara hitung RAB\n• Cari kontraktor verified LPJK\n• Jelaskan fitur & alur platform\n• Info bidding, kontrak, jaminan\n\nAnda Owner atau Kontraktor? 🤔',
      actions: [
        { label: '👔 Saya Owner', q: 'Saya owner, apa yang bisa saya lakukan?' },
        { label: '🏗️ Saya Kontraktor', q: 'Saya kontraktor, bagaimana cara bergabung?' },
        { label: '🎯 Lihat Semua Fitur', q: 'Fitur apa saja yang ada di platform?' },
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 150);
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setInput('');
    setMessages(prev => [...prev, { type: 'user', text: trimmed }]);
    setTimeout(() => {
      const { reply, actions } = getReply(trimmed);
      setMessages(prev => [...prev, { type: 'bot', text: reply, actions }]);
      setTimeout(() => inputRef.current?.focus(), 50);
    }, 300);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
        style={{ zIndex: 10000 }}
      >
        {isOpen
          ? <X className="w-6 h-6" />
          : <div className="relative"><MessageCircle className="w-6 h-6" /><Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-300" /></div>
        }
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl flex flex-col border-2 border-orange-200"
          style={{ zIndex: 10000, height: 560 }}>

          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-t-2xl flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm">AI Assistant</div>
              <div className="text-xs text-orange-100 flex items-center gap-1"><Zap className="w-3 h-3" /> RancangBangun Helper</div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-orange-50/30 to-white">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line
                  ${msg.type === 'user'
                    ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white'
                    : 'bg-white border border-orange-100 text-slate-800 shadow-sm'}`}>
                  {msg.text}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      {msg.actions.map((a, j) => (
                        <button key={j}
                          onClick={() => sendMessage(a.q)}
                          className="w-full bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-700 text-xs py-1.5 px-3 rounded-lg transition-colors font-medium text-left">
                          {a.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Suggestions */}
          <div className="px-3 py-2 bg-orange-50 border-t border-orange-100 flex-shrink-0">
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s, i) => (
                <button key={i} onClick={() => sendMessage(s)}
                  className="text-xs bg-white border border-orange-200 text-orange-700 px-2.5 py-1 rounded-full hover:bg-orange-100 transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-orange-100 bg-white rounded-b-2xl flex-shrink-0">
            <div className="flex gap-2">
              <input ref={inputRef} type="text" value={input}
                onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
                placeholder="Ketik pertanyaan..."
                className="flex-1 px-3 py-2.5 border border-orange-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent" />
              <button onClick={() => sendMessage(input)} disabled={!input.trim()}
                className="bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white p-2.5 rounded-xl transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
