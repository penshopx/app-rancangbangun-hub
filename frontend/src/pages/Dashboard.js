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
import ContractorRegistry from '@/components/apps/ContractorRegistry';
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
      case 'contractors':
        return <ContractorRegistry />;
      case 'bidding':
        return <PlaceholderApp title="Bidding System" icon="⚖️" description="Sistem penawaran dan perbandingan bid dari multiple kontraktor (Coming Soon)" />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-2xl">
              <div className="text-8xl mb-6">🏗️</div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>RancangBangun</h2>
              <p className="text-slate-600 text-xl mb-2">Platform Manajemen Konstruksi Terintegrasi</p>
              <p className="text-orange-600 font-semibold text-lg mb-4">✨ Dengan Sistem Trust & Verifikasi Kontraktor</p>
              <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="font-bold text-green-800 mb-1">✅ Database Terverifikasi</p>
                  <p className="text-green-700">Kontraktor dengan license & sertifikasi valid</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="font-bold text-blue-800 mb-1">⭐ Rating & Review</p>
                  <p className="text-blue-700">Transparansi performa dari klien nyata</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="font-bold text-purple-800 mb-1">🔍 Track Record</p>
                  <p className="text-purple-700">History proyek & nilai kontrak</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="font-bold text-orange-800 mb-1">🛡️ Insurance</p>
                  <p className="text-orange-700">Verifikasi asuransi & compliance</p>
                </div>
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
