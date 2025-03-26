document.getElementById("validate").addEventListener("click", () => {
    document.getElementById("validateform").style.display = "block";
});

document.getElementById("validateform").addEventListener("submit", async (event) => {
    event.preventDefault();
    const eventId = document.getElementById("validateinput").value;
    const adminId = "your-admin-uuid"; // Replace with the actual admin UUID

    if (!eventId) {
        alert("Please enter an event ID.");
        return;
    }

    try {
        const response = await fetch(`https://demo-api-skills.vercel.app/api/SocialButterfly/admin/events/${eventId}/validate/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "adminId": adminId
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        alert(`Event ID ${data.event.id} validated successfully!`);
    } catch (error) {
        console.error("Validation failed:", error);
        alert("Failed to validate event. Check console for details.");
    }
});

// Hide form initially
document.getElementById("validateform").style.display = "none";
