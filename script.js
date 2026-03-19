(function () {
    'use strict';

    // ===== DOM Elements =====
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const resumeBtn = document.getElementById('resumeBtn');
    const resumeNavBtn = document.getElementById('resumeNavBtn');
    const resumeBtnFooter = document.getElementById('resumeBtnFooter');

    // ===== Navbar scroll effect =====
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on load

    // ===== Mobile menu toggle =====
    function toggleMenu() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (navToggle) {
        navToggle.addEventListener('click', toggleMenu);
    }

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
    });

    // ===== Smooth scroll for anchor links =====
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== Resume download (PDF) =====
    function handleResumeClick(e) {
        // Resume PDF is linked in HTML (WhatsApp Image 2026-02-09 at 10.52.56 PM.pdf).
        // Optionally open in new tab if you want fallback behavior:
        // e.preventDefault();
        // window.open('WhatsApp%20Image%202026-02-09%20at%2010.52.56%20PM.pdf', '_blank');
    }

    if (resumeBtn) resumeBtn.addEventListener('click', handleResumeClick);
    if (resumeBtnFooter) resumeBtnFooter.addEventListener('click', handleResumeClick);

    // ===== Intersection Observer: fade-in on scroll =====
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title, .about-grid, .skill-card, .project-card, .cert-item, .timeline-item, .blog-card, .skills-banner, .experience-visual').forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // Add visible class styles via a small style block (or could be in CSS)
    const style = document.createElement('style');
    style.textContent = '.section-title.visible, .about-grid.visible, .skill-card.visible, .project-card.visible, .cert-item.visible, .timeline-item.visible, .blog-card.visible, .skills-banner.visible, .experience-visual.visible { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);
})();
