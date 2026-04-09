import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Calculator from '../components/Calculator';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import ChatBot from '../components/ChatBot';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';

const Home = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [siteData, setSiteData] = useState({});

  useEffect(() => {
    axios.get('/api/content')
      .then(res => {
        const dataMap = {};
        // This takes the database rows and turns them into a simple object: { key: value }
        res.data.forEach(item => { 
          dataMap[item.content_key] = item.content_value; 
        });
        setSiteData(dataMap);
      })
      .catch(err => console.error("Database fetch failed", err));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header openBookingModal={() => setIsBookingModalOpen(true)} />
      
      <main>
        {/* Pass the whole object to Hero too! */}
        <Hero 
          openBookingModal={() => setIsBookingModalOpen(true)} 
          dynamicData={siteData} 
        />

        {/* Instead of mapping 6 lines, we just pass the whole siteData object */}
        <Stats dynamicStats={siteData} />

        {/* You can now do the same for Services and others! */}
        <Services dynamicData={siteData} />
        
        <Portfolio />
        <Calculator />
        
        <Team 
          openBookingModal={() => setIsBookingModalOpen(true)} 
          dynamicData={siteData} 
        />
        
        <Testimonials 
  openBookingModal={() => setIsBookingModalOpen(true)} 
  dynamicData={siteData} 
/>
        <ContactForm />
      </main>

      <Footer />
      <ChatBot />
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  );
};

export default Home;