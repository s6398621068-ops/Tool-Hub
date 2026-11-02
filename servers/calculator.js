// Select HTML Elements
let display = document.getElementById("display");
let buttons = document.querySelectorAll(".calculator-buttons button");

let expression = "";

// Handle Button Clicks
buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        let value = button.getAttribute("data-value");
        let action = button.getAttribute("data-action");

        // Clear Display
        if (action === "clear") {
            expression = "";
            display.value = "0";
        }

        // Delete Last Character
        else if (action === "delete") {
            expression = expression.slice(0, -1);
            display.value = expression || "0";
        }

        // Calculate Result
        else if (action === "calculate") {
            try {
                if (expression === "") return;

                let result = Function(
                    '"use strict"; return (' + expression + ')'
                )();

                if (!Number.isFinite(result)) {
                    throw new Error("Invalid calculation");
                }

                expression = String(result);
                display.value = expression;

            } catch (error) {
                display.value = "Error";
                expression = "";
            }
        }

        // Add Number or Operator
        else if (value !== null) {
            expression += value;
            display.value = expression;
        }

    });

});