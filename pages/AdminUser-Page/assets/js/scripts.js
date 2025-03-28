const hamburgerButton = document.getElementById('hamburger_icon');
const navLinks = document.getElementById('navlinks');
const icon = hamburgerButton.querySelector('i');
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("closeModalBtn");
const usersContainer = document.getElementById("usersContainer");
const createAccountBtn = document.getElementById("Create");
const initial = document.getElementById("initial");
const signOutButton = document.getElementById("signout")
let usersData = []; // Store fetched users globally

const API_URL = "https://demo-api-skills.vercel.app/api/SocialButterfly/users";
window.addEventListener("load", fetchAllUsers);
// Toggle Navbar
hamburgerButton.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    if (navLinks.classList.contains('show')) {
        icon.classList.replace('fa-bars', 'fa-xmark');
    } else {
        icon.classList.replace('fa-xmark', 'fa-bars');
    }
});

// Sign Out Function
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
        window.location.href = document.getElementById("default").href;
    }, 2000);

});
// Fetch Users from API
function fetchAllUsers() {
    axios.get(API_URL)
        .then(response => {
            usersData = response.data;
            console.log("Fetched users:", usersData);
            displayUsers(usersData);

            initial.style.display = "none";
        })
        .catch(error => {
            console.error("Error fetching users:", error);
            initial.style.display = "flex";
            Swal.fire({
                title: "Error",
                text: "Failed to fetch users. Please try again later.",
                icon: "error",
            });
        });
}

function displayUsers(users) {
    usersContainer.innerHTML = ''; // Clear previous content
    usersContainer.style.display = "flex";
    if (users.length > 0) {
        users.forEach(user => {
            const userContainer = document.createElement('div');
            userContainer.classList.add('user-container');
            userContainer.dataset.userEmail = user.email; // Store user ID

            userContainer.innerHTML = `
                <div class="container">
                    <div class="top"><i class="fa-solid fa-user"></i></div>
                    <div class="bottom">
                        <div>
                            <div class="left"><i class="fa-solid fa-id-card"></i></div>
                            <div class="right"><p>${user.id || "N/A"}</p></div>
                        </div>
                        <div>
                            <div class="left"><i class="fa-solid fa-user"></i></div>
                            <div class="right"><p>${user.name || "N/A"}</p></div>
                        </div>
                        <div>
                            <div class="left"><i class="fa-solid fa-envelope"></i></div>
                            <div class="right"><p>${user.email || "N/A"}</p></div>
                        </div>
                    </div>
                </div>
            `;
            usersContainer.appendChild(userContainer);
        });
    } else {
        Swal.fire({
            title: "No Users Found",
            text: "There are no users to display.",
            icon: "warning",
        });
        initial.style.display = "flex";

    }
}

// Fetch Users on Button Click
document.getElementById("fetch").addEventListener("click", fetchAllUsers);

// Search Functionality
document.getElementById("searchForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload
    let searchInput = document.getElementById("searchInput").value.toLowerCase().trim();

    let filteredUsers = usersData.filter(user =>
        user.id.toString().includes(searchInput) ||  // Search by ID
        user.name.toLowerCase().includes(searchInput) ||
        user.email.toLowerCase().includes(searchInput)
    );
    displayUsers(filteredUsers);

});

// Handle Click Event for User Details
usersContainer.addEventListener("click", function (event) {
    let userContainer = event.target.closest(".user-container");

    if (userContainer) {
        let userEmail= userContainer.dataset.userEmail;

        axios.get(`${API_URL}/login/${userEmail}`)
            .then(response => {
                let user = response.data;

                // Populate modal inputs
                document.getElementById("id").value = user.id || "N/A";
                document.getElementById("name").value = user.name || "N/A";
                document.getElementById("email").value = user.email || "N/A";

                modal.style.display = "flex";
                document.getElementById("createmodal").style.display = "none";
                 document.getElementById("editmodal").style.display = "flex"; // Show modal
                fetchAllUsers();
                })
            .catch(error => {
                console.error("Error fetching user details:", error);
            });
    }
});

// Function to update user data
document.getElementById("editform").addEventListener("submit", function (event) {
    event.preventDefault();

    const userId = document.getElementById("id").value;
    const nameInput = document.getElementById("name").value;
    const emailInput = document.getElementById("email").value;

    const updatedUser = {
        email: emailInput,
        name: nameInput,
    };

    axios.put(`${API_URL}/${userId}`, updatedUser)
        .then(response => {
            console.log("User updated successfully:", response.data);
            Swal.fire({
                title: "Update Successful!",
                text: `Welcome, ${nameInput.split("@")[0]}!`,
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });
            fetchAllUsers(); // Fetch users again

            modal.style.display = "none"; // Close modal after update
        })
        .catch(error => {
            console.error("Error updating user data:", error);
            Swal.fire({
                title: "Update Failed",
                text: "There was an error updating the user.",
                icon: "error",
            });
        });
});

// Delete Profile functionality
document.getElementById('delete').addEventListener("click", function () {
    const userId = document.getElementById("id").value; // Ensure we get the user ID from the modal
    
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
                    fetchAllUsers(); // Fetch users again

                    // Clear user data from local storag
                    modal.style.display = "none"
                    // Redirect to login or homepage
                    setTimeout(() => {
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

//      // // Handle account creation (sign-up flow)
// createAccountBtn.addEventListener("click", () => {
//         modal.style.display = "flex";
//     });
// Close modal when clicking outside or pressing close button
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});


// Function to Create a New User
document.getElementById("createform").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("createname").value;
    const email = document.getElementById("createemail").value;
    const password = document.getElementById("createpassword").value;
    const confirmPassword = document.getElementById("confirmpassword").value;
    // const errorMessage = document.getElementById("errorMessage");

    // Validate input fields
    axios.get(API_URL)
        .then(response => {
            const users = response.data;
            const user = users.find(user => user.email === email);
            if (user) {
                alert("Account already exists!");
                return;
            }

            // Validate password match
            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            // Hide error message if validation passes
            // errorMessage.style.display = "none";

            // Create user object
            const userData = {
                name,
                email,
                password
            };

            // Send POST request to API to create the user
            axios.post(API_URL, userData)
                .then(response => {
                    Swal.fire({
                        title: "Created!",
                        text: "You have successfully created an account.",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                    });

                    modal.style.display = "none";
                    fetchAllUsers();

                })
                .catch(error => {
                    console.error("Error:", error);
                });
        })
        .catch(error => {
            console.error("Error fetching users:", error);
        });
});

// Event listener for opening the modal for new users
createAccountBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    document.getElementById("createmodal").style.display = "flex";
    document.getElementById("editmodal").style.display = "none";


    // Ensure form uses `createUser` when submitting
});
