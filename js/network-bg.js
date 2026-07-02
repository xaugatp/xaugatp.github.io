/* =============================================
   network-bg.js – Animated particle network canvas (Hero background)
   ============================================= */

(function () {
    'use strict';

    var canvas = document.getElementById('network-bg');
    if (!canvas || !canvas.getContext) return;

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    var hero = canvas.closest('.hero');
    if (!hero) return;

    var ctx = canvas.getContext('2d');
    var DOT_COLOR = 'rgba(96, 165, 250, 0.6)';
    var LINE_RGB = '96, 165, 250';
    var LINK_DIST = 130;

    var width = 0, height = 0, particles = [], running = false, rafId = null;

    function resize() {
        var rect = hero.getBoundingClientRect();
        width = canvas.width = rect.width;
        height = canvas.height = rect.height;

        var count = Math.min(90, Math.max(28, Math.round((width * height) / 18000)));
        particles = [];
        for (var i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: Math.random() * 1.6 + 0.8
            });
        }
    }

    function step() {
        ctx.clearRect(0, 0, width, height);

        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            if (p.x <= 0 || p.x >= width) p.vx *= -1;
            if (p.y <= 0 || p.y >= height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = DOT_COLOR;
            ctx.fill();
        }

        for (var a = 0; a < particles.length; a++) {
            for (var b = a + 1; b < particles.length; b++) {
                var dx = particles[a].x - particles[b].x;
                var dy = particles[a].y - particles[b].y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < LINK_DIST) {
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.strokeStyle = 'rgba(' + LINE_RGB + ', ' + (0.2 * (1 - dist / LINK_DIST)) + ')';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        if (running) rafId = requestAnimationFrame(step);
    }

    function start() {
        if (running) return;
        running = true;
        rafId = requestAnimationFrame(step);
    }

    function stop() {
        running = false;
        if (rafId) cancelAnimationFrame(rafId);
    }

    resize();
    start();

    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 200);
    });

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) stop(); else start();
    });

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) start(); else stop();
            });
        }, { threshold: 0 });
        observer.observe(hero);
    }
})();
