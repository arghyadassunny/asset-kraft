import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Save } from 'lucide-react';

const Admin = () => {
  const [status, setStatus] = useState('');
  const [heroTitle, setHeroTitle] = useState('');
  const [statsData, setStatsData] = useState({});
  
  // Testimonials State
  const [testimonials, setTestimonials] = useState([]);

  // Fetch existing data on load to populate the lists
  useEffect(() => {
    axios.get('/api/content').then(res => {
      const data = res.data;
      const testiRow = data.find(item => item.content_key === 'testimonials_data');
      if (testiRow) setTestimonials(JSON.parse(testiRow.content_value));
    });
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

  // Testimonial Helpers
  const addTestimonial = () => {
    setTestimonials([...testimonials, { id: Date.now(), name: '', role: '', quote: '', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' }]);
  };

  const deleteTestimonial = (id) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const updateTestiField = (id, field, value) => {
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  return (
    <div className="p-10 max-w-5xl mx-auto font-sans bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">Asset Kraft Control Panel</h1>

      {/* TESTIMONIALS MANAGEMENT */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-teal-700">Client Testimonials</h2>
          <button onClick={addTestimonial} className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition">
            <Plus size={18} /> Add Testimonial
          </button>
        </div>

        <div className="space-y-6">
          {testimonials.map((t, index) => (
            <div key={t.id} className="p-6 bg-slate-50 rounded-xl border border-slate-200 relative group">
              <button 
                onClick={() => deleteTestimonial(t.id)}
                className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition"
              >
                <Trash2 size={20} />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Client Name</label>
                  <input 
                    className="border p-2 rounded-lg"
                    value={t.name}
                    onChange={(e) => updateTestiField(t.id, 'name', e.target.value)}
                    placeholder="e.g. Rajesh Kumar"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Position / Role</label>
                  <input 
                    className="border p-2 rounded-lg"
                    value={t.role}
                    onChange={(e) => updateTestiField(t.id, 'role', e.target.value)}
                    placeholder="e.g. Business Owner, Mumbai"
                  />
                </div>
                <div className="flex flex-col gap-1 col-span-full">
                  <label className="text-xs font-bold text-slate-500 uppercase">Image URL</label>
                  <input 
                    className="border p-2 rounded-lg text-sm text-slate-500"
                    value={t.image}
                    onChange={(e) => updateTestiField(t.id, 'image', e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1 col-span-full">
                  <label className="text-xs font-bold text-slate-500 uppercase">Client Comment</label>
                  <textarea 
                    className="border p-2 rounded-lg h-24"
                    value={t.quote}
                    onChange={(e) => updateTestiField(t.id, 'quote', e.target.value)}
                    placeholder="Enter testimonial text here..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {testimonials.length > 0 && (
          <button 
            onClick={() => handleUpdate('testimonials_data', testimonials)}
            className="w-full mt-8 bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition"
          >
            <Save size={20} /> Save All Testimonials
          </button>
        )}
      </div>

      {/* Hero and Stats sections go here (same as before) ... */}

      <div className="fixed bottom-10 right-10 bg-white border-l-4 border-teal-500 p-4 shadow-xl rounded-r-lg">
        <p className="text-slate-700 font-medium">{status || "Ready to Edit"}</p>
      </div>
    </div>
  );
};

export default Admin;