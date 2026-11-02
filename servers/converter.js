// Select HTML Elements
let textInput = document.getElementById("textInput");

let caseButtons = document.querySelectorAll("[data-case]");

let clearButton = document.getElementById("clearButton");
let copyButton = document.getElementById("copyButton");


// Convert Text
caseButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        let text = textInput.value;
        let selectedCase = button.getAttribute("data-case");

        // Uppercase
        if (selectedCase === "upper") {
            textInput.value = text.toUpperCase();
        }

        // Lowercase
        else if (selectedCase === "lower") {
            textInput.value = text.toLowerCase();
        }

        // Title Case
        else if (selectedCase === "title") {

            textInput.value = text.toLowerCase().replace(/\b\w/g, function(letter) {
                return letter.toUpperCase();
            });

        }

        // Sentence Case
        else if (selectedCase === "sentence") {

            textInput.value = text.toLowerCase().replace(
                /(^\s*[a-z]|[.!?]\s+[a-z])/g,
                function(letter) {
                    return letter.toUpperCase();
                }
            );

        }

    });

});


// Clear Text
clearButton.addEventListener("click", function() {

    textInput.value = "";

});


// Copy Text
copyButton.addEventListener("click", async function() {

    if (textInput.value.trim() === "") {
        alert("Please enter some text first!");
        return;
    }

    try {
        await navigator.clipboard.writeText(textInput.value);
        alert("Text copied successfully!");
    }

    catch (error) {
        alert("Unable to copy text. Please check browser permissions.");
    }

});