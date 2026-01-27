import React, { useState } from 'react';
import axios from 'axios';
import { MessageCircle, X, Send } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Chatbot = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Halo! Saya RancangBangun AI. Tanyakan cara hitung pondasi, navigasi menu, atau info marketplace material.'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { type: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(`${API}/chat/message`, {
        user_query: input
      });

      const botMsg = {
        type: 'bot',
        text: response.data.bot_response,
        category: response.data.detected_category
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        type: 'bot',
        text: 'Maaf, terjadi kesalahan. Silakan coba lagi.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-slate-900 text-white p-4 rounded-full shadow-lg hover:bg-orange-500 transition-all z-50"
        data-testid="chatbot-toggle-button"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-slate-200">
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 rounded-t-lg flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-xl">
              🤖
            </div>
            <div>
              <h3 className="font-bold">RancangBangun AI</h3>
              <p className="text-xs text-slate-300">Assistant Virtual</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  {msg.category && (
                    <span className="text-xs text-slate-500 mt-1 block">#{msg.category}</span>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 p-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ketik pertanyaan..."
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                data-testid="chatbot-input"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default Chatbot;
