// Get necessary elements
const hamburgerButton = document.getElementById("hamburger_icon"); //check
const navLinks = document.getElementById("navlinks"); //check
const icon = hamburgerButton.querySelector("i"); // Use optional chaining to prevent errors //check
const signOutButton = document.getElementById("signout");//check
const loginButton = document.getElementById("loginbutton");//check
const dropdown = document.getElementById("dropdown");//check
const modal = document.getElementById("loginModal"); //check
const closeModalBtn = document.getElementById("closeModalBtn"); //check
const loader = document.getElementById("loader");
const errorMessage = document.getElementById("errorMessage"); //check
const createModal = document.getElementById("createModal"); //check
const loginAccount = document.getElementById("loginAccount"); //check
const createAccountBtn = document.getElementById("Create"); //check
const closeeventmodal = document.getElementById("closeeventmodal"); ///check
const submitEvent = document.getElementById("submitEvent"); //check

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

function clearEventForm() {
    document.getElementById("eventTitle").value = "";
    document.getElementById("eventDescription").value = "";
    document.getElementById("eventDate").value = "";
    document.getElementById("eventLocation").value = "";
    document.getElementById("eventCategory").value = "";
    document.getElementById("categoryOption").value = "";
}

function eventcloseModal() {
    eventmodal.style.display = "none";
    clearEventForm();
}

if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
if (closeeventmodal) closeeventmodal.addEventListener("click", eventcloseModal);


// Close modal when clicking outside
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
    if (event.target === eventmodal) {
        eventmodal.style.display = "none";
    }
});

// Function to handle the link click event
function handleLinkClick(event) {
    if (!localStorage.getItem("isLoggedIn") || localStorage.getItem("isLoggedIn") === "false") {
    event.preventDefault();// Prevent navigation
    // Show the modal if not logged in
    modal.style.display = "flex";
    }
}

// -------------------------------------------------------------------

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

//----------------------------------------------------
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
        const user = users.find(user => user.email === username && user.id );
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
            localStorage.setItem("userId", user.id);

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

// ----------------------------------------------------------------------------------------------

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
setInterval(checkAccountStatus, 10000);

// ------------------------------------------------------------------------
// Check every 10 seconds if the account still exists

document.getElementById("back").addEventListener("click", () => {
    createModal.style.display = "none";
    loginAccount.style.display = "flex";
});

// -----------------------------------------------------------------------------------------
const confirmationContainer = document.getElementById("confirmationContainer");
const btnHolder = document.getElementById("btnHolder");
const formBtn = document.getElementById("formBtn");
const confirmationBtn =  document.getElementById("confirmationBtn");
const form = document.getElementById("createEventform");
const confirmationContent = document.getElementById("confirmationContent");

    document.getElementById("createEvent").addEventListener("click", () => {
        document.getElementById("eventmodal").style.display = "flex";
        createEventform.style.display = "flex";
        submitEvent.style.display = "flex";
        form.style.display = "flex";
        confirmationContainer.style.display = "none";
        btnHolder.style.display = "none";
        formBtn.style.backgroundColor= "rgb(205, 0, 130)";
        formBtn.style.color= "whitesmoke";
        formBtn.style.height= "2.3rem";
        confirmationBtn.style.backgroundColor= "whitesmoke";
        confirmationBtn.style.color= "rgb(205, 0, 130)";
        confirmationBtn.style.height= "1.7rem";
    });


submitEvent.addEventListener("click", function () {
    const eventTitle = document.getElementById("eventTitle").value;
    const eventDescription = document.getElementById("eventDescription").value;
    const eventDate = document.getElementById("eventDate").value;
    const eventLocation = document.getElementById("eventLocation").value;
    let eventCategory = document.getElementById("eventCategory").value;
    const categoryOption = document.getElementById("categoryOption").value;
    const eventSubmittedBy = localStorage.getItem("userId");
    if (!validateForm()) {
        return; // Exit if validation fails
    }
    // If eventCategory is empty, use eventOption
    if (!eventCategory) {
    eventCategory = categoryOption;
    }
// Mapping categories to Font Awesome icons
    const categoryIcons = {
        "Music": "fa-music",
        "Sports": "fa-football-ball",
        "Education": "fa-graduation-cap",
        "Art": "fa-palette",
        "Gaming": "fa-gamepad",
        "Wellness": "fa-spa",
        "Outdoor & Travel": "fa-mountain-sun",
        "Community & Charity": "fa-hands-helping",
        "Business & Networking": "fa-briefcase"
    };

    // Get the corresponding icon class
    let categoryIcon = categoryIcons[eventCategory] || "fa-solid"; // Default icon if category isn't listed

    // Display event details dynamically

    confirmationContent.innerHTML = `
    <div class="left">
        <i class="fa-solid ${categoryIcon}"></i>
    </div>
    <div class="right">
        <div class="content">
            <div class="title">
                <b>TITLE</b>
                <h1>${eventTitle}</h1>
            </div>
            <div class="description">
                <b>DESCRIPTION</b>
                <p>${eventDescription}</p>
            </div>
            <div class="date">
                <b>DATE</b>
                <p><i class="fa-solid fa-calendar"></i>${eventDate}</p>
            </div>
            <div class="location">
                <b>LOCATION</b>
                <p><i class="fa-solid fa-location-dot"></i>${eventLocation}</p>
            </div>
            <div class="category">
                <b>CATEGORY</b>
                <p>${eventCategory}</p>
            </div>
        </div>
        <div class="host">
            <p><i class = "fa-solid fa-user"></i>Hosted By: matthewyanga00@gmail.com</p>
        </div>
    </div>
    `;
    form.style.display = "none";
    confirmationContainer.style.display = "flex";
    submitEvent.style.display = "none";
    btnHolder.style.display = "flex";
    formBtn.style.backgroundColor= "whitesmoke";
    formBtn.style.color= "rgb(205, 0, 130)";
    formBtn.style.height= "1.7rem";
    confirmationBtn.style.backgroundColor= "rgb(205, 0, 130)";
    confirmationBtn.style.height= "2.3rem";
    confirmationBtn.style.color= "whitesmoke";

    function validateForm() {
        if (!eventCategory) {
            eventCategory = categoryOption;
            }

        if (!eventTitle || !eventDescription || !eventDate || !eventLocation || !eventCategory) {
            Swal.fire({ title: "Error", text: "Please fill out all the fields before submitting.", icon: "error" });
            return false;
        }
        return true;
    }

    const newEvent = { title: eventTitle, description: eventDescription, date: eventDate, location: eventLocation, category: eventCategory, submittedBy: eventSubmittedBy };

    const Event_API_URL = "https://demo-api-skills.vercel.app/api/SocialButterfly/events";
    document.getElementById("confirmEvent").addEventListener("click", function () {
        axios.post(Event_API_URL, newEvent)
        .then(response => {
            Swal.fire({ title: "Event Created!", text: "Your event has been submitted successfully. Please wait for admin approval.", icon: "success", timer: 3000, showConfirmButton: false });
            eventmodal.style.display = "none";
            
            console.log("Response:", response);
        })
        .catch(error => {
            console.error("Error creating event:", error);
            console.error("Error Response:", error.response?.data || error.message);
            console.error("Full Error:", error);
            console.log("Sending Event Data:", newEvent);
    
            Swal.fire({ title: "Error", text: "Failed to create event.", icon: "error" });
        })
    });
});


document.getElementById("backConfirmation").addEventListener("click", function () {
    document.getElementById("createEventform").style.display = "flex";
    document.getElementById("confirmationContainer").style.display = "none";
    submitEvent.style.display = "flex";
    btnHolder.style.display = "none";
    formBtn.style.backgroundColor= "rgb(205, 0, 130)";
    formBtn.style.color= "whitesmoke";
    formBtn.style.height= "2.3rem";
    confirmationBtn.style.backgroundColor= "whitesmoke";
    confirmationBtn.style.color = "rgb(205, 0, 130)";
    confirmationBtn.style.height= "1.7rem";

    });

    document.getElementById("categoryOption").addEventListener("change", function() {
    var inputField = document.getElementById("eventCategory");
    
    if (this.value === "other") {
        inputField.style.display = "flex";
        categoryOption.style.width = "5rem";

        // Show input
    } else {
        inputField.style.display = "none";
        categoryOption.style.width = "11rem";
    }
});

// -----------------------------------------------------------------------------------------
