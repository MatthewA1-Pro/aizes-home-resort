document.addEventListener('DOMContentLoaded', () => {
    // 1. Hero Video Rotation - Using FS Cinematic Assets
    const heroContainer = document.getElementById('hero-video-container');
    const heroContents = [
        { type: 'video', src: 'https://player.vimeo.com/progressive_redirect/playback/1154320895/rendition/720p/file.mp4?loc=external&signature=daace9efbddb4142ff05f5a6d5e95e244fbc051dd2e54c314f8d4eb4fa7d879a' },
        { type: 'video', src: 'https://player.vimeo.com/progressive_redirect/playback/1113368060/rendition/720p/file.mp4?loc=external&signature=3f22f1965431fcdef160d3a8648c0f168b8f7e4bb8b873b5cf6a1f4a276c23a0' },
        { type: 'video', src: 'https://player.vimeo.com/progressive_redirect/playback/1138311245/rendition/1080p/file.mp4?loc=external&signature=b5989579550b6c606f68146108f6c1e1a92c10653abcbe4b96e4b7dfa2840d7c' },
        { type: 'image', src: 'https://images.ctfassets.net/7dmljk7vvc0n/6Gyf8mxbbShaB9mXBxfePE/b85b58fec46f49fdc168b443d8cc43d8/FSY_Agios-Nikolaos_-Crete_shutterstock_392020450.jpg' },
        { type: 'image', src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80' }
    ];

    let currentIdx = 0;
    const elements = [];

    // Pre-create elements for smooth transition
    heroContents.forEach((content, idx) => {
        const el = document.createElement(content.type === 'video' ? 'video' : 'img');
        el.className = 'hero-video';
        if (content.type === 'video') {
            el.src = content.src;
            el.autoplay = true;
            el.muted = true;
            el.loop = true;
            el.playsInline = true;
        } else {
            el.src = content.src;
        }

        if (idx === 0) el.classList.add('active');
        heroContainer.prepend(el);
        elements.push(el);
    });

    const rotateHero = () => {
        elements[currentIdx].classList.remove('active');
        currentIdx = (currentIdx + 1) % elements.length;
        elements[currentIdx].classList.add('active');
    };

    // Rotate every 4 seconds (as requested 3-5s)
    setInterval(rotateHero, 4000);

    // 2. Smart Header Logic (Hide on scroll down, show on up)
    const header = document.getElementById('main-header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Scrolled background state
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/Show logic
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.classList.add('hide'); // Scrolling down
        } else {
            header.classList.remove('hide'); // Scrolling up
        }

        lastScrollY = currentScrollY;
    });

    // 3. Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -5% 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    // Target every reveal item directly for 100% reliability
    const animateElements = document.querySelectorAll('.reveal');
    animateElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Parallax logic for images
    window.addEventListener('scroll', () => {
        const parallaxImgs = document.querySelectorAll('.parallax-img');
        parallaxImgs.forEach(img => {
            const speed = 0.5;
            const rect = img.parentElement.getBoundingClientRect();
            const offset = (window.innerHeight - rect.top) * speed;
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                img.style.transform = `translateY(${offset * 0.1}px) scale(1.1)`;
            }
        });
    });
});
