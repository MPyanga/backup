const API_URL = "https://demo-api-skills.vercel.app/api/EventOrganizer/users";
const group = "admin";

document.getElementById("createform").addEventListener("submit", function (event) {
    event.preventDefault();

    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("Lname").value;
    const email = document.getElementById("createEmail").value;
    const password = document.getElementById("createPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const errorMessage = document.getElementById("errorMessage");
    
    // Validate input fields
    if (!fname || !lname || !email || !password || !confirmPassword) {
        errorMessage.textContent = "All fields are required.";
        errorMessage.style.display = "block";
        return;
    }
    
    // Validate password match
    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match.";
        errorMessage.style.display = "block";
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
    
    // Send POST request to API
    axios.post(API_URL, userData)
        .then(response => {
            alert("Account created successfully!");
            document.getElementById("createform").reset(); // Clear the form
        })
        .catch(error => {
            errorMessage.textContent = "Error creating account. Please try again.";
            errorMessage.style.display = "block";
            console.error("Error:", error);
        });
});
