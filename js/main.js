/* =============================================
   main.js – Animations, Nav, Interactions
   ============================================= */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {

        var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // ---- Consolidated scroll handler (single rAF-throttled listener
        //      driving navbar state, active nav link, back-to-top and the
        //      scroll-progress bar — avoids stacking multiple unthrottled
        //      scroll listeners) ----
        const navbar = document.getElementById('navbar');
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-links a');
        const backToTop = document.getElementById('back-to-top');
        const progressBar = document.getElementById('scroll-progress');
        let scrollTicking = false;

        function updateOnScroll() {
            const scrollY = window.scrollY;

            navbar.classList.toggle('scrolled', scrollY > 50);

            if (backToTop) backToTop.classList.toggle('visible', scrollY > 600);

            if (progressBar) {
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
                progressBar.style.width = pct + '%';
            }

            const activeY = scrollY + 200;
            sections.forEach(function (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                if (activeY >= sectionTop && activeY < sectionTop + sectionHeight) {
                    navItems.forEach(function (item) {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === '#' + sectionId) {
                            item.classList.add('active');
                        }
                    });
                }
            });

            scrollTicking = false;
        }

        window.addEventListener('scroll', function () {
            if (!scrollTicking) {
                requestAnimationFrame(updateOnScroll);
                scrollTicking = true;
            }
        });
        updateOnScroll();

        if (backToTop) {
            backToTop.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
            });
        }

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

        // ---- Fade-in on scroll (IntersectionObserver) ----
        // Each element gets a transition-delay based on its position among
        // its own siblings, so reveal grids of any size (3 cards or 7) stagger
        // proportionally instead of only the first few items getting a delay.
        const fadeElements = document.querySelectorAll('.fade-in');
        const siblingIndex = new Map();

        fadeElements.forEach(function (el) {
            const parent = el.parentElement;
            const index = siblingIndex.get(parent) || 0;
            if (!reduceMotion) {
                el.style.transitionDelay = (Math.min(index, 7) * 0.05) + 's';
            }
            siblingIndex.set(parent, index + 1);
        });

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
                    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
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

        // Note: broken-image fallback listener lives in an inline <script> in
        // <head> (must run before body <img> tags are parsed — see index.html).

        // ---- Animated stat counters (About section) ----
        const statCounts = document.querySelectorAll('.stat-count');
        if (statCounts.length) {
            const statObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    const el = entry.target;
                    const target = parseInt(el.dataset.target, 10) || 0;
                    statObserver.unobserve(el);

                    if (reduceMotion) {
                        el.textContent = target;
                        return;
                    }

                    const duration = 1200;
                    let start = null;

                    function step(ts) {
                        if (start === null) start = ts;
                        const progress = Math.min((ts - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.round(eased * target);
                        if (progress < 1) requestAnimationFrame(step);
                    }
                    requestAnimationFrame(step);
                });
            }, { threshold: 0.5 });

            statCounts.forEach(function (el) { statObserver.observe(el); });
        }

        // ---- Cursor-follow spotlight on cards (fine-pointer devices only) ----
        if (!reduceMotion && window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
            const spotlightCards = document.querySelectorAll('.spotlight-card');
            let pendingCard = null, pendingX = 0, pendingY = 0, spotlightTicking = false;

            function applySpotlight() {
                if (pendingCard) {
                    pendingCard.style.setProperty('--spot-x', pendingX + 'px');
                    pendingCard.style.setProperty('--spot-y', pendingY + 'px');
                }
                spotlightTicking = false;
            }

            spotlightCards.forEach(function (card) {
                card.addEventListener('mousemove', function (e) {
                    const rect = card.getBoundingClientRect();
                    pendingCard = card;
                    pendingX = e.clientX - rect.left;
                    pendingY = e.clientY - rect.top;
                    if (!spotlightTicking) {
                        requestAnimationFrame(applySpotlight);
                        spotlightTicking = true;
                    }
                });
            });
        }

    });

})();
