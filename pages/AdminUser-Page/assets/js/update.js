const API_URL = "https://demo-api-skills.vercel.app/api/EventOrganizer/users";
const userId = "f69065c6-e473-44b8-8b8b-892c0085cafc"; // User ID
const group = "admin";

document.getElementById("editform").addEventListener("submit", function (event) {
    event.preventDefault();

    const newEmailInput = document.getElementById("newEmail").value.trim(); // Get new email
    const submitButton = document.getElementById("submit");
    const modal = document.getElementById("editModal");

    // Validate that new email is provided
    if (!newEmailInput) {
        Swal.fire({
            title: "Error",
            text: "Please enter a new email.",
            icon: "warning",
        });
        return;
    }

    // Prepare updated user object
    const updatedUser = {
        id: "f69065c6-e473-44b8-8b8b-892c0085cafc",
        name: "admin dreepy12121", // Keep name unchanged
        password: "123", // Keep password unchanged
        email: newEmailInput, // Replace old email with new email
    };

    submitButton.disabled = true; // Disable button to prevent multiple clicks

    axios.put(`${API_URL}/${userId}`, updatedUser)
        .then(response => {
            console.log("User email updated successfully:", response.data);
            Swal.fire({
                title: "Update Successful!",
                text: "Your email has been updated.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });

            if (modal) {
                modal.style.display = "none"; // Close modal after update
            }

            document.getElementById("newEmail").value = ""; // Clear input field after update
        })
        .catch(error => {
            console.error("Error updating user email:", error);
            Swal.fire({
                title: "Update Failed",
                text: "There was an error updating the email.",
                icon: "error",
            });
        })
        .finally(() => {
            submitButton.disabled = false; // Re-enable button
        });
});
