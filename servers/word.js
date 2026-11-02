// Select HTML Elements
let textInput = document.getElementById("textInput");

let wordCount = document.getElementById("wordCount");
let charCount = document.getElementById("charCount");
let sentenceCount = document.getElementById("sentenceCount");
let paragraphCount = document.getElementById("paragraphCount");

let clearButton = document.getElementById("clearButton");
let copyButton = document.getElementById("copyButton");


// Count Text
function countText() {

    let text = textInput.value;

    // Count characters
    charCount.textContent = text.length;

    // Count words
    let words = text.trim().split(/\s+/).filter(function(word) {
        return word.length > 0;
    });

    wordCount.textContent = words.length;

    // Count sentences
    let sentences = text.trim().split(/[.!?]+/).filter(function(sentence) {
        return sentence.trim().length > 0;
    });

    sentenceCount.textContent = sentences.length;

    // Count paragraphs
    let paragraphs = text.trim().split(/\n+/).filter(function(paragraph) {
        return paragraph.trim().length > 0;
    });

    paragraphCount.textContent = paragraphs.length;
}


// Detect typing
textInput.addEventListener("input", countText);


// Clear Text
clearButton.addEventListener("click", function() {

    textInput.value = "";

    countText();

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
    } catch (error) {
        alert("Unable to copy text. Please check browser permissions.");
    }

});


// Initial Count
countText();