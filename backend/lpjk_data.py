"""
LPJK Classification Data - Complete Indonesia Construction Standards
"""

LPJK_CLASSIFICATIONS = {
    "BG": {
        "name": "Bangunan Gedung",
        "type": "Umum",
        "sub_classifications": {
            "BG001": {"name": "Konstruksi Gedung Hunian", "kualifikasi": ["Kecil", "Menengah", "Besar"]},
            "BG002": {"name": "Konstruksi Gedung Perkantoran", "kualifikasi": ["Kecil", "Menengah", "Besar"]},
            "BG003": {"name": "Konstruksi Gedung Industri", "kualifikasi": ["Kecil", "Menengah", "Besar"]},
            "BG004": {"name": "Konstruksi Gedung Perbelanjaan", "kualifikasi": ["Kecil", "Menengah", "Besar"]},
            "BG005": {"name": "Konstruksi Gedung Kesehatan", "kualifikasi": ["Kecil", "Menengah", "Besar"]},
            "BG006": {"name": "Konstruksi Gedung Pendidikan", "kualifikasi": ["Kecil", "Menengah", "Besar"]},
            "BG007": {"name": "Konstruksi Gedung Penginapan", "kualifikasi": ["Kecil", "Menengah", "Besar"]},
            "BG008": {"name": "Konstruksi Gedung Tempat Hiburan dan Olahraga", "kualifikasi": ["Kecil", "Menengah", "Besar"]},
            "BG009": {"name": "Konstruksi Gedung Lainnya", "kualifikasi": ["Kecil", "Menengah", "Besar"]}
        }
    },
    "BS": {
        "name": "Bangunan Sipil",
        "type": "Umum",
        "sub_classifications": {
            "BS001": {"name": "Konstruksi Bangunan Sipil Jalan", "kualifikasi": ["Kecil", "Menengah", "Besar"]},
            "BS002": {"name": "Bangunan Sipil Jembatan, Jalan Layang, Fly Over, dan Underpass", "kualifikasi": ["Kecil", "Menengah", "Besar"]},
            "BS003": {"name": "Konstruksi Jalan Rel", "kualifikasi": ["Kecil", "Menengah", "Besar"]},
            "BS004": {"name": "Konstruksi Jaringan Irigasi dan Drainase", "kualifikasi": ["Kecil", "Menengah", "Besar"]},
            "BS005": {"name": "Konstruksi Bangunan Sipil Pengolahan Air Bersih", "kualifikasi": ["Kecil", "Menengah", "Besar"]},
            "BS006": {"name": "Konstruksi Bangunan Sipil Prasarana dan Sarana Sistem Pengolahan Limbah", "kualifikasi": ["Kecil", "Menengah", "Besar"]},
            "BS007": {"name": "Konstruksi Bangunan Sipil Elektrikal", "kualifikasi": ["Kecil", "Menengah", "Besar"]},
            "BS008": {"name": "Konstruksi Bangunan Sipil Telekomunikasi untuk Prasarana Transportasi", "kualifikasi": ["Kecil", "Menengah", "Besar"]},
            "BS009": {"name": "Konstruksi Sentral Telekomunikasi", "kualifikasi": ["Kecil", "Menengah", "Besar"]},
            "BS010": {"name": "Konstruksi Bangunan Prasarana Sumber Daya Air", "kualifikasi": ["Kecil", "Menengah", "Besar"]},
            "BS011": {"name": "Konstruksi Bangunan Pelabuhan Bukan Perikanan", "kualifikasi": ["Kecil", "Menengah", "Besar"]},
            "BS012": {"name": "Konstruksi Bangunan Pelabuhan Perikanan", "kualifikasi": ["Kecil", "Menengah", "Besar"]},
            "BS013": {"name": "Konstruksi Bangunan Sipil Minyak dan Gas Bumi", "kualifikasi": ["Menengah", "Besar"]},
            "BS014": {"name": "Konstruksi Bangunan Sipil Pertambangan", "kualifikasi": ["Menengah", "Besar"]},
            "BS015": {"name": "Konstruksi Bangunan Sipil Panas Bumi", "kualifikasi": ["Menengah", "Besar"]},
            "BS016": {"name": "Konstruksi Bangunan Sipil Fasilitas Olah Raga", "kualifikasi": ["Kecil", "Menengah", "Besar"]},
            "BS017": {"name": "Konstruksi Bangunan Sipil Lainnya", "kualifikasi": ["Kecil", "Menengah", "Besar"]},
            "BS018": {"name": "Konstruksi Bangunan Sipil Fasilitas Pengolahan Produk Kimia", "kualifikasi": ["Menengah", "Besar"]},
            "BS019": {"name": "Konstruksi Bangunan Sipil Fasilitas Militer dan Peluncuran Satelit", "kualifikasi": ["Menengah", "Besar"]},
            "BS020": {"name": "Konstruksi Jaringan Irigasi, Komunikasi, dan Limbah Lainnya", "kualifikasi": ["Kecil", "Menengah", "Besar"]}
        }
    },
    "IN": {
        "name": "Instalasi",
        "type": "Spesialis",
        "sub_classifications": {
            "IN001": {"name": "Instalasi Mekanikal", "kualifikasi": ["Spesialis"]},
            "IN002": {"name": "Instalasi Telekomunikasi", "kualifikasi": ["Spesialis"]},
            "IN003": {"name": "Instalasi Peralatan Infrastruktur Pertambangan dan Manufaktur", "kualifikasi": ["Spesialis"]},
            "IN004": {"name": "Instalasi Minyak dan Gas", "kualifikasi": ["Spesialis"]},
            "IN005": {"name": "Instalasi Konstruksi Navigasi Laut, Sungai, dan Udara", "kualifikasi": ["Spesialis"]},
            "IN006": {"name": "Instalasi Elektronika", "kualifikasi": ["Spesialis"]},
            "IN007": {"name": "Instalasi saluran air (plambing)", "kualifikasi": ["Spesialis"]},
            "IN008": {"name": "Instalasi Pendingin Dan Ventilasi Udara", "kualifikasi": ["Spesialis"]},
            "IN010": {"name": "Instalasi Pengolahan Air Untuk Pembangkit Listrik", "kualifikasi": ["Spesialis"]}
        }
    },
    "KK": {
        "name": "Konstruksi Khusus",
        "type": "Spesialis",
        "sub_classifications": {
            "KK001": {"name": "Pondasi Konstruksi", "kualifikasi": ["Spesialis"]},
            "KK002": {"name": "Konstruksi Reservoir Pembangkit Listrik Tenaga Air", "kualifikasi": ["Spesialis"]},
            "KK003": {"name": "Konstruksi Intake, Control Gate, Penstock Pembangkit Listrik", "kualifikasi": ["Spesialis"]},
            "KK004": {"name": "Konstruksi Pelindung Pantai", "kualifikasi": ["Spesialis"]},
            "KK005": {"name": "Pekerjaan Lapis Perkerasan Beton (Rigid Pavement)", "kualifikasi": ["Spesialis"]},
            "KK006": {"name": "Pekerjaan Konstruksi Kedap Air, Minyak, dan Gas", "kualifikasi": ["Spesialis"]},
            "KK007": {"name": "Pekerjaan Konstruksi Kedap Suara", "kualifikasi": ["Spesialis"]},
            "KK008": {"name": "Perkerasan Aspal", "kualifikasi": ["Spesialis"]},
            "KK009": {"name": "Perkerasan Berbutir", "kualifikasi": ["Spesialis"]},
            "KK010": {"name": "Pengeboran dan Injeksi Semen Bertekanan", "kualifikasi": ["Spesialis"]},
            "KK011": {"name": "Pemasangan Rangka dan Atap/Roofcovering", "kualifikasi": ["Spesialis"]},
            "KK012": {"name": "Pekerjaan Struktur Beton", "kualifikasi": ["Spesialis"]},
            "KK013": {"name": "Konstruksi Struktur Beton Pascatarik (Post Tensioned)", "kualifikasi": ["Spesialis"]},
            "KK014": {"name": "Konstruksi Terowongan", "kualifikasi": ["Spesialis"]},
            "KK015": {"name": "Pekerjaan Konstruksi Tahan Api", "kualifikasi": ["Spesialis"]},
            "KK016": {"name": "Pemasangan Kerangka Baja", "kualifikasi": ["Spesialis"]}
        }
    },
    "PB": {
        "name": "Penyelesaian Bangunan",
        "type": "Spesialis",
        "sub_classifications": {
            "PB001": {"name": "Pengerjaan Pemasangan Kaca Dan Alumunium", "kualifikasi": ["Spesialis"]},
            "PB003": {"name": "Pengerjaan Lantai, Dinding, Peralatan Saniter Dan Plafon", "kualifikasi": ["Spesialis"]},
            "PB004": {"name": "Dekorasi Interior", "kualifikasi": ["Spesialis"]},
            "PB005": {"name": "Pemasangan Ornamen dan Pekerjaan Seni", "kualifikasi": ["Spesialis"]},
            "PB007": {"name": "Pengecatan", "kualifikasi": ["Spesialis"]},
            "PB009": {"name": "Pembersihan dan Perapihan Bangunan", "kualifikasi": ["Spesialis"]},
            "PB010": {"name": "Pekerjaan Lanskap, Pertamanan, dan Penanaman Vegetasi", "kualifikasi": ["Spesialis"]},
            "PB011": {"name": "Pemulihan Lahan Pekerjaan Konstruksi", "kualifikasi": ["Spesialis"]}
        }
    },
    "PL": {
        "name": "Persiapan",
        "type": "Spesialis",
        "sub_classifications": {
            "PL001": {"name": "Pembongkaran Bangunan", "kualifikasi": ["Spesialis"]},
            "PL002": {"name": "Pengerukan", "kualifikasi": ["Spesialis"]},
            "PL003": {"name": "Penyiapan Lahan Konstruksi", "kualifikasi": ["Spesialis"]},
            "PL004": {"name": "Pekerjaan Tanah", "kualifikasi": ["Spesialis"]},
            "PL005": {"name": "Pembuatan/Pengeboran Sumur Air Tanah", "kualifikasi": ["Spesialis"]},
            "PL006": {"name": "Pelaksanaan Pekerjaan Utilitas", "kualifikasi": ["Spesialis"]},
            "PL007": {"name": "Survei Penyelidikan Lapangan", "kualifikasi": ["Spesialis"]},
            "PL008": {"name": "Pemasangan Perancah (Steiger)", "kualifikasi": ["Spesialis"]}
        }
    }
}

PROJECT_WORKFLOWS = {
    "fase_1": {
        "name": "Inisiasi Proyek",
        "duration": "1-2 minggu",
        "activities": ["Upload kebutuhan", "Tentukan scope", "Pilih mitra"],
        "kpi": ["Kecepatan matching", "Kualitas rekomendasi"]
    },
    "fase_2": {
        "name": "Pembentukan Kolaborasi",
        "duration": "1-2 minggu",
        "activities": ["Team formation", "Negosiasi", "Kesepakatan"],
        "kpi": ["Success rate partnership", "Time to agreement"]
    },
    "fase_3": {
        "name": "Perencanaan & Metode",
        "duration": "2-4 minggu",
        "activities": ["Upload desain", "Metode kerja", "Baseline jadwal"],
        "kpi": ["Approval speed", "Completeness"]
    },
    "fase_4": {
        "name": "Pelaksanaan",
        "duration": "Varian (proyek-dependent)",
        "activities": ["Progress tracking", "QC", "K3", "Supply chain"],
        "kpi": ["Schedule variance", "Cost variance", "Quality score", "Safety index"]
    },
    "fase_5": {
        "name": "Serah Terima",
        "duration": "2-4 minggu",
        "activities": ["Punch list", "PHO", "FHO", "Rating"],
        "kpi": ["Defect rate", "Client satisfaction", "Documentation completeness"]
    }
}

METODE_PELAKSANAAN_TEMPLATES = {
    "gedung": {
        "tahapan": [
            "Persiapan & pengukuran",
            "Pekerjaan pondasi",
            "Struktur atas (kolom-balok-pelat)",
            "Arsitektur & finishing",
            "MEP & commissioning",
            "Serah terima"
        ],
        "ciri_khas": "Dominan pekerjaan struktur & MEP"
    },
    "perumahan": {
        "tahapan": [
            "Pematangan lahan",
            "Pekerjaan unit berulang",
            "Infrastruktur kawasan",
            "Finishing & landscaping"
        ],
        "ciri_khas": "Volume besar, tipe seragam"
    },
    "jalan": {
        "tahapan": [
            "Clearing & earthwork",
            "Lapis pondasi",
            "Perkerasan (lentur/kaku)",
            "Drainase & pelengkap"
        ],
        "ciri_khas": "Ketergantungan cuaca, alat berat dominan"
    },
    "jembatan": {
        "tahapan": [
            "Pondasi dalam",
            "Struktur bawah (abutment, pilar)",
            "Struktur atas",
            "Finishing & uji beban"
        ],
        "ciri_khas": "Risiko tinggi, standar mutu ketat"
    }
}
