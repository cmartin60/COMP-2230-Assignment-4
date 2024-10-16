// Validation Functions
function isNotEmpty(value) {
    return value.trim() !== "";
}

function isValidName(name) {
    const namePattern = /^[a-zA-Z]+$/;
    return namePattern.test(name);
}

function isSelected(value) {
    return value !== "";
}

function hasCheckedOption(name) {
    const options = document.querySelectorAll(`input[name="${name}"]`);
    return Array.from(options).some(option => option.checked);
}

// Show Error Messages
function showError(element, message) {
    const errorSpan = document.getElementById(`error-${element.id}`);
    errorSpan.textContent = message;
    element.classList.add('error-border');
}

// Clear Error Messages
function clearError(element) {
    const errorSpan = document.getElementById(`error-${element.id}`);
    errorSpan.textContent = "";
    element.classList.remove('error-border');
}

// Form Validation
function validateForm(event) {
    let isValid = true;

    // Validate first and last name
    const firstName = document.getElementById("firstname");
    if (!isNotEmpty(firstName.value) || !isValidName(firstName.value)) {
        showError(firstName, "Please enter a valid first name.");
        isValid = false;
    } else {
        clearError(firstName);
    }

    const lastName = document.getElementById("lastname");
    if (!isNotEmpty(lastName.value) || !isValidName(lastName.value)) {
        showError(lastName, "Please enter a valid last name.");
        isValid = false;
    } else {
        clearError(lastName);
    }

    // Validate birth date
    const birthDate = document.getElementById("birth-date");
    if (!isNotEmpty(birthDate.value)) {
        showError(birthDate, "Please select your birth date.");
        isValid = false;
    } else {
        clearError(birthDate);
    }

    // Validate radio button (game genre)
    if (!hasCheckedOption("genre")) {
        const genreFieldset = document.querySelector("fieldset legend[for='genre']");
        showError(genreFieldset, "Please select a game genre.");
        isValid = false;
    } else {
        clearError(genreFieldset);
    }

    // Validate platform dropdown
    const platform = document.getElementById("platform");
    if (!isSelected(platform.value)) {
        showError(platform, "Please select a platform.");
        isValid = false;
    } else {
        clearError(platform);
    }

    // Validate username (alphanumeric only)
    const username = document.getElementById("user-id");
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    if (!isNotEmpty(username.value) || !usernamePattern.test(username.value)) {
        showError(username, "Username must be alphanumeric.");
        isValid = false;
    } else {
        clearError(username);
    }

    // Validate hours gaming input
    const hoursGaming = document.getElementById("hours-gaming");
    if (!isNotEmpty(hoursGaming.value) || hoursGaming.value < 1 || hoursGaming.value > 100) {
        showError(hoursGaming, "Please enter a valid number of hours (1-100).");
        isValid = false;
    } else {
        clearError(hoursGaming);
    }

    // Prevent form submission if there are validation errors
    if (!isValid) {
        event.preventDefault();
    }
}

// Attach the validation function to the form's submit event
document.getElementById("survey-form").addEventListener("submit", validateForm);
