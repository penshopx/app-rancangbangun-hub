import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import RABCalculator from '@/components/apps/RABCalculator';
import SmartBOM from '@/components/apps/SmartBOM';
import GanttChart from '@/components/apps/GanttChart';
import SiteControl from '@/components/apps/SiteControl';
import Blueprints from '@/components/apps/Blueprints';
import Search from '@/components/apps/Search';
import FATChecklist from '@/components/apps/FATChecklist';
import Maintenance from '@/components/apps/Maintenance';
import Chatbot from '@/components/Chatbot';
import PlaceholderApp from '@/components/apps/PlaceholderApp';

const Dashboard = () => {
  const [activeApp, setActiveApp] = useState('welcome');
  const [chatOpen, setChatOpen] = useState(false);

  const renderApp = () => {
    switch(activeApp) {
      case 'rab':
        return <RABCalculator />;
      case 'bom':
        return <SmartBOM />;
      case 'gantt':
        return <GanttChart />;
      case 'site-control':
        return <SiteControl />;
      case 'blueprint':
        return <Blueprints />;
      case 'search':
        return <Search />;
      case 'fat':
        return <FATChecklist />;
      case 'maintenance':
        return <Maintenance />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md">
              <div className="text-8xl mb-6">🏗️</div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>RancangBangun</h2>
              <p className="text-slate-600 text-lg">Platform Manajemen Konstruksi Terintegrasi</p>
              <p className="text-slate-500 mt-4">Klik menu di sidebar untuk memulai</p>
              <div className="mt-6 inline-block bg-orange-100 px-4 py-2 rounded-lg">
                <p className="text-orange-800 font-semibold">✨ 10 Mini-Apps Ready!</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeApp={activeApp} setActiveApp={setActiveApp} />
      
      <main className="flex-1 overflow-y-auto bg-gray-50">
        {renderApp()}
      </main>

      <Chatbot isOpen={chatOpen} setIsOpen={setChatOpen} />
    </div>
  );
};

export default Dashboard;
