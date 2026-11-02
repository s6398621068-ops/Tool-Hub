// Select HTML Elements
let passwordOutput = document.getElementById("passwordOutput");

let lengthInput = document.getElementById("length");

let uppercase = document.getElementById("uppercase");
let lowercase = document.getElementById("lowercase");
let numbers = document.getElementById("numbers");
let symbols = document.getElementById("symbols");

let generateButton = document.getElementById("generateButton");
let copyButton = document.getElementById("copyButton");

let passwordMessage = document.getElementById("passwordMessage");


// Generate Secure Random Number
function randomIndex(max) {

    let randomValue = new Uint32Array(1);

    let limit = Math.floor(4294967296 / max) * max;

    do {
        crypto.getRandomValues(randomValue);
    } while (randomValue[0] >= limit);

    return randomValue[0] % max;

}


// Generate Password
generateButton.addEventListener("click", function() {

    let length = Number(lengthInput.value);

    if (!Number.isInteger(length) || length < 4 || length > 64) {
        passwordMessage.textContent = "Password length must be between 4 and 64.";
        return;
    }

    let characterGroups = [];

    if (uppercase.checked) {
        characterGroups.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    }

    if (lowercase.checked) {
        characterGroups.push("abcdefghijklmnopqrstuvwxyz");
    }

    if (numbers.checked) {
        characterGroups.push("0123456789");
    }

    if (symbols.checked) {
        characterGroups.push("!@#$%^&*()_+-=[]{}?");
    }

    if (characterGroups.length === 0) {
        passwordMessage.textContent = "Select at least one character type.";
        return;
    }

    if (length < characterGroups.length) {
        passwordMessage.textContent =
            "Increase the length to include all selected character types.";
        return;
    }

    let allCharacters = characterGroups.join("");

    let password = [];

    // Add at least one character from each selected group
    characterGroups.forEach(function(group) {
        password.push(group[randomIndex(group.length)]);
    });

    // Fill the remaining password length
    while (password.length < length) {
        password.push(allCharacters[randomIndex(allCharacters.length)]);
    }

    // Shuffle the password characters
    for (let i = password.length - 1; i > 0; i--) {

        let j = randomIndex(i + 1);

        let temp = password[i];
        password[i] = password[j];
        password[j] = temp;

    }

    passwordOutput.value = password.join("");

    passwordMessage.textContent = "Password generated successfully!";

});


// Copy Password
copyButton.addEventListener("click", async function() {

    if (passwordOutput.value === "") {
        passwordMessage.textContent = "Generate a password first.";
        return;
    }

    try {
        await navigator.clipboard.writeText(passwordOutput.value);
        passwordMessage.textContent = "Password copied successfully!";
    }

    catch (error) {
        passwordMessage.textContent = "Unable to copy password.";
    }

});