import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [heroTitle, setHeroTitle] = useState('');
  const [status, setStatus] = useState('');

  const handleUpdate = async () => {
    setStatus('Saving...');
    try {
      await axios.post('/api/content', { key: 'hero_title', value: heroTitle });
      setStatus('Success! Title updated.');
    } catch (err) {
      setStatus('Error updating title.');
    }
  };

  return (
    <div className="p-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Edit Website Text</h1>
      <input 
        type="text" 
        className="border p-2 w-80 mr-2"
        placeholder="New Hero Title"
        value={heroTitle}
        onChange={(e) => setHeroTitle(e.target.value)}
      />
      <button onClick={handleUpdate} className="bg-blue-600 text-white p-2 rounded">Save</button>
      <p className="mt-4">{status}</p>
    </div>
  );
};

export default Admin;