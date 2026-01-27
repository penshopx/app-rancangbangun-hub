from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any, Optional
from datetime import datetime
import sys
from pathlib import Path
import random

sys.path.append(str(Path(__file__).parent.parent))

from pydantic import BaseModel, Field
from database import db
import uuid

router = APIRouter(prefix="/chatbot", tags=["Chatbot Agentic"])

# Enhanced Knowledge Base - Attentive & Actionable
KNOWLEDGE_BASE = {
    # Greeting & Context Setting
    "greeting": {
        "patterns": ["halo", "hi", "hai", "hello", "selamat", "pagi", "siang", "sore", "malam"],
        "responses": [
            {
                "text": "Halo! 👋 Saya AI Assistant RancangBangun, siap membantu Anda!\n\nSaya bisa bantu Anda dengan:\n• Hitung RAB profesional (100+ item database)\n• Cari kontraktor verified LPJK\n• Buat timeline proyek dengan Gantt\n• Kelola dokumen konstruksi\n• Dan 16 mini-apps lainnya!\n\nApakah Anda seorang **Owner/Developer** atau **Kontraktor**? 🤔",
                "actions": ["quick_rab", "quick_contractor", "quick_features"],
                "context": "role_identification"
            }
        ]
    },
    
    # RAB Related
    "rab": {
        "patterns": ["rab", "rencana anggaran", "biaya", "budget", "estimasi", "hitung", "kalkulasi"],
        "responses": [
            {
                "text": "Saya bisa bantu Anda menghitung RAB profesional! 💰\n\n**Fitur RAB Calculator kami:**\n• Database 100+ item pekerjaan\n• Breakdown Material/Upah/Alat\n• Template LPJK (BG002 Gedung, BS001 Jalan)\n• WBS 2 level standar SNI\n• Export PDF untuk tender\n\n**Mau hitung RAB untuk jenis proyek apa?**\n1. Gedung Perkantoran (BG002)\n2. Jalan Aspal (BS001)\n3. Perumahan (BG001)\n4. Lainnya",
                "actions": ["goto_rab", "show_rab_sample"],
                "context": "rab_inquiry"
            }
        ]
    },
    
    # Contractor Search
    "contractor": {
        "patterns": ["kontraktor", "pelaksana", "pemborong", "vendor", "cari kontraktor", "rekomendasi"],
        "responses": [
            {
                "text": "Saya bisa carikan kontraktor terpercaya untuk Anda! 🏗️\n\n**Database kami punya:**\n• 4 kontraktor verified LPJK\n• Rating dari klien nyata (4.5-4.8⭐)\n• Track record 28-62 proyek\n• Insurance coverage hingga Rp 10M\n• Sertifikasi K3 & ISO\n\n**Kriteria kontraktor yang Anda cari:**\n• Spesialisasi LPJK mana? (BG/BS/IN/KK)\n• Lokasi proyek?\n• Budget range?\n\nAtau langsung lihat kontraktor top-rated? ⭐",
                "actions": ["goto_contractors", "show_top_contractors"],
                "context": "contractor_search"
            }
        ]
    },
    
    # LPJK Classification
    "lpjk": {
        "patterns": ["lpjk", "klasifikasi", "sertifikat", "lisensi", "kbli", "bg002", "bs001"],
        "responses": [
            {
                "text": "Platform kami terintegrasi dengan **73 Klasifikasi LPJK resmi!** 📋\n\n**8 Kategori Utama:**\n• BG - Bangunan Gedung (9 sub)\n• BS - Bangunan Sipil (20 sub)\n• IN - Instalasi (9 sub)\n• KK - Konstruksi Khusus (16 sub)\n• PB - Penyelesaian Bangunan (8 sub)\n• PL - Persiapan (8 sub)\n• KP - Prapabrikasi (2 sub)\n• PA - Penyewaan Alat (1 sub)\n\n**Mau cari kontraktor dengan klasifikasi tertentu?**\nContoh: \"Cari kontraktor BS002 untuk jembatan\"",
                "actions": ["show_lpjk_list", "goto_contractors"],
                "context": "lpjk_info"
            }
        ]
    },
    
    # Project Workflow
    "workflow": {
        "patterns": ["alur", "proses", "tahapan", "workflow", "metode", "bagaimana cara"],
        "responses": [
            {
                "text": "Workflow proyek di RancangBangun mengikuti **5 Fase Standar:**\n\n**Fase 1: Inisiasi** (1-2 minggu)\n→ Upload kebutuhan → Matching kontraktor\n\n**Fase 2: Kolaborasi** (1-2 minggu)\n→ Negosiasi → Kesepakatan\n\n**Fase 3: Perencanaan** (2-4 minggu)\n→ RAB → Gantt → Metode pelaksanaan\n\n**Fase 4: Pelaksanaan** (Varian)\n→ Progress tracking → QC → K3\n\n**Fase 5: Serah Terima** (2-4 minggu)\n→ FAT → PHO → FHO → Rating\n\n**Mau mulai dari fase mana?** 🚀",
                "actions": ["goto_rab", "goto_gantt", "show_workflow_detail"],
                "context": "workflow_guide"
            }
        ]
    },
    
    # Features Overview
    "features": {
        "patterns": ["fitur", "aplikasi", "bisa apa", "fungsi", "layanan", "mini app"],
        "responses": [
            {
                "text": "RancangBangun punya **20 Mini-Apps terintegrasi!** 🎯\n\n**📋 Pengadaan (3):** RAB, Search, Bidding\n**📐 Perencanaan (4):** Blueprint, BOM, Gantt, Budget\n**🏗️ Pelaksanaan (4):** Site Control, Team, Equipment, Safety\n**✅ QC (3):** FAT, Quality Control, Maintenance\n**💰 Finance (2):** Invoice, Documents\n**📊 Intelligence (3):** Contractors, Client Portal, Analytics\n**🤖 Bonus:** AI Chatbot (saya! 😊)\n\n**Pembeda kami:**\n✅ Satu-satunya platform dengan 20 apps\n✅ LPJK-compliant (73 klasifikasi)\n✅ End-to-end construction lifecycle\n\nMau explore app mana dulu? 🔍",
                "actions": ["show_all_apps", "goto_rab", "goto_contractors"],
                "context": "features_overview"
            }
        ]
    },
    
    # Pricing & Monetization
    "pricing": {
        "patterns": ["harga", "biaya", "gratis", "berbayar", "subscription", "paket", "pricing"],
        "responses": [
            {
                "text": "Platform RancangBangun punya model **Freemium + Premium!** 💎\n\n**🆓 FREE (Owner/Developer):**\n• Posting project unlimited\n• Cari kontraktor verified\n• 3 RAB calculations/bulan\n• Basic dashboard\n\n**⭐ PROFESSIONAL (Rp 299K/bulan):**\n• Unlimited RAB + export PDF\n• Priority matching\n• Advanced analytics\n• 20 mini-apps full access\n\n**🏢 ENTERPRISE (Custom):**\n• Multi-project dashboard\n• API integration\n• Dedicated support\n• White-label option\n\n**💼 Untuk Kontraktor:**\n• FREE: Profile + bidding\n• PRO (Rp 499K/bulan): Featured listing + tools\n\nMau coba FREE dulu? 🚀",
                "actions": ["show_pricing_detail", "start_trial"],
                "context": "pricing_info"
            }
        ]
    },
    
    # Problem Solving - Proactive
    "problem": {
        "patterns": ["masalah", "kendala", "susah", "sulit", "bingung", "tidak bisa", "error", "gagal"],
        "responses": [
            {
                "text": "Saya di sini untuk membantu! 🤝\n\nBisa ceritakan lebih detail:\n• Anda sedang di app mana?\n• Apa yang ingin Anda lakukan?\n• Pesan error yang muncul?\n\n**Masalah umum & solusi:**\n1. **RAB tidak ke-calculate?** → Pastikan volume diisi\n2. **Kontraktor tidak muncul?** → Coba filter \"Verified Only\"\n3. **Export PDF gagal?** → Check internet connection\n\nAtau hubungi support: **support@rancangbangun.id** 📧",
                "actions": ["contact_support", "show_faq"],
                "context": "troubleshooting"
            }
        ]
    },
    
    # Owner Specific
    "owner": {
        "patterns": ["owner", "pemilik", "developer", "pemberi kerja", "klien"],
        "responses": [
            {
                "text": "Sebagai **Owner/Developer**, platform kami bantu Anda:\n\n**🎯 Find Right Contractor:**\n• Database verified LPJK\n• Rating & review transparan\n• Track record 28-62 proyek\n• Insurance coverage jelas\n\n**💰 Budget Control:**\n• RAB calculator akurat\n• Budget vs Actual tracking\n• Alert overspend\n\n**📊 Real-time Monitoring:**\n• Daily progress photo\n• Gantt timeline\n• QC inspection\n• Safety compliance\n\n**🛡️ Risk Mitigation:**\n• Verified contractors only\n• Evidence repository\n• Dispute resolution\n\nMau mulai post project atau cari kontraktor? 🚀",
                "actions": ["post_project", "goto_contractors"],
                "context": "owner_journey"
            }
        ]
    },
    
    # Contractor Specific
    "kontraktor": {
        "patterns": ["saya kontraktor", "pelaksana", "vendor konstruksi"],
        "responses": [
            {
                "text": "Sebagai **Kontraktor**, kami bantu tingkatkan bisnis Anda:\n\n**📈 Increase Visibility:**\n• Profile dengan LPJK badge\n• Featured listing (PRO)\n• Portfolio showcase\n• Rating display\n\n**💼 Win More Projects:**\n• Access tender terbuka\n• Smart matching dengan owner\n• Bidding system fair\n\n**🛠️ Professional Tools:**\n• RAB calculator (estimasi cepat)\n• Gantt timeline\n• Team management\n• Progress tracking\n\n**✅ Build Credibility:**\n• Verified LPJK\n• Client reviews\n• Track record display\n• Insurance badge\n\nMau daftar sebagai kontraktor verified? 🏗️",
                "actions": ["register_contractor", "goto_marketplace"],
                "context": "contractor_journey"
            }
        ]
    },
    
    # Default - Attentive
    "default": {
        "patterns": [],
        "responses": [
            {
                "text": "Hmm, saya belum sepenuhnya paham maksud Anda 🤔\n\nBiar saya bantu lebih baik, bisa dijelaskan:\n• Anda butuh bantuan untuk apa?\n• Sedang mencari informasi tentang?\n\n**Saya ahli dalam:**\n✅ Menghitung RAB\n✅ Carikan kontraktor\n✅ Jelaskan fitur platform\n✅ Guide workflow proyek\n✅ Info LPJK & compliance\n\nCoba tanyakan dengan kata kunci seperti:\n\"Cara hitung RAB\", \"Cari kontraktor\", \"Fitur apa saja\"",
                "actions": ["show_examples", "contact_support"],
                "context": "clarification_needed"
            }
        ]
    }
}

class ChatMessageInput(BaseModel):
    message: str
    context: Optional[str] = None
    user_role: Optional[str] = None  # "owner" or "contractor"

class ChatResponse(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_message: str
    bot_response: str
    detected_intent: str
    actions: List[str]
    context: str
    timestamp: str = Field(default_factory=lambda: datetime.now().isoformat())

def detect_intent(message: str) -> str:
    """Detect user intent from message"""
    message_lower = message.lower()
    
    # Check patterns in priority order
    for intent, data in KNOWLEDGE_BASE.items():
        if intent == "default":
            continue
        for pattern in data["patterns"]:
            if pattern in message_lower:
                return intent
    
    return "default"

@router.post("/message", response_model=ChatResponse)
async def send_message(input: ChatMessageInput):
    """Send message to attentive agentic chatbot"""
    intent = detect_intent(input.message)
    
    # Get response based on intent
    knowledge = KNOWLEDGE_BASE.get(intent, KNOWLEDGE_BASE["default"])
    response_data = random.choice(knowledge["responses"])
    
    # Create response
    chat_response = ChatResponse(
        user_message=input.message,
        bot_response=response_data["text"],
        detected_intent=intent,
        actions=response_data.get("actions", []),
        context=response_data.get("context", "general")
    )
    
    # Save to database
    doc = chat_response.model_dump()
    await db.chatbot_conversations.insert_one(doc)
    
    return chat_response

@router.get("/suggestions")
async def get_smart_suggestions(user_role: Optional[str] = None):
    """Get proactive suggestions based on user role"""
    if user_role == "owner":
        return {
            "suggestions": [
                "Hitung RAB untuk proyek baru",
                "Cari kontraktor verified top-rated",
                "Buat timeline proyek dengan Gantt",
                "Post project ke marketplace"
            ]
        }
    elif user_role == "contractor":
        return {
            "suggestions": [
                "Lihat tender terbuka",
                "Update profil LPJK",
                "Hitung estimasi RAB cepat",
                "Lihat project sesuai spesialisasi"
            ]
        }
    else:
        return {
            "suggestions": [
                "Apa itu RancangBangun?",
                "Cara menghitung RAB",
                "Fitur apa saja yang tersedia?",
                "Bagaimana cara mulai?"
            ]
        }

@router.get("/examples")
async def get_conversation_examples():
    """Get example conversations"""
    return {
        "examples": [
            {"user": "Cara hitung RAB gedung kantor?", "bot": "Saya bantu! Klik 'RAB Calc' → Pilih template BG002..."},
            {"user": "Cari kontraktor untuk jembatan", "bot": "Oke! Butuh kontraktor dengan klasifikasi BS002..."},
            {"user": "Berapa biaya berlangganan?", "bot": "Platform kami Freemium! FREE untuk owner..."}
        ]
    }
