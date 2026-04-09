import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Save, Send } from 'lucide-react';

const Admin = () => {
  const [status, setStatus] = useState('');
  const [heroTitle, setHeroTitle] = useState('');
  const [statsData, setStatsData] = useState({});
  const [testimonials, setTestimonials] = useState([]);

  // FETCH EVERYTHING ON LOAD
  useEffect(() => {
    axios.get('/api/content').then(res => {
      const data = res.data;
      
      // Load Hero
      const heroRow = data.find(i => i.content_key === 'hero_title');
      if (heroRow) setHeroTitle(heroRow.content_value);

      // Load Stats
      const statsMap = {};
      data.forEach(item => {
        if (item.content_key.startsWith('stat_')) {
          statsMap[item.content_key] = item.content_value;
        }
      });
      setStatsData(statsMap);

      // Load Testimonials
      const testiRow = data.find(i => i.content_key === 'testimonials_data');
      if (testiRow) setTestimonials(JSON.parse(testiRow.content_value));
    }).catch(() => setStatus('Failed to load data from TiDB.'));
  }, []);

  const handleUpdate = async (key, value) => {
    setStatus(`Saving ${key}...`);
    try {
      const finalValue = typeof value === 'object' ? JSON.stringify(value) : value;
      await axios.post('/api/content', { key, value: finalValue });
      setStatus(`Success! ${key} updated.`);
    } catch (err) {
      setStatus(`Error updating ${key}.`);
    }
  };

  return (
    <div className="p-10 max-w-5xl mx-auto font-sans bg-slate-50 min-h-screen pb-32">
      <h1 className="text-4xl font-extrabold mb-10 text-slate-900 border-b pb-4">Asset Kraft Control Panel</h1>

      {/* SECTION 1: HERO */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border mb-8">
        <h2 className="text-xl font-bold mb-4 text-teal-700">1. Hero Section</h2>
        <div className="flex gap-4">
          <input 
            className="border p-3 flex-grow rounded-xl"
            placeholder="Main Title"
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
          />
          <button onClick={() => handleUpdate('hero_title', heroTitle)} className="bg-teal-600 text-white px-6 rounded-xl hover:bg-teal-700 transition flex items-center gap-2">
            <Send size={18} /> Update Hero
          </button>
        </div>
      </div>

      {/* SECTION 2: STATS */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border mb-8">
        <h2 className="text-xl font-bold mb-6 text-teal-700">2. Website Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'AUM (Crores)', key: 'stat_aum' },
            { label: 'Happy Investors', key: 'stat_investors' },
            { label: 'Insurance Book', key: 'stat_insurance' },
            { label: 'Team Members', key: 'stat_team' },
            { label: 'Office Locations', key: 'stat_offices' },
            { label: 'Years of Experience', key: 'stat_experience' }
          ].map((item) => (
            <div key={item.key} className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase">{item.label}</label>
              <div className="flex gap-2">
                <input 
                  className="border p-2 flex-grow rounded-lg"
                  value={statsData[item.key] || ''}
                  placeholder="e.g. 5000+"
                  onChange={(e) => setStatsData({...statsData, [item.key]: e.target.value})}
                />
                <button onClick={() => handleUpdate(item.key, statsData[item.key])} className="bg-slate-800 text-white px-4 rounded-lg text-sm">Save</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: TESTIMONIALS */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-teal-700">3. Client Testimonials</h2>
          <button 
            onClick={() => setTestimonials([...testimonials, { id: Date.now(), name: '', role: '', quote: '' }])}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-700"
          >
            <Plus size={18} /> Add New
          </button>
        </div>

        <div className="space-y-6">
          {testimonials.map((t, index) => (
            <div key={t.id} className="p-6 bg-slate-50 rounded-xl border border-slate-200 relative">
              <button 
                onClick={() => setTestimonials(testimonials.filter(item => item.id !== t.id))}
                className="absolute top-4 right-4 text-red-400 hover:text-red-600"
              >
                <Trash2 size={20} />
              </button>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  className="border p-2 rounded-lg" 
                  placeholder="Client Name" 
                  value={t.name}
                  onChange={(e) => setTestimonials(testimonials.map(item => item.id === t.id ? {...item, name: e.target.value} : item))}
                />
                <input 
                  className="border p-2 rounded-lg" 
                  placeholder="Position/Role" 
                  value={t.role}
                  onChange={(e) => setTestimonials(testimonials.map(item => item.id === t.id ? {...item, role: e.target.value} : item))}
                />
                <textarea 
                  className="border p-2 rounded-lg col-span-2 h-20" 
                  placeholder="Client Quote" 
                  value={t.quote}
                  onChange={(e) => setTestimonials(testimonials.map(item => item.id === t.id ? {...item, quote: e.target.value} : item))}
                />
              </div>
            </div>
          ))}
        </div>

        {testimonials.length > 0 && (
          <button 
            onClick={() => handleUpdate('testimonials_data', testimonials)}
            className="w-full mt-6 bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition"
          >
            <Save size={20} /> Save All Testimonials
          </button>
        )}
      </div>

      <div className="fixed bottom-10 right-10 bg-teal-900 text-white px-8 py-4 rounded-full shadow-2xl font-bold animate-pulse">
        {status || "System Ready"}
      </div>
    </div>
  );
};

export default Admin;