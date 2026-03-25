/* =============================================
   main.js – Animations, Nav, Interactions
   ============================================= */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {

        // ---- Navbar scroll effect ----
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', function () {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });

        // ---- Mobile menu toggle ----
        const navToggle = document.getElementById('nav-toggle');
        const navLinks = document.getElementById('nav-links');

        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('open');
            navLinks.classList.toggle('open');
        });

        // Close mobile menu on link click
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });

        // ---- Active nav link on scroll ----
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-links a');

        function updateActiveNav() {
            const scrollY = window.scrollY + 200;
            sections.forEach(function (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navItems.forEach(function (item) {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === '#' + sectionId) {
                            item.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', updateActiveNav);

        // ---- Fade-in on scroll (IntersectionObserver) ----
        const fadeElements = document.querySelectorAll('.fade-in');

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px 0px -30px 0px', threshold: 0.05 });

        fadeElements.forEach(function (el) { observer.observe(el); });

        // ---- Smooth scroll for anchor links ----
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // ---- Experience card expand/collapse (event delegation) ----
        document.querySelectorAll('.exp-card').forEach(function (card) {
            function toggle(e) {
                // Don't toggle if clicking a link or button inside the card
                if (e.target.closest('a, button')) return;
                const expanded = card.classList.toggle('expanded');
                card.setAttribute('aria-expanded', expanded);
            }

            card.addEventListener('click', toggle);

            // Keyboard support: Enter or Space
            card.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle(e);
                }
            });
        });

        // ---- Image error fallback (event delegation) ----
        document.addEventListener('error', function (e) {
            if (e.target.tagName !== 'IMG') return;
            const container = e.target.closest('.exp-logo, .edu-logo, .cert-img');
            if (!container) return;
            const fallback = container.dataset.fallback;
            if (fallback) {
                container.classList.add('img-fallback');
                container.innerHTML = '<span class="fallback-icon">' + fallback + '</span>';
            } else {
                e.target.remove();
            }
        }, true);

    });

})();
