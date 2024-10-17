/*
	Survey Form Validation
	Date: 2024-10-17
	Author: Pawan Earnest
*/

/*
 * Handles the submit event of the survey form.
 *
 * param e  A reference to the submit event.
 * return   True if no validation errors; False if the form has validation errors.
 */
function validate(e) {
	// Hide all error elements on the page
	hideAllErrors();

	// Check if the form has errors
	if (formHasErrors()) {
		// Prevent the form from submitting
		e.preventDefault();
		return false;
	}

	return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e A reference to the reset event.
 * return  True allows the reset to happen; False prevents the browser from resetting the form.
 */
function resetForm(e) {
	// Confirm that the user wants to reset the form
	if (confirm('Clear survey?')) {
		// Ensure all error fields are hidden
		hideAllErrors();
		document.getElementById("fname").focus();
		return true;
	}

	e.preventDefault();
	return false;
}

/*
 * Shows the error message for a specific form field.
 *
 * param formField  The form field where the error occurred.
 * param errorId    The id of the error element to display.
 * param errorFlag  Flag to determine if the field should be focused.
 */
function showError(formField, errorId, errorFlag) {
	document.getElementById(errorId).style.display = "block";

	if (!errorFlag) {
		formField.focus();
		if (formField.type === "text") {
			formField.select();
		}
	}
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found.
 */
function formHasErrors() {

	// Required text fields: First name, Last name, Birth Date
	let requiredFields = ["fname", "lname"];
    let errorFlag = false;

	requiredFields.forEach(function(field) {
		let inputField = document.getElementById(field);
		if (!formFieldHasInput(inputField)) {
			showError(inputField, field + "_error", errorFlag);
			errorFlag = true;
		}
	});

	// Preferred Game Genre (radio buttons)
	let genreChecked = document.querySelector('input[name="genre"]:checked');
	if (!genreChecked) {
		showError(null, "genre_error", errorFlag);
		errorFlag = true;
	}

	// Features you look for in a game (checkboxes)
	let featureChecked = document.querySelector('input[name="features"]:checked');
	if (!featureChecked) {
		showError(null, "feature_error", errorFlag);
		errorFlag = true;
	}

	// Preferred Platform (dropdown)
	let platformSelect = document.getElementById("platform");
	if (platformSelect.value === "") {
		showError(platformSelect, "platform_error", errorFlag);
		errorFlag = true;
	}

	return errorFlag;
}

/*
 * Resets (hides) all of the error messages on the page.
 */
function hideAllErrors() {
	let errorFields = document.getElementsByClassName("error");
	for (let i = 0; i < errorFields.length; i++) {
		errorFields[i].style.display = "none";
	}
}

/*
 * Determines if a text field element has input.
 *
 * param   fieldElement A text field input element object.
 * return  True if the field contains input; False if nothing entered.
 */
function formFieldHasInput(fieldElement) {
	if (fieldElement.value == null || fieldElement.value.trim() === "") {
		return false;
	}
	return true;
}

/**
 * Handles the load event of the document.
 */
function load() {
	// Add event listener for the form submit
	document.getElementById("survey-form").addEventListener("submit", validate);

	// Reset the form using the default browser reset
	document.getElementById("survey-form").reset();

	// Add event listener for the form reset
	document.getElementById("survey-form").addEventListener("reset", resetForm);
}

// Add the event listener for the document load
document.addEventListener("DOMContentLoaded", load);
