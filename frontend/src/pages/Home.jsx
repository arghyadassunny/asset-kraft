import React from 'react';
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

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Portfolio />
        <Calculator />
        <Team />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Home;
