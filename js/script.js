// Interactive elements

// Hero image carousel
let currentImageIndex = 0;
const images = ['images/church.jpg', 'images/service.jpg', 'images/prayer.jpg']; // Add more images

function showImage(index) {
    const heroImg = document.getElementById('hero-img');
    if (heroImg) {
        heroImg.src = images[index];
    }
}

// Function to send email with form data
function sendMessage(email) {
    const form = document.getElementById('contact-form');
    const name = form.querySelector('input[type="text"]').value;
    const userEmail = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;

    if (!name || !userEmail || !message) {
        alert('Please fill in all fields before sending.');
        return;
    }

    const subject = encodeURIComponent(`Message from ${name} - MFM NCR24 Contact Form`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${userEmail}\n\nMessage:\n${message}`);

    // Open default email client with pre-filled data
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}

document.addEventListener('DOMContentLoaded', () => {
    // Load announcements from localStorage
    loadAnnouncements();


    // Smooth scrolling for nav links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // If it's an external page link (not starting with #), let it navigate normally
            if (!href.startsWith('#')) {
                return; // Allow normal navigation for external pages
            }

            // Handle internal anchor links
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }

            // Close mobile menu after clicking a link
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.getElementById('nav-icon').className = 'fas fa-bars';
            }
        });
    });

    // Mobile nav toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navIcon = document.getElementById('nav-icon');
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        if (navToggle.classList.contains('active')) {
            navIcon.className = 'fas fa-times';
        } else {
            navIcon.className = 'fas fa-bars';
        }
    });

    // Image carousel for hero (if multiple images)
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(currentImageIndex);
    }, 5000); // Change every 5 seconds
});

function loadAnnouncements() {
    const list = document.getElementById('announcements-list');
    if (!list) return; // Only load if element exists
    
    let announcements = JSON.parse(localStorage.getItem('announcements')) || [];
    if (announcements.length === 0) {
        // Sample announcements
        announcements = [
            { title: 'Sunday Service', content: 'Join us this Sunday at 7 AM for worship and fellowship.', date: '2026-04-26' },
            { title: 'Bible Study', content: 'Tuesday Bible study starts at 5:30 PM. Topic: Witchcraft in the church.', date: '2026-04-28' }
        ];
        localStorage.setItem('announcements', JSON.stringify(announcements));
    }
    list.innerHTML = '';
    announcements.forEach(ann => {
        const div = document.createElement('div');
        div.className = 'announcement';
        div.innerHTML = `<h3>${ann.title}</h3><p>${ann.content}</p><small>${ann.date}</small>`;
        list.appendChild(div);
    });
}