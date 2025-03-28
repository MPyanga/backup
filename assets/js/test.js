



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
          const defaultpage = document.getElementById("default");
          const adminpage = document.getElementById("admin");

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

// Handle login form submission
const API_URL = "https://demo-api-skills.vercel.app/api/SocialButterfly/users/login";

// Handle login form submission
document.getElementById("loginform").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("username").value.trim(); // Assuming username is an email
    const password = document.getElementById("password").value.trim();

    loginUser(email, password);
});

const loginUser = async (email, password) => {
    try {
        // Fetch user details using email
        const response = await axios.get(`${API_URL}/${email}`);
        const user = response.data;

        if (!user) {
            console.error("User not found");
            alert("Invalid email or password");
            return;
        }

        // Check if API returns a password
        if (!user.password) {
            console.error("Password validation is not possible because the API does not return passwords.");
            alert("Password verification is not supported.");
            return;
        }

        // Validate password (Only works if API returns plaintext passwords)
        if (user.password === password) {
            console.log("Login successful:", user);
            localStorage.setItem("authUser", JSON.stringify(user));
            window.location.href = "adminpage.html"; // Redirect to admin page
        } else {
            console.error("Incorrect password");
            alert("Invalid email or password");
        }

    } catch (error) {
        console.error("Login failed:", error.response ? error.response.data : error.message);
    }
};

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
                          alert("Account already exists!");
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
                              localStorage.setItem("userId", response.data.id); // Store the newly created user's ID
          
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
          
          document.getElementById("back").addEventListener("click", () => {
              createModal.style.display = "none";
              loginAccount.style.display = "flex";
          });

          document.getElementById("createEvent").addEventListener("click", () => {
              document.getElementById("eventmodal").style.display = "flex";
          });

