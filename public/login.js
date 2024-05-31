document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('user_id', data.data.user.id);
        window.location.href = 'home.html';
    } else {
        alert('Error: ' + data.error);
    }
});

document.getElementById('go-to-signup').addEventListener('click', () => {
    window.location.href = 'signup.html';
});
