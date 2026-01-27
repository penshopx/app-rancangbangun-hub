"""
Database Harga Satuan Pekerjaan Konstruksi
Standard Level - 100 Items dengan Breakdown Material/Upah/Alat
Harga dalam Rupiah (Jakarta, 2025)
"""

HARGA_SATUAN_DATABASE = {
    # ==================== PEKERJAAN PERSIAPAN ====================
    "A.001": {
        "kode": "A.001",
        "uraian": "Pembersihan Lapangan",
        "satuan": "m²",
        "material": 0,
        "upah": 3500,
        "alat": 1500,
        "total": 5000,
        "kategori": "Persiapan"
    },
    "A.002": {
        "kode": "A.002",
        "uraian": "Pengukuran dan Pemasangan Bouwplank",
        "satuan": "m'",
        "material": 25000,
        "upah": 15000,
        "alat": 5000,
        "total": 45000,
        "kategori": "Persiapan"
    },
    "A.003": {
        "kode": "A.003",
        "uraian": "Mobilisasi dan Demobilisasi Alat",
        "satuan": "ls",
        "material": 0,
        "upah": 2500000,
        "alat": 1500000,
        "total": 4000000,
        "kategori": "Persiapan"
    },
    
    # ==================== PEKERJAAN TANAH ====================
    "B.001": {
        "kode": "B.001",
        "uraian": "Galian Tanah Biasa (kedalaman < 1m)",
        "satuan": "m³",
        "material": 0,
        "upah": 35000,
        "alat": 15000,
        "total": 50000,
        "kategori": "Tanah"
    },
    "B.002": {
        "kode": "B.002",
        "uraian": "Galian Tanah Pondasi (1-2m)",
        "satuan": "m³",
        "material": 0,
        "upah": 45000,
        "alat": 20000,
        "total": 65000,
        "kategori": "Tanah"
    },
    "B.003": {
        "kode": "B.003",
        "uraian": "Urugan Tanah Kembali (Backfill)",
        "satuan": "m³",
        "material": 75000,
        "upah": 35000,
        "alat": 15000,
        "total": 125000,
        "kategori": "Tanah"
    },
    "B.004": {
        "kode": "B.004",
        "uraian": "Urugan Pasir Urug",
        "satuan": "m³",
        "material": 350000,
        "upah": 45000,
        "alat": 25000,
        "total": 420000,
        "kategori": "Tanah"
    },
    "B.005": {
        "kode": "B.005",
        "uraian": "Urugan Sirtu / Agregat Kelas A",
        "satuan": "m³",
        "material": 400000,
        "upah": 50000,
        "alat": 30000,
        "total": 480000,
        "kategori": "Tanah"
    },
    "B.006": {
        "kode": "B.006",
        "uraian": "Pemadatan Tanah (per lapis 20cm)",
        "satuan": "m²",
        "material": 0,
        "upah": 8000,
        "alat": 12000,
        "total": 20000,
        "kategori": "Tanah"
    },
    
    # ==================== PEKERJAAN PONDASI ====================
    "C.001": {
        "kode": "C.001",
        "uraian": "Lantai Kerja Beton K-175 (t=5cm)",
        "satuan": "m²",
        "material": 85000,
        "upah": 25000,
        "alat": 10000,
        "total": 120000,
        "kategori": "Pondasi"
    },
    "C.002": {
        "kode": "C.002",
        "uraian": "Beton Pondasi Foot Plate K-225",
        "satuan": "m³",
        "material": 850000,
        "upah": 150000,
        "alat": 50000,
        "total": 1050000,
        "kategori": "Pondasi"
    },
    "C.003": {
        "kode": "C.003",
        "uraian": "Pembesian Pondasi (D13-D19)",
        "satuan": "kg",
        "material": 14500,
        "upah": 2500,
        "alat": 500,
        "total": 17500,
        "kategori": "Pondasi"
    },
    "C.004": {
        "kode": "C.004",
        "uraian": "Bekisting Pondasi",
        "satuan": "m²",
        "material": 85000,
        "upah": 45000,
        "alat": 5000,
        "total": 135000,
        "kategori": "Pondasi"
    },
    "C.005": {
        "kode": "C.005",
        "uraian": "Beton Sloof K-225 (20x30cm)",
        "satuan": "m'",
        "material": 180000,
        "upah": 45000,
        "alat": 15000,
        "total": 240000,
        "kategori": "Pondasi"
    },
    
    # ==================== PEKERJAAN STRUKTUR ====================
    "D.001": {
        "kode": "D.001",
        "uraian": "Beton Kolom K-300 (30x30cm)",
        "satuan": "m³",
        "material": 950000,
        "upah": 180000,
        "alat": 70000,
        "total": 1200000,
        "kategori": "Struktur"
    },
    "D.002": {
        "kode": "D.002",
        "uraian": "Beton Balok K-300 (25x40cm)",
        "satuan": "m³",
        "material": 950000,
        "upah": 180000,
        "alat": 70000,
        "total": 1200000,
        "kategori": "Struktur"
    },
    "D.003": {
        "kode": "D.003",
        "uraian": "Beton Plat Lantai K-300 (t=12cm)",
        "satuan": "m²",
        "material": 175000,
        "upah": 55000,
        "alat": 20000,
        "total": 250000,
        "kategori": "Struktur"
    },
    "D.004": {
        "kode": "D.004",
        "uraian": "Pembesian Kolom & Balok",
        "satuan": "kg",
        "material": 15000,
        "upah": 2800,
        "alat": 700,
        "total": 18500,
        "kategori": "Struktur"
    },
    "D.005": {
        "kode": "D.005",
        "uraian": "Bekisting Kolom",
        "satuan": "m²",
        "material": 95000,
        "upah": 55000,
        "alat": 8000,
        "total": 158000,
        "kategori": "Struktur"
    },
    "D.006": {
        "kode": "D.006",
        "uraian": "Bekisting Balok",
        "satuan": "m²",
        "material": 95000,
        "upah": 55000,
        "alat": 8000,
        "total": 158000,
        "kategori": "Struktur"
    },
    "D.007": {
        "kode": "D.007",
        "uraian": "Bekisting Plat Lantai",
        "satuan": "m²",
        "material": 85000,
        "upah": 45000,
        "alat": 7000,
        "total": 137000,
        "kategori": "Struktur"
    },
    
    # ==================== PEKERJAAN DINDING ====================
    "E.001": {
        "kode": "E.001",
        "uraian": "Pasangan Bata Merah 1/2 Batu",
        "satuan": "m²",
        "material": 75000,
        "upah": 45000,
        "alat": 5000,
        "total": 125000,
        "kategori": "Dinding"
    },
    "E.002": {
        "kode": "E.002",
        "uraian": "Pasangan Batako 1/2 Batu",
        "satuan": "m²",
        "material": 65000,
        "upah": 40000,
        "alat": 5000,
        "total": 110000,
        "kategori": "Dinding"
    },
    "E.003": {
        "kode": "E.003",
        "uraian": "Plesteran 1Pc : 4Ps (t=15mm)",
        "satuan": "m²",
        "material": 25000,
        "upah": 22000,
        "alat": 3000,
        "total": 50000,
        "kategori": "Dinding"
    },
    "E.004": {
        "kode": "E.004",
        "uraian": "Acian",
        "satuan": "m²",
        "material": 8000,
        "upah": 12000,
        "alat": 2000,
        "total": 22000,
        "kategori": "Dinding"
    },
    
    # ==================== PEKERJAAN ATAP ====================
    "F.001": {
        "kode": "F.001",
        "uraian": "Rangka Atap Kayu Kelas II",
        "satuan": "m²",
        "material": 125000,
        "upah": 45000,
        "alat": 8000,
        "total": 178000,
        "kategori": "Atap"
    },
    "F.002": {
        "kode": "F.002",
        "uraian": "Rangka Atap Baja Ringan",
        "satuan": "m²",
        "material": 95000,
        "upah": 35000,
        "alat": 5000,
        "total": 135000,
        "kategori": "Atap"
    },
    "F.003": {
        "kode": "F.003",
        "uraian": "Penutup Atap Genteng Beton",
        "satuan": "m²",
        "material": 85000,
        "upah": 35000,
        "alat": 5000,
        "total": 125000,
        "kategori": "Atap"
    },
    "F.004": {
        "kode": "F.004",
        "uraian": "Penutup Atap Metal / Spandek",
        "satuan": "m²",
        "material": 95000,
        "upah": 30000,
        "alat": 5000,
        "total": 130000,
        "kategori": "Atap"
    },
    "F.005": {
        "kode": "F.005",
        "uraian": "Lisplank Kayu Kamper (lebar 30cm)",
        "satuan": "m'",
        "material": 45000,
        "upah": 15000,
        "alat": 3000,
        "total": 63000,
        "kategori": "Atap"
    },
    
    # ==================== PEKERJAAN LANTAI ====================
    "G.001": {
        "kode": "G.001",
        "uraian": "Lantai Keramik 40x40cm",
        "satuan": "m²",
        "material": 125000,
        "upah": 55000,
        "alat": 8000,
        "total": 188000,
        "kategori": "Lantai"
    },
    "G.002": {
        "kode": "G.002",
        "uraian": "Lantai Keramik 60x60cm",
        "satuan": "m²",
        "material": 185000,
        "upah": 65000,
        "alat": 10000,
        "total": 260000,
        "kategori": "Lantai"
    },
    "G.003": {
        "kode": "G.003",
        "uraian": "Lantai Granit Tile 60x60cm",
        "satuan": "m²",
        "material": 325000,
        "upah": 75000,
        "alat": 12000,
        "total": 412000,
        "kategori": "Lantai"
    },
    "G.004": {
        "kode": "G.004",
        "uraian": "Plint Keramik (tinggi 10cm)",
        "satuan": "m'",
        "material": 18000,
        "upah": 12000,
        "alat": 2000,
        "total": 32000,
        "kategori": "Lantai"
    },
    
    # ==================== PEKERJAAN PLAFON ====================
    "H.001": {
        "kode": "H.001",
        "uraian": "Rangka Plafon Metal Furring",
        "satuan": "m²",
        "material": 45000,
        "upah": 25000,
        "alat": 5000,
        "total": 75000,
        "kategori": "Plafon"
    },
    "H.002": {
        "kode": "H.002",
        "uraian": "Plafon Gypsum Board 9mm",
        "satuan": "m²",
        "material": 65000,
        "upah": 35000,
        "alat": 8000,
        "total": 108000,
        "kategori": "Plafon"
    },
    "H.003": {
        "kode": "H.003",
        "uraian": "Plafon PVC",
        "satuan": "m²",
        "material": 75000,
        "upah": 30000,
        "alat": 5000,
        "total": 110000,
        "kategori": "Plafon"
    },
    "H.004": {
        "kode": "H.004",
        "uraian": "List Plafon Gypsum",
        "satuan": "m'",
        "material": 15000,
        "upah": 8000,
        "alat": 2000,
        "total": 25000,
        "kategori": "Plafon"
    },
    
    # ==================== PEKERJAAN PENGECATAN ====================
    "I.001": {
        "kode": "I.001",
        "uraian": "Cat Tembok Eksterior (3 lapis)",
        "satuan": "m²",
        "material": 25000,
        "upah": 18000,
        "alat": 2000,
        "total": 45000,
        "kategori": "Pengecatan"
    },
    "I.002": {
        "kode": "I.002",
        "uraian": "Cat Tembok Interior (2 lapis)",
        "satuan": "m²",
        "material": 22000,
        "upah": 15000,
        "alat": 2000,
        "total": 39000,
        "kategori": "Pengecatan"
    },
    "I.003": {
        "kode": "I.003",
        "uraian": "Cat Kayu (Politur)",
        "satuan": "m²",
        "material": 35000,
        "upah": 25000,
        "alat": 3000,
        "total": 63000,
        "kategori": "Pengecatan"
    },
    "I.004": {
        "kode": "I.004",
        "uraian": "Cat Besi (Meni + Cat)",
        "satuan": "m²",
        "material": 45000,
        "upah": 28000,
        "alat": 3000,
        "total": 76000,
        "kategori": "Pengecatan"
    },
    
    # ==================== PEKERJAAN SANITAIR ====================
    "J.001": {
        "kode": "J.001",
        "uraian": "Kloset Duduk + Flushing",
        "satuan": "unit",
        "material": 1250000,
        "upah": 150000,
        "alat": 25000,
        "total": 1425000,
        "kategori": "Sanitair"
    },
    "J.002": {
        "kode": "J.002",
        "uraian": "Wastafel + Kran",
        "satuan": "unit",
        "material": 650000,
        "upah": 100000,
        "alat": 15000,
        "total": 765000,
        "kategori": "Sanitair"
    },
    "J.003": {
        "kode": "J.003",
        "uraian": "Shower Set (Hand Shower)",
        "satuan": "unit",
        "material": 450000,
        "upah": 75000,
        "alat": 10000,
        "total": 535000,
        "kategori": "Sanitair"
    },
    "J.004": {
        "kode": "J.004",
        "uraian": "Floor Drain Stainless",
        "satuan": "unit",
        "material": 85000,
        "upah": 25000,
        "alat": 5000,
        "total": 115000,
        "kategori": "Sanitair"
    },
    
    # ==================== PEKERJAAN KUSEN & PINTU ====================
    "K.001": {
        "kode": "K.001",
        "uraian": "Kusen Pintu Aluminium",
        "satuan": "unit",
        "material": 850000,
        "upah": 200000,
        "alat": 25000,
        "total": 1075000,
        "kategori": "Kusen"
    },
    "K.002": {
        "kode": "K.002",
        "uraian": "Pintu Panel (70x210cm)",
        "satuan": "unit",
        "material": 1250000,
        "upah": 150000,
        "alat": 25000,
        "total": 1425000,
        "kategori": "Kusen"
    },
    "K.003": {
        "kode": "K.003",
        "uraian": "Jendela Aluminium + Kaca 5mm",
        "satuan": "m²",
        "material": 650000,
        "upah": 125000,
        "alat": 15000,
        "total": 790000,
        "kategori": "Kusen"
    },
    
    # ==================== PEKERJAAN LISTRIK ====================
    "L.001": {
        "kode": "L.001",
        "uraian": "Titik Lampu (termasuk kabel NYM 2x1.5)",
        "satuan": "titik",
        "material": 95000,
        "upah": 45000,
        "alat": 5000,
        "total": 145000,
        "kategori": "Listrik"
    },
    "L.002": {
        "kode": "L.002",
        "uraian": "Titik Stop Kontak (NYM 2x2.5)",
        "satuan": "titik",
        "material": 125000,
        "upah": 50000,
        "alat": 5000,
        "total": 180000,
        "kategori": "Listrik"
    },
    "L.003": {
        "kode": "L.003",
        "uraian": "Panel Listrik 1 Phase (MCB 6 group)",
        "satuan": "unit",
        "material": 1850000,
        "upah": 350000,
        "alat": 50000,
        "total": 2250000,
        "kategori": "Listrik"
    },
    
    # ==================== PEKERJAAN JALAN ====================
    "M.001": {
        "kode": "M.001",
        "uraian": "Lapis Pondasi Agregat Kelas A (t=20cm)",
        "satuan": "m²",
        "material": 85000,
        "upah": 15000,
        "alat": 25000,
        "total": 125000,
        "kategori": "Jalan"
    },
    "M.002": {
        "kode": "M.002",
        "uraian": "Lapis Pondasi Agregat Kelas B (t=15cm)",
        "satuan": "m²",
        "material": 75000,
        "upah": 12000,
        "alat": 20000,
        "total": 107000,
        "kategori": "Jalan"
    },
    "M.003": {
        "kode": "M.003",
        "uraian": "Lapis Aspal Hotmix AC-WC (t=5cm)",
        "satuan": "m²",
        "material": 125000,
        "upah": 25000,
        "alat": 45000,
        "total": 195000,
        "kategori": "Jalan"
    },
    "M.004": {
        "kode": "M.004",
        "uraian": "Perkerasan Beton K-300 (t=20cm)",
        "satuan": "m²",
        "material": 285000,
        "upah": 65000,
        "alat": 35000,
        "total": 385000,
        "kategori": "Jalan"
    },
    "M.005": {
        "kode": "M.005",
        "uraian": "Marka Jalan Thermoplastic",
        "satuan": "m²",
        "material": 185000,
        "upah": 35000,
        "alat": 25000,
        "total": 245000,
        "kategori": "Jalan"
    }
}

# Template RAB berdasarkan LPJK Classification
RAB_TEMPLATES = {
    "BG002": {  # Gedung Perkantoran
        "nama": "Gedung Perkantoran 2 Lantai",
        "items": [
            {"kategori": "Persiapan", "kode": ["A.001", "A.002", "A.003"]},
            {"kategori": "Tanah", "kode": ["B.001", "B.002", "B.004", "B.006"]},
            {"kategori": "Pondasi", "kode": ["C.001", "C.002", "C.003", "C.004", "C.005"]},
            {"kategori": "Struktur", "kode": ["D.001", "D.002", "D.003", "D.004", "D.005", "D.006", "D.007"]},
            {"kategori": "Dinding", "kode": ["E.001", "E.003", "E.004"]},
            {"kategori": "Atap", "kode": ["F.002", "F.004"]},
            {"kategori": "Lantai", "kode": ["G.002", "G.004"]},
            {"kategori": "Plafon", "kode": ["H.001", "H.002", "H.004"]},
            {"kategori": "Pengecatan", "kode": ["I.001", "I.002"]},
            {"kategori": "Sanitair", "kode": ["J.001", "J.002", "J.003", "J.004"]},
            {"kategori": "Kusen", "kode": ["K.001", "K.002", "K.003"]},
            {"kategori": "Listrik", "kode": ["L.001", "L.002", "L.003"]}
        ]
    },
    "BS001": {  # Jalan
        "nama": "Jalan Aspal 2 Jalur",
        "items": [
            {"kategori": "Persiapan", "kode": ["A.001", "A.003"]},
            {"kategori": "Tanah", "kode": ["B.001", "B.005", "B.006"]},
            {"kategori": "Jalan", "kode": ["M.001", "M.002", "M.003", "M.005"]}
        ]
    }
}
