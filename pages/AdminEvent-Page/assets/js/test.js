
async function validateEvent(eventId) {
  const adminId = "cae5075b-f4d2-4909-a4ca-8edea796a9e5"; // Replace with the actual adminId
  
  if (!eventId) {
    console.error("Event ID is required");
    return;
  }

  try {
    const response = await axios.post(
      `https://demo-api-skills.vercel.app/api/SocialButterfly/admin/events/${eventId}/validate`,
      {}, // POST body is empty for this request
      {
        headers: {
          adminId: adminId, // Include adminId in headers
        }
      }
    );

    console.log("Event validated successfully:", response.data);
    alert(`Event with ID ${response.data.event.id} has been successfully validated.`);
  } catch (error) {
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      console.error("Error:", error.response.data);
      alert(`Error: ${error.response.data.error}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      alert("No response from the server. Please try again later.");
    } else {
      // An error occurred while setting up the request
      console.error("Error setting up request:", error.message);
      alert("An error occurred. Please check the console for details.");
    }
  }
}

// Usage Example:
validateEvent("bc3721de-b126-44ed-a338-085b7f9417e0");
