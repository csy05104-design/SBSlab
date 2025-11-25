document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    // Toggle Mobile Menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Animate Links
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        hamburger.classList.toggle('toggle');
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
            }

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Show More Journals
    const showMoreJournalsBtn = document.getElementById('show-more-journals-btn');
    const hiddenJournals = document.getElementById('hidden-journals');

    if (showMoreJournalsBtn && hiddenJournals) {
        showMoreJournalsBtn.addEventListener('click', () => {
            if (hiddenJournals.style.display === 'none') {
                hiddenJournals.style.display = 'block';
                showMoreJournalsBtn.innerHTML = 'Show Less Journals <i class="fas fa-chevron-up"></i>';
            } else {
                hiddenJournals.style.display = 'none';
                showMoreJournalsBtn.innerHTML = 'Show More Journals <i class="fas fa-chevron-down"></i>';
            }
        });
    }

    // Show More Conferences
    const showMoreConferencesBtn = document.getElementById('show-more-conferences-btn');
    const hiddenConferences = document.getElementById('hidden-conferences');

    if (showMoreConferencesBtn && hiddenConferences) {
        showMoreConferencesBtn.addEventListener('click', () => {
            if (hiddenConferences.style.display === 'none') {
                hiddenConferences.style.display = 'block';
                showMoreConferencesBtn.innerHTML = 'Show Less Conferences <i class="fas fa-chevron-up"></i>';
            } else {
                hiddenConferences.style.display = 'none';
                showMoreConferencesBtn.innerHTML = 'Show More Conferences <i class="fas fa-chevron-down"></i>';
            }
        });
    }

    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;

            // Simple validation (HTML5 required attribute handles most of it)
            if (name && email && message) {
                // Create text content
                const textContent = `Date: ${new Date().toLocaleString()}\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`;

                // Create blob and download link
                const blob = new Blob([textContent], { type: 'text/plain' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `inquiry_${Date.now()}.txt`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);

                // Simulate sending
                alert(`Thank you, ${name}! Your message has been saved as a text file.\n(Check your downloads folder)`);
                contactForm.reset();
            }
        });
    }
});
