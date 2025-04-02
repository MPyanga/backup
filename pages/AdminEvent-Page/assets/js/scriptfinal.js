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
const closeeventmodal = document.getElementById("closeeventmodal"); ///check
const submitEvent = document.getElementById("submitEvent"); //check
