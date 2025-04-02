document.getElementById("validate").addEventListener("click", () => {
    document.getElementById("validateform").style.display = "block";
});

document.getElementById("validateform").addEventListener("submit", async (event) => {
    event.preventDefault();
    const eventId = document.getElementById("validateinput").value;
    const adminId = "620b24d1-db42-4347-aaa3-029fbc69a5c6"; // Replace with the actual admin UUID

    if (!eventId) {
        alert("Please enter an event ID.");
        return;
    }
  
    try {
        const req = new Request(
            `http://localhost:5500/api/SocialButterfly/admin/events/${eventId}/validate`,
            {
                method: "POST",
                headers: new Headers({ adminId: "adminId" })
            }
        );

        const res = await fetch(req);
        if (res.status !== 200) {
            throw new Error(`Error: ${res.status}`);
        }

        const result = await res.json();
        alert(`Event ID ${result.event.id} validated successfully!`);
    } catch (error) {
        console.error("Validation failed:", error);
        alert("Failed to validate event. Check console for details.");
    }
});

// Hide form initially
document.getElementById("validateform").style.display = "none";
