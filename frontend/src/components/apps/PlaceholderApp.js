import React from 'react';

const PlaceholderApp = ({ title, icon, description }) => {
  return (
    <div className="p-8 flex items-center justify-center h-full">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">{icon}</div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">{title}</h2>
        <p className="text-slate-600 text-lg mb-6">{description}</p>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-sm text-orange-800">
            <strong>🚧 Dalam Pengembangan</strong>
            <br />
            Fitur ini akan segera tersedia di fase berikutnya
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderApp;
