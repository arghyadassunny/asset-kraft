import requests
import sys
import json
from datetime import datetime
import uuid

class AssetKraftAPITester:
    def __init__(self, base_url="https://craft-wealth.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.session_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        default_headers = {'Content-Type': 'application/json'}
        if headers:
            default_headers.update(headers)

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=default_headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=default_headers, timeout=10)
            
            print(f"   Status: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response preview: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response text: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Error response: {response.text}")

            return success, response

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timed out after 10 seconds")
            return False, None
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, None

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        success, response = self.run_test(
            "Root API Endpoint",
            "GET",
            "api/",
            200
        )
        return success

    def test_contact_form_submission(self):
        """Test contact form submission"""
        test_data = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": "test@example.com",
            "phone": "+91 98765 43210",
            "message": "This is a test message from automated testing."
        }
        
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "api/contact",
            200,
            data=test_data
        )
        
        if success and response:
            try:
                data = response.json()
                if 'id' in data and 'timestamp' in data:
                    print(f"   ✅ Contact form created with ID: {data['id']}")
                    return True
                else:
                    print(f"   ⚠️  Response missing required fields")
                    return False
            except:
                print(f"   ⚠️  Invalid JSON response")
                return False
        return success

    def test_get_contact_submissions(self):
        """Test getting contact form submissions (admin endpoint)"""
        success, response = self.run_test(
            "Get Contact Submissions",
            "GET",
            "api/contact",
            200
        )
        
        if success and response:
            try:
                data = response.json()
                if isinstance(data, list):
                    print(f"   ✅ Retrieved {len(data)} contact submissions")
                    return True
                else:
                    print(f"   ⚠️  Expected list, got {type(data)}")
                    return False
            except:
                print(f"   ⚠️  Invalid JSON response")
                return False
        return success

    def test_chatbot_greeting(self):
        """Test chatbot with greeting"""
        if not self.session_id:
            self.session_id = f"test_session_{datetime.now().strftime('%H%M%S')}_{uuid.uuid4().hex[:8]}"
        
        test_data = {
            "message": "Hello",
            "session_id": self.session_id
        }
        
        success, response = self.run_test(
            "Chatbot - Greeting",
            "POST",
            "api/chat",
            200,
            data=test_data
        )
        
        if success and response:
            try:
                data = response.json()
                if 'response' in data and 'session_id' in data:
                    print(f"   ✅ Bot responded: {data['response'][:100]}...")
                    return True
                else:
                    print(f"   ⚠️  Response missing required fields")
                    return False
            except:
                print(f"   ⚠️  Invalid JSON response")
                return False
        return success

    def test_chatbot_services(self):
        """Test chatbot with services query"""
        if not self.session_id:
            self.session_id = f"test_session_{datetime.now().strftime('%H%M%S')}_{uuid.uuid4().hex[:8]}"
        
        test_data = {
            "message": "What services do you offer?",
            "session_id": self.session_id
        }
        
        success, response = self.run_test(
            "Chatbot - Services Query",
            "POST",
            "api/chat",
            200,
            data=test_data
        )
        
        if success and response:
            try:
                data = response.json()
                if 'response' in data and 'session_id' in data:
                    print(f"   ✅ Bot responded: {data['response'][:100]}...")
                    return True
                else:
                    print(f"   ⚠️  Response missing required fields")
                    return False
            except:
                print(f"   ⚠️  Invalid JSON response")
                return False
        return success

    def test_chatbot_sip_query(self):
        """Test chatbot with SIP query"""
        if not self.session_id:
            self.session_id = f"test_session_{datetime.now().strftime('%H%M%S')}_{uuid.uuid4().hex[:8]}"
        
        test_data = {
            "message": "Tell me about SIP investment",
            "session_id": self.session_id
        }
        
        success, response = self.run_test(
            "Chatbot - SIP Query",
            "POST",
            "api/chat",
            200,
            data=test_data
        )
        
        if success and response:
            try:
                data = response.json()
                if 'response' in data and 'session_id' in data:
                    print(f"   ✅ Bot responded: {data['response'][:100]}...")
                    return True
                else:
                    print(f"   ⚠️  Response missing required fields")
                    return False
            except:
                print(f"   ⚠️  Invalid JSON response")
                return False
        return success

    def test_chatbot_contact_info(self):
        """Test chatbot with contact info query"""
        if not self.session_id:
            self.session_id = f"test_session_{datetime.now().strftime('%H%M%S')}_{uuid.uuid4().hex[:8]}"
        
        test_data = {
            "message": "How can I contact you?",
            "session_id": self.session_id
        }
        
        success, response = self.run_test(
            "Chatbot - Contact Info",
            "POST",
            "api/chat",
            200,
            data=test_data
        )
        
        if success and response:
            try:
                data = response.json()
                if 'response' in data and 'session_id' in data:
                    print(f"   ✅ Bot responded: {data['response'][:100]}...")
                    return True
                else:
                    print(f"   ⚠️  Response missing required fields")
                    return False
            except:
                print(f"   ⚠️  Invalid JSON response")
                return False
        return success

    def test_chat_history(self):
        """Test getting chat history"""
        if not self.session_id:
            print("   ⚠️  No session ID available, skipping chat history test")
            return True
            
        success, response = self.run_test(
            "Chat History",
            "GET",
            f"api/chat/history/{self.session_id}",
            200
        )
        
        if success and response:
            try:
                data = response.json()
                if 'session_id' in data and 'messages' in data:
                    print(f"   ✅ Retrieved {len(data['messages'])} chat messages")
                    return True
                else:
                    print(f"   ⚠️  Response missing required fields")
                    return False
            except:
                print(f"   ⚠️  Invalid JSON response")
                return False
        return success

    def test_calculator_save(self):
        """Test saving calculator results"""
        test_data = {
            "calculation_type": "sip",
            "monthly_investment": 5000,
            "expected_return": 12,
            "time_period": 10,
            "total_investment": 600000,
            "estimated_returns": 544000,
            "total_value": 1144000
        }
        
        success, response = self.run_test(
            "Calculator Save",
            "POST",
            "api/calculator/save",
            200,
            data=test_data
        )
        
        if success and response:
            try:
                data = response.json()
                if 'id' in data and 'calculation_type' in data:
                    print(f"   ✅ Calculation saved with ID: {data['id']}")
                    return True
                else:
                    print(f"   ⚠️  Response missing required fields")
                    return False
            except:
                print(f"   ⚠️  Invalid JSON response")
                return False
        return success

def main():
    """Main test function"""
    print("🚀 Starting AssetKraft API Tests")
    print("="*50)
    
    tester = AssetKraftAPITester()
    
    # List of tests to run
    tests = [
        ("Root Endpoint", tester.test_root_endpoint),
        ("Contact Form Submission", tester.test_contact_form_submission),
        ("Get Contact Submissions", tester.test_get_contact_submissions),
        ("Chatbot - Greeting", tester.test_chatbot_greeting),
        ("Chatbot - Services", tester.test_chatbot_services),
        ("Chatbot - SIP Query", tester.test_chatbot_sip_query),
        ("Chatbot - Contact Info", tester.test_chatbot_contact_info),
        ("Chat History", tester.test_chat_history),
        ("Calculator Save", tester.test_calculator_save)
    ]
    
    # Run all tests
    for test_name, test_func in tests:
        try:
            test_func()
        except Exception as e:
            print(f"❌ Test {test_name} failed with exception: {str(e)}")
    
    # Print summary
    print("\n" + "="*50)
    print(f"📊 Test Summary")
    print(f"Tests run: {tester.tests_run}")
    print(f"Tests passed: {tester.tests_passed}")
    print(f"Success rate: {(tester.tests_passed/tester.tests_run*100):.1f}%" if tester.tests_run > 0 else "No tests run")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️  Some tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())