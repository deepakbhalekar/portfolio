document.addEventListener('DOMContentLoaded', () => {
    // --- Dark Mode Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const body = document.body;

    // Check for saved theme preference or system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark');
    }

    // Function to toggle theme
    const toggleTheme = () => {
        if (body.classList.contains('dark')) {
            body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    };

    themeToggle.addEventListener('click', toggleTheme);
    themeToggleMobile.addEventListener('click', toggleTheme);

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinksMobile = mobileMenu.querySelectorAll('a');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        // Toggle icon between bars and times
        const icon = mobileMenuButton.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    // Close mobile menu when a link is clicked
    navLinksMobile.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.querySelector('i').classList.remove('fa-times');
            mobileMenuButton.querySelector('i').classList.add('fa-bars');
        });
    });

    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Section Fade-in Animation on Scroll (Intersection Observer) ---
    const sections = document.querySelectorAll('.section-fade-in');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the section must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Contact Form Submission (Client-side only) ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent actual form submission

        // Basic client-side validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        // In a real application, you would send this data to a backend server
        // using fetch() or XMLHttpRequest.
        console.log('Form Submitted:', { name, email, message });

        // Display success message
        showMessage('Thank you for your message! I will get back to you soon.', 'success');

        // Clear the form
        contactForm.reset();
    });

    function showMessage(msg, type) {
        formMessage.textContent = msg;
        formMessage.className = `mt-4 text-center text-sm font-medium ${type}`; // Reset classes and add new type
        formMessage.style.display = 'block'; // Ensure it's visible

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
            formMessage.classList.remove(type); // Clean up classes
        }, 5000);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // --- Copy Email to Clipboard ---
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const emailText = document.getElementById('email-text');

    copyEmailBtn.addEventListener('click', () => {
        const email = emailText.textContent;
        // Use document.execCommand('copy') for better iframe compatibility
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showMessage('Email copied to clipboard!', 'success');
        } catch (err) {
            console.error('Failed to copy email: ', err);
            showMessage('Failed to copy email.', 'error');
        } finally {
            document.body.removeChild(textarea);
        }
    });

});
