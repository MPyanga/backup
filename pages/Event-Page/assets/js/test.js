const eventContainer = document.getElementById("eventcontainer");
const closeeventmodal = document.getElementById("closeeventmodal");
const closeReview = document.getElementById("closeReview");
const reviewContainer = document.getElementById("reviewContainer");


eventContainer.addEventListener("click", function (event) {
        document.getElementById("eventmodal").style.display = "flex";
});

function eventcloseModal() {
        eventmodal.style.display = "none";
        reviewContainer.style.display = "none";

    }
    
    if (closeeventmodal) closeeventmodal.addEventListener("click", eventcloseModal);
  

    window.addEventListener("click", (event) => {
        if (event.target === eventmodal) {
            eventmodal.style.display = "none";
            reviewContainer.style.display = "none";
        }
    });

    document.getElementById("reviewBtn").addEventListener("click", function(event) {
        reviewContainer.style.display = "flex";
        document.getElementById("joinBtn").style.display = "none";
    });
    
    closeReview.addEventListener("click", function(event){
        reviewContainer.style.display = "none";
        document.getElementById("joinBtn").style.display = "flex";

        });

