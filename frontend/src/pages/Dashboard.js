import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import RABCalculator from '@/components/apps/RABCalculator';
import SmartBOM from '@/components/apps/SmartBOM';
import GanttChart from '@/components/apps/GanttChart';
import SiteControl from '@/components/apps/SiteControl';
import Blueprints from '@/components/apps/Blueprints';
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
        return <PlaceholderApp title="Search" icon="🔍" description="Fitur pencarian tender dan pengadaan" />;
      case 'fat':
        return <PlaceholderApp title="Uji Serah Terima" icon="✅" description="Checklist FAT (Factory Acceptance Test)" />;
      case 'maintenance':
        return <PlaceholderApp title="Maintenance" icon="🔧" description="Jadwal perawatan dan maintenance" />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md">
              <div className="text-8xl mb-6">🏗️</div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>RancangBangun</h2>
              <p className="text-slate-600 text-lg">Platform Manajemen Konstruksi Terintegrasi</p>
              <p className="text-slate-500 mt-4">Klik menu di sidebar untuk memulai</p>
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
