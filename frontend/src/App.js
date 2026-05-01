import { useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import Dashboard from "@/pages/Dashboard";
import Chatbot from "@/components/ChatbotAgentic";

function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<Dashboard />} />
          <Route path="/app/*" element={<Dashboard />} />
        </Routes>
        <Chatbot isOpen={chatOpen} setIsOpen={setChatOpen} />
      </BrowserRouter>
    </div>
  );
}

export default App;
