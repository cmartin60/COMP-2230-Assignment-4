document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('survey-form');
    
    // Error display utility function
    function showError(inputElement, message) {
        const errorElement = inputElement.nextElementSibling;
        errorElement.textContent = message;
        errorElement.classList.add('active');
    }

    function clearError(inputElement) {
        const errorElement = inputElement.nextElementSibling;
        errorElement.textContent = '';
        errorElement.classList.remove('active');
    }

    // Validation functions
    function isNotEmpty(inputElement) {
        if (inputElement.value.trim() === '') {
            showError(inputElement, 'This field is required.');
            return false;
        }
        clearError(inputElement);
        return true;
    }

    function isValidUsername(inputElement) {
        const usernamePattern = /^[a-zA-Z0-9]+$/;
        if (!usernamePattern.test(inputElement.value.trim())) {
            showError(inputElement, 'Username must be alphanumeric.');
            return false;
        }
        clearError(inputElement);
        return true;
    }

    function hasCheckedOption(radioButtons) {
        let checked = false;
        radioButtons.forEach(radio => {
            if (radio.checked) {
                checked = true;
            }
        });

        if (!checked) {
            showError(radioButtons[0].closest('fieldset'), 'Please select an option.');
            return false;
        }
        clearError(radioButtons[0].closest('fieldset'));
        return true;
    }

    function isSelected(selectElement) {
        if (selectElement.value === '') {
            showError(selectElement, 'Please select an option.');
            return false;
        }
        clearError(selectElement);
        return true;
    }

    // Form validation on submit
    form.addEventListener('submit', function (event) {
        // Prevent form submission if any validation fails
        event.preventDefault();

        let isFormValid = true;

        // Validate Full Name
        const username = document.getElementById('username');
        if (!isNotEmpty(username)) isFormValid = false;

        // Validate Birthday
        const birthDate = document.getElementById('birth-date');
        if (!isNotEmpty(birthDate)) isFormValid = false;

        // Validate Game Genre (Radio Buttons)
        const genreOptions = document.querySelectorAll('input[name="genre"]');
        if (!hasCheckedOption(genreOptions)) isFormValid = false;

        // Validate Features (Checkboxes are optional, so no validation needed here)

        // Validate Platform Dropdown
        const platform = document.getElementById('platform');
        if (!isSelected(platform)) isFormValid = false;

        // Validate Username (Alphanumeric with regex)
        const userId = document.getElementById('user-id');
        if (!isValidUsername(userId)) isFormValid = false;

        // Validate Hours Spent Gaming (Ensures it's not empty and within limits)
        const hoursGaming = document.getElementById('hours-gaming');
        if (!isNotEmpty(hoursGaming)) isFormValid = false;

        // If form is valid, submit it
        if (isFormValid) {
            form.submit();
        }
    });
});
