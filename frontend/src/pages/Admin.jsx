import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Trash2, Save, Image as ImageIcon, Loader2, 
  BarChart3, Users, Quote, Briefcase 
} from 'lucide-react';
import { services as defaultMockServices } from '../data/mock';

// Default background images matching the existing mock services
const defaultServiceImages = [
  'https://res.cloudinary.com/djm5rsjwl/image/upload/v1775941268/mutual_funds_pic_qb9mr4.png',
  'https://res.cloudinary.com/djm5rsjwl/image/upload/v1775941241/insurance_ejewjz.png',
  'https://res.cloudinary.com/djm5rsjwl/image/upload/v1775941241/finance_kvn7zh.png',
  'https://res.cloudinary.com/djm5rsjwl/image/upload/v1775941242/legacy_planning_qwasl4.png',
  'https://res.cloudinary.com/djm5rsjwl/image/upload/v1775941241/finance_kvn7zh.png'
];

// Attach initial images to the default 5 services
const initialServicesWithImages = defaultMockServices.map((s, idx) => ({
  ...s,
  image: s.image || defaultServiceImages[idx % defaultServiceImages.length]
}));

const Admin = () => {
  const CLOUD_NAME = "djm5rsjwl";
  const UPLOAD_PRESET = "asset_kraft_preset"; 

  const [status, setStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [statsData, setStatsData] = useState({});
  const [testimonials, setTestimonials] = useState([]);
  const [team, setTeam] = useState([]);
  const [services, setServices] = useState(initialServicesWithImages);

  const availableIcons = [
    'TrendingUp', 'Shield', 'Target', 'FileText', 'Handshake', 
    'CheckCircle', 'BookOpen', 'Lock', 'Sparkles', 'Sun'
  ];

  // FETCH EVERYTHING ON LOAD
  useEffect(() => {
    axios.get('/api/content').then(res => {
      const data = res.data;

      // 1. Load Stats
      const statsMap = {};
      data.forEach(item => {
        if (item.content_key.startsWith('stat_')) statsMap[item.content_key] = item.content_value;
      });
      setStatsData(statsMap);

      // 2. Load Services (fallback to the default 5 if not set in DB yet)
      const servicesRow = data.find(i => i.content_key === 'services_data');
      if (servicesRow && servicesRow.content_value) {
        const parsed = JSON.parse(servicesRow.content_value);
        if (parsed.length > 0) setServices(parsed);
      }

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

      {/* 1. STATISTICS */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-2">
          <BarChart3 className="text-teal-600" /> Statistics & Numbers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'AUM (Crores)', key: 'stat_aum' },
            { label: 'Happy Investors', key: 'stat_investors' },
            { label: 'Insurance Book', key: 'stat_insurance' },
            { label: 'Years of Experience', key: 'stat_experience' }
          ].map((item) => (
            <div key={item.key} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <label className="text-xs font-black text-slate-400 uppercase mb-2 block">{item.label}</label>
              <div className="flex items-center gap-2 min-w-0">
                <input 
                  className="min-w-0 flex-1 border border-slate-200 bg-white p-2 rounded-xl text-sm outline-none focus:border-teal-500"
                  value={statsData[item.key] || ''}
                  onChange={(e) => setStatsData({...statsData, [item.key]: e.target.value})}
                />
                <button 
                  onClick={() => handleUpdate(item.key, statsData[item.key])} 
                  className="shrink-0 bg-slate-800 hover:bg-slate-950 text-white px-3 py-2 rounded-xl text-xs font-bold transition"
                >
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. SERVICES MANAGEMENT */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Briefcase className="text-teal-600" /> Services Carousel ({services.length} Total)
            </h2>
            <p className="text-xs text-slate-500 mt-1">Manage title, description, icon, and card background photo.</p>
          </div>
          <button 
            onClick={() => setServices([...services, { id: Date.now(), title: '', description: '', icon: 'TrendingUp', image: '' }])} 
            className="bg-teal-50 text-teal-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-teal-100"
          >
            + Add Service
          </button>
        </div>

        <div className="space-y-6">
          {services.map((s, idx) => (
            <div key={s.id || idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 relative group">
              <button 
                onClick={() => setServices(services.filter((_, i) => i !== idx))} 
                className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition"
              >
                <Trash2 size={20}/>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-6">
                {/* Left side: Text details */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">
                      Service #{idx + 1} Title
                    </label>
                    <input 
                      className="w-full border-2 border-white p-3 rounded-xl shadow-sm outline-none focus:border-teal-500 bg-white" 
                      placeholder="e.g. Mutual Fund Investments" 
                      value={s.title || ''} 
                      onChange={(e) => setServices(services.map((x, i) => i === idx ? {...x, title: e.target.value} : x))} 
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Description</label>
                    <textarea 
                      className="w-full border-2 border-white p-3 rounded-xl shadow-sm outline-none focus:border-teal-500 h-24 bg-white" 
                      placeholder="Brief overview of the service..." 
                      value={s.description || ''} 
                      onChange={(e) => setServices(services.map((x, i) => i === idx ? {...x, description: e.target.value} : x))} 
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Card Icon</label>
                    <select 
                      className="w-full border-2 border-white p-3 rounded-xl shadow-sm outline-none focus:border-teal-500 bg-white"
                      value={s.icon || 'TrendingUp'} 
                      onChange={(e) => setServices(services.map((x, i) => i === idx ? {...x, icon: e.target.value} : x))}
                    >
                      {availableIcons.map(iconName => (
                        <option key={iconName} value={iconName}>{iconName}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Right side: Background Image Upload */}
                <div className="flex flex-col justify-center bg-white p-5 rounded-2xl border-2 border-dashed border-slate-200">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-3">Card Background Image</p>
                  <div className="flex items-center gap-4">
                    {s.image ? (
                      <img 
                        src={s.image} 
                        className="w-24 h-32 rounded-xl object-cover border-2 border-teal-500 shadow-md" 
                        alt="Service Preview" 
                      />
                    ) : (
                      <div className="w-24 h-32 bg-slate-100 rounded-xl flex flex-col items-center justify-center text-slate-300 border border-slate-200">
                        <ImageIcon size={28} />
                        <span className="text-[10px] text-slate-400 mt-1">No Image</span>
                      </div>
                    )}
                    
                    <div className="flex-grow space-y-2">
                      <input 
                        type="file" 
                        accept="image/*"
                        className="text-xs file:bg-teal-50 file:border-0 file:rounded-lg file:px-3 file:py-1.5 file:text-teal-700 file:font-bold hover:file:bg-teal-100 cursor-pointer" 
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            const url = await uploadImage(e.target.files[0]);
                            if (url) setServices(services.map((x, i) => i === idx ? {...x, image: url} : x));
                          }
                        }} 
                      />
                      <input 
                        type="text" 
                        placeholder="Or paste image URL" 
                        className="w-full text-xs border border-slate-200 p-2 rounded-lg outline-none focus:border-teal-500" 
                        value={s.image || ''} 
                        onChange={(e) => setServices(services.map((x, i) => i === idx ? {...x, image: e.target.value} : x))} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => handleUpdate('services_data', services)} 
          className="w-full mt-6 bg-teal-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-teal-700 transition"
        >
          {isUploading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
          {isUploading ? 'Uploading Image...' : 'Save All Services Changes'}
        </button>
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

      {/* 4. TEAM MANAGEMENT */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><Users className="text-teal-600" /> Team Members</h2>
          <button 
            onClick={() => setTeam([...team, { id: Date.now(), name: '', role: '', image: '', linkedin: '' }])} 
            className="bg-teal-50 text-teal-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-teal-100"
          >
            + Add Member
          </button>
        </div>
        <div className="space-y-6">
          {team.map(m => (
            <div key={m.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 relative group">
              <button onClick={() => setTeam(team.filter(x => x.id !== m.id))} className="absolute top-4 right-4 text-red-400"><Trash2 size={20}/></button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <input className="w-full border-2 border-white p-3 rounded-xl shadow-sm outline-none focus:border-teal-500" placeholder="Name" value={m.name || ''} onChange={(e) => setTeam(team.map(x => x.id === m.id ? {...x, name: e.target.value} : x))} />
                  <input className="w-full border-2 border-white p-3 rounded-xl shadow-sm outline-none focus:border-teal-500" placeholder="Role" value={m.role || ''} onChange={(e) => setTeam(team.map(x => x.id === m.id ? {...x, role: e.target.value} : x))} />
                  <input className="w-full border-2 border-white p-3 rounded-xl shadow-sm outline-none focus:border-teal-500" placeholder="LinkedIn Profile URL" value={m.linkedin || ''} onChange={(e) => setTeam(team.map(x => x.id === m.id ? {...x, linkedin: e.target.value} : x))} />
                </div>
                <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-slate-200 flex items-center gap-4">
                  {m.image ? (
                    <img src={m.image} className="w-20 h-20 rounded-xl object-cover border-2 border-teal-500 shadow-lg" alt="preview" />
                  ) : (
                    <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center text-slate-300">
                      <ImageIcon size={30} />
                    </div>
                  )}
                  <div className="flex-grow">
                    <p className="text-xs font-bold text-slate-400 mb-2 uppercase">Upload Profile Photo</p>
                    <input type="file" className="text-xs file:bg-teal-50 file:border-0 file:rounded-lg file:px-3 file:py-1 file:text-teal-700 file:font-bold" onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const url = await uploadImage(e.target.files[0]);
                          if (url) setTeam(team.map(x => x.id === m.id ? {...x, image: url} : x));
                        }
                      }} 
                    />
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