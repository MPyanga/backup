
          // Get necessary elements
            const hamburgerButton = document.getElementById("hamburger_icon");
            const navLinks = document.getElementById("navlinks");
            const icon = hamburgerButton.querySelector("i"); // Use optional chaining to prevent errors
            const signOutButton = document.getElementById("signout");
            const loginButton = document.getElementById("loginbutton");
            const dropdown = document.getElementById("dropdown");
            const modal = document.getElementById("loginModal");
            const closeModalBtn = document.getElementById("closeModalBtn");
            const loader = document.getElementById("loader");
            const errorMessage = document.getElementById("errorMessage");
            const createModal = document.getElementById("createModal");
            const loginAccount = document.getElementById("loginAccount");
            const createAccountBtn = document.getElementById("Create");
            const closeeventmodal = document.getElementById("closeeventmodal");
            const submitEvent = document.getElementById("submitEvent");
            // Navbar toggle
            hamburgerButton.addEventListener("click", () => {
                navLinks.classList.toggle("show");
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            });
            
            // Handle sign out
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
                    localStorage.removeItem("userEmail");
                    window.location.href = document.getElementById("default").href;
                }, 2000);
            
            });
            
            // Handle login button appearance
            if (!localStorage.getItem("isLoggedIn") || localStorage.getItem("isLoggedIn") === "false") {
                loginButton.innerHTML = "LOGIN";
                loginButton.style.width = "7rem";
                loginButton.style.backgroundColor = "transparent";
            
                loginButton.addEventListener("click", function () {
                    dropdown.style.display = "none";
                    modal.style.display = "flex";

                });
            }
            function closeModal() {
                modal.style.display = "none";
                eventmodal.style.display = "none"
                document.getElementById("createModal").style.display = "none";
                document.getElementById("loginAccount").style.display = "flex";
            }
            function eventcloseModal() {
                eventmodal.style.display = "none"
            }
            
            if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
            if (closeeventmodal) closeeventmodal.addEventListener("click", eventcloseModal);
            

            
            // Close modal when clicking outside
            window.addEventListener("click", (event) => {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            });
       
            // Handle link redirection
            // Function to handle the link click event
    function handleLinkClick(event) {
    // Check if the user is logged in
    if (!localStorage.getItem("isLoggedIn") || localStorage.getItem("isLoggedIn") === "false") {
        // Prevent navigation
        event.preventDefault();
        
        // Show the modal if not logged in
        modal.style.display = "flex";
    }
}

// Get all links and attach event listeners
const links = [
    { elementId: "about" },
    { elementId: "review" },
    { elementId: "event" },
    { elementId: "createEvent" },
    { elementId: "gathering" },
    { elementId: "joinevent" },
    { elementId: "ourstory" },
    { elementId: "sharereview" },


];

links.forEach(({ elementId }) => {
    const element = document.getElementById(elementId);
    if (element) {
        // Attach an event listener to each link
        element.addEventListener("click", handleLinkClick);
    }
});

            const API_URL = "https://demo-api-skills.vercel.app/api/SocialButterfly/users";
            const group = "admin";
            // Handle login form submission
            document.getElementById("loginform").addEventListener("submit", function (event) {
                event.preventDefault();
                const username = document.getElementById("username").value.trim();
                const password = document.getElementById("password").value.trim();
                let storedUsers = JSON.parse(localStorage.getItem("users")) || {};
            
                axios.get(API_URL)
                .then(response => {
                    const users = response.data;
                    const user = users.find(user => user.email === username );
                    if (user ) {
                        Swal.fire({
                            title: "Login Successful!",
                            text: `Welcome, ${username.split("@")[0]}!`,
                            icon: "success",
                            timer: 1000,
                            showConfirmButton: false,
                        });
                        
                        modal.style.display = "none";
                        localStorage.setItem("isLoggedIn", "true");
                        localStorage.setItem("userEmail", user.email);
                        // loader.style.display ="flex";

            
                        setTimeout(() => {
                            window.location.href = document.getElementById("default").href;
                        }, 3000);
                
                        return;
                    }
                    
                    if(username == "admin" && password == '123'){
                        loader.style.display ="flex";
                        modal.style.display = "none";
                        localStorage.setItem("isLoggedIn", "true");
                        
                        setTimeout(() => {
                            window.location.href = document.getElementById("admin").href;
                        }, 2000);
            
                    } else {
                        errorMessage.style.display = "flex";
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                });
            });
            
            // // Handle account creation (sign-up flow)
            createAccountBtn.addEventListener("click", () => {
                createModal.style.display = "block";
                loginAccount.style.display = "none";
            });
            
            document.getElementById("createform").addEventListener("submit", function (event) {
                event.preventDefault();
            
                const fname = document.getElementById("fname").value;
                const lname = document.getElementById("Lname").value;
                const email = document.getElementById("createEmail").value;
                const password = document.getElementById("createPassword").value;
                const confirmPassword = document.getElementById("confirmPassword").value;
                const errorMessage = document.getElementById("errorMessage");
            
                // Validate input fields
                axios.get(API_URL)
                    .then(response => {
                        const users = response.data;
                        const user = users.find(user => user.email === email);
                        if (user) {
                            Swal.fire({
                                title: "Email Already Registered",
                                text: "This email is already in use. Please use a different email or log in.",
                                icon: "error",
                                timer: 3000,
                                showConfirmButton: false
                            });
                            return;
                        }
            
                        // Validate password match
                        if (password !== confirmPassword) {
                            alert("Passwords do not match.");
                            return;
                        }
            
                        // Hide error message if validation passes
                        errorMessage.style.display = "none";
            
                        // Create user object
                        const userData = {
                            name: `${fname} ${lname}`,
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
            
                                // Store user ID in localStorage
                                localStorage.setItem("isLoggedIn", "true");
                                localStorage.setItem("userEmail", response.data.email); // Store the newly created user's ID
            
                                setTimeout(() => {
                                    window.location.href = document.getElementById("default").href;
                                }, 2000);
                            })
                            .catch(error => {
                                errorMessage.textContent = "Error creating account. Please try again.";
                                errorMessage.style.display = "block";
                                console.error("Error:", error);
                            });
                    })
                    .catch(error => {
                        console.error("Error fetching users:", error);
                    });
            });
            

            function checkAccountStatus() {
                const loggedInUserEmail = localStorage.getItem("userEmail"); // Get current user ID
            
                if (!loggedInUserEmail) return; // If not logged in, exit function
            
                axios.get(`${API_URL}/login/${loggedInUserEmail}`)
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
                        localStorage.removeItem("loggedInUserEmail");
                        sessionStorage.clear();
            
                        // Redirect to login page
                        setTimeout(() => {
                            window.location.href = document.getElementById("default").href; // Change this to your login page
                            localStorage.setItem("isLoggedIn", "false");
                            localStorage.setItem("userEmail", "");

                        }, 3000);
                    });
            }
            
            // Check every 10 seconds if the account still exists
            setInterval(checkAccountStatus, 10000);
            
            document.getElementById("back").addEventListener("click", () => {
                createModal.style.display = "none";
                loginAccount.style.display = "flex";
            });

            document.getElementById("createEvent").addEventListener("click", () => {
                document.getElementById("eventmodal").style.display = "flex";
            });


            submitEvent.addEventListener("click", function () {
               document.getElementById("createEventform").style.display = "none";
               document.getElementById("confirmationContainer").style.display = "flex";

                const eventTitle = document.getElementById("eventTitle").value;
                const eventDescription = document.getElementById("eventDescription").value;
                const eventDate = document.getElementById("eventDate").value;
                const eventLocation = document.getElementById("eventLocation").value;
                const eventCategory = document.getElementById("eventCategory").value;
                const eventSubmittedBy = document.getElementById("eventSubmittedBy").value;
        
                confirmationContainer.innerHTML = `
                    <h3>Confirm Event Details</h3>
                    <p><strong>Title:</strong> ${eventTitle}</p>
                    <p><strong>Description:</strong> ${eventDescription}</p>
                    <p><strong>Date:</strong> ${eventDate}</p>
                    <p><strong>Location:</strong> ${eventLocation}</p>
                    <p><strong>Category:</strong> ${eventCategory}</p>
                    <p><strong>Submitted By:</strong> ${eventSubmittedBy}</p>
                `;
            });

            document.getElementById("confirmationContainer").addEventListener("submit", function (event) {
                event.preventDefault();
                    
              
            });
            document.getElementById("page1").addEventListener("click", function () {
                document.getElementById("createEventform").style.display = "flex";
                document.getElementById("confirmationContainer").style.display = "none";
             });