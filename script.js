// Validate form on submit
document.getElementById("survey-form").addEventListener("submit", function (e) {
    validate(e);  // Perform validation before submitting
});

// Main validation function
function validate(e) {
    hideErrors();  // Hide any previous errors
    if (formHasErrors()) {
        e.preventDefault();  // Stop form submission if errors exist
    } else {
        alert("Thank you for your feedback!");
    }
}

// Hide all error messages
function hideErrors() {
    let errorFields = document.getElementsByClassName("survey-error");
    for (let i = 0; i < errorFields.length; i++) {
        errorFields[i].style.display = "none"; // Hide error messages
    }
}

// Show specific error for a form field
function showError(formField, errorId, message) {
    document.getElementById(errorId).innerText = message; // Set the error message
    document.getElementById(errorId).style.display = "block";  // Show the error message
    document.getElementById(formField).focus();  // Focus on the invalid field
}

// Check if any form field has errors
function formHasErrors() {
    let errorFlag = false;

    // Full Name validation
    let fullname = document.getElementById("fname").value;
    if (fullname.trim() === "") {
        showError("fname", "fname_error", "* Please enter your first name.");
        errorFlag = true; // Set error flag if there's an error
    } else if (/\d/.test(fullname)) { // Check for numeric characters
        showError("fname", "fname_error", "* Full name cannot contain numbers.");
        errorFlag = true; // Set error flag if there's an error
    }

    // Last Name validation
    let lastname = document.getElementById("lname").value;
    if (lastname.trim() === "") {
        showError("lname", "lname_error", "* Please enter your last name.");
        errorFlag = true; // Set error flag if there's an error
    } else if (/\d/.test(lastname)) { // Check for numeric characters
        showError("lname", "lname_error", "* Full name cannot contain numbers.");
        errorFlag = true; // Set error flag if there's an error
    }

    // Preferred Game Genre validation (radio buttons)
    let genres = document.getElementsByName("genre");
    let atLeastOneGenre = Array.from(genres).some(genre => genre.checked);
    if (!atLeastOneGenre) {
        showError("genre-horror", "genre_error", "* Please select your preferred game genre.");
        errorFlag = true;
    }

    // Features validation (checkboxes)
    let features = document.getElementsByName("features");
    let atLeastOneFeature = Array.from(features).some(feature => feature.checked);
    if (!atLeastOneFeature) {
        showError("features-multiplayer", "feature_error", "* Please select at least one feature you look for in a game.");
        errorFlag = true;
    }

    // Preferred Platform validation (select)
    let platform = document.getElementById("platform").value;
    if (platform == "" || platform == null) {
        showError("platform", "platform_error", "* Please select a preferred platform.");
        errorFlag = true;
    }

    return errorFlag;  // Return true if there are errors, false if no errors
}
