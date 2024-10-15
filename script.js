// Form validation and submission handler
document.getElementById('survey-form').addEventListener('submit', function(event) {
    let formValid = true;
    const username = document.getElementById('username');
    const userId = document.getElementById('user-id');
    
    // Check for validation errors
    if (!username.value) {
        document.getElementById('error-name').textContent = "Name is required";
        formValid = false;
    } else {
        document.getElementById('error-name').textContent = "";
    }

    const pattern = /^[a-zA-Z0-9]+$/;
    if (!pattern.test(userId.value)) {
        document.getElementById('error-user-id').textContent = "Username must be alphanumeric";
        formValid = false;
    } else {
        document.getElementById('error-user-id').textContent = "";
    }

    // Prevent form submission if any errors are found
    if (!formValid) {
        event.preventDefault();
    }
});
