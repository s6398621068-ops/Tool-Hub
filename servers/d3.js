// Select HTML Elements
let searchInput = document.getElementById("searchInput");
let toolCards = document.querySelectorAll(".tool-card");
let toolsContainer = document.getElementById("toolsContainer");

// Search Tools
searchInput.addEventListener("input", function () {

    let searchValue = searchInput.value.toLowerCase();
    let visibleTools = 0;

    toolCards.forEach(function (card) {

        let toolName = card.querySelector("h3").textContent.toLowerCase();

        if (toolName.includes(searchValue)) {
            card.style.display = "block";
            visibleTools++;
        } else {
            card.style.display = "none";
        }

    });

    // Show message if no tool is found
    let noResult = document.getElementById("noResult");

    if (visibleTools === 0) {

        if (!noResult) {
            noResult = document.createElement("p");
            noResult.id = "noResult";
            noResult.textContent = "No tools found!";
            toolsContainer.appendChild(noResult);
        }

    } else {

        if (noResult) {
            noResult.remove();
        }

    }

});


// Open Tool Buttons
toolCards.forEach(function(card) {

    let button = card.querySelector("button");

    button.addEventListener("click", function() {

        let toolName = card.querySelector("h3").textContent;

        if (toolName === "Word Counter") {
            window.location.href = "/word-counter";
        }

        else if (toolName === "Calculator") {
            window.location.href = "/calculator";
        }

        else if (toolName === "Text Case Converter") {
            window.location.href = "/converter";
        }

        else if (toolName === "Image Compressor") {
            window.location.href = "/image-compressor";
        }

        else if (toolName === "PDF Merger") {
            window.location.href = "/pdf-merger";
        }
        else if (toolName === "Password Generator") {
            window.location.href = "/password-generator";
        }
        
    });

});
