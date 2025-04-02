// Get necessary elements
const elements = {
    hamburgerButton: document.getElementById("hamburger_icon"),
    navLinks: document.getElementById("navlinks"),
    icon: document.getElementById("hamburger_icon")?.querySelector("i"),
    signOutButton: document.getElementById("signout"),
    loginButton: document.getElementById("loginbutton"),
    dropdown: document.getElementById("dropdown"),
    modal: document.getElementById("loginModal"),
    closeModalBtn: document.getElementById("closeModalBtn"),
    loader: document.getElementById("loader"),
    errorMessage: document.getElementById("errorMessage"),
    createModal: document.getElementById("createModal"),
    loginAccount: document.getElementById("loginAccount"),
    createAccountBtn: document.getElementById("Create"),
    closeEventModal: document.getElementById("closeeventmodal"),
    submitEvent: document.getElementById("submitEvent"),
    eventModal: document.getElementById("eventmodal"),
    defaultLink: document.getElementById("default"),
    adminLink: document.getElementById("admin"),
    createEventForm: document.getElementById("createEventform"),
    confirmationContainer: document.getElementById("confirmationContainer"),
    btnHolder: document.getElementById("btnHolder"),
    formBtn: document.getElementById("formBtn"),
    confirmationBtn: document.getElementById("confirmationBtn"),
    backConfirmation: document.getElementById("backConfirmation"),
    categoryOption: document.getElementById("categoryOption"),
    eventCategory: document.getElementById("eventCategory"),
};

// Navbar toggle
elements.hamburgerButton?.addEventListener("click", () => {
    elements.navLinks?.classList.toggle("show");
    elements.icon?.classList.toggle("fa-bars");
    elements.icon?.classList.toggle("fa-xmark");
});

// Handle sign out
elements.signOutButton?.addEventListener("click", () => {
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
        window.location.href = elements.defaultLink?.href;
    }, 2000);
});

// Handle login modal appearance
if (!localStorage.getItem("isLoggedIn") || localStorage.getItem("isLoggedIn") === "false") {
    elements.loginButton.innerHTML = "LOGIN";
    elements.loginButton.style.cssText = "width: 7rem; background-color: transparent;";
    elements.loginButton.addEventListener("click", () => {
        elements.dropdown.style.display = "none";
        elements.modal.style.display = "flex";
    });
}

// Close modal functions
const closeModal = () => {
    elements.modal.style.display = "none";
    elements.eventModal.style.display = "none";
    elements.createModal.style.display = "none";
    elements.loginAccount.style.display = "flex";
};

elements.closeModalBtn?.addEventListener("click", closeModal);
elements.closeEventModal?.addEventListener("click", () => elements.eventModal.style.display = "none");

// Close modal when clicking outside
window.addEventListener("click", (event) => {
    if (event.target === elements.modal) closeModal();
    if (event.target === elements.eventModal) elements.eventModal.style.display = "none";
});

// Redirect prevention when not logged in
document.querySelectorAll("#about, #review, #event, #createEvent, #gathering, #joinevent, #ourstory, #sharereview")
    .forEach(link => link.addEventListener("click", (event) => {
        if (!localStorage.getItem("isLoggedIn") || localStorage.getItem("isLoggedIn") === "false") {
            event.preventDefault();
            elements.modal.style.display = "flex";
        }
    }));

// Account status check function
const checkAccountStatus = () => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) return;

    axios.get(`${API_URL}/login/${userEmail}`).catch(() => {
        Swal.fire({
            title: "Session Expired",
            text: "Your account has been deleted by an admin.",
            icon: "warning",
            timer: 3000,
            showConfirmButton: false,
        });
        localStorage.clear();
        sessionStorage.clear();
        setTimeout(() => window.location.href = elements.defaultLink?.href, 3000);
    });
};
setInterval(checkAccountStatus, 10000);

// Create account modal toggle
elements.createAccountBtn?.addEventListener("click", () => {
    elements.createModal.style.display = "block";
    elements.loginAccount.style.display = "none";
});

elements.backConfirmation?.addEventListener("click", () => {
    elements.createEventForm.style.display = "flex";
    elements.confirmationContainer.style.display = "none";
    elements.submitEvent.style.display = "flex";
});

// Handle category selection
elements.categoryOption?.addEventListener("change", function () {
    elements.eventCategory.style.display = this.value === "other" ? "flex" : "none";
    this.style.width = this.value === "other" ? "5rem" : "11rem";
});
