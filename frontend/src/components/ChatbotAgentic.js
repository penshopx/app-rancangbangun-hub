import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, Zap } from 'lucide-react';

// ── Knowledge Base ────────────────────────────────────────────────────────────
// Setiap entry punya:
//   keywords: kata kunci individual (bobot 1 setiap cocok)
//   phrases:  frasa multi-kata yang cocok sebagai satu unit (bobot 3 per cocok)
//   reply:    teks jawaban
//   actions:  tombol quick-reply (opsional)
const KB = [
  {
    id: 'intro',
    keywords: ['rancangbangun', 'rancang', 'bangun', 'platform', 'aplikasi', 'app', 'sistem', 'apa', 'tentang', 'ini', 'apakah', 'kenapa', 'mengapa', 'visi', 'misi', 'tujuan', 'fungsi', 'kegunaan', 'manfaat'],
    phrases: ['apa itu', 'apa ini', 'rancang bangun', 'platform ini', 'aplikasi ini', 'tentang platform', 'penjelasan platform', 'ceritakan tentang', 'jelaskan tentang', 'gimana cara kerja', 'bagaimana cara kerja', 'platform apa', 'apa fungsi'],
    reply: `🏗️ **RancangBangun** adalah platform marketplace konstruksi terintegrasi pertama di Indonesia.

Kami menghubungkan semua pemangku kepentingan proyek dalam satu ekosistem digital:

👔 **Owner / Developer** — posting proyek, cari kontraktor, pantau progress
🏗️ **Kontraktor** — ikut tender, kelola proyek, akses modal kerja
👷 **Tukang / Mandor** — cari pekerjaan, terima upah digital
🏭 **Supplier Material** — listing produk, terima order langsung
📐 **Konsultan / MK** — kelola proyek, QC & supervisi
🏦 **Lembaga Keuangan** — escrow, factoring, kredit berbasis SPK

💡 Masalah yang kami selesaikan:
• Owner kesulitan cari kontraktor terpercaya → Direktori verified LPJK
• Kontraktor tidak punya akses modal → Invoice Factoring 24 jam
• Proyek tidak transparan → Dashboard monitoring real-time
• Pembayaran berisiko → Sistem Escrow & Jaminan terstandar`,
    actions: [
      { label: '👥 Untuk Owner', q: 'Saya owner, apa yang bisa dilakukan?' },
      { label: '🏗️ Untuk Kontraktor', q: 'Saya kontraktor, bagaimana bergabung?' },
      { label: '🎯 Semua Fitur', q: 'Tampilkan semua fitur platform' },
    ]
  },
  {
    id: 'greeting',
    keywords: ['halo', 'hai', 'hi', 'hello', 'selamat', 'pagi', 'siang', 'sore', 'malam', 'hei', 'hey', 'hallo', 'assalamualaikum', 'permisi', 'tes', 'test', 'coba'],
    phrases: ['selamat pagi', 'selamat siang', 'selamat sore', 'selamat malam', 'good morning', 'good afternoon'],
    reply: `👋 Halo! Saya AI Assistant RancangBangun.

Saya siap membantu Anda tentang:
• 🏗️ Platform RancangBangun & cara kerjanya
• 💰 Cara hitung RAB & estimasi biaya
• 👥 Cari kontraktor verified LPJK
• ⚖️ Proses bidding, tender & kontrak
• 🛡️ Escrow, jaminan & keamanan proyek
• 💳 Invoice factoring & modal kerja

Anda siapa? Owner proyek atau Kontraktor?`,
    actions: [
      { label: '👔 Saya Owner', q: 'Saya owner proyek, apa yang bisa dilakukan?' },
      { label: '🏗️ Saya Kontraktor', q: 'Saya kontraktor, bagaimana bergabung?' },
      { label: '❓ Apa itu RancangBangun?', q: 'Apa itu RancangBangun dan apa tujuannya?' },
    ]
  },
  {
    id: 'owner',
    keywords: ['owner', 'pemilik', 'developer', 'pengembang', 'pemberi', 'kerja', 'bos', 'investor', 'klien', 'pembeli', 'proyek'],
    phrases: ['saya owner', 'sebagai owner', 'punya proyek', 'mau bangun', 'ingin bangun', 'mau buat', 'pemberi kerja', 'pemilik proyek', 'untuk owner'],
    reply: `🏢 Sebagai **Owner**, platform membantu Anda dari awal sampai selesai:

📋 **Persiapan & Pengadaan:**
• Buat RAB digital dengan 100+ item pekerjaan
• Post proyek ke marketplace nasional
• Smart matching kontraktor sesuai spesialisasi & lokasi

⚖️ **Proses Tender & Kontrak:**
• Terima penawaran dari kontraktor verified
• Bandingkan proposal teknis & harga side-by-side
• SPK digital ditandatangani kedua pihak

💰 **Keamanan Pembayaran:**
• Dana termin masuk escrow — aman sampai pekerjaan diverifikasi
• Bayar sesuai milestone, bukan borongan buta
• Retensi 5% selama 12 bulan garansi pemeliharaan

📊 **Monitoring Real-time:**
• Foto progress harian dari lapangan
• Kurva S aktual vs rencana
• QC standar SNI diverifikasi konsultan MK`,
    actions: [
      { label: '🚀 Cara Post Proyek', q: 'Bagaimana cara memposting proyek di marketplace?' },
      { label: '🛡️ Cara Kerja Escrow', q: 'Jelaskan mekanisme escrow dan pembayaran' },
      { label: '👷 Cara Pilih Kontraktor', q: 'Bagaimana cara memilih kontraktor yang tepat?' },
    ]
  },
  {
    id: 'contractor',
    keywords: ['kontraktor', 'pelaksana', 'pemborong', 'vendor', 'penyedia', 'jasa', 'kontraktor', 'bergabung', 'daftar', 'join'],
    phrases: ['saya kontraktor', 'sebagai kontraktor', 'cara bergabung', 'daftar kontraktor', 'ingin bergabung', 'mau bergabung', 'untuk kontraktor', 'jadi kontraktor'],
    reply: `👷 Sebagai **Kontraktor**, platform membuka peluang lebih luas:

📈 **Akses Proyek Nasional:**
• Ribuan tender aktif dari seluruh Indonesia
• Smart matching sesuai SBU, kapasitas & lokasi
• Bidding digital tanpa biaya marketing

💼 **Solusi Permodalan:**
• Invoice Factoring — cair 80-90% dalam 24 jam
• Working Capital berbasis SPK — tanpa agunan fisik
• Bid Bond digital — terbit < 5 menit

🏆 **Bangun Reputasi:**
• Credit Score terverifikasi oleh platform
• Badge SBU/LPJK di profil publik
• Track record proyek terdokumentasi digital

📋 **Cara Mulai:**
1. Daftar & upload dokumen SBU/LPJK
2. Verifikasi identitas & perusahaan (1-2 hari kerja)
3. Profil aktif — mulai browse & bid tender!`,
    actions: [
      { label: '⚖️ Cara Ikut Tender', q: 'Bagaimana cara mengikuti proses bidding dan tender?' },
      { label: '💰 Invoice Factoring', q: 'Jelaskan sistem invoice factoring dan working capital' },
      { label: '✅ Syarat SBU/LPJK', q: 'Apa syarat SBU dan LPJK untuk bergabung?' },
    ]
  },
  {
    id: 'rab',
    keywords: ['rab', 'rencana', 'anggaran', 'biaya', 'budget', 'estimasi', 'hitung', 'kalkulasi', 'cost', 'perhitungan', 'angka', 'nominal', 'dana', 'uang', 'rupiah'],
    phrases: ['rencana anggaran biaya', 'cara hitung', 'hitung rab', 'estimasi biaya', 'menghitung biaya', 'berapa biaya', 'total biaya', 'biaya proyek', 'anggaran proyek', 'rab proyek', 'kalkulasi biaya'],
    reply: `💰 **RAB Calculator** tersedia di menu sidebar kiri!

✅ **Fitur lengkap:**
• 100+ item pekerjaan: material, upah, sewa alat
• Template LPJK resmi: BG002 Gedung, BS001 Jalan, IN001 ME
• Breakdown otomatis per Work Breakdown Structure (WBS)
• Harga satuan referensi HSPK per kota
• Export PDF & Excel untuk dokumen tender

📐 **Komponen RAB yang dihitung:**
• Pekerjaan Persiapan (mobilisasi, direksi keet)
• Pekerjaan Tanah & Pondasi
• Pekerjaan Struktur (beton, baja)
• Pekerjaan Arsitektur (dinding, lantai, atap)
• Pekerjaan MEP (listrik, plumbing, AC)
• Overhead & Profit (biasanya 10-15%)

💡 Tips: Tambahkan contingency 5-10% untuk risiko proyek.`,
    actions: [
      { label: '📊 Buka RAB Calculator', q: 'Cara menggunakan RAB Calculator step by step' },
      { label: '📋 Template RAB', q: 'Apa saja template RAB yang tersedia?' },
    ]
  },
  {
    id: 'bidding',
    keywords: ['bidding', 'tender', 'lelang', 'penawaran', 'bid', 'kontrak', 'spk', 'pemenang', 'seleksi', 'kompetisi', 'proposal', 'dokumen', 'evaluasi'],
    phrases: ['proses bidding', 'ikut tender', 'cara tender', 'mengikuti lelang', 'submit penawaran', 'ajukan penawaran', 'proses tender', 'cara lelang', 'sistem tender', 'bidding digital'],
    reply: `⚖️ **Sistem Bidding & SPK Digital** ada di menu "Bidding & SPK"!

📝 **Alur Lengkap:**
1. **Owner posting** proyek + spesifikasi teknis + HPS
2. **Kontraktor browse** dan download dokumen lelang
3. **Submit penawaran**: teknis (metode kerja, jadwal) + harga
4. **Platform scoring** otomatis 0-100 (teknis 60% + harga 40%)
5. **Owner review** & klarifikasi ke 3 besar shortlist
6. **Pengumuman pemenang** → negosiasi final
7. **SPK digital** ditandatangani dengan e-sign tersertifikasi
8. **Dana DP** masuk escrow → proyek dimulai

⏱️ Waktu rata-rata: 3-14 hari kerja

📋 **3 Metode Pengadaan:**
• Tender Terbuka — siapapun bisa ikut
• Tender Terbatas — undangan ke kontraktor terseleksi
• Penunjukan Langsung — untuk proyek < Rp 200 juta`,
    actions: [
      { label: '📄 Tentang SPK Digital', q: 'Jelaskan kontrak SPK digital dan klausul pentingnya' },
      { label: '🛡️ Bid Bond', q: 'Apa itu bid bond dan cara mendapatkannya?' },
    ]
  },
  {
    id: 'escrow',
    keywords: ['escrow', 'jaminan', 'aman', 'bayar', 'pembayaran', 'termin', 'dana', 'transfer', 'cair', 'penahanan', 'retensi', 'dp', 'uang muka', 'pelaksanaan'],
    phrases: ['cara kerja escrow', 'keamanan pembayaran', 'uang aman', 'sistem pembayaran', 'bayar termin', 'jaminan pelaksanaan', 'jaminan pembayaran', 'dana aman', 'mekanisme escrow'],
    reply: `🛡️ **Sistem Escrow & Jaminan** — keamanan untuk kedua pihak!

💡 **Cara Kerja Escrow:**
1. Owner deposit dana ke rekening escrow platform (terpisah dari operasional)
2. Kontraktor mengerjakan sesuai milestone di SPK
3. Konsultan MK atau QC platform verifikasi fisik di lapangan
4. Owner konfirmasi → dana milestone cair ke kontraktor dalam 24 jam

✅ **Lapisan Perlindungan:**
| Jenis | Besaran | Fungsi |
|---|---|---|
| Jaminan Penawaran (Bid Bond) | 1-3% HPS | Pastikan kontraktor serius |
| Jaminan Pelaksanaan | 5% nilai kontrak | Ganti rugi jika gagal |
| Retensi | 5% per termin | Ditahan 12 bln masa garansi |
| Jaminan Uang Muka | 100% DP | Jika kontraktor kabur |

⚖️ **Jika Ada Sengketa:**
• Musyawarah 24 jam → Mediasi platform 7 hari → Arbitrase BANI`,
    actions: [
      { label: '📋 Jenis Jaminan Lengkap', q: 'Jelaskan semua jenis jaminan di platform' },
      { label: '⚖️ Proses Sengketa', q: 'Bagaimana proses penyelesaian sengketa?' },
    ]
  },
  {
    id: 'financing',
    keywords: ['invoice', 'factoring', 'modal', 'pinjam', 'kredit', 'hutang', 'keuangan', 'finansial', 'cash', 'flow', 'cair', 'likuiditas', 'working', 'capital', 'loan', 'pembiayaan'],
    phrases: ['invoice factoring', 'working capital', 'modal kerja', 'cash flow', 'butuh modal', 'cair cepat', 'pinjaman kontraktor', 'kredit proyek', 'dana cepat', 'butuh dana'],
    reply: `🏦 **Supply Chain Finance** — solusi cash flow kontraktor!

⚡ **Invoice Factoring:**
• Upload invoice + Berita Acara kemajuan pekerjaan
• Verifikasi platform dalam 15 menit
• Dana **80-90%** cair dalam **24 jam kerja**
• Fee: 1.8-3.5% per invoice (tergantung rating kredit)
• Tenor: 30-90 hari sesuai jatuh tempo invoice

💼 **Working Capital Loan:**
• Berbasis nilai SPK yang sudah ditandatangani
• **Zero agunan fisik** — SPK sebagai jaminan
• Bunga 1.2-2.0%/bulan
• Cair dalam **4 jam kerja** setelah dokumen lengkap
• Limit: hingga 70% nilai SPK

🔐 **Bid Bond Digital:**
• Jaminan penawaran untuk ikut tender
• Terbit **< 5 menit** (vs 3-5 hari di bank konvensional)
• Fee flat Rp 250rb - 750rb tergantung nilai proyek
• Diterima semua instansi pemerintah & BUMN`,
    actions: [
      { label: '📊 Cara Ajukan Factoring', q: 'Langkah-langkah mengajukan invoice factoring' },
      { label: '✅ Syarat Working Capital', q: 'Apa syarat mendapatkan working capital loan?' },
    ]
  },
  {
    id: 'lpjk',
    keywords: ['lpjk', 'sbu', 'klasifikasi', 'sertifikat', 'lisensi', 'kbli', 'kualifikasi', 'akreditasi', 'izin', 'perijinan', 'legal', 'badan', 'usaha'],
    phrases: ['sertifikat sbu', 'klasifikasi lpjk', 'kualifikasi kontraktor', 'bg002', 'bs001', 'sbu aktif', 'verifikasi lpjk'],
    reply: `📋 **73 Klasifikasi LPJK** terintegrasi di platform!

🔰 **8 Bidang Usaha Konstruksi:**
| Kode | Bidang | Contoh |
|---|---|---|
| BG | Bangunan Gedung | Gedung kantor, apartemen, RS |
| BS | Bangunan Sipil | Jalan, jembatan, bendungan |
| IN | Instalasi ME | Listrik, AC, plumbing, fire |
| KK | Konstruksi Khusus | Pondasi khusus, pembongkaran |
| PB | Penyelesaian Bangunan | Cat, keramik, kaca, aluminium |
| PL | Persiapan Lahan | Land clearing, pengerukan |
| KP | Prapabrikasi | Baja, precast, modular |
| PA | Penyewaan Alat | Tower crane, excavator |

✅ Semua kontraktor di platform harus punya **SBU aktif**
📌 Kami verifikasi langsung ke database LPJK pusat`,
    actions: [
      { label: '👥 Filter Kontraktor per SBU', q: 'Cara cari kontraktor berdasarkan SBU tertentu' },
    ]
  },
  {
    id: 'features',
    keywords: ['fitur', 'modul', 'menu', 'layanan', 'tools', 'fungsi', 'kemampuan', 'fasilitas', 'semua', 'list', 'daftar', 'apa', 'saja', 'ada'],
    phrases: ['fitur apa saja', 'ada apa saja', 'semua fitur', 'daftar fitur', 'tampilkan fitur', 'list fitur', 'modul apa', 'menu apa', 'layanan apa'],
    reply: `🎯 **Semua Modul RancangBangun:**

🌐 **Marketplace & Kontrak:**
• Marketplace — Posting & cari proyek
• Proyek Saya — Manajemen proyek aktif
• Bidding & SPK — Tender & kontrak digital
• Jaminan & QC — Escrow, jaminan, quality control
• Direktori Kontraktor — 2,500+ kontraktor verified

📋 **Pengadaan:**
• RAB Calculator — Estimasi biaya 100+ item
• Smart Search — Cari proyek/material/kontraktor

📐 **Perencanaan:**
• Blueprint — Upload & anotasi gambar teknik
• Smart BOM — Bill of Materials otomatis
• Gantt Chart — Timeline & milestone proyek
• Budget Tracker — Monitor anggaran real-time

🏗️ **Pelaksanaan:**
• Site Control — Monitor lapangan harian
• Team Management — Assign & absensi pekerja
• Equipment Tracker — Alat berat & maintenance
• Safety K3 — Checklist K3 & laporan insiden

✅ **Quality & Compliance:**
• FAT Checklist — Factory Acceptance Test
• QC Inspector — Standar SNI
• Maintenance Log — Pemeliharaan berkala

💰 **Finansial:**
• Invoice Manager — Factoring & pembayaran
• Document Hub — Arsip kontrak & perizinan`,
    actions: [
      { label: '⚖️ Bidding & SPK', q: 'Detail fitur Bidding dan SPK' },
      { label: '💰 Finansial & Modal', q: 'Jelaskan fitur invoice factoring dan working capital' },
      { label: '🛡️ Jaminan & QC', q: 'Jelaskan sistem jaminan dan quality control' },
    ]
  },
  {
    id: 'pricing',
    keywords: ['harga', 'tarif', 'biaya', 'gratis', 'berbayar', 'bayar', 'subscription', 'paket', 'langganan', 'fee', 'komisi', 'potongan', 'murah', 'mahal', 'berapa'],
    phrases: ['berapa harganya', 'biaya platform', 'paket berlangganan', 'apakah gratis', 'bayar berapa', 'harga paket', 'biaya berapa'],
    reply: `💎 **Model Bisnis & Harga:**

🆓 **GRATIS untuk Owner:**
• Post proyek unlimited
• Akses direktori kontraktor
• Monitoring dashboard dasar

🎟️ **Paket Kontraktor:**
| Paket | Harga/bulan | Fitur |
|---|---|---|
| Starter | Rp 99.000 | Listing profil, 5 bid/bulan |
| Pro | Rp 499.000 | Bidding unlimited, analytics |
| Business | Rp 1.900.000 | Priority match, dedicated CSM |

💸 **Transaction Fee:**
• 1.5-3% dari nilai kontrak saat menang tender
• Makin tinggi rating → fee makin rendah

✅ **Escrow Fee:** 0.5% ditanggung bersama (0.25% per pihak)

🎁 **Early Adopter:** Daftar sekarang → 6 bulan akses Pro GRATIS!`,
    actions: [
      { label: '🚀 Daftar Gratis Sekarang', q: 'Cara mulai menggunakan platform secara gratis' },
    ]
  },
  {
    id: 'start',
    keywords: ['mulai', 'daftar', 'registrasi', 'signup', 'cara', 'langkah', 'step', 'panduan', 'tutorial', 'onboarding', 'bisa', 'ayo', 'cobain', 'coba'],
    phrases: ['cara mulai', 'bagaimana memulai', 'gimana caranya', 'cara daftar', 'langkah daftar', 'cara bergabung', 'mulai dari mana', 'pertama kali'],
    reply: `🚀 **Cara Mulai di RancangBangun:**

👔 **Jika Anda Owner:**
1. Klik **"Daftar Gratis"** di halaman utama
2. Verifikasi email & isi profil perusahaan
3. Masuk Dashboard → **Marketplace**
4. Klik **"+ Post Proyek"** → isi detail & spesifikasi
5. Terima penawaran dari kontraktor verified
6. Pilih pemenang → SPK digital & proyek mulai!

⏱️ Waktu setup: **< 10 menit**

👷 **Jika Anda Kontraktor:**
1. Klik **"Daftar"** → pilih tipe akun Kontraktor
2. Upload dokumen: KTP direksi, SIUP, NPWP, SBU/LPJK
3. Tunggu verifikasi **1-2 hari kerja**
4. Profil aktif → browse tender & submit penawaran
5. Menang → aktifkan working capital jika perlu

📱 Tersedia di web & segera hadir di Android/iOS!`,
    actions: [
      { label: '🏗️ Post Proyek Pertama', q: 'Detail cara post proyek di marketplace' },
      { label: '👷 Verifikasi Kontraktor', q: 'Dokumen apa yang diperlukan untuk verifikasi kontraktor?' },
    ]
  },
  {
    id: 'monitoring',
    keywords: ['monitor', 'pantau', 'progress', 'laporan', 'report', 'update', 'status', 'tracking', 'foto', 'dokumentasi', 'lapangan', 'site', 'real', 'time', 'dashboard'],
    phrases: ['monitoring proyek', 'pantau proyek', 'progress proyek', 'laporan harian', 'update progress', 'dashboard proyek', 'foto lapangan'],
    reply: `📊 **Monitoring & Kontrol Proyek Real-time:**

📸 **Site Control — Laporan Harian:**
• Foto progress dari app mobile kontraktor
• Timestamp & GPS terverifikasi otomatis
• Cuaca & kondisi lapangan harian
• Catatan kendala & tindakan korektif

📈 **Dashboard Analytics:**
• Kurva S: rencana vs aktual (%)
• Budget vs realisasi biaya per WBS
• Milestone tracker dengan alert keterlambatan
• Produktivitas tim per minggu

🏗️ **Quality Control:**
• Checklist inspeksi standar SNI
• Uji material: slump test, kuat tekan beton
• Status: ✓ Lulus / ✗ Gagal / ⏳ Pending
• Laporan QC untuk pengajuan termin

⚠️ **Alert Otomatis jika:**
• Penyimpangan jadwal > 5%
• Pembengkakan biaya > 10%
• Foto harian tidak diupload 24 jam`,
    actions: [
      { label: '🏗️ Buka Site Control', q: 'Detail fitur Site Control dan monitoring lapangan' },
      { label: '📊 Buka Gantt Chart', q: 'Cara menggunakan Gantt Chart untuk jadwal proyek' },
    ]
  },
  {
    id: 'dispute',
    keywords: ['sengketa', 'masalah', 'perselisihan', 'klaim', 'komplain', 'keluhan', 'keberatan', 'wanprestasi', 'gagal', 'mangkir', 'kabur', 'penipuan', 'curang'],
    phrases: ['ada masalah', 'terjadi sengketa', 'kontraktor bermasalah', 'owner bermasalah', 'proyek terbengkalai', 'kualitas jelek', 'tidak sesuai'],
    reply: `⚖️ **Penyelesaian Sengketa — 3 Jalur:**

1️⃣ **Musyawarah Internal (24-48 jam)**
→ Chat moderasi di platform
→ Kedua pihak klarifikasi & negosiasi
→ Gratis, direkam untuk bukti

2️⃣ **Mediasi Platform (7 hari kerja)**
→ Mediator independen bersertifikat
→ Mengkaji bukti: foto, BA, dokumen SPK
→ Keputusan mengikat jika disepakati
→ Gratis untuk kasus < Rp 500 juta

3️⃣ **Arbitrase BANI (30-60 hari)**
→ Mengikat secara hukum & final
→ Biaya: 0.5% dari nilai sengketa
→ Eksekusi langsung tanpa putusan pengadilan

📋 **Semua Evidence Tersimpan:**
Foto progress, BA milestone, chat log, dokumen SPK, slip pembayaran escrow — semua ter-timestamp dan tidak bisa dimanipulasi.`,
    actions: [
      { label: '🛡️ Perlindungan Owner', q: 'Bagaimana platform melindungi owner dari kontraktor nakal?' },
      { label: '🏗️ Perlindungan Kontraktor', q: 'Bagaimana platform melindungi kontraktor dari owner nakal?' },
    ]
  },
  {
    id: 'gantt',
    keywords: ['gantt', 'timeline', 'jadwal', 'schedule', 'milestone', 'rencana', 'kerja', 'waktu', 'durasi', 'kalender', 'hari', 'minggu', 'bulan'],
    phrases: ['gantt chart', 'jadwal proyek', 'timeline proyek', 'buat jadwal', 'rencana kerja', 'network planning'],
    reply: `📊 **Gantt Chart** tersedia di menu "Gantt" sidebar!

✅ **Fitur:**
• Drag & drop milestone di timeline interaktif
• Assign anggota tim ke setiap pekerjaan
• Ketergantungan antar task (Finish-to-Start, SS, FF)
• Visualisasi Kurva S — rencana vs aktual
• Alert otomatis jika ada keterlambatan > 5%
• Export PDF untuk presentasi ke owner

📋 **Template tersedia untuk:**
• Proyek gedung 2-10 lantai
• Jalan & drainase
• Instalasi MEP
• Renovasi & fit-out

💡 **Cara pakai:** Buka Gantt → pilih template → sesuaikan durasi & tim → publish ke owner.`,
    actions: [
      { label: '📈 Budget Tracker', q: 'Cara menggunakan Budget Tracker?' },
    ]
  },
  {
    id: 'material',
    keywords: ['material', 'bahan', 'bom', 'bill', 'of', 'materials', 'supplier', 'toko', 'beli', 'order', 'pengadaan', 'procurement', 'pasir', 'besi', 'beton', 'semen', 'bata', 'kayu'],
    phrases: ['bill of material', 'smart bom', 'cari material', 'harga material', 'beli material', 'order material', 'supplier material', 'pengadaan material'],
    reply: `🏭 **Smart BOM & Manajemen Material:**

📋 **Smart BOM (Bill of Materials):**
• Input volume pekerjaan → BOM otomatis tergenerate
• Referensi SNI & Analisa Harga Satuan Nasional
• Integrasi harga realtime dari supplier terdaftar
• Komparasi penawaran multi-supplier sekaligus

🏭 **Marketplace Supplier:**
• 500+ supplier material terdaftar
• Rating & review dari kontraktor lain
• Harga transparan, nego langsung via chat
• Delivery tracking terintegrasi

🔄 **Alur Pengadaan:**
1. BOM ter-generate dari RAB
2. Request quotation ke 3+ supplier
3. Bandingkan harga & lead time
4. Purchase Order digital
5. Receiving & quality check di site
6. Invoice terintegrasi pembayaran`,
    actions: [
      { label: '📋 Buka Smart BOM', q: 'Cara menggunakan Smart BOM Calculator' },
    ]
  },
  {
    id: 'safety',
    keywords: ['k3', 'safety', 'keselamatan', 'kesehatan', 'kerja', 'kecelakaan', 'alat', 'pelindung', 'diri', 'apd', 'smk3', 'iso', 'ohsas', 'bpjs', 'inciden', 'hazard'],
    phrases: ['keselamatan kerja', 'kesehatan kerja', 'safety k3', 'smk3 proyek', 'laporan k3', 'insiden lapangan'],
    reply: `🛡️ **Safety K3 Management** ada di menu "Safety K3"!

📋 **Daily Safety Checklist:**
• APD pekerja (helm, sepatu, rompi, harness)
• Kondisi scaffolding & perancah
• Kelistrikan & panel sementara
• Rambu K3 & barikade
• APAR & kotak P3K tersedia

⚠️ **Incident Reporting:**
• Laporkan near-miss & kecelakaan real-time
• Upload foto & keterangan kejadian
• Auto-notifikasi ke safety officer & manajemen
• Tracking tindakan korektif sampai selesai

📊 **Dashboard K3:**
• Zero Accident tracking harian
• Safety performance index per minggu
• Rekap pelatihan K3 & sertifikasi pekerja

✅ Semua data tersimpan untuk audit SMK3 & ISO 45001`,
    actions: []
  },
  {
    id: 'blueprint',
    keywords: ['blueprint', 'gambar', 'desain', 'rencana', 'dwg', 'pdf', 'autocad', 'denah', 'tampak', 'potongan', 'detail', 'arsitektur', 'struktur', 'mep', 'shop', 'drawing'],
    phrases: ['gambar teknik', 'shop drawing', 'as built drawing', 'gambar kerja', 'upload gambar', 'lihat gambar'],
    reply: `📐 **Blueprint Manager** ada di menu "Blueprints"!

📁 **Format yang didukung:**
• DWG / DXF (AutoCAD)
• PDF gambar teknik
• Image (PNG, JPG, TIFF high-res)

🖊️ **Fitur Anotasi:**
• Markup & komentar langsung di gambar
• Tandai area revisi dengan warna
• Dimensi & pengukuran digital
• Notifikasi ke tim jika ada revisi

📋 **Manajemen Revisi:**
• Version control semua gambar
• History perubahan ter-timestamp
• Distribusi gambar ke tim lapangan via mobile

🔗 **Integrasi:**
• Gambar ter-link ke item BOM & RAB
• Foto as-built dibandingkan dengan gambar rencana`,
    actions: []
  },
];

// ── Tokenizer & Scoring Engine ────────────────────────────────────────────────
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 1);
}

function score(text, entry) {
  const tokens = tokenize(text);
  const textLow = text.toLowerCase();
  let s = 0;

  // keyword match (1pt each)
  for (const kw of entry.keywords) {
    if (tokens.includes(kw) || textLow.includes(kw)) s += 1;
  }

  // phrase match (3pt each — weighted higher)
  for (const ph of entry.phrases) {
    if (textLow.includes(ph)) s += 3;
  }

  return s;
}

function getReply(text) {
  if (!text.trim()) return null;

  let best = null;
  let bestScore = 0;

  for (const entry of KB) {
    const s = score(text, entry);
    if (s > bestScore) { bestScore = s; best = entry; }
  }

  if (best && bestScore >= 1) {
    return { reply: best.reply, actions: best.actions || [] };
  }

  // Fallback — tidak ada match sama sekali
  return {
    reply: `🤔 Saya belum bisa menemukan jawaban yang tepat untuk pertanyaan Anda.

Coba tanyakan dengan kata kunci seperti:
• "Apa itu RancangBangun?"
• "Cara hitung RAB"
• "Proses bidding dan tender"
• "Cara kerja escrow"
• "Invoice factoring"
• "Fitur lengkap platform"

Atau pilih topik di bawah ini:`,
    actions: [
      { label: '❓ Apa itu RancangBangun?', q: 'Apa itu RancangBangun?' },
      { label: '💰 Cara Hitung RAB', q: 'Cara hitung RAB proyek' },
      { label: '⚖️ Proses Bidding', q: 'Bagaimana proses bidding dan tender?' },
      { label: '🎯 Semua Fitur', q: 'Fitur apa saja yang tersedia?' },
    ]
  };
}

// ── Formatters ─────────────────────────────────────────────────────────────────
function formatText(text) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    // Bold: **text**
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    const formatted = parts.map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
    return <span key={i}>{formatted}{i < lines.length - 1 && <br />}</span>;
  });
}

// ── Suggestions ────────────────────────────────────────────────────────────────
const SUGGESTIONS = [
  'Apa itu RancangBangun?',
  'Cara hitung RAB',
  'Proses bidding & tender',
  'Fitur lengkap platform',
];

// ── Component ──────────────────────────────────────────────────────────────────
export default function ChatbotAgentic({ isOpen, setIsOpen }) {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: `👋 Halo! Saya AI Assistant **RancangBangun**.

Tanyakan apa saja tentang platform ini — cara kerja, fitur, proses tender, escrow, RAB, atau topik konstruksi lainnya!`,
      actions: [
        { label: '❓ Apa itu RancangBangun?', q: 'Apa itu RancangBangun?' },
        { label: '👔 Untuk Owner', q: 'Saya owner proyek, apa yang bisa dilakukan?' },
        { label: '🏗️ Untuk Kontraktor', q: 'Saya kontraktor, bagaimana bergabung?' },
        { label: '🎯 Semua Fitur', q: 'Fitur apa saja yang tersedia?' },
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
      const result = getReply(trimmed);
      if (result) {
        setMessages(prev => [...prev, { type: 'bot', text: result.reply, actions: result.actions }]);
      }
      setTimeout(() => inputRef.current?.focus(), 50);
    }, 280);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
        style={{ zIndex: 10000 }}
        title="AI Assistant RancangBangun"
      >
        {isOpen
          ? <X className="w-6 h-6" />
          : <div className="relative">
              <MessageCircle className="w-6 h-6" />
              <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-300" />
            </div>
        }
      </button>

      {isOpen && (
        <div
          className="fixed bottom-24 right-6 bg-white rounded-2xl shadow-2xl flex flex-col border-2 border-orange-200"
          style={{ zIndex: 10000, width: 400, height: 580 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-t-2xl flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm">AI Assistant</div>
              <div className="text-xs text-orange-100 flex items-center gap-1">
                <Zap className="w-3 h-3" /> RancangBangun Helper
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-orange-50/30 to-white">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                  ${msg.type === 'user'
                    ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white'
                    : 'bg-white border border-orange-100 text-slate-800 shadow-sm'}`}
                >
                  {formatText(msg.text)}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-2.5 space-y-1.5">
                      {msg.actions.map((a, j) => (
                        <button
                          key={j}
                          onClick={() => sendMessage(a.q)}
                          className="w-full bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-700 text-xs py-1.5 px-3 rounded-lg transition-colors font-medium text-left"
                        >
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

          {/* Suggestion chips */}
          <div className="px-3 py-2 bg-orange-50 border-t border-orange-100 flex-shrink-0">
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s)}
                  className="text-xs bg-white border border-orange-200 text-orange-700 px-2.5 py-1 rounded-full hover:bg-orange-100 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-orange-100 bg-white rounded-b-2xl flex-shrink-0">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Tanyakan apa saja..."
                className="flex-1 px-3 py-2.5 border border-orange-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white p-2.5 rounded-xl transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
