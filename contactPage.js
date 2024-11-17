// JavaScript for contact form on contact page
document.getElementById("contactForm").addEventListener("submit", function(event) {
    // Prevent form submission
    event.preventDefault();

    // Get form elements
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const number = document.getElementById("number");
    const message = document.getElementById("message");

    // Clear previous error messages
    clearErrors();

    let valid = true;

    // Validate Name
    if (name.value.trim() === "") {
        showError(name, "Name is required.");
        valid = false;
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === "") {
        showError(email, "Email is required.");
        valid = false;
    } else if (!emailPattern.test(email.value.trim())) {
        showError(email, "Please enter a valid email address.");
        valid = false;
    }

     // Validate Phone Number if given 
    const phonePattern = /^\+?[0-9]{0,15}$/;
    if (number.value.trim() !== "" && !phonePattern.test(number.value.trim())) {
        showError(number, "Please enter a valid phone number.");
        valid = false;
    }

    // Validate Message
    if (message.value.trim() === "") {
        showError(message, "Message is required.");
        valid = false;
    }

    // Submit form if checks succeed 
    if (valid) {
        // Optionally, you can reset the form
        document.getElementById("contactForm").reset();
    }
});

function showError(input, message) {
    const error = document.createElement("div");
    error.className = "error-message";
    error.textContent = message;
    input.parentElement.appendChild(error);
}

function clearErrors() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(error => error.remove());
}
