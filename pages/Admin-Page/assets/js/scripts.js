const usersContainer = document.getElementById("usercontainer");
let usersData = []; // Store fetched users globally
const API_URL = "https://demo-api-skills.vercel.app/api/SocialButterfly/users";


function displayUsers(users) {
    usersContainer.innerHTML = ''; // Clear previous content
    
    if (users.length > 0) {
        const table = document.createElement('table');
        table.classList.add('table');

        // Create table headers
        table.innerHTML = `
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;

        const tbody = table.querySelector('tbody');

        // Populate table rows
        users.forEach((user, index) => {
            const row = document.createElement('tr');
            row.dataset.userId = user.id; // Store user ID
            row.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td>${user.id || "N/A"}</td>
                <td>${user.name || "N/A"}</td>
                <td>${user.email || "N/A"}</td>
            `;
            tbody.appendChild(row);
        });

        usersContainer.appendChild(table);
    } else {
        Swal.fire({
            title: "No Users Found",
            text: "There are no users to display.",
            icon: "warning",
        });
    }
}
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

window.addEventListener("load", fetchAllUsers);
