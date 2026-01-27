import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageCircle, X, Send, Sparkles, TrendingUp, Calculator, Users, Zap } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ChatbotAgentic = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: '👋 **Halo! Saya AI Assistant RancangBangun yang Attentive!**\n\nSaya tidak hanya menjawab, tapi **proaktif membantu** Anda!\n\n✨ **Saya bisa:**\n• Hitung RAB profesional\n• Carikan kontraktor verified\n• Guide workflow proyek\n• Jelaskan 20 mini-apps\n• Info LPJK & compliance\n\n**Anda Owner/Developer atau Kontraktor?** 🤔',
      actions: [
        { label: '👔 Saya Owner', action: 'owner' },
        { label: '🏗️ Saya Kontraktor', action: 'contractor' },
        { label: '📊 Lihat Fitur', action: 'features' }
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchSuggestions();
    }
  }, [isOpen]);

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get(`${API}/chatbot/suggestions`);
      setSuggestions(response.data.suggestions || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = { type: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(`${API}/chatbot/message`, {
        message: text
      });

      const botMsg = {
        type: 'bot',
        text: response.data.bot_response,
        actions: response.data.actions.map(action => ({
          label: getActionLabel(action),
          action: action
        }))
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        type: 'bot',
        text: '❌ Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi support@rancangbangun.id'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const getActionLabel = (action) => {
    const labels = {
      'goto_rab': '🧮 Buka RAB Calculator',
      'goto_contractors': '👥 Lihat Kontraktor',
      'goto_gantt': '📊 Buat Gantt Chart',
      'show_lpjk_list': '📋 Lihat 73 Klasifikasi LPJK',
      'show_pricing_detail': '💎 Lihat Paket Harga',
      'post_project': '📝 Post Project',
      'show_all_apps': '🎯 Lihat 20 Mini-Apps',
      'contact_support': '📧 Hubungi Support'
    };
    return labels[action] || action;
  };

  const handleAction = (action) => {
    // Simulate navigation based on action
    if (action === 'goto_rab') {
      sendMessage('Cara hitung RAB profesional?');
    } else if (action === 'goto_contractors') {
      sendMessage('Cari kontraktor verified');
    } else if (action === 'owner') {
      sendMessage('Saya owner/developer');
    } else if (action === 'contractor') {
      sendMessage('Saya kontraktor');
    } else if (action === 'features') {
      sendMessage('Fitur apa saja yang tersedia?');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Toggle Button - Enhanced */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 animate-pulse"
        style={{ zIndex: 10000 }}
        data-testid="chatbot-toggle-button"
      >
        {isOpen ? <X className="w-6 h-6" /> : (
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-300" />
          </div>
        )}
      </button>

      {/* Chat Window - Enhanced */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col border-2 border-orange-200" style={{ zIndex: 10000 }}>
          {/* Header - Enhanced */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">AI Assistant Attentive</h3>
                <p className="text-xs text-orange-100 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Proaktif • Actionable • Intelligent
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-orange-50/30 to-white">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${msg.type === 'user' ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white' : 'bg-white border-2 border-orange-100 text-slate-800'} p-4 rounded-2xl shadow-md`}>
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  
                  {/* Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {msg.actions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => handleAction(action.action)}
                          className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs py-2 px-3 rounded-lg hover:from-orange-500 hover:to-orange-600 transition-all font-semibold flex items-center justify-center gap-2 shadow-sm"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-orange-100 p-4 rounded-2xl shadow-md">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggestions */}
          {suggestions.length > 0 && (
            <div className="px-4 py-2 bg-orange-50 border-t border-orange-100">
              <p className="text-xs font-semibold text-slate-600 mb-2">💡 Saran cepat:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.slice(0, 3).map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(sug)}
                    className="text-xs bg-white border border-orange-200 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-100 transition-colors"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t-2 border-orange-100 bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ketik pertanyaan..."
                className="flex-1 px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                data-testid="chatbot-input"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-xl hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all"
                data-testid="chatbot-send-button"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotAgentic;
