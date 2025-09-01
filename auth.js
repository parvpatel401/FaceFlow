const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');



if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const res = await fetch('../backend/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    // In register.html via auth.js
    
    // Show registration success/failure

    const result = await res.json();
      if (data.success) {
        // Save user details for main.html
        localStorage.setItem("user", JSON.stringify({
        username: data.username,
        email: data.email,
        joined: data.joined
        }));

        window.location.href = "http://localhost:8080/faceflow_ai1/main.html";
      } else {
        alert(data.message || "Login failed");
    }
  });
}
    // In register.html via auth.js
    registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Get user input values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // Fetch registration API
    const res1 = await fetch('../backend/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });
    const result1 = await res1.json();
    showMessage(result1.message, result1.success);
    if (result1.success) {
        setTimeout(() => window.location.href = 'http://localhost:8080/faceflow_ai1/index.html', 2000);
    }
    });
    // In main.html via main.js
    async function fetchStudentData() {
    const res3 = await fetch('../backend/get_students.php');
    const students = await res3.json();
    const tableBody = document.querySelector('#students-table tbody');
    tableBody.innerHTML = '';
    if (students.length > 0) {
        students.forEach(student => {
        const row = /* create row from student data */
        tableBody.innerHTML += row;
        });
    }
    }
