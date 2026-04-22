// Admin functionality

const ADMIN_PASSWORD = 'mfmncr24'; // Simple password for demo

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const announcementForm = document.getElementById('announcement-form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('password').value;
        if (password === ADMIN_PASSWORD) {
            document.getElementById('login').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
            loadAdminAnnouncements();
        } else {
            alert('Incorrect password');
        }
    });

    announcementForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const date = new Date().toLocaleDateString();

        const announcements = JSON.parse(localStorage.getItem('announcements')) || [];
        announcements.unshift({ title, content, date }); // Add to beginning
        localStorage.setItem('announcements', JSON.stringify(announcements));

        announcementForm.reset();
        loadAdminAnnouncements();
        alert('Announcement added!');
    });
});

function loadAdminAnnouncements() {
    const announcements = JSON.parse(localStorage.getItem('announcements')) || [];
    const list = document.getElementById('admin-announcements-list');
    list.innerHTML = '';
    announcements.forEach((ann, index) => {
        const div = document.createElement('div');
        div.className = 'admin-announcement';
        div.innerHTML = `<h4>${ann.title}</h4><p>${ann.content}</p><small>${ann.date}</small>
        <button onclick="deleteAnnouncement(${index})" class="delete-btn">Delete</button>`;
        list.appendChild(div);
    });
}

function deleteAnnouncement(index) {
    const announcements = JSON.parse(localStorage.getItem('announcements')) || [];
    announcements.splice(index, 1);
    localStorage.setItem('announcements', JSON.stringify(announcements));
    loadAdminAnnouncements();
}