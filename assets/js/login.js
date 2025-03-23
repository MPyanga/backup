
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
        localStorage.removeItem("userId");
        window.location.reload();
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

// Modal close event
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Ensure user storage exists
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify({ admin: "123" }));
}

// Handle link redirection
function handleLinkClick(event, redirectUrl) {
    event.preventDefault();
    if (!localStorage.getItem("isLoggedIn") || localStorage.getItem("isLoggedIn") === "false") {
        modal.style.display = "flex";
    } else {
        window.location.href = redirectUrl;
    }
}

// Get all links and attach event listeners
const links = [
    { elementId: "about", href: "about.html" },
    { elementId: "review", href: "review.html" },
    { elementId: "event", href: "event.html" },
    { elementId: "createEvent", href: "createEvent.html" },
    { elementId: "gathering", href: "gathering.html" },
];

links.forEach(({ elementId, href }) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.addEventListener("click", (event) => handleLinkClick(event, href));
    }
});

const API_URL = "https://demo-api-skills.vercel.app/api/EventOrganizer/users";
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
        const user = users.find(user => user.email === username && user.password === password );
        if (user ) {
            Swal.fire({
                title: "Login Successful!",
                text: `Welcome, ${username.split("@")[0]}!`,
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });
            modal.style.display = "none";
            loader.style.display ="flex";
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userId", user.id);


            setTimeout(() => {
                window.location.href = document.getElementById("default").href;
            }, 2000);
    
            return;
        }
        if(username == "admin" && password == '123'){
            loader.style.display ="flex";
            modal.style.display = "none";
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
