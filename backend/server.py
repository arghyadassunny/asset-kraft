from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ============================================
# MODELS
# ============================================

class ContactFormSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = Field(default="new")  # new, contacted, resolved

class ContactFormCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str

class CalculationSave(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    calculation_type: str  # "sip" or "lumpsum"
    monthly_investment: Optional[float] = None
    investment_amount: Optional[float] = None
    expected_return: float
    time_period: int
    total_investment: float
    estimated_returns: float
    total_value: float
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CalculationCreate(BaseModel):
    calculation_type: str
    monthly_investment: Optional[float] = None
    investment_amount: Optional[float] = None
    expected_return: float
    time_period: int
    total_investment: float
    estimated_returns: float
    total_value: float

class ChatMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    user_message: str
    bot_response: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None


# ============================================
# INTELLIGENT CHATBOT LOGIC
# ============================================

def get_intelligent_response(user_message: str) -> str:
    """
    Rule-based intelligent chatbot that provides contextual responses
    without requiring LLM API
    """
    message = user_message.lower()
    
    # Greetings
    if any(word in message for word in ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'namaste']):
        return "Hello! Welcome to AssetKraft Investments. I'm here to help you with your wealth management queries. How can I assist you today?"
    
    # Services related
    if any(word in message for word in ['service', 'offer', 'what do you', 'provide', 'help']):
        return """We offer comprehensive wealth management services:
        
• Mutual Fund Investments - Personalized portfolio based on your goals
• Term & Health Insurance - Complete family protection
• Financial Planning - Goal-based planning for your future
• Legacy Planning - Will preparation and estate planning

Would you like to know more about any specific service?"""
    
    # Mutual Funds / SIP
    if any(word in message for word in ['sip', 'mutual fund', 'invest', 'investment', 'portfolio']):
        return """SIP (Systematic Investment Plan) is one of the best ways to build wealth:

✓ Start with as low as ₹500/month
✓ Benefit from rupee cost averaging
✓ Power of compounding over time
✓ Disciplined investing approach

We help you choose the right mutual funds based on your:
- Risk appetite
- Investment goals
- Time horizon

Try our SIP Calculator to see how your investments can grow! Would you like to schedule a consultation?"""
    
    # Returns / Performance
    if any(word in message for word in ['return', 'performance', 'profit', 'gain', 'growth']):
        return """Our portfolio strategies offer indicative returns of:

• Equity Growth: 12-15% p.a. (High Risk)
• Balanced Hybrid: 9-12% p.a. (Moderate Risk)
• Debt Conservative: 7-9% p.a. (Low Risk)

Note: Returns are subject to market risks and past performance doesn't guarantee future returns. Our advisors will help you choose strategies aligned with your risk profile."""
    
    # Contact / Reach / Location
    if any(word in message for word in ['contact', 'call', 'phone', 'email', 'reach', 'location', 'office', 'address']):
        return """You can reach us at:

📧 Email: growth@assetkraft.com
📞 Phone: 9230968242
📍 Offices: Howrah & Kolkata (3 locations)

Our team is available Monday to Saturday, 10 AM - 6 PM.

Would you like to schedule a consultation? I can help you get started!"""
    
    # Calculator
    if any(word in message for word in ['calculator', 'calculate', 'planning tool', 'estimate']):
        return """We have powerful financial calculators:

• SIP Calculator - Plan your monthly investments
• Lumpsum Calculator - One-time investment returns

These tools help you visualize your wealth creation journey. Would you like me to guide you on using them?"""
    
    # Team / About / Experience
    if any(word in message for word in ['team', 'who', 'about', 'experience', 'experts']):
        return """AssetKraft is led by experienced professionals:

• Ashis Kumar Dey - Managing Director & CEO
• Sanjeev Kumar Mundhra - Director
• Amit Rathi - Director

Backed by 20+ years of industry experience and a team of 30+ wealth advisors, we've helped 5000+ families manage over ₹700 Crores in AUM.

We're AMFI Registered Mutual Fund Distributors committed to your financial success."""
    
    # Insurance
    if any(word in message for word in ['insurance', 'term', 'health', 'life', 'cover', 'protection']):
        return """We provide comprehensive insurance solutions:

🛡️ Term Insurance - Life protection for your family
🏥 Health Insurance - Medical coverage for emergencies

We analyze your needs and recommend optimal coverage to ensure your family's financial security. Our insurance book stands at ₹1.5+ Crores.

Would you like a personalized insurance assessment?"""
    
    # Tax / Tax Saving
    if any(word in message for word in ['tax', 'saving', '80c', 'elss', 'deduction']):
        return """We offer tax-efficient investment solutions:

• ELSS Funds - Save tax under Section 80C
• Tax-Saving Portfolio - Wealth creation + tax benefits
• Expected Returns: 10-13% p.a.

Build wealth while saving up to ₹46,800 in taxes annually!

Shall I help you explore tax-saving options?"""
    
    # Fees / Charges / Cost
    if any(word in message for word in ['fee', 'charge', 'cost', 'commission', 'price', 'expensive']):
        return """At AssetKraft, transparency is our priority:

• We work on a fee-based or commission-based model
• No hidden charges
• Detailed cost breakup provided upfront
• Our focus is on maximizing YOUR returns

Schedule a free consultation to discuss the fee structure best suited for you."""
    
    # Minimum Investment
    if any(word in message for word in ['minimum', 'start', 'begin', 'initial', 'how much']):
        return """You can start your investment journey with:

• SIP: As low as ₹500/month
• Lumpsum: From ₹5,000 onwards

We believe in making wealth creation accessible to everyone. Start small, dream big!

Ready to begin? Let me connect you with our advisors."""
    
    # Risk
    if any(word in message for word in ['risk', 'safe', 'secure', 'loss', 'dangerous']):
        return """Understanding risk is crucial:

All investments carry some risk, but we help you manage it:

🟢 Low Risk - Debt funds (7-9% returns)
🟡 Moderate Risk - Balanced funds (9-12% returns)
🔴 High Risk - Equity funds (12-15% returns)

We create diversified portfolios matching YOUR risk appetite. Our advisors will guide you through every market cycle.

Would you like a free risk assessment?"""
    
    # Goal Planning / Retirement / Education
    if any(word in message for word in ['goal', 'retirement', 'education', 'child', 'marriage', 'house', 'planning']):
        return """Goal-based planning is our specialty:

🎓 Child's Education - Build corpus for higher studies
💍 Marriage Planning - Save for life's big moments
🏠 Home Purchase - Achieve your dream home
🌴 Retirement Planning - Secure your golden years

We create customized portfolios aligned with each goal's timeline and amount.

Let's discuss your goals! What are you planning for?"""
    
    # NRI / Non-Resident
    if any(word in message for word in ['nri', 'abroad', 'overseas', 'foreign', 'non-resident']):
        return """Yes, we serve NRI clients!

We help NRIs invest in Indian mutual funds and manage their India-based wealth. Our team handles:
• NRI account documentation
• Regulatory compliance
• Repatriation guidelines

Connect with us to discuss your specific requirements!"""
    
    # Thank you / Thanks
    if any(word in message for word in ['thank', 'thanks', 'appreciate']):
        return "You're most welcome! I'm here to help anytime. Feel free to ask if you have more questions, or schedule a consultation with our team. Have a great day! 😊"
    
    # Bye / Goodbye
    if any(word in message for word in ['bye', 'goodbye', 'see you', 'later']):
        return "Thank you for connecting with AssetKraft! We're here whenever you need us. Have a wonderful day ahead! 🌟"
    
    # Default intelligent response
    return """That's a great question! Our expert advisors would be the best to discuss this in detail.

Here's what I can help you with:
• Services we offer
• SIP & Investment information
• Returns & Performance
• Contact details
• Schedule a consultation

You can also call us directly at 9230968242 or email growth@assetkraft.com.

How else may I assist you?"""


# ============================================
# API ROUTES
# ============================================

@api_router.get("/")
async def root():
    return {"message": "AssetKraft API - Your Wealth Management Partner"}


# Contact Form Endpoints
@api_router.post("/contact", response_model=ContactFormSubmission)
async def submit_contact_form(form_data: ContactFormCreate):
    """Submit contact form"""
    try:
        submission = ContactFormSubmission(**form_data.model_dump())
        
        # Convert to dict and serialize datetime
        doc = submission.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        
        # Save to MongoDB
        result = await db.contact_submissions.insert_one(doc)
        
        logger.info(f"Contact form submitted: {submission.email}")
        
        # TODO: Add email notification here when email service is integrated
        
        return submission
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit form")


@api_router.get("/contact", response_model=List[ContactFormSubmission])
async def get_contact_submissions():
    """Get all contact form submissions (admin use)"""
    try:
        submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
        
        # Convert ISO string timestamps back to datetime
        for sub in submissions:
            if isinstance(sub['timestamp'], str):
                sub['timestamp'] = datetime.fromisoformat(sub['timestamp'])
        
        return submissions
    except Exception as e:
        logger.error(f"Error fetching submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch submissions")


# Calculator Endpoints
@api_router.post("/calculator/save", response_model=CalculationSave)
async def save_calculation(calc_data: CalculationCreate):
    """Save calculator results (optional feature)"""
    try:
        calculation = CalculationSave(**calc_data.model_dump())
        
        # Convert to dict and serialize datetime
        doc = calculation.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        
        # Save to MongoDB
        await db.calculations.insert_one(doc)
        
        logger.info(f"Calculation saved: {calculation.calculation_type}")
        
        return calculation
    except Exception as e:
        logger.error(f"Error saving calculation: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to save calculation")


# Chatbot Endpoints
@api_router.post("/chat")
async def chat(chat_request: ChatRequest):
    """Intelligent chatbot endpoint"""
    try:
        # Generate session ID if not provided
        session_id = chat_request.session_id or str(uuid.uuid4())
        
        # Get intelligent response
        bot_response = get_intelligent_response(chat_request.message)
        
        # Save chat history
        chat_message = ChatMessage(
            session_id=session_id,
            user_message=chat_request.message,
            bot_response=bot_response
        )
        
        doc = chat_message.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        
        await db.chat_history.insert_one(doc)
        
        return {
            "session_id": session_id,
            "response": bot_response,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
    except Exception as e:
        logger.error(f"Error in chat: {str(e)}")
        raise HTTPException(status_code=500, detail="Chat service unavailable")


@api_router.get("/chat/history/{session_id}")
async def get_chat_history(session_id: str):
    """Get chat history for a session"""
    try:
        messages = await db.chat_history.find(
            {"session_id": session_id}, 
            {"_id": 0}
        ).to_list(100)
        
        return {"session_id": session_id, "messages": messages}
    except Exception as e:
        logger.error(f"Error fetching chat history: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch chat history")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()