import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { submitContactForm, companyInfo } from '../data/mock';
import { toast } from 'sonner';

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
      const response = await submitContactForm(formData);
      if (response.success) {
        setIsSubmitted(true);
        toast.success(response.message);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Get in <span className="text-teal-600">Touch</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Ready to start your wealth journey? Reach out to us and let's discuss your financial goals
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Let's Connect
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Our team is here to guide you through every step of your financial journey. 
                Whether you have questions about our services or want to schedule a consultation, 
                we're just a message away.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <a 
                href={`tel:${companyInfo.phone}`}
                className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-teal-300 group"
              >
                <div className="bg-teal-100 rounded-lg p-3 group-hover:bg-teal-600 transition-colors">
                  <Phone className="text-teal-600 group-hover:text-white" size={24} />
                </div>
                <div>
                  <div className="text-sm text-slate-600 mb-1">Call Us</div>
                  <div className="text-xl font-semibold text-slate-900">{companyInfo.phone}</div>
                </div>
              </a>

              <a 
                href={`mailto:${companyInfo.email}`}
                className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-yellow-300 group"
              >
                <div className="bg-yellow-100 rounded-lg p-3 group-hover:bg-yellow-500 transition-colors">
                  <Mail className="text-yellow-600 group-hover:text-white" size={24} />
                </div>
                <div>
                  <div className="text-sm text-slate-600 mb-1">Email Us</div>
                  <div className="text-xl font-semibold text-slate-900">{companyInfo.email}</div>
                </div>
              </a>

              <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="bg-slate-100 rounded-lg p-3">
                  <MapPin className="text-slate-600" size={24} />
                </div>
                <div>
                  <div className="text-sm text-slate-600 mb-1">Our Offices</div>
                  <div className="text-xl font-semibold text-slate-900">
                    {companyInfo.locations.join(' & ')}
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="hidden lg:block rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80" 
                alt="Financial Planning" 
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="bg-teal-100 rounded-full p-4 mb-6">
                  <CheckCircle className="text-teal-600" size={48} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Thank You!
                </h3>
                <p className="text-slate-600 text-lg">
                  We've received your message and will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-base font-semibold text-slate-700 mb-2 block">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="h-12 text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-base font-semibold text-slate-700 mb-2 block">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    className="h-12 text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-base font-semibold text-slate-700 mb-2 block">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 98765 43210"
                    className="h-12 text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-base font-semibold text-slate-700 mb-2 block">
                    Your Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your financial goals..."
                    className="min-h-32 text-base"
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12 text-lg transition-all duration-300 hover:shadow-lg"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="ml-2" size={20} />
                    </>
                  )}
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
