
const display = document.getElementById("display");

// Add value to display
function appendValue(value) {
    if (display.value === "Error") {
        display.value = "";
    }

    display.value += value;
}

// Clear display
function clearDisplay() {
    display.value = "";
}

// Delete last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate result
function calculate() {
    try {
        const expression = display.value;

        if (!expression || !/^[0-9+\-*/%.()\s]+$/.test(expression)) {
            display.value = "Error";
            return;
        }

        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        display.value = Number.isFinite(result)
            ? String(Number(result.toPrecision(12)))
            : "Error";

    } catch {
        display.value = "Error";
    }
}

// Keyboard support
document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (/^[0-9.]$/.test(key)) {
        appendValue(key);
    }
    else if (["+", "-", "*", "/", "%", "(", ")"].includes(key)) {
        appendValue(key);
    }
    else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    }
    else if (key === "Backspace") {
        deleteLast();
    }
    else if (key === "Escape") {
        clearDisplay();
    }

});
