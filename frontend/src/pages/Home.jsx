import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Services from '../components/Services';
import Calculator from '../components/Calculator';
import Team from '../components/Team';
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
        <Calculator />
        <Team />
        <ContactForm />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Home;
