import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Save, Send, Image as ImageIcon, Loader2 } from 'lucide-react';

const Admin = () => {
  // --- CONFIGURATION ---
  const CLOUD_NAME = "YOUR_CLOUD_NAME"; // 👈 Change this to your Cloudinary Cloud Name
  const UPLOAD_PRESET = "asset_kraft_preset"; 

  const [status, setStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [heroTitle, setHeroTitle] = useState('');
  const [statsData, setStatsData] = useState({});
  const [testimonials, setTestimonials] = useState([]);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    axios.get('/api/content').then(res => {
      const data = res.data;
      const heroRow = data.find(i => i.content_key === 'hero_title');
      if (heroRow) setHeroTitle(heroRow.content_value);

      const statsMap = {};
      data.forEach(item => {
        if (item.content_key.startsWith('stat_')) statsMap[item.content_key] = item.content_value;
      });
      setStatsData(statsMap);

      const testiRow = data.find(i => i.content_key === 'testimonials_data');
      if (testiRow) setTestimonials(JSON.parse(testiRow.content_value));

      const teamRow = data.find(i => i.content_key === 'team_data');
      if (teamRow) setTeam(JSON.parse(teamRow.content_value));
    }).catch(() => setStatus('Failed to load data. Check TiDB connection.'));
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

  const uploadImage = async (file) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData);
      setIsUploading(false);
      return res.data.secure_url;
    } catch (err) {
      console.error("Upload failed", err);
      setIsUploading(false);
      return null;
    }
  };

  return (
    <div className="p-10 max-w-5xl mx-auto font-sans bg-slate-50 min-h-screen pb-32">
      <h1 className="text-4xl font-extrabold mb-10 text-slate-900 border-b pb-4 italic">Asset Kraft CMS</h1>

      {/* 1. HERO & STATS (Simplified View) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-xl font-bold mb-4 text-teal-700">Hero Title</h2>
            <div className="flex gap-2">
                <input className="border p-2 flex-grow rounded-lg" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} />
                <button onClick={() => handleUpdate('hero_title', heroTitle)} className="bg-teal-600 text-white px-4 rounded-lg">Update</button>
            </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-xl font-bold mb-4 text-teal-700">Quick Stats</h2>
            <div className="grid grid-cols-2 gap-2">
                {['stat_aum', 'stat_investors'].map(key => (
                    <input key={key} className="border p-2 rounded-lg text-sm" placeholder={key} value={statsData[key] || ''} onChange={(e) => setStatsData({...statsData, [key]: e.target.value})} />
                ))}
                <button onClick={() => { handleUpdate('stat_aum', statsData.stat_aum); handleUpdate('stat_investors', statsData.stat_investors); }} className="col-span-2 bg-slate-800 text-white py-1 rounded-lg">Save Stats</button>
            </div>
        </div>
      </div>

      {/* 2. TEAM MEMBERS SECTION */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-teal-700">Team Management</h2>
          <button 
            onClick={() => setTeam([...team, { id: Date.now(), name: '', role: '', image: '' }])}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-700 transition"
          >
            <Plus size={18} /> Add Member
          </button>
        </div>

        <div className="space-y-6">
          {team.map((m) => (
            <div key={m.id} className="p-6 bg-slate-50 rounded-xl border border-slate-200 relative group">
              <button 
                onClick={() => setTeam(team.filter(x => x.id !== m.id))}
                className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition"
              >
                <Trash2 size={20} />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Name</label>
                  <input 
                    className="border p-2 rounded-lg"
                    value={m.name}
                    onChange={(e) => setTeam(team.map(x => x.id === m.id ? {...x, name: e.target.value} : x))}
                    placeholder="Sanjeev Kumar Mundhra"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Role</label>
                  <input 
                    className="border p-2 rounded-lg"
                    value={m.role}
                    onChange={(e) => setTeam(team.map(x => x.id === m.id ? {...x, role: e.target.value} : x))}
                    placeholder="Director"
                  />
                </div>
                <div className="col-span-full space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Profile Photo</label>
                  <div className="flex items-center gap-6 bg-white p-4 rounded-xl border border-dashed border-slate-300">
                    {m.image ? (
                      <img src={m.image} className="w-20 h-20 rounded-xl object-cover border-2 border-teal-500" alt="preview" />
                    ) : (
                      <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                        <ImageIcon size={30} />
                      </div>
                    )}
                    <div className="flex-grow">
                        <input 
                            type="file" 
                            className="text-sm block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                            onChange={async (e) => {
                                const url = await uploadImage(e.target.files[0]);
                                if (url) setTeam(team.map(x => x.id === m.id ? {...x, image: url} : x));
                            }} 
                        />
                        <p className="text-[10px] text-slate-400 mt-2 italic">Recommended: Square image with clear face</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {team.length > 0 && (
          <button 
            onClick={() => handleUpdate('team_data', team)}
            disabled={isUploading}
            className={`w-full mt-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition ${isUploading ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-black text-white'}`}
          >
            {isUploading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            {isUploading ? 'Uploading Image...' : 'Save All Team Changes'}
          </button>
        )}
      </div>

      <div className="fixed bottom-10 right-10 bg-teal-900 text-white px-8 py-4 rounded-full shadow-2xl font-bold">
        {status || "Ready to Sync"}
      </div>
    </div>
  );
};

export default Admin;