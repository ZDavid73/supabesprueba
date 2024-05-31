document.addEventListener('DOMContentLoaded', async () => {
    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
        window.location.href = 'index.html';
        return;
    }

    const response = await fetch(`/profile?user_id=${user_id}`);
    const data = await response.json();

    if (response.ok) {
        const userInfo = document.getElementById('user-info');
        userInfo.textContent = `Hola ${data.data.profile_name}, tu correo es ${data.data.email}`;
    } else {
        alert('Error: ' + data.error);
        window.location.href = 'index.html';
    }
});
