import React from 'react';
import { X } from 'lucide-react';

const BookingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl h-[90vh] bg-white rounded-2xl shadow-2xl m-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Close booking modal"
        >
          <X size={24} className="text-slate-700" />
        </button>

        {/* Iframe */}
        <iframe
          src="https://orufybookings.com/asset-kraft/30-min-intro-call"
          className="w-full h-full border-0"
          title="Book a consultation"
          allow="payment"
        />
      </div>
    </div>
  );
};

export default BookingModal;
