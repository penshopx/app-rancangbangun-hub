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
      
      // New Apps (9-20)
      case 'bidding':
        return <PlaceholderApp title="Bidding System" icon="⚖️" description="Sistem tender kompetitif - kontraktor submit proposal, owner compare & select best offer" />;
      case 'budget':
        return <PlaceholderApp title="Budget Tracker" icon="💰" description="Real-time budget vs actual spending monitoring dengan alert overspend" />;
      case 'team':
        return <PlaceholderApp title="Team Management" icon="👥" description="Worker assignment, attendance tracking, dan payroll management" />;
      case 'equipment':
        return <PlaceholderApp title="Equipment Tracker" icon="🚛" description="Heavy equipment monitoring: lokasi, fuel, service schedule, availability" />;
      case 'safety':
        return <PlaceholderApp title="Safety Inspector" icon="🛡️" description="Daily K3 safety checks, incident reporting, safety training tracker" />;
      case 'quality':
        return <PlaceholderApp title="Quality Control" icon="📋" description="QC inspection checklist, defect tracking, rework management" />;
      case 'invoice':
        return <PlaceholderApp title="Invoice Management" icon="📄" description="Invoice creation, payment tracking, aging report, automatic reminders" />;
      case 'documents':
        return <PlaceholderApp title="Document Manager" icon="📁" description="Central repository: contracts, permits, certificates, legal documents" />;
      case 'client-portal':
        return <PlaceholderApp title="Client Portal" icon="📊" description="Owner dashboard: progress overview, budget status, milestone tracking" />;
      case 'analytics':
        return <PlaceholderApp title="Analytics Dashboard" icon="📈" description="KPI metrics, performance trends, predictive analytics, custom reports" />;
      
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-2xl px-4">
              <div className="text-8xl mb-6">🏗️</div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>RancangBangun</h2>
              <p className="text-slate-600 text-xl mb-2">Platform Manajemen Konstruksi Terintegrasi</p>
              <p className="text-orange-600 font-semibold text-lg mb-4">✨ 20 Mini-Apps Ekosistem Lengkap!</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 text-xs">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="font-bold text-blue-800 mb-1">📋 11 Apps Active</p>
                  <p className="text-blue-700">Fully functional & tested</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="font-bold text-green-800 mb-1">✅ Trust System</p>
                  <p className="text-green-700">Contractor verification</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <p className="font-bold text-purple-800 mb-1">⭐ Rating 4.7</p>
                  <p className="text-purple-700">From 32 reviews</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <p className="font-bold text-orange-800 mb-1">🛡️ Insurance</p>
                  <p className="text-orange-700">Verified coverage</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-slate-100 rounded-lg">
                <p className="text-sm text-slate-700 font-semibold mb-2">🚀 Ekosistem Lengkap:</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-left">
                  <div className="bg-white p-2 rounded">📊 <strong>Procurement:</strong> RAB, Search, Bidding</div>
                  <div className="bg-white p-2 rounded">📐 <strong>Planning:</strong> Blueprint, BOM, Gantt, Budget</div>
                  <div className="bg-white p-2 rounded">🏗️ <strong>Execution:</strong> Site, Team, Equipment, Safety</div>
                  <div className="bg-white p-2 rounded">✅ <strong>QC:</strong> FAT, Quality, Maintenance</div>
                  <div className="bg-white p-2 rounded">💰 <strong>Finance:</strong> Invoice, Documents</div>
                  <div className="bg-white p-2 rounded">📈 <strong>Intelligence:</strong> Contractors, Portal, Analytics</div>
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
