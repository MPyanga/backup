const eventsContainer = document.getElementById("eventsContainer");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("closeeventmodal");
const createEventBtn = document.getElementById("create");
const createmodal = document.getElementById("createmodal");
const editmodal = document.getElementById("editmodal");
const fetchBtn = document.getElementById("fetch");
const signOutButton = document.getElementById("signout")

const API_URL = "https://demo-api-skills.vercel.app/api/SocialButterfly/events";

let eventsData = [];

// Fetch All Events
function fetchAllEvents() {
    axios.get(API_URL)
        .then(response => {
            eventsData = response.data;
            displayEvents(eventsData);
        })
        .catch(error => {
            console.error("Error fetching events:", error);
            Swal.fire({ title: "Error", text: "Failed to fetch events.", icon: "error" });
        });
}

// Display Events
function displayEvents(events) {
    eventsContainer.innerHTML = '';
    eventsContainer.style.display = "flex";
    if (events.length > 0) {
        events.forEach(event => {
            const eventContainer = document.createElement('div');
            eventContainer.classList.add('event-container');
            eventContainer.dataset.eventId = event.id;

            eventContainer.innerHTML = `
                <div class="container">
                    <h3>${event.title || "N/A"}</h3>
                    <p>${event.description || "No description"}</p>
                    <p><strong>Date:</strong> ${event.date || "N/A"}</p>
                    <p><strong>Location:</strong> ${event.location || "N/A"}</p>
                    <button onclick="editEvent('${event.id}')">Edit</button>
                    <button onclick="deleteEvent('${event.id}')">Delete</button>
                </div>
            `;
            eventsContainer.appendChild(eventContainer);
        });
    } else {
        Swal.fire({ title: "No Events Found", text: "No events to display.", icon: "warning" });
    }
}

const confirmationContainer = document.getElementById("confirmationContainer");
const btnHolder = document.getElementById("btnHolder");
const formBtn = document.getElementById("formBtn");
const confirmationBtn =  document.getElementById("confirmationBtn");
const form = document.getElementById("createEventform");
const confirmationContent = document.getElementById("confirmationContent");

    document.getElementById("createevent").addEventListener("click", () => {
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

// Create New Event
// // Edit Event
// function editEvent(eventId) {
//     axios.get(`${API_URL}/${eventId}`)
//         .then(response => {
//             const event = response.data;
//             document.getElementById("eventId").value = event.id;
//             document.getElementById("eventTitle").value = event.title;
//             document.getElementById("eventDescription").value = event.description;
//             document.getElementById("eventDate").value = event.date;
//             document.getElementById("eventLocation").value = event.location;
//             modal.style.display = "flex";
//         })
//         .catch(error => {
//             console.error("Error fetching event details:", error);
//         });
// }

// // Update Event
// document.getElementById("editform").addEventListener("submit", function (event) {
//     event.preventDefault();

//     const eventId = document.getElementById("eventId").value;
//     const title = document.getElementById("eventTitle").value;
//     const description = document.getElementById("eventDescription").value;
//     const date = document.getElementById("eventDate").value;
//     const location = document.getElementById("eventLocation").value;

//     const updatedEvent = { title, description, date, location };

//     axios.put(`${API_URL}/${eventId}`, updatedEvent)
//         .then(response => {
//             Swal.fire({ title: "Event Updated!", text: "Changes saved successfully.", icon: "success", timer: 2000, showConfirmButton: false });
//             fetchAllEvents();
//             modal.style.display = "none";
//         })
//         .catch(error => {
//             console.error("Error updating event:", error);
//             Swal.fire({ title: "Error", text: "Failed to update event.", icon: "error" });
//         });
// });

// // Delete Event
// function deleteEvent(eventId) {
//     Swal.fire({
//         title: "Are you sure?",
//         text: "This action cannot be undone!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#d33",
//         cancelButtonColor: "#3085d6",
//         confirmButtonText: "Yes, delete it!"
//     }).then((result) => {
//         if (result.isConfirmed) {
//             axios.delete(`${API_URL}/${eventId}`)
//                 .then(response => {
//                     Swal.fire({ title: "Deleted!", text: "Event removed.", icon: "success", timer: 2000, showConfirmButton: false });
//                     fetchAllEvents();
//                 })
//                 .catch(error => {
//                     console.error("Error deleting event:", error);
//                     Swal.fire({ title: "Error", text: "Failed to delete event.", icon: "error" });
//                 });
//         }
//     });
// }

// Close Modal
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Fetch all events on page load
window.addEventListener("load", fetchAllEvents);

createEventBtn.addEventListener("click", () => {
    document.getElementById("createEventform").style.display = "flex";
    document.getElementById("confirmationContainer").style.display = "none";


    // Ensure form uses `createUser` when submitting
});

fetchBtn.addEventListener("click", () => {
    fetchAllEvents()

    // Ensure form uses `createUser` when submitting
});


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
        window.location.href = document.getElementById("default").href;
    }, 2000);

});
// Fetch Users



const categoryInput = document.getElementById("category");
const categorySelect = document.getElementById("catgegoryOption");

    categorySelect.addEventListener("change", function () {
        if (this.value === "other") {
            // Prompt user to enter custom category
            categoryInput.style.display = "flex";
            categorySelect.style.width = "7rem";

        } else {
            categoryInput.value = this.value;
            // Set input value from selection
        }
    });