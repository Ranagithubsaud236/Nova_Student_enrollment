const API_URL = '/api/students';

async function loadStudents() {
    const container = document.getElementById('studentsList');

    try {
        const res = await fetch(API_URL);
        const students = await res.json();

        if (!Array.isArray(students)) {
            container.innerHTML = '<div class="loading error">Server error</div>';
            return;
        }

        if (students.length === 0) {
            container.innerHTML = '<div class="loading">No students yet</div>';
            return;
        }

        container.innerHTML = students.map(s => `
            <div class="student-card">
                <div class="student-name">${escapeHtml(s.name)}</div>
                <div class="student-id">${escapeHtml(s.student_id)}</div>
                <div class="student-course">${escapeHtml(s.course)}</div>
                <div class="student-email">${escapeHtml(s.email)}</div>
                <button class="delete-btn" data-id="${escapeHtml(s.student_id)}">Delete</button>
            </div>
        `).join('');

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.getAttribute('data-id');
                await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                loadStudents();
            });
        });

    } catch (err) {
        container.innerHTML = '<div class="loading error">Failed to connect to server</div>';
    }
}

document.getElementById('enrollForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const student_id = document.getElementById('studentId').value.trim();
    const course = document.getElementById('course').value;
    const email = document.getElementById('email').value.trim();

    const messageDiv = document.getElementById('formMessage');

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, student_id, course, email })
        });

        const data = await res.json();

        if (res.ok) {
            messageDiv.innerHTML = 'Student added!';
            document.getElementById('enrollForm').reset();
            loadStudents();
        } else {
            messageDiv.innerHTML = data.error;
        }

    } catch (err) {
        messageDiv.innerHTML = 'Server error';
    }
});

function escapeHtml(str) {
    return str.replace(/[&<>]/g, m => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    }[m]));
}

loadStudents();