import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Save, Send, Image as ImageIcon, Loader2, BarChart3, Users, Quote, UserPlus } from 'lucide-react';

const Admin = () => {
  // --- CONFIGURATION ---
  const CLOUD_NAME = "djm5rsjwl"; // 👈 PUT YOUR CLOUD NAME HERE
  const UPLOAD_PRESET = "asset_kraft_preset"; 

  const [status, setStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [heroTitle, setHeroTitle] = useState('');
  const [statsData, setStatsData] = useState({});
  const [testimonials, setTestimonials] = useState([]);
  const [team, setTeam] = useState([]);

  // FETCH EVERYTHING ON LOAD
  useEffect(() => {
    axios.get('/api/content').then(res => {
      const data = res.data;
      
      // 1. Load Hero
      const heroRow = data.find(i => i.content_key === 'hero_title');
      if (heroRow) setHeroTitle(heroRow.content_value);

      // 2. Load All 6 Stats
      const statsMap = {};
      data.forEach(item => {
        if (item.content_key.startsWith('stat_')) statsMap[item.content_key] = item.content_value;
      });
      setStatsData(statsMap);

      // 3. Load Testimonials
      const testiRow = data.find(i => i.content_key === 'testimonials_data');
      if (testiRow) setTestimonials(JSON.parse(testiRow.content_value));

      // 4. Load Team
      const teamRow = data.find(i => i.content_key === 'team_data');
      if (teamRow) setTeam(JSON.parse(teamRow.content_value));
    }).catch(() => setStatus('Failed to connect to TiDB. Check your Vercel Logs.'));
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
      setStatus("Cloudinary upload failed. Check preset name.");
      return null;
    }
  };

  return (
    <div className="p-10 max-w-6xl mx-auto font-sans bg-slate-50 min-h-screen pb-40">
      <header className="flex justify-between items-center mb-12 border-b pb-6">
        <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Asset Kraft <span className="text-teal-600">CMS</span></h1>
            <p className="text-slate-500 font-medium">Manage your website content in real-time</p>
        </div>
        <div className="bg-teal-900 text-white px-6 py-3 rounded-2xl shadow-xl font-bold">
            {status || "System Live"}
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-2"><Send className="text-teal-600" /> Hero Section</h2>
        <div className="flex gap-4">
          <input 
            className="border-2 border-slate-100 p-4 flex-grow rounded-2xl focus:border-teal-500 outline-none transition"
            placeholder="Main Title"
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
          />
          <button onClick={() => handleUpdate('hero_title', heroTitle)} className="bg-teal-600 text-white px-8 rounded-2xl font-bold hover:bg-teal-700 transition shadow-lg shadow-teal-600/20">Update</button>
        </div>
      </section>

      {/* 2. ALL 6 STATISTICS */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-2"><BarChart3 className="text-teal-600" /> Statistics & Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { label: 'AUM (Crores)', key: 'stat_aum' },
            { label: 'Happy Investors', key: 'stat_investors' },
            { label: 'Insurance Book', key: 'stat_insurance' },
            { label: 'Team Members', key: 'stat_team' },
            { label: 'Office Locations', key: 'stat_offices' },
            { label: 'Years of Experience', key: 'stat_experience' }
          ].map((item) => (
            <div key={item.key} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <label className="text-xs font-black text-slate-400 uppercase mb-2 block">{item.label}</label>
              <div className="flex gap-2">
                <input 
                  className="border-2 border-white p-2 flex-grow rounded-xl shadow-inner outline-none focus:border-teal-500"
                  value={statsData[item.key] || ''}
                  onChange={(e) => setStatsData({...statsData, [item.key]: e.target.value})}
                />
                <button onClick={() => handleUpdate(item.key, statsData[item.key])} className="bg-slate-800 text-white px-3 rounded-xl text-xs font-bold">Save</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TESTIMONIALS */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><Quote className="text-teal-600" /> Testimonials</h2>
          <button onClick={() => setTestimonials([...testimonials, { id: Date.now(), name: '', role: '', quote: '' }])} className="bg-teal-50 text-teal-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-teal-100">+ Add New</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map(t => (
            <div key={t.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 relative">
              <button onClick={() => setTestimonials(testimonials.filter(x => x.id !== t.id))} className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition"><Trash2 size={18}/></button>
              <div className="space-y-3">
                <input className="w-full border p-2 rounded-xl" placeholder="Client Name" value={t.name} onChange={(e) => setTestimonials(testimonials.map(x => x.id === t.id ? {...x, name: e.target.value} : x))} />
                <input className="w-full border p-2 rounded-xl" placeholder="Role/City" value={t.role} onChange={(e) => setTestimonials(testimonials.map(x => x.id === t.id ? {...x, role: e.target.value} : x))} />
                <textarea className="w-full border p-2 rounded-xl h-20" placeholder="Their Quote" value={t.quote} onChange={(e) => setTestimonials(testimonials.map(x => x.id === t.id ? {...x, quote: e.target.value} : x))} />
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => handleUpdate('testimonials_data', testimonials)} className="w-full mt-6 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition">Save All Testimonials</button>
      </section>

      {/* 4. TEAM MANAGEMENT (WITH CLOUDINARY) */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><Users className="text-teal-600" /> Team Members</h2>
          <button onClick={() => setTeam([...team, { id: Date.now(), name: '', role: '', image: '' }])} className="bg-teal-50 text-teal-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-teal-100">+ Add Member</button>
        </div>
        <div className="space-y-6">
          {team.map(m => (
            <div key={m.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 relative group">
              <button onClick={() => setTeam(team.filter(x => x.id !== m.id))} className="absolute top-4 right-4 text-red-400"><Trash2 size={20}/></button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <input className="w-full border-2 border-white p-3 rounded-xl shadow-sm outline-none focus:border-teal-500" placeholder="Name" value={m.name} onChange={(e) => setTeam(team.map(x => x.id === m.id ? {...x, name: e.target.value} : x))} />
                    <input className="w-full border-2 border-white p-3 rounded-xl shadow-sm outline-none focus:border-teal-500" placeholder="Role" value={m.role} onChange={(e) => setTeam(team.map(x => x.id === m.id ? {...x, role: e.target.value} : x))} />
                </div>
                <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-slate-200 flex items-center gap-4">
                  {m.image ? <img src={m.image} className="w-20 h-20 rounded-xl object-cover border-2 border-teal-500 shadow-lg" alt="preview" /> : <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center text-slate-300"><ImageIcon size={30} /></div>}
                  <div className="flex-grow">
                      <p className="text-xs font-bold text-slate-400 mb-2 uppercase">Upload Profile Photo</p>
                      <input type="file" className="text-xs file:bg-teal-50 file:border-0 file:rounded-lg file:px-3 file:py-1 file:text-teal-700 file:font-bold" onChange={async (e) => {
                        const url = await uploadImage(e.target.files[0]);
                        if (url) setTeam(team.map(x => x.id === m.id ? {...x, image: url} : x));
                      }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => handleUpdate('team_data', team)} className="w-full mt-8 bg-teal-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-teal-700 transition">
            {isUploading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            {isUploading ? 'Uploading to Cloudinary...' : 'Save All Team Changes'}
        </button>
      </section>
    </div>
  );
};

export default Admin;