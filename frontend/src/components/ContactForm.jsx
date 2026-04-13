import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { companyInfo } from '../data/mock';
import { toast } from 'sonner';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // REPLACE with your actual email address
      const response = await axios.post('https://formsubmit.co/ajax/srija.ghosh100@gmail.com', {
        Name: formData.name,
        Email: formData.email,
        Phone: formData.phone,
        Message: formData.message,
        _subject: "New Wealth Journey Inquiry"
      });

      if (response.status === 200) {
        setIsSubmitted(true);
        toast.success('Thank you! Our team will reach out within 24 hours.');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Could not send message. Please call us at ' + companyInfo.phone);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="text-4xl lg:text-4xl font-bold text-slate-900 mb-3 lg:mb-4">
            Get in <span className="text-teal-600">Touch</span>
          </h2>
          <p className="text-sm lg:text-lg text-slate-600 max-w-2xl mx-auto px-4">
            Ready to start your wealth journey? Reach out to us and let's discuss your financial goals
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Contact Details Column */}
          <div className="space-y-6 lg:space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div>
              <div className="hidden lg:block">
              <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3 lg:mb-6">Let's Connect</h3>
              <p className="text-sm lg:text-lg text-slate-600 leading-relaxed mb-2 lg:mb-8 max-w-[320px] lg:max-w-none">
                Our team is here to guide you through every step of your financial journey.
              </p>
            </div>
            </div>

            <div className="space-y-4 w-full max-w-[340px] lg:max-w-none">
              <a href={`tel:${companyInfo.phone}`} className="flex items-center lg:items-start gap-4 p-4 lg:p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-teal-300 group">
                <div className="bg-teal-100 rounded-lg p-2.5 lg:p-3 group-hover:bg-teal-600 transition-colors">
                  <Phone className="text-teal-600 group-hover:text-white w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] lg:text-sm text-slate-500 mb-0.5 uppercase tracking-wide">Call Us</div>
                  <div className="text-base lg:text-xl font-semibold text-slate-900">{companyInfo.phone}</div>
                </div>
              </a>

              <a href={`mailto:${companyInfo.email}`} className="flex items-center lg:items-start gap-4 p-4 lg:p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-yellow-300 group">
                <div className="bg-yellow-100 rounded-lg p-2.5 lg:p-3 group-hover:bg-yellow-500 transition-colors">
                  <Mail className="text-yellow-600 group-hover:text-white w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] lg:text-sm text-slate-500 mb-0.5 uppercase tracking-wide">Email Us</div>
                  <div className="text-base lg:text-xl font-semibold text-slate-900">{companyInfo.email}</div>
                </div>
              </a>

              <div className="flex items-center lg:items-start gap-4 p-4 lg:p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="bg-slate-100 rounded-lg p-2.5 lg:p-3">
                  <MapPin className="text-slate-600 w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] lg:text-sm text-slate-500 mb-0.5 uppercase tracking-wide">Our Offices</div>
                  <div className="text-base lg:text-xl font-semibold text-slate-900">{companyInfo.locations.join(' & ')}</div>
                </div>
              </div>
            </div>

 
          </div>

          {/* Form Column */}
          <div className="bg-white rounded-2xl shadow-xl p-5 lg:p-8 border border-slate-100 w-full max-w-[360px] mx-auto lg:max-w-none">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-10 lg:py-12">
                <div className="bg-teal-100 rounded-full p-3 lg:p-4 mb-4 lg:mb-6">
                  <CheckCircle className="text-teal-600 w-8 h-8 lg:w-12 lg:h-12" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2 lg:mb-3">Thank You!</h3>
                <p className="text-sm lg:text-lg text-slate-600">Our team will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm lg:text-base font-semibold text-slate-700 mb-1.5 lg:mb-2 block">Full Name *</Label>
                  <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required placeholder="Enter your full name" className="h-10 lg:h-12 text-sm lg:text-base" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm lg:text-base font-semibold text-slate-700 mb-1.5 lg:mb-2 block">Email Address *</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="your.email@example.com" className="h-10 lg:h-12 text-sm lg:text-base" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm lg:text-base font-semibold text-slate-700 mb-1.5 lg:mb-2 block">Phone Number *</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="+91 98765 43210" className="h-10 lg:h-12 text-sm lg:text-base" />
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm lg:text-base font-semibold text-slate-700 mb-1.5 lg:mb-2 block">Your Message *</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required placeholder="Tell us about your goals..." className="min-h-24 lg:min-h-32 text-sm lg:text-base" />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full bg-teal-600 hover:bg-teal-700 text-white h-10 lg:h-12 text-base lg:text-lg transition-all duration-300 hover:shadow-lg">
                  {isSubmitting ? <span>Sending...</span> : <div className="flex items-center"><span>Send Message</span><Send className="ml-2 w-4 h-4 lg:w-5 lg:h-5" /></div>}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;