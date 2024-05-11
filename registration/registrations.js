document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    if (localStorage.getItem(newUsername)) {
        alert('Username already exists. Please choose a different username.');
        return; // Exit the function if the username already exists
    }

    localStorage.setItem(newUsername, newPassword);

    alert('Registration successful. You can now log in with your username and password.');

    window.location.href = 'login.html';
});