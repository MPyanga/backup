const API_URL = "https://demo-api-skills.vercel.app/api/SocialButterfly/users";

function checkAccountStatus() {
    const loggedInUserId = localStorage.getItem("userId"); // Get current user ID

    if (!loggedInUserId) return; // If not logged in, exit function

    axios.get(`${API_URL}/${loggedInUserId}`)
        .then(response => {
            console.log("User still exists:", response.data);
        })
        .catch(error => {
            console.error("User not found! Logging out...", error);
            
            Swal.fire({
                title: "Session Expired",
                text: "Your account has been deleted by an admin.",
                icon: "warning",
                timer: 3000,
                showConfirmButton: false
            });

            // Clear session data
            localStorage.removeItem("loggedInUserId");
            sessionStorage.clear();

            // Redirect to login page
            setTimeout(() => {
                window.location.href = document.getElementById("default").href; // Change this to your login page
                localStorage.setItem("isLoggedIn", "false");
                localStorage.setItem("userId", "");

            }, 3000);
        });
}

// Check every 10 seconds if the account still exists
setInterval(checkAccountStatus, 10000);
