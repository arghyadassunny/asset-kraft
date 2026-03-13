import React, { useState } from 'react';
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

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  return (
    <div className="min-h-screen bg-white">
      <Header openBookingModal={openBookingModal} />
      <main>
        <Hero openBookingModal={openBookingModal} />
        <Stats />
        <Services />
        <Portfolio />
        <Calculator />
        <Team openBookingModal={openBookingModal} />
        <Testimonials openBookingModal={openBookingModal} />
        <ContactForm />
      </main>
      <Footer />
      <ChatBot />
      <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
    </div>
  );
};

export default Home;
