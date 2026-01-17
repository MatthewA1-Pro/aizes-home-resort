document.addEventListener('DOMContentLoaded', () => {
    // Hero Slider Logic
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    const slideDuration = 6000; // 6 seconds for a cinematic feel

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length > 0) {
        setInterval(nextSlide, slideDuration);
    }

    // Menu Toggle Logic
    const menuBtn = document.getElementById('menu-btn');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-links a');

    menuBtn.addEventListener('click', () => {
        const isOpen = menuOverlay.classList.toggle('active');
        menuBtn.textContent = isOpen ? 'Close' : 'Menu';
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on link click
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuOverlay.classList.remove('active');
            menuBtn.textContent = 'Menu';
            document.body.style.overflow = '';
        });
    });

    // Scroll Reveal Intersection Observer
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
