import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MessageCircle, X, Send, Sparkles, Zap } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ACTION_MESSAGES = {
  quick_rab:              'Cara hitung RAB profesional?',
  show_rab_sample:        'Contoh RAB untuk gedung kantor',
  goto_rab:               'Cara hitung RAB profesional?',
  quick_contractor:       'Cari kontraktor verified',
  show_top_contractors:   'Tampilkan kontraktor top-rated',
  goto_contractors:       'Cari kontraktor verified',
  quick_features:         'Fitur apa saja yang tersedia?',
  show_all_apps:          'Jelaskan semua fitur platform',
  show_lpjk_list:         'Jelaskan klasifikasi LPJK',
  goto_gantt:             'Cara buat Gantt chart proyek?',
  show_workflow_detail:   'Jelaskan alur kerja proyek secara detail',
  show_pricing_detail:    'Jelaskan paket harga platform',
  start_trial:            'Bagaimana cara mulai trial gratis?',
  show_faq:               'Tampilkan pertanyaan yang sering ditanya',
  show_examples:          'Tampilkan contoh percakapan',
  post_project:           'Bagaimana cara posting proyek?',
  goto_marketplace:       'Bagaimana cara melihat marketplace?',
  register_contractor:    'Bagaimana cara daftar sebagai kontraktor?',
  contact_support:        'Bagaimana cara menghubungi support?',
  owner:                  'Saya owner/developer',
  contractor:             'Saya kontraktor',
  features:               'Fitur apa saja yang tersedia?',
};

const ACTION_LABELS = {
  goto_rab:              '🧮 Buka RAB Calculator',
  quick_rab:             '🧮 Cara Hitung RAB',
  show_rab_sample:       '📄 Contoh RAB',
  goto_contractors:      '👥 Lihat Kontraktor',
  quick_contractor:      '👥 Cari Kontraktor',
  show_top_contractors:  '⭐ Kontraktor Top-Rated',
  quick_features:        '🎯 Lihat Semua Fitur',
  show_all_apps:         '🎯 Semua Mini-Apps',
  goto_gantt:            '📊 Buat Gantt Chart',
  show_lpjk_list:        '📋 Klasifikasi LPJK',
  show_workflow_detail:  '🔄 Detail Workflow',
  show_pricing_detail:   '💎 Lihat Paket Harga',
  start_trial:           '🚀 Mulai Gratis',
  show_faq:              '❓ FAQ',
  show_examples:         '💬 Contoh Pertanyaan',
  post_project:          '📝 Cara Post Proyek',
  goto_marketplace:      '🏗️ Ke Marketplace',
  register_contractor:   '🏗️ Daftar Kontraktor',
  contact_support:       '📧 Hubungi Support',
};

const ChatbotAgentic = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: '👋 **Halo! Saya AI Assistant RancangBangun!**\n\nSaya bisa bantu Anda dengan:\n• Hitung RAB profesional\n• Carikan kontraktor verified\n• Jelaskan alur & fitur platform\n• Info LPJK & compliance\n\n**Anda Owner atau Kontraktor?** 🤔',
      actions: [
        { label: '👔 Saya Owner', action: 'owner' },
        { label: '🏗️ Saya Kontraktor', action: 'contractor' },
        { label: '🎯 Lihat Fitur', action: 'features' },
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      fetchSuggestions();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const fetchSuggestions = async () => {
    try {
      const res = await axios.get(`${API}/chatbot/suggestions`);
      setSuggestions(res.data.suggestions || []);
    } catch {}
  };

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    setMessages(prev => [...prev, { type: 'user', text }]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post(`${API}/chatbot/message`, { message: text });
      const d = res.data;
      setMessages(prev => [...prev, {
        type: 'bot',
        text: d.bot_response,
        actions: (d.actions || []).map(a => ({
          label: ACTION_LABELS[a] || a,
          action: a,
        }))
      }]);
    } catch {
      setMessages(prev => [...prev, {
        type: 'bot',
        text: '❌ Koneksi gagal. Pastikan backend berjalan dan coba lagi.',
        actions: []
      }]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleAction = (action) => {
    const msg = ACTION_MESSAGES[action];
    if (msg) sendMessage(msg);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
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
        <div
          className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl flex flex-col border-2 border-orange-200"
          style={{ zIndex: 10000, height: 560 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-t-2xl flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">AI Assistant</h3>
                <p className="text-xs text-orange-100 flex items-center gap-1"><Zap className="w-3 h-3" /> RancangBangun Helper</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="ml-auto p-1 hover:bg-white/20 rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-orange-50/30 to-white">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] ${msg.type === 'user'
                  ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white'
                  : 'bg-white border border-orange-100 text-slate-800 shadow-sm'} px-4 py-3 rounded-2xl`}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      {msg.actions.map((a, i) => (
                        <button
                          key={i}
                          onClick={() => handleAction(a.action)}
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

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-orange-100 px-4 py-3 rounded-2xl shadow-sm">
                  <div className="flex gap-1.5 items-center">
                    {[0, 0.15, 0.3].map((d, i) => (
                      <div key={i} className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: `${d}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && !loading && (
            <div className="px-3 py-2 bg-orange-50 border-t border-orange-100 flex-shrink-0">
              <div className="flex flex-wrap gap-1.5">
                {suggestions.slice(0, 3).map((s, i) => (
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
          )}

          {/* Input */}
          <div className="p-3 border-t border-orange-100 bg-white rounded-b-2xl flex-shrink-0">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ketik pertanyaan..."
                disabled={loading}
                className="flex-1 px-3 py-2.5 border border-orange-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
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
};

export default ChatbotAgentic;
