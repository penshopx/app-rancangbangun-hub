import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, Search, FileText, Package, BarChart3, MapPin, CheckCircle2, Wrench, Users, Gavel, DollarSign, FileCheck, FolderOpen, UserCheck, Truck, Shield, Activity, TrendingUp, BarChart, ShoppingBag, ClipboardList, Home } from 'lucide-react';

const Sidebar = ({ activeApp, setActiveApp }) => {
  const navigate = useNavigate();

  const apps = [
    {
      category: '🌐 Marketplace',
      items: [
        { id: 'marketplace', name: 'Marketplace', icon: ShoppingBag },
        { id: 'project-manager', name: 'Proyek Saya', icon: ClipboardList },
        { id: 'bidding', name: 'Bidding', icon: Gavel },
        { id: 'contractors', name: 'Kontraktor', icon: Users },
      ]
    },
    {
      category: '📋 Pengadaan',
      items: [
        { id: 'rab', name: 'RAB Calc', icon: Calculator },
        { id: 'search', name: 'Search', icon: Search },
      ]
    },
    {
      category: '📐 Perencanaan',
      items: [
        { id: 'blueprint', name: 'Blueprints', icon: FileText },
        { id: 'bom', name: 'Smart BOM', icon: Package },
        { id: 'gantt', name: 'Gantt', icon: BarChart3 },
        { id: 'budget', name: 'Budget', icon: DollarSign },
      ]
    },
    {
      category: '🏗️ Pelaksanaan',
      items: [
        { id: 'site-control', name: 'Site Control', icon: MapPin },
        { id: 'team', name: 'Team', icon: UserCheck },
        { id: 'equipment', name: 'Equipment', icon: Truck },
        { id: 'safety', name: 'Safety', icon: Shield },
      ]
    },
    {
      category: '✅ Quality & Compliance',
      items: [
        { id: 'fat', name: 'FAT', icon: CheckCircle2 },
        { id: 'quality', name: 'QC', icon: Activity },
        { id: 'maintenance', name: 'Maintenance', icon: Wrench },
      ]
    },
    {
      category: '💰 Finansial & Admin',
      items: [
        { id: 'invoice', name: 'Invoice', icon: FileCheck },
        { id: 'documents', name: 'Documents', icon: FolderOpen },
      ]
    },
    {
      category: '📈 Analytics',
      items: [
        { id: 'client-portal', name: 'Client Portal', icon: TrendingUp },
        { id: 'analytics', name: 'Analytics', icon: BarChart },
      ]
    }
  ];

  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col p-4 overflow-y-auto flex-shrink-0">
      {/* Brand */}
      <div className="mb-6">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 group w-full">
          <span className="text-2xl">🏗️</span>
          <div className="text-left">
            <div className="text-lg font-extrabold leading-tight">
              RANCANG<span className="text-orange-500">BANGUN</span>
            </div>
            <div className="text-xs text-slate-500 group-hover:text-orange-400 transition-colors flex items-center gap-1">
              <Home className="w-3 h-3" /> Beranda
            </div>
          </div>
        </button>
      </div>

      {/* App Categories */}
      {apps.map((category, idx) => (
        <div key={idx} className="mb-5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
            {category.category}
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {category.items.map((app) => {
              const Icon = app.icon;
              const isActive = activeApp === app.id;
              const isNew = ['marketplace', 'project-manager'].includes(app.id);
              return (
                <button
                  key={app.id}
                  onClick={() => setActiveApp(app.id)}
                  className={`relative p-2.5 rounded-lg border transition-all duration-200 flex flex-col items-center justify-center gap-1.5 ${
                    isActive
                      ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20 -translate-y-0.5'
                      : 'bg-white/8 border-transparent text-slate-300 hover:bg-orange-500/80 hover:text-white hover:-translate-y-0.5'
                  }`}
                >
                  {isNew && !isActive && (
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[9px] font-bold px-1 rounded-full leading-tight">NEW</span>
                  )}
                  <Icon className="w-5 h-5" />
                  <span className="text-[11px] font-semibold text-center leading-tight">{app.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-slate-800 text-center">
        <p className="text-xs text-slate-500">RancangBangun v2.0</p>
        <p className="text-xs text-slate-600 mt-0.5">Platform Konstruksi Indonesia</p>
      </div>
    </aside>
  );
};

export default Sidebar;
