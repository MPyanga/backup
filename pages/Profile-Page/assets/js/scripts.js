const API_URL = "https://demo-api-skills.vercel.app/api/EventOrganizer/users";
const group = "admin";
let currentUser = {}; // Store user data globally

// Listen for when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("userId");

    if (userId) {
        // Fetch user data based on the user ID
        axios.get(`${API_URL}/${userId}`)
            .then(response => {
                currentUser = response.data; // Store user data globally
                document.getElementById("name").value = currentUser.name || "";
                document.getElementById("email").value = currentUser.email || "";
                document.getElementById("password").value = currentUser.password;
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });

        // Select the input elements and submit button
        const nameInput = document.getElementById("name");
        const passwordInput = document.getElementById("password");
        const confirmPasswordInput = document.getElementById("confirmPassword");
        const submit = document.getElementById("submit");
        const emailInput = document.getElementById("email");
        const deleteProfile = document.getElementById("deleteProfile");


        // Function to update user data
        function updateUser() {
            const updatedUser = {
                name: nameInput.value,
            };

            // Check if username is the same
            if (updatedUser.name === currentUser.name) {
                Swal.fire({
                    title: "Error!",
                    text: "The username cannot be the same as the current one.",
                    icon: "error",
                    timer: 2000,
                    showConfirmButton: false
                });
                return;
            }

            // Perform the PUT request when the submit button is clicked
            axios.put(`${API_URL}/${userId}`, updatedUser)
                .then(response => {
                    console.log("User updated successfully:", response.data);
                    Swal.fire({
                        title: "Update Successful!",
                        text: `Welcome, ${updatedUser.name.split("@")[0]}!`,
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                    });

                    // Update the stored user data
                    currentUser = response.data;
                })
                .catch(error => {
                    console.error("Error updating user data:", error);
                });
        }

        // Only add the event listener ONCE
        submit.addEventListener("click", updateUser);
    }

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
    
    
});





const togglePassword = document.getElementById("unhide");

togglePassword.addEventListener("click", function () {
    if (password.type === "password") {
        password.type = "text";
        unhide.style.color = "black";
    } else {
        password.type = "password";
        unhide.style.color = "rgb(65, 65, 65)";

    }
});
