const API_URL = "https://demo-api-skills.vercel.app/api/EventOrganizer/users";
const group = "admin";

// Listen for when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("userId");

    if (userId) {
        // Fetch user data based on the user ID
        axios.get(`${API_URL}/${userId}`)
            .then(response => {
                const user = response.data;
                document.getElementById("name").value = user.name || "";
                document.getElementById("email").value = user.email || "";
                // Select the input elements and submit button
                const nameInput = document.getElementById("name");
                const passwordInput = document.getElementById("password");
                const confirmPasswordInput = document.getElementById("confirmPassword"); // Confirm password input
                const submit = document.getElementById("submit");
                const deleteProfile = document.getElementById("deleteProfile");

                // Function to update user data
                function updateUser() {
                    const updatedUser = {
                        name: nameInput.value,
                        password: passwordInput.value,
                    };

                    // Validate the inputs just before updating
                    if (nameInput.value === user.name) {
                        // Show error if the username is the same as the current username
                        Swal.fire({
                            title: "Error!",
                            text: "The username cannot be the same as the current one.",
                            icon: "error",
                            timer: 2000,
                            showConfirmButton: false
                        });
                        return; // Prevent the PUT request if the username is the same
                    }

                    if (passwordInput.value !== confirmPasswordInput.value) {
                        // Show error if the password and confirm password do not match
                        Swal.fire({
                            title: "Error!",
                            text: "The passwords do not match.",
                            icon: "error",
                            timer: 2000,
                            showConfirmButton: false
                        });
                        return; // Prevent the PUT request if passwords don't match
                    }

                    // Perform the PUT request when the submit button is clicked
                    axios.put(`${API_URL}/${userId}`, updatedUser)
                        .then(response => {
                            console.log("User updated successfully:", response.data);
                            Swal.fire({
                                title: "Update Successful!",
                                text: `Welcome, ${nameInput.value.split("@")[0]}!`, // Show name part before '@'
                                icon: "success",
                                timer: 2000,
                                showConfirmButton: false,
                            });
                        })
                        .catch(error => {
                            console.error("Error updating user data:", error);
                        });
                }

                // Add event listener for submit button to trigger the update function
                submit.addEventListener("click", updateUser);

                // Delete profile functionality
                deleteProfile.addEventListener("click", () => {
                    Swal.fire({
                        title: "Are you sure?",
                        text: "This action cannot be undone!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#3085d6",
                        confirmButtonText: "Yes, delete it!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Perform the DELETE request
                            axios.delete(`${API_URL}/${userId}`)
                                .then(response => {
                                    console.log("User deleted successfully:", response.data);
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "Your profile has been deleted.",
                                        icon: "success",
                                        timer: 2000,
                                        showConfirmButton: false
                                    });

                                    // Clear user data from local storage
                                    localStorage.removeItem("userId");
                                    localStorage.setItem("isLoggedIn", "false");

                                    // Redirect to login or homepage
                                    setTimeout(() => {
                                        window.location.href = document.getElementById("default").href;
                                    }, 2000);
                                })
                                .catch(error => {
                                    console.error("Error deleting user:", error);
                                    Swal.fire({
                                        title: "Error",
                                        text: "Failed to delete profile. Please try again.",
                                        icon: "error"
                                    });
                                });
                        }
                    });
                });
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }
});

// Sign Out Logic
const signOutButton = document.getElementById("signout");
signOutButton.addEventListener("click", function () {
    Swal.fire({
        title: "Logged Out!",
        text: "You have successfully signed out.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
    });

    setTimeout(() => {
        localStorage.setItem("isLoggedIn", "false");
        localStorage.removeItem("userId");
        window.location.reload();
    }, 2000);
});
