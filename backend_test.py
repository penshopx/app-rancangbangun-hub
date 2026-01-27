import requests
import sys
import json
from datetime import datetime

class RancangBangunAPITester:
    def __init__(self, base_url="https://projectnexus-6.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:100]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}")
                self.failed_tests.append({
                    'name': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text[:200]
                })

            return success, response.json() if success and response.text else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                'name': name,
                'error': str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API", "GET", "", 200)

    def test_rab_calculation_pondasi(self):
        """Test RAB calculation for Pondasi with specific test data"""
        rab_data = {
            "category": "pondasi",
            "inputs": [
                {"field_id": "panjang", "label": "Panjang Pondasi (m)", "value": 10.0},
                {"field_id": "lebar", "label": "Lebar Pondasi (m)", "value": 5.0},
                {"field_id": "tinggi", "label": "Tinggi Pondasi (m)", "value": 2.0},
                {"field_id": "waste", "label": "Waste (%)", "value": 10.0}
            ],
            "volume": 110.0,  # 10*5*2 + 10% waste = 100 + 10 = 110
            "unit": "m³",
            "price_per_unit": 850000.0,
            "total_cost": 93500000.0  # 110 * 850000
        }
        
        success, response = self.run_test("RAB Pondasi Calculation", "POST", "rab/calculate", 200, rab_data)
        
        if success:
            # Verify calculation accuracy
            expected_volume = 110.0
            expected_cost = 93500000.0
            
            if abs(response.get('volume', 0) - expected_volume) < 0.01:
                print(f"✅ Volume calculation correct: {response.get('volume')} m³")
            else:
                print(f"❌ Volume calculation incorrect: expected {expected_volume}, got {response.get('volume')}")
                
            if abs(response.get('total_cost', 0) - expected_cost) < 1:
                print(f"✅ Cost calculation correct: Rp {response.get('total_cost'):,.0f}")
            else:
                print(f"❌ Cost calculation incorrect: expected Rp {expected_cost:,.0f}, got Rp {response.get('total_cost', 0):,.0f}")
        
        return success, response

    def test_rab_calculation_jalan_aspal(self):
        """Test RAB calculation for Jalan Aspal"""
        rab_data = {
            "category": "jalan-aspal",
            "inputs": [
                {"field_id": "lebar", "label": "Lebar Jalan (m)", "value": 7.0},
                {"field_id": "panjang", "label": "Panjang Jalan (m)", "value": 100.0},
                {"field_id": "tebal", "label": "Tebal Aspal (cm)", "value": 5.0}
            ],
            "volume": 35.0,  # 7*100*(5/100) = 35
            "unit": "m³",
            "price_per_unit": 1200000.0,
            "total_cost": 42000000.0  # 35 * 1200000
        }
        
        return self.run_test("RAB Jalan Aspal Calculation", "POST", "rab/calculate", 200, rab_data)

    def test_get_rab_calculations(self):
        """Test getting all RAB calculations"""
        return self.run_test("Get RAB Calculations", "GET", "rab/calculations", 200)

    def test_create_project_from_rab(self, rab_id):
        """Test creating project from RAB"""
        if not rab_id:
            print("⚠️ Skipping project creation - no RAB ID available")
            return False, {}
            
        project_data = {
            "name": "Test Project Pondasi",
            "description": "Project created from RAB test",
            "rab_id": rab_id
        }
        
        return self.run_test("Create Project from RAB", "POST", "rab/projects", 200, project_data)

    def test_get_projects(self):
        """Test getting all projects"""
        return self.run_test("Get Projects", "GET", "rab/projects", 200)

    def test_bom_seed_data(self):
        """Test seeding BOM data"""
        return self.run_test("Seed BOM Data", "POST", "bom/seed-data", 200)

    def test_get_bom_materials(self):
        """Test getting all BOM materials"""
        return self.run_test("Get BOM Materials", "GET", "bom/materials", 200)

    def test_get_bom_materials_by_category(self):
        """Test getting BOM materials by category"""
        categories = ["Semen", "Agregat", "Besi", "Cat"]
        
        for category in categories:
            success, response = self.run_test(
                f"Get BOM Materials - {category}", 
                "GET", 
                f"bom/materials/category/{category}", 
                200
            )
            if success and len(response) > 0:
                print(f"   Found {len(response)} materials in {category} category")

    def test_chat_message_rab(self):
        """Test chat with RAB-related query"""
        chat_data = {
            "user_query": "Bagaimana cara hitung pondasi?"
        }
        
        success, response = self.run_test("Chat RAB Query", "POST", "chat/message", 200, chat_data)
        
        if success:
            detected_category = response.get('detected_category', '')
            if detected_category == 'rab':
                print(f"✅ Correctly detected RAB category")
            else:
                print(f"⚠️ Expected 'rab' category, got '{detected_category}'")
                
        return success, response

    def test_chat_message_bom(self):
        """Test chat with BOM-related query"""
        chat_data = {
            "user_query": "Info material semen dan besi"
        }
        
        success, response = self.run_test("Chat BOM Query", "POST", "chat/message", 200, chat_data)
        
        if success:
            detected_category = response.get('detected_category', '')
            if detected_category == 'bom':
                print(f"✅ Correctly detected BOM category")
            else:
                print(f"⚠️ Expected 'bom' category, got '{detected_category}'")
                
        return success, response

    def test_chat_history(self):
        """Test getting chat history"""
        return self.run_test("Get Chat History", "GET", "chat/history", 200)

def main():
    print("🏗️ RancangBangun API Testing Suite")
    print("=" * 50)
    
    tester = RancangBangunAPITester()
    
    # Test API root
    tester.test_root_endpoint()
    
    # Test RAB Calculator
    print("\n📊 Testing RAB Calculator...")
    success_pondasi, rab_response = tester.test_rab_calculation_pondasi()
    tester.test_rab_calculation_jalan_aspal()
    tester.test_get_rab_calculations()
    
    # Test project creation if RAB was successful
    rab_id = rab_response.get('id') if success_pondasi else None
    tester.test_create_project_from_rab(rab_id)
    tester.test_get_projects()
    
    # Test Smart BOM
    print("\n📦 Testing Smart BOM...")
    tester.test_bom_seed_data()
    tester.test_get_bom_materials()
    tester.test_get_bom_materials_by_category()
    
    # Test Chatbot
    print("\n🤖 Testing Chatbot...")
    tester.test_chat_message_rab()
    tester.test_chat_message_bom()
    tester.test_chat_history()
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for test in tester.failed_tests:
            error_msg = test.get('error', f"Expected {test.get('expected')}, got {test.get('actual')}")
            print(f"   - {test['name']}: {error_msg}")
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"\n🎯 Success Rate: {success_rate:.1f}%")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())