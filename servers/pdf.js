// Select HTML Elements
let pdfInput = document.getElementById("pdfInput");
let pdfFileList = document.getElementById("pdfFileList");

let mergeButton = document.getElementById("mergeButton");
let pdfResult = document.getElementById("pdfResult");

let downloadLink = document.getElementById("downloadLink");

let selectedFiles = [];


// Show Selected PDF Files
pdfInput.addEventListener("change", function() {

    selectedFiles = Array.from(pdfInput.files);

    pdfFileList.innerHTML = "";

    selectedFiles.forEach(function(file, index) {

        let fileItem = document.createElement("p");

        fileItem.textContent =
            (index + 1) + ". " + file.name;

        pdfFileList.appendChild(fileItem);

    });

    pdfResult.textContent = "";
    downloadLink.hidden = true;

});


// Merge PDF Files
mergeButton.addEventListener("click", async function() {

    if (selectedFiles.length < 2) {
        alert("Please select at least two PDF files!");
        return;
    }

    let formData = new FormData();

    selectedFiles.forEach(function(file) {
        formData.append("files", file);
    });

    mergeButton.disabled = true;
    mergeButton.textContent = "Merging...";

    try {

        let response = await fetch("/merge-pdf", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("PDF merging failed.");
        }

        let mergedPDF = await response.blob();

        let downloadURL = URL.createObjectURL(mergedPDF);

        downloadLink.href = downloadURL;
        downloadLink.download = "merged.pdf";
        downloadLink.hidden = false;

        pdfResult.textContent = "PDF files merged successfully!";

    }

    catch (error) {

        pdfResult.textContent =
            "Unable to merge PDF files. Please try again.";

    }

    finally {

        mergeButton.disabled = false;
        mergeButton.textContent = "Merge PDF Files";

    }

});