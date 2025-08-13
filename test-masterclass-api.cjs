const fetch = require("node-fetch");

async function testMasterclassEndpoint() {
  console.log("🧪 Testing Masterclass API endpoint...\n");

  const testData = {
    course: "masterclass",
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    phone: "0712345678",
    expectations: "Learning advanced digital marketing strategies",
  };

  try {
    const response = await fetch("http://localhost:8080/api/masterclass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("✅ Masterclass API test successful!");
      console.log("Response:", result);
    } else {
      const error = await response.json();
      console.log("❌ Masterclass API test failed");
      console.log("Error:", error);
    }
  } catch (error) {
    console.log("❌ Network error:", error.message);
    console.log(
      "Make sure the development server is running with: npm run dev",
    );
  }
}

testMasterclassEndpoint();
