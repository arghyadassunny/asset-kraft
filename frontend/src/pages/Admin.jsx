import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [heroTitle, setHeroTitle] = useState('');
  const [status, setStatus] = useState('');
  
  // State for all the stats numbers
  const [statsData, setStatsData] = useState({
    stat_aum: '',
    stat_investors: '',
    stat_insurance: '',
    stat_team: '',
    stat_offices: '',
    stat_experience: ''
  });

  // FLEXIBLE UPDATE FUNCTION: Works for any key!
  const handleUpdate = async (key, value) => {
    if (!value) {
      setStatus(`Please enter a value for ${key}`);
      return;
    }
    
    setStatus(`Saving ${key}...`);
    try {
      await axios.post('/api/content', { key, value });
      setStatus(`Success! ${key} updated.`);
    } catch (err) {
      setStatus(`Error updating ${key}.`);
    }
  };

  return (
    <div className="p-10 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">Asset Kraft Control Panel</h1>
      
      {/* SECTION 1: HERO TITLE */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-teal-700">Hero Section</h2>
        <div className="flex gap-4">
          <input 
            type="text" 
            className="border p-2 flex-grow rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            placeholder="New Hero Title"
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
          />
          <button 
            onClick={() => handleUpdate('hero_title', heroTitle)} 
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition"
          >Save Title</button>
        </div>
      </div>

      {/* SECTION 2: STATS NUMBERS */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-semibold mb-4 text-teal-700">Company Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'AUM (Crores)', key: 'stat_aum' },
            { label: 'Happy Investors', key: 'stat_investors' },
            { label: 'Insurance Book', key: 'stat_insurance' },
            { label: 'Team Members', key: 'stat_team' },
            { label: 'Office Locations', key: 'stat_offices' },
            { label: 'Years of Experience', key: 'stat_experience' }
          ].map((item) => (
            <div key={item.key} className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-600">{item.label}</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  className="border p-2 flex-grow rounded-lg"
                  placeholder="e.g. 700+"
                  onChange={(e) => setStatsData({...statsData, [item.key]: e.target.value})}
                />
                <button 
                  onClick={() => handleUpdate(item.key, statsData[item.key])}
                  className="bg-slate-800 hover:bg-black text-white px-4 py-2 rounded-lg text-sm transition"
                >Update</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STATUS MESSAGE */}
      <div className="fixed bottom-10 right-10 bg-white border-l-4 border-teal-500 p-4 shadow-xl rounded-r-lg">
        <p className="text-slate-700 font-medium">{status || "System Ready"}</p>
      </div>
    </div>
  );
};

export default Admin;