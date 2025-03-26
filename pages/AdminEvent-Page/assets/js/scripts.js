const eventsContainer = document.getElementById("eventsContainer");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("closeModalBtn");
const createEventBtn = document.getElementById("create");
const createmodal = document.getElementById("createmodal");
const editmodal = document.getElementById("editmodal");
const fetchBtn = document.getElementById("fetch");

const API_URL = "https://demo-api-skills.vercel.app/api/SocialButterfly/events/693dc21d-23d4-413f-ae07-257c53a35874";

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

// Create New Event
document.getElementById("createform").addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("eventTitle").value;
    const description = document.getElementById("eventDescription").value;
    const date = document.getElementById("eventDate").value;
    const location = document.getElementById("eventLocation").value;
    const category = document.getElementById("eventCategory").value;
    const submittedBy = document.getElementById("eventSubmittedBy").value;
    const newEvent = { title, description, date, location, category, submittedBy, validated: "true" };

    // const newEvent = { title, description, date, location, category, submittedBy };

    axios.post(API_URL, newEvent)
        .then(response => {
            Swal.fire({ title: "Event Created!", text: "Event added successfully.", icon: "success", timer: 2000, showConfirmButton: false });
            // fetchAllEvents();
            modal.style.display = "none";
            
            console.log("Response:", response);

        })
        .catch(error => {
            console.error("Error creating event:", error);
            console.error("Error Response:", error.response?.data || error.message);
            console.error("Full Error:", error);
            console.log("Sending Event Data:", newEvent);

            Swal.fire({ title: "Error", text: "Failed to create event.", icon: "error" });
        });
});



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
    modal.style.display = "flex";
    createmodal.style.display = "flex";
    editmodal.style.display = "none";


    // Ensure form uses `createUser` when submitting
});

fetchBtn.addEventListener("click", () => {
    fetchAllEvents()

    // Ensure form uses `createUser` when submitting
});

