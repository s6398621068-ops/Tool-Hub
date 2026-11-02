// Select HTML Elements
let imageInput = document.getElementById("imageInput");
let imagePreview = document.getElementById("imagePreview");

let quality = document.getElementById("quality");
let qualityValue = document.getElementById("qualityValue");

let compressButton = document.getElementById("compressButton");
let downloadButton = document.getElementById("downloadButton");

let result = document.getElementById("result");

let compressedImage = null;


// Show Selected Image
imageInput.addEventListener("change", function() {

    let file = imageInput.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Please select a valid image.");
        imageInput.value = "";
        return;
    }

    let imageURL = URL.createObjectURL(file);

    imagePreview.innerHTML = `
        <img src="${imageURL}" alt="Selected Image">
        <p>Original Size: ${(file.size / 1024).toFixed(2)} KB</p>
    `;

    result.textContent = "";
    downloadButton.hidden = true;
    compressedImage = null;

});


// Change Quality Value
quality.addEventListener("input", function() {

    qualityValue.textContent = quality.value + "%";

});


// Compress Image
compressButton.addEventListener("click", function() {

    let file = imageInput.files[0];

    if (!file) {
        alert("Please select an image first!");
        return;
    }

    let image = new Image();

    image.onload = function() {

        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");

        canvas.width = image.width;
        canvas.height = image.height;

        context.drawImage(image, 0, 0);

        let imageQuality = Number(quality.value) / 100;

        canvas.toBlob(function(blob) {

            if (!blob) {
                alert("Image compression failed.");
                return;
            }

            compressedImage = blob;

            let originalSize = file.size / 1024;
            let compressedSize = blob.size / 1024;

            result.innerHTML = `
                <p>Original Size: ${originalSize.toFixed(2)} KB</p>
                <p>Compressed Size: ${compressedSize.toFixed(2)} KB</p>
            `;

            downloadButton.hidden = false;

        }, "image/jpeg", imageQuality);

    };

    image.onerror = function() {
        alert("Unable to load this image.");
    };

    image.src = URL.createObjectURL(file);

});


// Download Compressed Image
downloadButton.addEventListener("click", function() {

    if (!compressedImage) return;

    let downloadURL = URL.createObjectURL(compressedImage);

    let link = document.createElement("a");

    link.href = downloadURL;
    link.download = "compressed-image.jpg";

    link.click();

    URL.revokeObjectURL(downloadURL);

});