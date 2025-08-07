// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading spinner after page loads
    const spinner = document.getElementById('loading-spinner');
    window.addEventListener('load', () => {
        spinner.style.display = 'none';
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu after clicking
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Lazy loading images
    const lazyImages = document.querySelectorAll('.lazy-img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy-img');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Form validation
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Reset error messages
        document.querySelectorAll('.error-message').forEach(error => {
            error.style.display = 'none';
        });

        // Validate name
        const name = document.getElementById('name');
        if (!name.value.trim()) {
            document.getElementById('name-error').textContent = 'Name is required';
            document.getElementById('name-error').style.display = 'block';
            isValid = false;
        }

        // Validate email
        const email = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            document.getElementById('email-error').textContent = 'Email is required';
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        } else if (!emailPattern.test(email.value)) {
            document.getElementById('email-error').textContent = 'Invalid email format';
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        }

        // Validate message
        const message = document.getElementById('message');
        if (!message.value.trim()) {
            document.getElementById('message-error').textContent = 'Message is required';
            document.getElementById('message-error').style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            // Simulate form submission (replace with actual API call)
            alert('Form submitted successfully!');
            form.reset();
        }
    });

    // Scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.ft2-1, .service-item');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                el.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
});


// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    .ft2-1, .service-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s, transform 0.5s;
    }
    .ft2-1.animate, .service-item.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
