import React, { useState } from 'react';
import {
  Building2, HardHat, ClipboardCheck, Hammer, Package, Layers,
  ArrowRight, CheckCircle, AlertCircle, Star, DollarSign,
  Shield, Clock, TrendingUp, FileText, Users, Zap, BarChart3,
  Award, Lock, Phone, Globe, ChevronRight, Circle, Target
} from 'lucide-react';

const roles = [
  {
    id: 'owner',
    label: 'Owner',
    subtitle: 'Pemilik / Pemberi Kerja',
    emoji: '🏢',
    icon: Building2,
    color: 'orange',
    gradient: 'from-orange-600 to-amber-700',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    textAccent: 'text-orange-700',
    badge: 'bg-orange-100 text-orange-700',
  },
  {
    id: 'kontraktor',
    label: 'Kontraktor',
    subtitle: 'Pelaksana Utama',
    emoji: '👷',
    icon: HardHat,
    color: 'blue',
    gradient: 'from-blue-600 to-indigo-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    textAccent: 'text-blue-700',
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'konsultan',
    label: 'Konsultan',
    subtitle: 'MK / Perencana / Pengawas',
    emoji: '📐',
    icon: ClipboardCheck,
    color: 'purple',
    gradient: 'from-purple-600 to-violet-700',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    textAccent: 'text-purple-700',
    badge: 'bg-purple-100 text-purple-700',
  },
  {
    id: 'tukang',
    label: 'Tukang / Mandor',
    subtitle: 'Tenaga Kerja Lapangan',
    emoji: '🔨',
    icon: Hammer,
    color: 'yellow',
    gradient: 'from-yellow-600 to-orange-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    textAccent: 'text-yellow-700',
    badge: 'bg-yellow-100 text-yellow-700',
  },
  {
    id: 'supplier',
    label: 'Supplier',
    subtitle: 'Pemasok Material & Alat',
    emoji: '📦',
    icon: Package,
    color: 'green',
    gradient: 'from-green-600 to-emerald-700',
    bg: 'bg-green-50',
    border: 'border-green-200',
    textAccent: 'text-green-700',
    badge: 'bg-green-100 text-green-700',
  },
  {
    id: 'subkon',
    label: 'Subkon',
    subtitle: 'Subkontraktor Spesialis',
    emoji: '🔧',
    icon: Layers,
    color: 'rose',
    gradient: 'from-rose-600 to-pink-700',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    textAccent: 'text-rose-700',
    badge: 'bg-rose-100 text-rose-700',
  },
];

const roleData = {
  owner: {
    tagline: 'Bangun dengan tenang — proyek terpantau, dana terlindungi, kualitas terjamin',
    pains: [
      { icon: '😰', title: 'Kontraktor tidak bisa dipercaya', desc: 'Sulit verifikasi rekam jejak. Sering kena PHP, kabur di tengah proyek, atau kualitas jauh dari spesifikasi.' },
      { icon: '💸', title: 'Dana proyek bocor', desc: 'Uang muka habis sebelum pekerjaan selesai. Tidak ada mekanisme pengawasan pemakaian dana.' },
      { icon: '📋', title: 'Proses tender manual & lambat', desc: 'Kirim undangan, tunggu penawaran, bandingkan secara manual — proses bisa 2-4 minggu hanya untuk pilih kontraktor.' },
      { icon: '🏗️', title: 'Tidak tahu progress aktual', desc: 'Laporan dari kontraktor sering tidak akurat. Owner baru tahu ada masalah setelah terlambat.' },
    ],
    solutions: [
      { icon: Shield, title: 'Escrow & Termin Terlindungi', desc: 'Dana masuk escrow platform. Cair hanya setelah milestone diverifikasi konsultan MK & disetujui owner.', value: 'Zero fraud risk' },
      { icon: Target, title: 'Smart Matching Kontraktor', desc: 'Sistem rekomendasikan top 5 kontraktor berdasarkan 47 parameter — pengalaman, modal, reputasi, harga pasar.', value: '91% match accuracy' },
      { icon: BarChart3, title: 'Dashboard Monitoring Real-Time', desc: 'Progress foto harian, kurva S aktual vs rencana, early warning jika ada penyimpangan.', value: 'Update harian' },
      { icon: FileText, title: 'Kontrak Digital Berkekuatan Hukum', desc: 'Template kontrak FIDIC/AIA diadaptasi hukum Indonesia, tanda tangan digital, tersimpan permanen.', value: 'Hukum RI valid' },
      { icon: Award, title: 'QC Terstandarisasi SNI', desc: 'Checklist inspeksi sesuai SNI. Konsultan MK yang terdaftar melakukan verifikasi — owner terima laporan instan.', value: 'SNI compliant' },
      { icon: DollarSign, title: 'Benchmark Harga Pasar', desc: 'Lihat apakah penawaran kontraktor wajar vs pasar. Database harga dari 10.000+ proyek setara.', value: 'Transparan & adil' },
    ],
    journey: [
      { step: 1, title: 'Buat Akun & Profil Proyek', desc: 'Isi detail proyek: lokasi, tipe, luas, anggaran awal, target waktu. Upload dokumen DED/RKS jika ada.' },
      { step: 2, title: 'Publish Tender', desc: 'Pilih: Tender Terbuka, Terbatas, atau Penunjukan Langsung. Set batas penawaran, persyaratan SBU, dan jaminan.' },
      { step: 3, title: 'Evaluasi Penawaran', desc: 'Platform otomatis rangking penawaran. Lihat breakdown skor teknis, harga, dan rekam jejak tiap kontraktor.' },
      { step: 4, title: 'Pilih & Kontrak Digital', desc: 'Klik "Pilih Pemenang" → kontrak SPK otomatis terbentuk. Owner & kontraktor tandatangan digital.' },
      { step: 5, title: 'Monitor & Bayar Termin', desc: 'Approve pembayaran termin hanya setelah menerima laporan progress + BA dari konsultan MK.' },
      { step: 6, title: 'Serah Terima & Garansi', desc: 'FHO dilakukan setelah punch list cleared. Garansi pemeliharaan 12 bulan otomatis aktif.' },
    ],
    tools: [
      { name: 'Owner Dashboard', icon: '📊', desc: 'Ringkasan semua proyek aktif, status dana, dan alert' },
      { name: 'Tender Wizard', icon: '📝', desc: 'Panduan step-by-step buat & publish tender' },
      { name: 'Bid Comparison Matrix', icon: '⚖️', desc: 'Bandingkan penawaran side-by-side secara visual' },
      { name: 'Progress Photo Feed', icon: '📸', desc: 'Foto lapangan harian dari kontraktor & MK' },
      { name: 'Escrow Balance Tracker', icon: '💰', desc: 'Pantau dana masuk/keluar secara real-time' },
      { name: 'Dispute Center', icon: '⚡', desc: 'Ajukan klaim, mediasi, dan eskalasi ke arbitrase' },
    ],
    economics: [
      { label: 'Biaya platform', value: 'Gratis untuk Owner', note: 'Tidak ada biaya listing atau komisi' },
      { label: 'Escrow fee', value: '0.5% dari nilai proyek', note: 'Ditanggung bersama Owner & Kontraktor' },
      { label: 'Penghematan vs tender manual', value: '15-25% lebih murah', note: 'Karena kompetisi lebih banyak & transparan' },
      { label: 'Waktu cari kontraktor', value: '< 3 hari', note: 'vs 2-4 minggu proses manual' },
    ]
  },
  kontraktor: {
    tagline: 'Dapat proyek lebih banyak, modal kerja cair lebih cepat, bisnis tumbuh lebih sehat',
    pains: [
      { icon: '😤', title: 'Cash flow selalu negatif', desc: 'Material & tukang harus dibayar cash, tapi termin dari owner baru cair 30-90 hari. Bisnis jalan tapi dompet selalu minus.' },
      { icon: '💼', title: 'Biaya marketing tinggi, proyek sedikit', desc: 'Harus keluar biaya besar untuk relasi, undangan tender, dan administrasi — padahal win rate hanya 15-20%.' },
      { icon: '📄', title: 'Tidak ada jaminan pembayaran', desc: 'Owner bisa tunda atau potong pembayaran sepihak tanpa mekanisme perlindungan bagi kontraktor.' },
      { icon: '📈', title: 'Sulit naik kelas', desc: 'Tidak ada track record terstandar. Kontraktor bagus dan jelek kelihatan sama di mata owner baru.' },
    ],
    solutions: [
      { icon: DollarSign, title: 'Invoice Factoring 24 Jam', desc: 'Cairkan 80-90% nilai termin dalam 24 jam setelah BA disetujui. Tidak perlu menunggu 60-90 hari.', value: 'Cash dalam 24 jam' },
      { icon: Zap, title: 'Working Capital Tanpa Agunan', desc: 'Pinjaman modal kerja berdasarkan nilai SPK yang sudah ditandatangani. Score naik = limit naik.', value: 'Bunga 1.2%/bln' },
      { icon: Award, title: 'Credit Score Kontraktor', desc: 'Setiap proyek selesai = track record terverifikasi. Score tinggi = lebih sering direkomendasikan owner.', value: 'Portable & verified' },
      { icon: Globe, title: 'Akses Tender Lebih Luas', desc: 'Notifikasi proyek sesuai spesialisasi & kapasitas. Tender dari seluruh Indonesia tanpa biaya marketing.', value: 'Nasional coverage' },
      { icon: FileText, title: 'Kontrak Digital Terlindungi', desc: 'SPK dengan klausul perlindungan kontraktor: pembayaran terikat milestone, denda keterlambatan owner.', value: 'Hak kontraktor aman' },
      { icon: Users, title: 'Manajemen Subkon & Mandor', desc: 'Kontrak digital ke bawah, bayar dari escrow yang sama, semua terdokumentasi.', value: 'Supply chain terintegrasi' },
    ],
    journey: [
      { step: 1, title: 'Daftar & Verifikasi SBU/LPJK', desc: 'Upload sertifikat SBU, NIB, NPWP. Verifikasi otomatis cross-check ke database LPJK & BUMN.' },
      { step: 2, title: 'Bangun Profil & Portofolio', desc: 'Tambahkan proyek-proyek sebelumnya, foto hasil kerja, referensi owner, dan spesialisasi.' },
      { step: 3, title: 'Browse & Bid Tender', desc: 'Filter tender sesuai kapasitas dan spesialisasi. Upload dokumen teknis + penawaran harga.' },
      { step: 4, title: 'Menang → Aktifkan Working Capital', desc: 'Setelah SPK ditandatangani, ajukan working capital untuk mobilisasi. Cair dalam 4 jam kerja.' },
      { step: 5, title: 'Eksekusi & Invoice Termin', desc: 'Upload progress foto + BA → konsultan MK verifikasi → ajukan invoice factoring → dana cair 24 jam.' },
      { step: 6, title: 'Selesai → Credit Score Naik', desc: 'Proyek selesai tepat waktu = credit score naik. Limit modal kerja bertambah. Prioritas rekomen meningkat.' },
    ],
    tools: [
      { name: 'Tender Radar', icon: '🎯', desc: 'Feed proyek yang cocok dengan profil & kapasitas' },
      { name: 'Bid Builder', icon: '📝', desc: 'Template penawaran profesional siap pakai' },
      { name: 'Cash Flow Projector', icon: '💹', desc: 'Proyeksi arus kas proyek per bulan' },
      { name: 'Invoice Factoring Portal', icon: '⚡', desc: 'Ajukan pencairan invoice dalam 3 klik' },
      { name: 'Subkon Manager', icon: '👥', desc: 'Kelola subkon, mandor, dan supplier dari satu tempat' },
      { name: 'Credit Score Card', icon: '⭐', desc: 'Lihat score & rekomendasi peningkatan' },
    ],
    economics: [
      { label: 'Biaya bidding', value: 'Gratis untuk 5 bid/bln', note: 'Pro: unlimited. Business: unlimited + priority' },
      { label: 'Invoice factoring fee', value: '1.8–3.5% per invoice', note: 'Turun seiring track record naik' },
      { label: 'Working capital interest', value: '1.2–2.0%/bulan', note: 'Tanpa agunan fisik, berbasis SPK' },
      { label: 'Platform fee jika menang', value: '2–3% dari nilai kontrak', note: 'Dibayar setelah kontrak aktif' },
    ]
  },
  konsultan: {
    tagline: 'Dari perencana sampai pengawas — tools profesional untuk deliver proyek berkualitas',
    pains: [
      { icon: '📁', title: 'Dokumen berserakan di mana-mana', desc: 'Gambar revisi via WhatsApp, RKS lewat email, BA di grup telegram. Tidak ada sistem terpusat.' },
      { icon: '🔄', title: 'Koordinasi multi-pihak sangat ribet', desc: 'Owner, kontraktor, subkon, supplier — semua minta update berbeda dengan format berbeda.' },
      { icon: '💰', title: 'Fee sering terlambat', desc: 'Fee MK baru dibayar setelah owner bayar kontraktor. Posisi bergantung pada cash flow kontraktor.' },
      { icon: '⚖️', title: 'Tidak ada tools inspeksi terstandar', desc: 'QC checklist manual, sering berbeda-beda per proyek, tidak bisa jadi portofolio profesional.' },
    ],
    solutions: [
      { icon: ClipboardCheck, title: 'Digital QC Inspection Suite', desc: 'Checklist standar SNI per jenis pekerjaan. Isi di lapangan via mobile, auto-generate laporan PDF.', value: 'SNI compliant' },
      { icon: FileText, title: 'Document Hub Terpusat', desc: 'Semua dokumen proyek tersimpan di satu tempat: DED, RKS, BA, foto progress, laporan inspeksi.', value: 'Zero kehilangan dokumen' },
      { icon: DollarSign, title: 'Fee Langsung dari Escrow', desc: 'Fee konsultan terikat di kontrak dan dibayar langsung dari escrow — tidak bergantung pada kontraktor.', value: 'Fee aman terjamin' },
      { icon: BarChart3, title: 'Milestone Approval Workflow', desc: 'Konsultan MK yang approve setiap termin. Digital signature pada BA — tidak bisa dipalsukan.', value: 'Kewenangan penuh' },
      { icon: Globe, title: 'Multi-Proyek Dashboard', desc: 'Pantau semua proyek yang ditangani dari satu dashboard. Alert otomatis jika ada penyimpangan.', value: 'Efisiensi kerja 3x' },
      { icon: Award, title: 'Portofolio Profesional Terverifikasi', desc: 'Setiap proyek yang diawasi jadi track record resmi di platform. Mudah dipresentasikan ke owner baru.', value: 'Reputasi terbangun' },
    ],
    journey: [
      { step: 1, title: 'Daftar sebagai Konsultan Terverifikasi', desc: 'Upload SKA, NPWP, portofolio. Verifikasi INKINDO/PERENCANA otomatis.' },
      { step: 2, title: 'Ditunjuk atau Dipilih Owner', desc: 'Owner bisa cari konsultan dari direktori, atau konsultan ditunjuk langsung dan dihubungkan ke proyek.' },
      { step: 3, title: 'Setup Proyek & QC Standards', desc: 'Set checklist inspeksi per fase: pondasi, struktur, arsitektur, MEP, finishing. Link ke gambar DED.' },
      { step: 4, title: 'Monitoring Lapangan Harian', desc: 'Terima foto progress dari kontraktor. Verifikasi volume pekerjaan. Tandai jika ada ketidaksesuaian.' },
      { step: 5, title: 'Validasi Termin & Tanda Tangan BA', desc: 'Review claim pembayaran kontraktor. Setujui/tolak via platform. Tanda tangan BA digital.' },
      { step: 6, title: 'Serah Terima & Laporan Akhir', desc: 'Buat laporan akhir proyek, punch list, dan berita acara PHO/FHO. Semua tersimpan permanen.' },
    ],
    tools: [
      { name: 'Mobile QC Inspector', icon: '📱', desc: 'Inspeksi lapangan via HP, foto langsung attach ke checklist' },
      { name: 'Drawing Markup Tool', icon: '✏️', desc: 'Anotasi langsung di atas gambar DED digital' },
      { name: 'BA Digital Generator', icon: '📄', desc: 'Template BA profesional, auto-isi data proyek' },
      { name: 'Progress Curve (Kurva S)', icon: '📈', desc: 'Bandingkan rencana vs aktual secara visual' },
      { name: 'Defect Tracker', icon: '🔍', desc: 'Catat, foto, track perbaikan pekerjaan defect' },
      { name: 'Multi-Project Overview', icon: '🗂️', desc: 'Semua proyek dalam satu layar dengan status alert' },
    ],
    economics: [
      { label: 'Listing di direktori', value: 'Gratis selamanya', note: 'Profil terpublikasi ke semua owner' },
      { label: 'Fee platform jika dapat proyek', value: '5% dari fee konsultan', note: 'Hanya jika proyek via platform' },
      { label: 'Fee langsung dari escrow', value: 'Dijamin 100%', note: 'Tidak bergantung cash flow kontraktor' },
      { label: 'Efisiensi laporan', value: 'Hemat 8 jam/minggu', note: 'vs laporan manual Word/Excel' },
    ]
  },
  tukang: {
    tagline: 'Kerja lebih aman, bayar lebih pasti, karier lebih berkembang',
    pains: [
      { icon: '😟', title: 'Tidak ada kontrak resmi', desc: 'Kerja berdasarkan kata-kata. Tidak ada dokumen perlindungan jika majikan ingkar bayar atau PHK sepihak.' },
      { icon: '💸', title: 'Bayaran sering terlambat atau dipotong', desc: 'Kontraktor sering tunda bayar tukang karena tunggu dana dari owner. Posisi paling lemah dalam rantai.' },
      { icon: '📉', title: 'Tidak ada track record & reputasi', desc: 'Skill bagus tapi tidak ada bukti resmi. Harus mulai dari nol setiap cari kerja baru.' },
      { icon: '🏥', title: 'Tidak ada perlindungan K3', desc: 'Kecelakaan kerja = tanggung sendiri. Tidak ada BPJS Ketenagakerjaan, tidak ada asuransi lapangan.' },
    ],
    solutions: [
      { icon: FileText, title: 'Kontrak Kerja Digital', desc: 'Setiap penugasan dilindungi kontrak digital: upah, durasi, lingkup, hak cuti, dan mekanisme sengketa.', value: '100% terdokumentasi' },
      { icon: DollarSign, title: 'Pembayaran Milestone Terjamin', desc: 'Upah terikat escrow dari kontraktor. Dibayar otomatis saat milestone selesai diverifikasi mandor.', value: 'Zero keterlambatan' },
      { icon: Award, title: 'Digital Skill Passport', desc: 'Portofolio skill & pengalaman terverifikasi oleh kontraktor. Portable, bisa dibawa ke majikan berikutnya.', value: 'Karier naik kelas' },
      { icon: Shield, title: 'Asuransi K3 Embedded', desc: 'Coverage kecelakaan kerja Rp 25rb/orang/hari. Aktivasi otomatis saat masuk proyek.', value: 'Perlindungan penuh' },
      { icon: Star, title: 'Rating & Reputasi', desc: 'Kontraktor beri rating setelah proyek selesai. Tukang dengan rating tinggi dapat tawaran lebih banyak & bayar lebih tinggi.', value: 'Nilai tawar naik' },
      { icon: Users, title: 'Mandor Hub', desc: 'Mandor bisa kelola tim tukang, distribusi tugas, laporan progres, dan pembayaran tim dari satu app.', value: 'Naik jadi mandor resmi' },
    ],
    journey: [
      { step: 1, title: 'Daftar & Verifikasi Keahlian', desc: 'Isi profil skill: tukang besi, tukang cor, plumbing, listrik, dll. Opsional: upload sertifikat SKT.' },
      { step: 2, title: 'Dicari atau Melamar ke Proyek', desc: 'Kontraktor bisa cari tukang sesuai keahlian & lokasi. Atau tukang apply ke posting lowongan proyek.' },
      { step: 3, title: 'Tanda Tangan Kontrak Digital', desc: 'Setujui kontrak kerja digital: upah harian/borong, durasi, dan lingkup pekerjaan yang jelas.' },
      { step: 4, title: 'Check-in & Laporan Harian', desc: 'Absensi QR code di lapangan. Upload foto progress pekerjaan via app mobile sederhana.' },
      { step: 5, title: 'Milestone Selesai → Bayar Otomatis', desc: 'Mandor konfirmasi pekerjaan selesai. Pembayaran otomatis cair ke rekening/dompet digital.' },
      { step: 6, title: 'Rating & Lanjut ke Proyek Berikutnya', desc: 'Kontraktor beri rating. Skill passport diperbarui. Dapat rekomendasi proyek baru yang lebih baik.' },
    ],
    tools: [
      { name: 'Mobile Check-in', icon: '📱', desc: 'Absensi QR code + foto lapangan super simpel' },
      { name: 'Skill Passport', icon: '🪪', desc: 'Digital CV keahlian terverifikasi, bisa share ke siapapun' },
      { name: 'Upah Tracker', icon: '💵', desc: 'Pantau progres upah yang sudah earned vs terbayar' },
      { name: 'Klaim K3', icon: '🏥', desc: 'Ajukan klaim asuransi kecelakaan dengan foto & laporan' },
      { name: 'Mandor Panel', icon: '👷', desc: 'Khusus mandor: kelola tim, tugaskan pekerjaan, approve bayar' },
      { name: 'Job Board', icon: '🔍', desc: 'Cari proyek sesuai skill & lokasi domisili' },
    ],
    economics: [
      { label: 'Biaya daftar', value: 'Gratis selamanya', note: 'Tidak ada biaya membership untuk tukang' },
      { label: 'Asuransi K3', value: 'Rp 25rb/orang/hari', note: 'Ditanggung kontraktor, bukan tukang' },
      { label: 'Kenaikan upah setelah 5 proyek', value: '+20–40% premium', note: 'Tukang rating ⭐4.8+ dapat bayar lebih tinggi' },
      { label: 'Keterlambatan bayar', value: 'Nol hari', note: 'Escrow jamin bayar otomatis per milestone' },
    ]
  },
  supplier: {
    tagline: 'Jangkau lebih banyak pembeli, piutang lebih aman, bisnis material yang predictable',
    pains: [
      { icon: '💳', title: 'Piutang macet dari kontraktor', desc: 'Kasih material sudah, tapi bayar entah kapan. Kontraktor sering pakai alasan "tunggu termin dari owner".' },
      { icon: '📦', title: 'Demand tidak predictable', desc: 'Order tiba-tiba besar, tiba-tiba sepi. Sulit plan stok dan produksi. Marjin tipis akibat order mendadak.' },
      { icon: '🤝', title: 'Sulit masuk proyek besar', desc: 'Developer & BUMN punya vendor list tertutup. Supplier kecil menengah tidak punya jalur masuk.' },
      { icon: '📊', title: 'Tidak tahu harga pasar sebenarnya', desc: 'Kontraktor sering nego jauh di bawah pasar dengan alasan "supplier lain lebih murah".' },
    ],
    solutions: [
      { icon: Shield, title: 'Payment Guarantee via Escrow', desc: 'Pembayaran material terikat escrow proyek. Supplier kirim PO → material terkirim → bayar otomatis dari escrow.', value: 'Zero piutang macet' },
      { icon: DollarSign, title: 'Early Payment via Factoring', desc: 'Cairkan invoice lebih cepat dengan fee minimal. Tidak perlu tunggu kontraktor selesai tagih owner.', value: 'Cash lebih cepat' },
      { icon: Globe, title: 'B2B Marketplace Material', desc: 'Listing produk & harga di marketplace. Kontraktor dari seluruh Indonesia bisa temukan dan order langsung.', value: 'Jangkauan nasional' },
      { icon: BarChart3, title: 'Group Order Aggregation', desc: 'Platform agregasi demand dari banyak proyek kecil jadi satu order besar. Supplier dapat volume lebih stabil.', value: 'Volume predictable' },
      { icon: TrendingUp, title: 'Price Intelligence', desc: 'Lihat benchmark harga kompetitor, tren permintaan per material, dan prediksi demand 3 bulan ke depan.', value: 'Marjin lebih optimal' },
      { icon: FileText, title: 'Digital Purchase Order', desc: 'PO digital terintegrasi dengan kontrak proyek. Spesifikasi material, jadwal kirim, dan garansi kualitas terstandar.', value: 'Zero salah spec' },
    ],
    journey: [
      { step: 1, title: 'Daftar & Verifikasi Supplier', desc: 'Upload NIB, NPWP, sertifikat SNI produk. Verifikasi otomatis cross-check ke database kualitas.' },
      { step: 2, title: 'Listing Produk & Harga', desc: 'Upload katalog produk dengan foto, spesifikasi teknis, harga per satuan, minimum order, dan area distribusi.' },
      { step: 3, title: 'Terima Request Quote / PO', desc: 'Kontraktor request quote atau langsung order. Supplier konfirmasi ketersediaan, harga, dan jadwal kirim.' },
      { step: 4, title: 'Proses Order & Pengiriman', desc: 'Terima PO digital terhubung ke escrow. Kirim material sesuai spesifikasi. Upload delivery note digital.' },
      { step: 5, title: 'Invoice & Terima Pembayaran', desc: 'Upload invoice → sistem verifikasi delivery note → dana dari escrow cair ke rekening supplier.' },
      { step: 6, title: 'Rating & Repeat Order', desc: 'Kontraktor beri rating kualitas & ketepatan kirim. Supplier top rating mendapat featured placement.' },
    ],
    tools: [
      { name: 'Product Catalog Manager', icon: '📋', desc: 'Kelola ribuan SKU produk dengan mudah' },
      { name: 'Order Management System', icon: '📦', desc: 'Track semua PO, status kirim, dan invoice' },
      { name: 'Demand Forecast Dashboard', icon: '📈', desc: 'Prediksi permintaan per material 3 bulan ke depan' },
      { name: 'Invoice Factoring Portal', icon: '⚡', desc: 'Cairkan invoice lebih cepat dengan beberapa klik' },
      { name: 'Price Benchmark Tool', icon: '💹', desc: 'Bandingkan harga Anda vs median pasar real-time' },
      { name: 'Group Order Notifier', icon: '🔔', desc: 'Alert saat ada aggregated order volume besar' },
    ],
    economics: [
      { label: 'Listing basic', value: 'Rp 2 jt/bln per kategori', note: 'Unlimited produk dalam kategori' },
      { label: 'Komisi per transaksi', value: '2–4% dari nilai order', note: 'Dibayar saat dana cair dari escrow' },
      { label: 'Piutang macet', value: 'Nol', note: 'Escrow jamin pembayaran 100%' },
      { label: 'Jangkauan pelanggan baru', value: '+300% dalam 6 bulan', note: 'Berdasarkan data supplier aktif platform' },
    ]
  },
  subkon: {
    tagline: 'Posisi lebih kuat, bayar lebih aman, akses proyek spesialis yang lebih bernilai',
    pains: [
      { icon: '😤', title: 'Posisi tawar sangat lemah', desc: 'Kontraktor utama sering minta diskon ekstrem, bayar lambat, dan ubah scope pekerjaan sepihak.' },
      { icon: '⏰', title: 'Selalu last-to-be-paid', desc: 'Bayaran subkon bergantung sepenuhnya pada cash flow kontraktor utama. Bisa terlambat berbulan-bulan.' },
      { icon: '📋', title: 'Kontrak tidak melindungi', desc: 'Kontrak subkon dibuat kontraktor utama — sering menguntungkan satu pihak. Tidak ada template standar.' },
      { icon: '🌐', title: 'Pasar terbatas', desc: 'Akses proyek hanya lewat jaringan kontraktor utama. Sulit masuk ke proyek baru tanpa relasi.' },
    ],
    solutions: [
      { icon: Shield, title: 'Back-to-Back Payment Escrow', desc: 'Dana subkon di-ring-fence dari escrow kontraktor utama. Pembayaran langsung dari escrow, bukan cash flow kontraktor.', value: 'Independen dari cash kontraktor' },
      { icon: FileText, title: 'Kontrak Subkon Standar', desc: 'Template kontrak subkon yang seimbang: back-to-back clause, pembayaran milestone, perlindungan scope creep.', value: 'Hak subkon terlindungi' },
      { icon: Globe, title: 'Direktori Subkon Spesialis', desc: 'Kontraktor utama bisa cari subkon dari database terverifikasi. Subkon dapat exposure langsung ke pasar lebih luas.', value: 'Pasar lebih luas' },
      { icon: TrendingUp, title: 'Credit Score & Working Capital', desc: 'Bangun track record di platform → credit score naik → bisa akses working capital untuk mobilisasi proyek.', value: 'Modal kerja tersedia' },
      { icon: Award, title: 'Sertifikasi Spesialis Terverifikasi', desc: 'Badge spesialisasi terverifikasi (MEP, waterproofing, struktur baja, dll) meningkatkan kepercayaan kontraktor utama.', value: 'Nilai jual lebih tinggi' },
      { icon: BarChart3, title: 'Dispute Resolution Back-to-Back', desc: 'Jika kontraktor utama dispute dengan owner, platform pastikan dispute tidak merambat ke subkon yang tidak bersalah.', value: 'Terlindungi dari dispute upstream' },
    ],
    journey: [
      { step: 1, title: 'Daftar & Verifikasi Spesialisasi', desc: 'Upload SBU spesialisasi (misal: ME Elektrikal, Sipil Khusus), sertifikasi produk, dan portofolio pekerjaan.' },
      { step: 2, title: 'Masuk Direktori Subkon', desc: 'Profil muncul di direktori. Kontraktor utama bisa temukan berdasarkan spesialisasi, lokasi, dan kapasitas.' },
      { step: 3, title: 'Terima & Negosiasi Kontrak Subkon', desc: 'Kontraktor utama kirim undangan. Subkon review scope, harga, dan jadwal. Negosiasi digital di platform.' },
      { step: 4, title: 'Kontrak Aktif & Escrow Dikunci', desc: 'Setelah kontrak ditandatangani, dana subkon otomatis dikunci di escrow terpisah dari kontraktor utama.' },
      { step: 5, title: 'Pelaksanaan & Invoice Milestone', desc: 'Selesaikan pekerjaan per milestone → upload BA & foto → kontraktor utama verifikasi → dana cair dari escrow.' },
      { step: 6, title: 'Rating Naik → Akses Lebih Baik', desc: 'Rating bagus = lebih sering direkomendasikan. Credit score naik = limit working capital bertambah.' },
    ],
    tools: [
      { name: 'Subkon Profile Builder', icon: '🔧', desc: 'Bangun profil spesialisasi yang menjual ke kontraktor utama' },
      { name: 'Contract Review Tool', icon: '📋', desc: 'Highlight klausul tidak wajar, bandingkan dengan template standar' },
      { name: 'Escrow Balance Tracker', icon: '💰', desc: 'Lihat dana yang sudah dikunci untuk proyek Anda' },
      { name: 'Dispute Back-to-Back Shield', icon: '⚡', desc: 'Perlindungan otomatis jika ada dispute upstream' },
      { name: 'Specialist Certification Hub', icon: '🏅', desc: 'Daftar, verifikasi, dan tampilkan sertifikasi spesialis' },
      { name: 'Working Capital Portal', icon: '💳', desc: 'Akses pinjaman modal kerja berbasis SPK subkon' },
    ],
    economics: [
      { label: 'Listing di direktori', value: 'Gratis', note: 'Profil terpublikasi ke semua kontraktor' },
      { label: 'Fee platform jika dapat proyek', value: '1.5% dari nilai subkon', note: 'Lebih rendah dari commission agen konvensional' },
      { label: 'Keterlambatan bayar dari kontraktor', value: 'Diminimalisir', note: 'Escrow back-to-back memutus ketergantungan' },
      { label: 'Working capital', value: '1.5–2.5%/bln', note: 'Berbasis SPK subkon, tanpa agunan fisik' },
    ]
  }
};

const ColorBar = ({ color, pct }) => {
  const bars = { orange: 'bg-orange-400', blue: 'bg-blue-400', purple: 'bg-purple-400', yellow: 'bg-yellow-400', green: 'bg-green-400', rose: 'bg-rose-400' };
  return (
    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${bars[color]}`} style={{ width: `${pct}%` }} />
    </div>
  );
};

export default function StakeholderHub() {
  const [activeRole, setActiveRole] = useState('owner');
  const [activeSection, setActiveSection] = useState('overview');
  const role = roles.find(r => r.id === activeRole);
  const data = roleData[activeRole];

  const sections = [
    { id: 'overview', label: 'Pain & Solusi' },
    { id: 'journey', label: 'Journey Pengguna' },
    { id: 'tools', label: 'Tools Eksklusif' },
    { id: 'economics', label: 'Ekonomi Bisnis' },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center gap-3 mb-1">
          <div className={`w-9 h-9 bg-gradient-to-br ${role.gradient} rounded-xl flex items-center justify-center text-lg`}>
            {role.emoji}
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Stakeholder Hub</h1>
            <p className="text-xs text-slate-500">Ekosistem terintegrasi — kebutuhan mendalam tiap peran dalam konstruksi Indonesia</p>
          </div>
        </div>
      </div>

      {/* Role Selector */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex-shrink-0">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {roles.map(r => (
            <button
              key={r.id}
              onClick={() => { setActiveRole(r.id); setActiveSection('overview'); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap border transition-all flex-shrink-0 ${
                activeRole === r.id
                  ? `bg-gradient-to-r ${r.gradient} text-white border-transparent shadow-lg`
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              <span>{r.emoji}</span>
              <div className="text-left">
                <div>{r.label}</div>
                {activeRole === r.id && <div className="text-xs opacity-75">{r.subtitle}</div>}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Hero Banner */}
      <div className={`bg-gradient-to-r ${role.gradient} text-white px-6 py-5 flex-shrink-0`}>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{role.emoji}</span>
          <div>
            <div className="text-lg font-bold">{role.label} — {role.subtitle}</div>
            <div className="text-sm opacity-85 mt-0.5">{data.tagline}</div>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="bg-white border-b border-slate-200 px-6 flex-shrink-0">
        <div className="flex gap-1 py-1">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeSection === s.id
                  ? `bg-${role.color}-600 text-white`
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
              style={activeSection === s.id ? { backgroundColor: `var(--${role.color})` } : {}}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* OVERVIEW: Pain + Solutions */}
        {activeSection === 'overview' && (
          <>
            <div>
              <h2 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400" /> Pain Points Utama {role.label}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.pains.map((p, i) => (
                  <div key={i} className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3">
                    <span className="text-2xl flex-shrink-0">{p.icon}</span>
                    <div>
                      <p className="font-semibold text-red-800 text-sm mb-1">{p.title}</p>
                      <p className="text-xs text-red-600 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" /> Solusi Platform untuk {role.label}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.solutions.map((s, i) => (
                  <div key={i} className={`${role.bg} ${role.border} border rounded-xl p-4 flex gap-3`}>
                    <div className={`w-10 h-10 bg-gradient-to-br ${role.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <s.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className={`font-semibold ${role.textAccent} text-sm`}>{s.title}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap flex-shrink-0 ${role.badge}`}>{s.value}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* JOURNEY */}
        {activeSection === 'journey' && (
          <div>
            <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-500" /> Customer Journey — {role.label} di RancangBangun
            </h2>
            <div className="space-y-3">
              {data.journey.map((j, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${role.gradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {j.step}
                  </div>
                  <div className="flex-1 pb-4 border-b border-slate-100 last:border-0">
                    <p className="font-semibold text-slate-800 mb-1">{j.title}</p>
                    <p className="text-sm text-slate-500">{j.desc}</p>
                  </div>
                  {i < data.journey.length - 1 && (
                    <div className="absolute ml-4 mt-10">
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Value delivered per step */}
            <div className={`mt-6 ${role.bg} ${role.border} border rounded-xl p-5`}>
              <h3 className={`font-bold ${role.textAccent} mb-3`}>Nilai yang Dirasakan Sepanjang Journey</h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { phase: 'Awal (1-2)', label: 'Onboarding', val: 'Mudah & cepat', sub: 'Terverifikasi < 24 jam' },
                  { phase: 'Tengah (3-5)', label: 'Core Value', val: 'Aman & efisien', sub: 'Dana terlindungi, proses digital' },
                  { phase: 'Akhir (6)', label: 'Loyalty', val: 'Tumbuh & repeat', sub: 'Score naik, akses bertambah' },
                ].map((v, i) => (
                  <div key={i} className="bg-white rounded-xl p-3 border border-white">
                    <div className="text-xs text-slate-400 mb-1">Step {v.phase}</div>
                    <div className={`font-bold ${role.textAccent} text-sm mb-0.5`}>{v.val}</div>
                    <div className="text-xs text-slate-500">{v.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TOOLS */}
        {activeSection === 'tools' && (
          <div>
            <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" /> Tools Eksklusif untuk {role.label}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.tools.map((t, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 flex items-start gap-3 hover:border-slate-300 hover:shadow-sm transition-all">
                  <span className="text-2xl flex-shrink-0">{t.icon}</span>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm mb-0.5">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 ml-auto flex-shrink-0 mt-0.5" />
                </div>
              ))}
            </div>

            <div className="mt-6 bg-slate-900 text-white rounded-2xl p-5">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" /> Integrasi Ekosistem {role.label}
              </h3>
              <div className="flex items-center gap-3 flex-wrap">
                {['Bank Partner', 'LPJK / INKINDO', 'OJK Licensed', 'BPJS TK', 'Asuransi Jasindo', 'e-Meterai Peruri', 'API SIMBG'].map((p, i) => (
                  <span key={i} className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium">{p}</span>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-3">
                Platform terkoneksi dengan ekosistem regulasi & keuangan Indonesia untuk memberikan pengalaman yang legal, aman, dan terpercaya.
              </p>
            </div>
          </div>
        )}

        {/* ECONOMICS */}
        {activeSection === 'economics' && (
          <div>
            <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-500" /> Ekonomi Bisnis — {role.label}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {data.economics.map((e, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-4">
                  <p className="text-xs text-slate-400 mb-1">{e.label}</p>
                  <p className={`text-2xl font-black ${role.textAccent} mb-0.5`}>{e.value}</p>
                  <p className="text-xs text-slate-500">{e.note}</p>
                </div>
              ))}
            </div>

            {/* Value proposition matrix */}
            <div className={`${role.bg} ${role.border} border rounded-xl p-5`}>
              <h3 className={`font-bold ${role.textAccent} mb-4`}>Platform vs Cara Konvensional</h3>
              <div className="space-y-3">
                {[
                  { aspect: 'Cari mitra/proyek', before: 'Relasi & telepon, 2-4 minggu', after: 'Platform + Smart Matching, < 3 hari' },
                  { aspect: 'Keamanan pembayaran', before: 'Berdasarkan kepercayaan saja', after: 'Escrow + kontrak digital terjamin' },
                  { aspect: 'Dokumen & administrasi', before: 'Manual, sering hilang', after: 'Digital, tersimpan permanen' },
                  { aspect: 'Sengketa & klaim', before: 'Jalur hukum mahal & lama', after: 'Mediasi platform 7 hari, arbitrase 30 hari' },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-3 gap-3 items-center">
                    <p className="text-xs font-semibold text-slate-700">{row.aspect}</p>
                    <div className="bg-red-50 rounded-lg px-3 py-2 text-center">
                      <p className="text-xs text-red-600">{row.before}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg px-3 py-2 text-center">
                      <p className="text-xs text-green-700 font-medium">{row.after}</p>
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-3 text-center text-xs font-bold mt-1">
                  <div></div>
                  <div className="text-red-500">Cara Lama</div>
                  <div className="text-green-600">Platform RancangBangun</div>
                </div>
              </div>
            </div>

            {/* ROI Highlight */}
            <div className="mt-4 bg-slate-900 text-white rounded-2xl p-5">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" /> ROI Bergabung ke Platform — {role.label}
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                {activeRole === 'owner' && [
                  { val: '15-25%', desc: 'Penghematan biaya proyek dari kompetisi lebih sehat' },
                  { val: '40%', desc: 'Pengurangan risiko kegagalan proyek dengan escrow & QC' },
                  { val: '3 hari', desc: 'Waktu cari kontraktor vs 2-4 minggu manual' },
                ].map((r, i) => <div key={i} className="bg-white/10 rounded-xl p-3"><div className="text-2xl font-black text-green-400 mb-1">{r.val}</div><div className="text-xs text-slate-300">{r.desc}</div></div>)}
                {activeRole === 'kontraktor' && [
                  { val: '3x', desc: 'Lebih banyak proyek visi dan akses tender nasional' },
                  { val: '24 jam', desc: 'Pencairan invoice vs 60-90 hari konvensional' },
                  { val: '+40%', desc: 'Revenue tahunan kontraktor aktif vs sebelum gabung' },
                ].map((r, i) => <div key={i} className="bg-white/10 rounded-xl p-3"><div className="text-2xl font-black text-green-400 mb-1">{r.val}</div><div className="text-xs text-slate-300">{r.desc}</div></div>)}
                {activeRole === 'konsultan' && [
                  { val: '8 jam', desc: 'Hemat per minggu dari eliminasi laporan manual' },
                  { val: '100%', desc: 'Fee terjamin langsung dari escrow' },
                  { val: '5x', desc: 'Lebih mudah dapat proyek baru via direktori terverifikasi' },
                ].map((r, i) => <div key={i} className="bg-white/10 rounded-xl p-3"><div className="text-2xl font-black text-green-400 mb-1">{r.val}</div><div className="text-xs text-slate-300">{r.desc}</div></div>)}
                {activeRole === 'tukang' && [
                  { val: '+40%', desc: 'Kenaikan upah setelah reputasi terbangun di platform' },
                  { val: 'Nol', desc: 'Keterlambatan bayar dengan escrow milestone' },
                  { val: '3x', desc: 'Lebih mudah dapat proyek lewat profil terverifikasi' },
                ].map((r, i) => <div key={i} className="bg-white/10 rounded-xl p-3"><div className="text-2xl font-black text-green-400 mb-1">{r.val}</div><div className="text-xs text-slate-300">{r.desc}</div></div>)}
                {activeRole === 'supplier' && [
                  { val: 'Nol', desc: 'Piutang macet dengan payment guarantee escrow' },
                  { val: '+300%', desc: 'Pelanggan baru dalam 6 bulan pertama aktif' },
                  { val: '2x', desc: 'Volume order lebih stabil dari aggregated demand' },
                ].map((r, i) => <div key={i} className="bg-white/10 rounded-xl p-3"><div className="text-2xl font-black text-green-400 mb-1">{r.val}</div><div className="text-xs text-slate-300">{r.desc}</div></div>)}
                {activeRole === 'subkon' && [
                  { val: '100%', desc: 'Bayaran terikat escrow terpisah dari kontraktor utama' },
                  { val: '5x', desc: 'Akses pasar lebih luas lewat direktori spesialis' },
                  { val: '+30%', desc: 'Margin lebih baik karena posisi tawar lebih kuat' },
                ].map((r, i) => <div key={i} className="bg-white/10 rounded-xl p-3"><div className="text-2xl font-black text-green-400 mb-1">{r.val}</div><div className="text-xs text-slate-300">{r.desc}</div></div>)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
