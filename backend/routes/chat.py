from fastapi import APIRouter
from typing import List
from datetime import datetime
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from models import ChatMessage, ChatMessageCreate
from database import db

router = APIRouter(prefix="/chat", tags=["Chat"])

# Knowledge Base
KNOWLEDGE_BASE = {
    'rab': [
        "Untuk menghitung RAB, pilih kategori pekerjaan (Pondasi/Jalan Aspal/Manual).",
        "Rumus Pondasi: Panjang × Lebar × Tinggi = Volume (m³)",
        "Jangan lupa isi Harga Satuan untuk estimasi total biaya.",
        "Setelah hitung, Anda bisa klik 'Jadikan Proyek' untuk tracking."
    ],
    'bom': [
        "Smart BOM menampilkan katalog material dari marketplace.",
        "Anda bisa filter berdasarkan kategori: Semen, Agregat, Besi, Cat.",
        "Klik 'Refresh Data' untuk update harga terbaru."
    ],
    'site-control': [
        "Site Control untuk laporan harian dari lapangan.",
        "Upload foto bukti progress, input jumlah pekerja dan cuaca.",
        "Data tersimpan dan bisa di-export untuk dokumentasi."
    ],
    'gantt': [
        "Gantt Chart untuk visualisasi timeline proyek.",
        "Tambahkan task dengan durasi dan assignee.",
        "Monitor progress proyek secara visual dengan progress slider.",
        "Update progress task real-time dengan drag slider."
    ],
    'blueprint': [
        "Blueprints untuk manajemen gambar kerja.",
        "Upload gambar dengan URL (Unsplash, Imgur, dll).",
        "Kategorikan: Arsitektural, Struktural, Elektrikal, Plumbing.",
        "Klik gambar untuk melihat detail full-screen."
    ],
    'default': [
        "Saya RancangBangun AI, siap membantu navigasi aplikasi.",
        "Klik menu di sidebar kiri untuk akses fitur.",
        "Ada 20+ mini-apps: RAB, BOM, Gantt, Site Control, Blueprints, dan lainnya.",
        "FASE 2 fitur baru: Gantt Chart, Site Control, dan Blueprints sudah aktif!"
    ]
}

@router.post("/message", response_model=ChatMessage)
async def send_chat_message(message: ChatMessageCreate):
    """Process chat message and return AI response"""
    query = message.user_query.lower()
    
    # Simple keyword detection
    detected_category = 'default'
    if any(word in query for word in ['rab', 'rincian', 'hitung', 'volume', 'biaya', 'pondasi']):
        detected_category = 'rab'
    elif any(word in query for word in ['bom', 'material', 'marketplace', 'semen', 'besi']):
        detected_category = 'bom'
    elif any(word in query for word in ['lapor', 'lapangan', 'site', 'control', 'harian']):
        detected_category = 'site-control'
    elif any(word in query for word in ['gantt', 'timeline', 'jadwal', 'schedule']):
        detected_category = 'gantt'
    
    # Get random response from knowledge base
    import random
    responses = KNOWLEDGE_BASE.get(detected_category, KNOWLEDGE_BASE['default'])
    bot_response = random.choice(responses)
    
    # Create chat message
    chat_msg = ChatMessage(
        user_query=message.user_query,
        bot_response=bot_response,
        detected_category=detected_category
    )
    
    # Save to database
    doc = chat_msg.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.chat_messages.insert_one(doc)
    
    return chat_msg

@router.get("/history", response_model=List[ChatMessage])
async def get_chat_history():
    """Get recent chat history"""
    messages = await db.chat_messages.find({}, {"_id": 0}).sort("timestamp", -1).to_list(50)
    
    for msg in messages:
        if isinstance(msg['timestamp'], str):
            msg['timestamp'] = datetime.fromisoformat(msg['timestamp'])
    
    return messages
