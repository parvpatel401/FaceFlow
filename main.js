document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    // DOM Elements
    const welcomeMessage = document.getElementById('welcomeMessage');
    const enrollBtn = document.getElementById('enrollBtn');
    const viewDbBtn = document.getElementById('viewDbBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const enrollmentSection = document.getElementById('enrollment-section');
    const databaseView = document.getElementById('database-view');
    const enrollmentForm = document.getElementById('enrollmentForm');
    const captureBtn = document.getElementById('captureBtn');
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const enrollMessage = document.getElementById('enrollMessage');

    welcomeMessage.textContent = `Welcome, ${user.username}!`;

    // Toggle visibility of sections
    enrollBtn.addEventListener('click', () => {
        databaseView.style.display = 'none';
        enrollmentSection.style.display = 'block';
        startCamera();
    });

    viewDbBtn.addEventListener('click', () => {
        enrollmentSection.style.display = 'none';
        databaseView.style.display = 'block';
        fetchStudentData();
    });
    
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    });


    // Camera and Face Capture Logic
    let capturedImageBlob = null;
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
        } catch (err) {
            console.error("Camera access denied:", err);
            alert("Camera access is required for face enrollment.");
        }
    };

    captureBtn.addEventListener('click', () => {
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => {
            capturedImageBlob = blob;
            alert('Face captured successfully!');
        }, 'image/png');
    });

    // Enrollment Form Submission
    enrollmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!capturedImageBlob) {
            alert('Please capture a face image before submitting.');
            return;
        }

        const formData = new FormData(enrollmentForm);
        formData.append('face_image', capturedImageBlob, 'face.png');
        
        const res = await fetch('../backend/enroll.php', {
            method: 'POST',
            body: formData,
        });

        const result = await res.json();
        enrollMessage.textContent = result.message;
        enrollMessage.style.display = 'block';
        enrollMessage.className = result.success ? 'message success' : 'message error';

        if(result.success) {
            enrollmentForm.reset();
            setTimeout(() => enrollmentSection.style.display = 'none', 2000);
        }
    });

    // Fetch and display student data
    const fetchStudentData = async () => {
        const res = await fetch('../backend/get_students.php');
        const students = await res.json();
        const tableBody = document.querySelector('#students-table tbody');
        tableBody.innerHTML = '';

        if (students.length > 0) {
            students.forEach(student => {
                const row = `<tr>
                    <td>${student.student_id}</td>
                    <td>${student.roll_no}</td>
                    <td>${student.class}</td>
                    <td>${student.section}</td>
                    <td>${student.institution}</td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        } else {
            tableBody.innerHTML = '<tr><td colspan="5">No students enrolled yet.</td></tr>';
        }
    };
});
