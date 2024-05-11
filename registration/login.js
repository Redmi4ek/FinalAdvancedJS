document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'Radmir' && password === '1234') {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = '../weather/index.html';
    } else {
        alert('Invalid username or password');
    }
});
