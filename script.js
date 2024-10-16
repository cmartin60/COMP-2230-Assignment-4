document.getElementById('survey-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission until validation passes
  
  let valid = true;

  // Name validation
  const name = document.getElementById('name').value;
  if (name === '') {
    showError('name', 'Name is required');
    valid = false;
  }

  // Email validation
  const email = document.getElementById('email').value;
  if (!isValidEmail(email)) {
    showError('email', 'Valid email is required');
    valid = false;
  }

  // Radio button validation
  const contactMethod = document.querySelector('input[name="contact-method"]:checked');
  if (!contactMethod) {
    showError('contact-method', 'Please select a contact method');
    valid = false;
  }

  // Regex validation for username
  const username = document.getElementById('username').value;
  const usernamePattern = /^[a-zA-Z0-9]+$/;
  if (!usernamePattern.test(username)) {
    showError('username', 'Username must be alphanumeric');
    valid = false;
  }

  if (valid) {
    this.submit();
  }
});

function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

function showError(id, message) {
  document.querySelector(`#${id} ~ .error-message`).textContent = message;
}
