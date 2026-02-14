# AssetKraft Landing Page - Product Requirements Document

## Project Overview
**Project Name:** AssetKraft Premium Landing Page  
**Date Created:** February 14, 2026  
**Status:** Phase 1 Complete (Frontend with Mock Data)

## Original Problem Statement
Build a next-generation premium landing page for AssetKraft (finance and wealth management company). The website should be modern, minimalist, luxurious, and bold with dynamic visuals representing "crafting wealth". The design should use 70% white background with teal/green and yellow accents matching the company logo.

## Company Information
- **Name:** Asset Kraft Investments Pvt. Ltd.
- **Tagline:** "Your Ambitions, Our Blueprint"
- **Registration:** AMFI Registered Mutual Fund Distributor
- **Key Stats:**
  - 700+ Crores AUM
  - 5000+ Happy Investors
  - 20+ Years Experience
  - 30+ Team Members
  - 3 Office Locations (Howrah & Kolkata)

## User Personas
1. **High Net Worth Individuals (HNI):** Looking for premium wealth management services
2. **Retail Investors:** Seeking mutual fund investment guidance
3. **Families:** Requiring comprehensive financial planning including insurance
4. **Business Owners:** Need investment portfolio management

## Core Requirements

### Design Guidelines
- **Color Palette:**
  - Primary: White background (70% of page)
  - Accent 1: Teal/Cyan (#14B8A6, #2DD4BF)
  - Accent 2: Yellow/Gold (#FBBF24, #FCD34D)
  - Text: Slate/Navy (#1E293B, #0F172A)
- **Typography:** Inter font family (modern, clean)
- **Style:** Modern minimalist + Luxurious premium + Bold dynamic
- **Effects:** Glassmorphism, micro-animations, hover effects, smooth transitions

### Required Features
1. ✅ **Contact Form** - With validation (MOCK submission)
2. ✅ **Live AI Support Bot** - Floating chatbot with MOCK responses
3. ✅ **Finance Calculator** - SIP and Lumpsum calculators (MOCK calculations)

## What's Been Implemented (Phase 1 - Feb 14, 2026)

### Frontend Structure
```
/app/frontend/src/
├── components/
│   ├── Header.jsx - Sticky navigation with smooth scroll
│   ├── Hero.jsx - Bold hero with CTA buttons
│   ├── Stats.jsx - Animated stat cards (6 metrics)
│   ├── Services.jsx - Service cards + Philosophy + Values
│   ├── Calculator.jsx - Interactive SIP/Lumpsum calculator
│   ├── Team.jsx - Team member cards + CTA section
│   ├── ContactForm.jsx - Contact form with validation
│   ├── ChatBot.jsx - AI chatbot widget
│   └── Footer.jsx - Footer with links and social
├── pages/
│   └── Home.jsx - Main landing page composition
├── data/
│   └── mock.js - All mock data and functions
└── ui/ - Shadcn UI components
```

### Sections Implemented
1. **Header** - Top bar (email/phone) + Main navigation (sticky)
2. **Hero** - Main headline, subheading, CTA buttons, trust indicators
3. **Stats** - 6 animated cards with key metrics
4. **Services** - 4 service cards with icons
5. **Values** - What we do vs don't do (split layout)
6. **Philosophy** - 5 core principle cards
7. **Calculator** - Tabbed interface (SIP/Lumpsum) with results display
8. **Team** - 3 director cards + CTA section
9. **Contact Form** - Full contact form with mock submission
10. **Footer** - Company info, quick links, contact details, disclaimer
11. **ChatBot** - Floating AI assistant with mock responses

### Mock Data Implementation
- All data stored in `/app/frontend/src/data/mock.js`
- Mock functions: `submitContactForm()`, `calculateSIP()`, `calculateLumpsum()`
- Mock chatbot responses based on keyword detection
- No backend API calls yet

### Design Features
- ✅ 70% white background with teal/yellow accents
- ✅ Clean, modern Inter font
- ✅ Micro-animations on hover and scroll
- ✅ Responsive grid layouts
- ✅ Glassmorphism effects on cards
- ✅ Smooth scrolling navigation
- ✅ Shadow and border transitions
- ✅ Professional color contrast

## Prioritized Backlog

### P0 - Next Phase (Backend Development)
1. **Backend API Development**
   - Contact form submission endpoint
   - Store submissions in MongoDB
   - Email notification integration
   
2. **Calculator Enhancement**
   - Save calculation history
   - User session tracking
   
3. **AI Chatbot Backend**
   - LLM integration for intelligent responses
   - Chat history storage
   - Lead capture from chat

### P1 - Enhancement Features
1. **Blog/Resources Section**
   - Financial tips and articles
   - Investment guides
   
2. **Client Portal Integration**
   - Link to existing client login
   
3. **Newsletter Subscription**
   - Email capture with validation
   - Integration with email service

### P2 - Advanced Features
1. **Multi-language Support** (English + Hindi)
2. **Testimonials/Reviews Section**
3. **Video Introduction** of team/services
4. **Live Chat** with team members
5. **Goal Planning Tool** (advanced calculator)

## API Contracts (For Backend Development)

### 1. Contact Form API
```
POST /api/contact
Body: {
  name: string,
  email: string,
  phone: string,
  message: string
}
Response: {
  success: boolean,
  message: string,
  id: string (optional)
}
```

### 2. Calculator Save API
```
POST /api/calculator/save
Body: {
  type: "sip" | "lumpsum",
  inputs: object,
  results: object,
  sessionId: string
}
Response: {
  success: boolean,
  calculationId: string
}
```

### 3. Chatbot API
```
POST /api/chat
Body: {
  message: string,
  sessionId: string,
  context: array
}
Response: {
  reply: string,
  suggestions: array (optional)
}
```

## Frontend-Backend Integration Plan

### Phase 1: Contact Form
1. Replace `submitContactForm()` in mock.js with actual API call
2. Add error handling and retry logic
3. Show success/error toasts
4. Store form data in MongoDB
5. Send email notifications

### Phase 2: Calculator Enhancement
1. Optional: Save calculation results to database
2. Track user sessions
3. Generate shareable calculation links

### Phase 3: AI Chatbot
1. Replace mock responses with LLM API integration
2. Implement conversation history
3. Add lead capture functionality
4. Store chat logs for analysis

## Technical Stack
- **Frontend:** React 19, Tailwind CSS, Shadcn UI
- **Backend:** FastAPI, Python (to be implemented)
- **Database:** MongoDB
- **Deployment:** Emergent Platform

## Success Metrics
- Page load time < 2 seconds
- Mobile responsive (tested on all devices)
- Accessibility score > 90
- Contact form submission rate
- Chatbot engagement rate
- Calculator usage statistics

## Next Tasks
1. ✅ Get user approval on Phase 1 design
2. ⏳ Implement backend APIs for contact form
3. ⏳ Integrate LLM for AI chatbot
4. ⏳ Add email notification service
5. ⏳ Test end-to-end functionality
6. ⏳ Deploy to production

---

**Last Updated:** February 14, 2026  
**Version:** 1.0 (Frontend MVP)
