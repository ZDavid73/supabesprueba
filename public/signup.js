document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const profile_name = document.getElementById('profile_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ profile_name, email, password })
    });

    const data = await response.json();
    if (response.ok) {
        alert('Sign up successful! Please log in.');
        window.location.href = 'index.html';
    } else {
        alert('Error: ' + data.error);
    }
});
