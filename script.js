// script.js

// Function to handle zero interest rate
function calculateWithInterest(principalAmount, interestRate) {
    if (interestRate === 0) {
        return principalAmount; // No interest applied
    }
    return principalAmount * (1 + interestRate / 100);
}

// Function for comprehensive input validation
function validateInput(principalAmount, interestRate) {
    if (typeof principalAmount !== 'number' || typeof interestRate !== 'number') {
        throw new Error('Both principal amount and interest rate must be numbers.');
    }
    if (principalAmount < 0 || interestRate < 0) {
        throw new Error('Principal amount and interest rate must be non-negative.');
    }
    return true;
}

// Function for rounding currency to whole numbers
function roundCurrency(amount) {
    return Math.round(amount);
}

// Function to synchronize slider and input
function syncSliderInput(sliderId, inputId) {
    const slider = document.getElementById(sliderId);
    const input = document.getElementById(inputId);

    slider.addEventListener('input', function() {
        input.value = slider.value;
    });

    input.addEventListener('input', function() {
        slider.value = input.value;
    });
}

// Example usage:
// syncSliderInput('interestSlider', 'interestInput');