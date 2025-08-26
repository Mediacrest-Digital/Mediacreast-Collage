const axios = require("axios");

async function testEmailSend() {
  try {
    const response = await axios.post(
      "https://mediacrestcollege.com/api/send-confirmation",
      {
        fullName: "Test User",
        email: "your-email@example.com",
      }
    );
    console.log("Response:", response.data);
  } catch (error) {
    if (error.response) {
      console.error("Error:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  }
}

testEmailSend();