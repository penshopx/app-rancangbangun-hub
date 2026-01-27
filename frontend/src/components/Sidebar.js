import React from 'react';
import { Calculator, Search, FileText, Package, BarChart3, MapPin, CheckCircle2, Wrench, Users, Gavel, DollarSign, FileCheck, FolderOpen, UserCheck, Truck, Shield, Activity, TrendingUp, BarChart } from 'lucide-react';

const Sidebar = ({ activeApp, setActiveApp }) => {
  const apps = [
    {
      category: '1. Pengadaan',
      items: [
        { id: 'rab', name: 'RAB Calc', icon: Calculator },
        { id: 'search', name: 'Search', icon: Search },
        { id: 'bidding', name: 'Bidding', icon: Gavel },
      ]
    },
    {
      category: '2. Perencanaan',
      items: [
        { id: 'blueprint', name: 'Blueprints', icon: FileText },
        { id: 'bom', name: 'Smart BOM', icon: Package },
        { id: 'gantt', name: 'Gantt', icon: BarChart3 },
        { id: 'budget', name: 'Budget', icon: DollarSign },
      ]
    },
    {
      category: '3. Pelaksanaan',
      items: [
        { id: 'site-control', name: 'Site Control', icon: MapPin },
        { id: 'team', name: 'Team', icon: UserCheck },
        { id: 'equipment', name: 'Equipment', icon: Truck },
        { id: 'safety', name: 'Safety', icon: Shield },
      ]
    },
    {
      category: '4. Quality & Compliance',
      items: [
        { id: 'fat', name: 'FAT', icon: CheckCircle2 },
        { id: 'quality', name: 'QC', icon: Activity },
        { id: 'maintenance', name: 'Maintenance', icon: Wrench },
      ]
    },
    {
      category: '5. Finansial & Admin',
      items: [
        { id: 'invoice', name: 'Invoice', icon: FileCheck },
        { id: 'documents', name: 'Documents', icon: FolderOpen },
      ]
    },
    {
      category: '6. Trust & Analytics',
      items: [
        { id: 'contractors', name: 'Contractors', icon: Users },
        { id: 'client-portal', name: 'Client Portal', icon: TrendingUp },
        { id: 'analytics', name: 'Analytics', icon: BarChart },
      ]
    }
  ];

  return (
    <aside className="w-80 bg-slate-900 text-white flex flex-col p-5 overflow-y-auto flex-shrink-0">
      {/* Brand */}
      <div className="mb-8">
        <h1 className="text-xl font-extrabold flex items-center gap-2">
          <span className="text-2xl">🏗️</span>
          RANCANG<span className="text-orange-500">BANGUN</span>
        </h1>
      </div>

      {/* App Categories */}
      {apps.map((category, idx) => (
        <div key={idx} className="mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            {category.category}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {category.items.map((app) => {
              const Icon = app.icon;
              return (
                <button
                  key={app.id}
                  onClick={() => setActiveApp(app.id)}
                  className={`
                    p-3 rounded-lg border transition-all duration-200
                    flex flex-col items-center justify-center gap-2
                    ${
                      activeApp === app.id
                        ? 'bg-orange-500 border-orange-500 text-white transform -translate-y-0.5'
                        : 'bg-white/10 border-transparent text-slate-300 hover:bg-orange-500 hover:text-white hover:transform hover:-translate-y-0.5'
                    }
                  `}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-semibold text-center leading-tight">{app.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
