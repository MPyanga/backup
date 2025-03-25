function validateEvent() {
    const eventId = document.getElementById("idinput").value;
    const adminId = "your-admin-id-uuid"; // Replace with the actual admin ID

    // Check if the event ID is provided
    if (!eventId) {
        alert("Please enter an event ID.");
        return;
    }

    // Create the request URL with the event ID
    const url = `https://demo-api-skills.vercel.app//api/SocialButterfly/admin/events/${eventId}/validate`;

    // Prepare headers including the adminId
    const headers = {
        "adminId": adminId,
        "Content-Type": "application/json"
    };

    // Use fetch to send the POST request
    fetch(url, {
        method: "POST",
        headers: headers
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to validate event.");
        }
    })
    .then(data => {
        // Handle successful validation
        if (data.event.validated) {
            alert(`Event with ID ${data.event.id} has been validated successfully.`);
        } else {
            alert("Event validation failed.");
        }
    })
    .catch(error => {
        // Handle errors
        alert(`Error: ${error.message}`);
    });
}

// Event listener for the validate button
document.getElementById("validate").addEventListener("click", validateEvent);
