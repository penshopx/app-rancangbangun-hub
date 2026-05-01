import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import RABCalculator from '@/components/apps/RABEnhanced';
import SmartBOM from '@/components/apps/SmartBOM';
import GanttChart from '@/components/apps/GanttChart';
import SiteControl from '@/components/apps/SiteControl';
import Blueprints from '@/components/apps/Blueprints';
import Search from '@/components/apps/Search';
import FATChecklist from '@/components/apps/FATChecklist';
import Maintenance from '@/components/apps/Maintenance';
import ContractorRegistry from '@/components/apps/ContractorRegistryEnhanced';
import Marketplace from '@/components/apps/Marketplace';
import ProjectManager from '@/components/apps/ProjectManager';
import ContractorProfile from '@/components/apps/ContractorProfile';
import BudgetTracker from '@/components/apps/BudgetTracker';
import InvoiceManager from '@/components/apps/InvoiceManager';
import Chatbot from '@/components/ChatbotAgentic';
import PlaceholderApp from '@/components/apps/PlaceholderApp';

const WelcomeScreen = ({ setActiveApp }) => {
  const navigate = useNavigate();
  const quickActions = [
    { key: 'marketplace', icon: '🏗️', label: 'Cari Proyek / Kontraktor', color: 'orange' },
    { key: 'project-manager', icon: '📊', label: 'Kelola Proyek Saya', color: 'blue' },
    { key: 'rab', icon: '💰', label: 'Hitung RAB', color: 'green' },
    { key: 'contractors', icon: '✅', label: 'Direktori Kontraktor', color: 'purple' },
  ];
  return (
    <div className="flex items-center justify-center h-full bg-slate-50">
      <div className="text-center max-w-3xl px-4 w-full">
        <button onClick={() => navigate('/')} className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-orange-500 mb-6 transition-colors">
          ← Kembali ke Halaman Utama
        </button>
        <div className="text-7xl mb-4">🏗️</div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">RancangBangun</h2>
        <p className="text-slate-500 mb-1">Platform Marketplace Konstruksi Terintegrasi</p>
        <p className="text-orange-500 font-semibold text-sm mb-8">✨ Menghubungkan Owner · Kontraktor · Supplier · Konsultan</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {quickActions.map(a => {
            const colors = { orange: 'bg-orange-50 hover:bg-orange-100 border-orange-100 text-orange-700', blue: 'bg-blue-50 hover:bg-blue-100 border-blue-100 text-blue-700', green: 'bg-green-50 hover:bg-green-100 border-green-100 text-green-700', purple: 'bg-purple-50 hover:bg-purple-100 border-purple-100 text-purple-700' };
            return (
              <button key={a.key} onClick={() => setActiveApp(a.key)} className={`${colors[a.color]} border rounded-xl p-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-sm`}>
                <div className="text-2xl mb-2">{a.icon}</div>
                <div className="text-xs font-semibold">{a.label}</div>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          {[['📊 Procurement', 'RAB, Search, Bidding'], ['📐 Planning', 'Blueprint, BOM, Gantt'], ['🏗️ Execution', 'Site, Team, Equipment, Safety'], ['✅ Quality', 'FAT, QC, Maintenance'], ['💰 Finance', 'Invoice, Documents'], ['📈 Intelligence', 'Analytics, Portal']].map(([title, desc]) => (
            <div key={title} className="bg-white border border-slate-100 rounded-lg p-2.5 text-left">
              <div className="font-semibold text-slate-700">{title}</div>
              <div className="text-slate-400 mt-0.5">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [activeApp, setActiveApp] = useState('welcome');
  const [chatOpen, setChatOpen] = useState(false);

  const renderApp = () => {
    switch (activeApp) {
      case 'rab': return <RABCalculator />;
      case 'bom': return <SmartBOM />;
      case 'gantt': return <GanttChart />;
      case 'site-control': return <SiteControl />;
      case 'blueprint': return <Blueprints />;
      case 'search': return <Search />;
      case 'fat': return <FATChecklist />;
      case 'maintenance': return <Maintenance />;
      case 'contractors': return <ContractorProfile />;
      case 'marketplace': return <Marketplace />;
      case 'project-manager': return <ProjectManager />;
      case 'budget': return <BudgetTracker />;
      case 'invoice': return <InvoiceManager />;

      case 'bidding': return <PlaceholderApp title="Bidding System" icon="⚖️" description="Sistem tender kompetitif — kontraktor submit proposal, owner compare & select best offer" />;
      case 'team': return <PlaceholderApp title="Team Management" icon="👥" description="Worker assignment, attendance tracking, dan payroll management" />;
      case 'equipment': return <PlaceholderApp title="Equipment Tracker" icon="🚛" description="Heavy equipment monitoring: lokasi, fuel, service schedule, availability" />;
      case 'safety': return <PlaceholderApp title="Safety Inspector" icon="🛡️" description="Daily K3 safety checks, incident reporting, safety training tracker" />;
      case 'quality': return <PlaceholderApp title="Quality Control" icon="📋" description="QC inspection checklist, defect tracking, rework management" />;
      case 'documents': return <PlaceholderApp title="Document Manager" icon="📁" description="Central repository: contracts, permits, certificates, legal documents" />;
      case 'client-portal': return <PlaceholderApp title="Client Portal" icon="📊" description="Owner dashboard: progress overview, budget status, milestone tracking" />;
      case 'analytics': return <PlaceholderApp title="Analytics Dashboard" icon="📈" description="KPI metrics, performance trends, predictive analytics, custom reports" />;

      default: return <WelcomeScreen setActiveApp={setActiveApp} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeApp={activeApp} setActiveApp={setActiveApp} />
      <main className="flex-1 overflow-y-auto bg-slate-50">
        {renderApp()}
      </main>
      <Chatbot isOpen={chatOpen} setIsOpen={setChatOpen} />
    </div>
  );
};

export default Dashboard;
