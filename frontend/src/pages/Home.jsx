import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Component Imports
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
  // 1. State Management
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [siteData, setSiteData] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Prevents "Rajesh Kumar" flicker

  // 2. Fetch Data from TiDB
  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/content')
      .then(res => {
        const dataMap = {};
        // Transforms the array of rows into a single object: { key: value }
        res.data.forEach(item => { 
          dataMap[item.content_key] = item.content_value; 
        });
        setSiteData(dataMap);
        setIsLoading(false); // Data is ready, turn off loading
      })
      .catch(err => {
        console.error("Database fetch failed", err);
        setIsLoading(false); // Stop loading even on error so user can still see the site
      });
  }, []);

  // 3. Helper for Modal
  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Header openBookingModal={openBookingModal} />
      
      <main>
        {/* HERO: Receives whole object and loading state */}
        <Hero 
          openBookingModal={openBookingModal} 
          dynamicData={siteData} 
          isLoading={isLoading} 
        />

        {/* STATS: Receives whole object and loading state */}
        <Stats 
          dynamicStats={siteData} 
          isLoading={isLoading} 
        />

        {/* SERVICES: Currently static, but ready for dynamicData if needed */}
        <Services />
        
        {/* PORTFOLIO & CALCULATOR: Generally static logic */}
        <Portfolio />
        <Calculator />
        
        {/* TEAM: Can be made dynamic in the future */}
<Team 
  openBookingModal={() => setIsBookingModalOpen(true)} 
  dynamicData={siteData} 
  isLoading={isLoading}
/>
        
        {/* TESTIMONIALS: Uses the Carousel with Unlimited logic */}
        <Testimonials 
          openBookingModal={openBookingModal} 
          dynamicData={siteData} 
          isLoading={isLoading}
        />
        
        <ContactForm />
      </main>

      {/* Persistence Elements */}
      <Footer />
      <ChatBot />

      {/* Modals */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={closeBookingModal} 
      />
    </div>
  );
};

export default Home;