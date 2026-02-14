// Mock data for AssetKraft landing page

export const companyInfo = {
  name: "Asset Kraft Investments Pvt. Ltd.",
  tagline: "Your Ambitions, Our Blueprint",
  description: "We create Endless Possibilities for your Future.",
  email: "growth@assetkraft.com",
  phone: "9230968242",
  locations: ["Howrah", "Kolkata"],
  logo: "https://customer-assets.emergentagent.com/job_craft-wealth/artifacts/wypr3x4u_Screenshot%202026-02-14%20at%201.34.40%E2%80%AFPM.png",
  social: {
    linkedin: "https://www.linkedin.com/company/assetkraft/",
    facebook: "https://www.facebook.com/share/195f9GwzEM/?mibextid=wwXIfr",
    instagram: "https://www.instagram.com/asset_kraft?igsh=b3ZpdzVhenFzdGdq&utm_source=qr",
    website: "https://www.assetkraft.com/"
  }
};

export const stats = [
  {
    id: 1,
    value: "700+",
    label: "AUM (Crores)",
    description: "Assets Under Management"
  },
  {
    id: 2,
    value: "5000+",
    label: "Happy Investors",
    description: "Trust us with their wealth"
  },
  {
    id: 3,
    value: "1.50+",
    label: "Insurance Book (Crores)",
    description: "Total Insurance Portfolio"
  },
  {
    id: 4,
    value: "30+",
    label: "Team Members",
    description: "To Guide & Support each Family"
  },
  {
    id: 5,
    value: "3",
    label: "Office Locations",
    description: "At Howrah & Kolkata"
  },
  {
    id: 6,
    value: "20+",
    label: "Years of Experience",
    description: "Bonding with Investor Families"
  }
];

export const services = [
  {
    id: 1,
    title: "Mutual Fund Investments",
    description: "Helping you invest in Mutual Funds aligned with your goals, risk profile, and return expectations.",
    icon: "TrendingUp"
  },
  {
    id: 2,
    title: "Term & Health Insurance",
    description: "Recommending the appropriate Term & Health Insurance coverage for you and your family.",
    icon: "Shield"
  },
  {
    id: 3,
    title: "Financial Planning",
    description: "Personalised, goal-based financial plans designed to help you achieve your life's most meaningful aspirations.",
    icon: "Target"
  },
  {
    id: 4,
    title: "Legacy Planning",
    description: "Assisting you in preparing a simple and effective Will, ensuring a lasting legacy for your loved ones.",
    icon: "FileText"
  }
];

export const philosophy = [
  {
    id: 1,
    title: "Client First Approach",
    description: "We keep your interests ahead of everything else — your interests are our utmost priority.",
    icon: "Handshake"
  },
  {
    id: 2,
    title: "Practice what we Preach",
    description: "We only suggest what we do ourselves. If it's not good enough for our portfolio, it's not good enough for yours.",
    icon: "CheckCircle"
  },
  {
    id: 3,
    title: "Educate and Implement",
    description: "Our mission is to simplify finance, so you're confident and in control of your financial decisions.",
    icon: "BookOpen"
  },
  {
    id: 4,
    title: "Data Security comes First",
    description: "Your information stays secure. We respect your privacy and treat your data with utmost care.",
    icon: "Lock"
  },
  {
    id: 5,
    title: "Fuelling Financial Freedom",
    description: "We aren't just building wealth — we're guiding you towards true financial independence and peace of mind.",
    icon: "Sparkles"
  }
];

export const team = [
  {
    id: 1,
    name: "Sanjeev Kumar Mundhra",
    role: "Director",
    image: "https://www.assetkraft.com/Untitled%20design%20-3-.png"
  },
  {
    id: 2,
    name: "Ashis Kumar Dey",
    role: "Managing Director & CEO",
    image: "https://www.assetkraft.com/20.jpg"
  },
  {
    id: 3,
    name: "Amit Rathi",
    role: "Director",
    image: "https://www.assetkraft.com/IMG_9587%20-1-.PNG"
  }
];

export const values = [
  {
    id: 1,
    title: "Plan of Action",
    description: "We help you define clear financial goals, craft a robust long-term goal based plan, and build a personalised portfolio to help fund your aspirations.",
    type: "do"
  },
  {
    id: 2,
    title: "Mindset Coaching",
    description: "The real challenge isn't building the plan — it's sticking to it. We coach you to stay the course through all market cycles, economic headlines, fads, and fears.",
    type: "do"
  },
  {
    id: 3,
    title: "Market Speculation",
    description: "We don't chase tops and bottoms. We believe time in the market beats timing the market. We respect our Planning and have strong confidence in our system.",
    type: "dont"
  },
  {
    id: 4,
    title: "Investment Churning",
    description: "We don't reshuffle your portfolio to chase trends. Fads fade. Unnecessary activity often causes more harm than good.",
    type: "dont"
  }
];

// Mock calculator data
export const calculatorTypes = [
  { id: "sip", label: "SIP Calculator" },
  { id: "lumpsum", label: "Lumpsum Calculator" },
  { id: "goal", label: "Goal Planning" }
];

// Mock chatbot responses
export const chatbotResponses = {
  greeting: "Hello! I'm your AssetKraft AI Assistant. How can I help you with your wealth planning today?",
  services: "We offer Mutual Fund Investments, Term & Health Insurance, Financial Planning, and Legacy Planning. Which would you like to know more about?",
  contact: "You can reach us at growth@assetkraft.com or call us at 9230968242. Would you like to schedule a consultation?",
  sip: "SIP (Systematic Investment Plan) is a disciplined way to invest in mutual funds. It helps you benefit from rupee cost averaging and the power of compounding. Would you like to use our SIP calculator?",
  team: "Our expert team includes Ashis Kumar Dey (MD & CEO), Sanjeev Kumar Mundhra (Director), and Amit Rathi (Director), backed by 30+ experienced professionals.",
  default: "That's a great question! Our team would be happy to discuss this with you. Would you like to schedule a consultation or should I connect you with one of our advisors?"
};

// Mock form submission
export const submitContactForm = async (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Form submitted (MOCK):", formData);
      resolve({
        success: true,
        message: "Thank you for contacting us! Our team will reach out to you within 24 hours."
      });
    }, 1500);
  });
};

// Mock calculator calculation
export const calculateSIP = (monthlyInvestment, expectedReturn, timePeriod) => {
  const monthlyRate = expectedReturn / 12 / 100;
  const months = timePeriod * 12;
  const futureValue = monthlyInvestment * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
  const invested = monthlyInvestment * months;
  const returns = futureValue - invested;
  
  return {
    totalInvestment: Math.round(invested),
    estimatedReturns: Math.round(returns),
    totalValue: Math.round(futureValue)
  };
};

export const calculateLumpsum = (investment, expectedReturn, timePeriod) => {
  const futureValue = investment * Math.pow((1 + expectedReturn / 100), timePeriod);
  const returns = futureValue - investment;
  
  return {
    totalInvestment: Math.round(investment),
    estimatedReturns: Math.round(returns),
    totalValue: Math.round(futureValue)
  };
};
