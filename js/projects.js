/* =============================================
   projects.js – Project Name Banners + Modal
   ============================================= */

(function () {
    'use strict';

    const GITHUB_ICON = `<svg viewBox="0 0 24 24" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`;
    const DEPLOY_ICON = `<svg viewBox="0 0 24 24" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

    /* ---- Each card gets a unique accent colour palette ---- */
    const PALETTES = [
        { from: '#0d001a', mid: '#1a0033', glow: 'rgba(160,32,240,',  text: '#fff' },
        { from: '#000d1a', mid: '#001833', glow: 'rgba(32,140,240,',  text: '#fff' },
        { from: '#001a0d', mid: '#003318', glow: 'rgba(32,200,100,',  text: '#fff' },
        { from: '#1a0d00', mid: '#331800', glow: 'rgba(240,140,32,',  text: '#fff' },
        { from: '#1a001a', mid: '#330033', glow: 'rgba(220,32,160,',  text: '#fff' },
        { from: '#000d1a', mid: '#001a2e', glow: 'rgba(32,200,220,',  text: '#fff' },
    ];

    /* ---- DOM refs ---- */
    const modal        = document.getElementById('proj-modal');
    const modalBox     = modal.querySelector('.proj-modal-box');
    const closeBtn     = document.getElementById('proj-modal-close');
    const modalHeader  = modal.querySelector('.proj-modal-header');
    const modalTitle   = document.getElementById('proj-modal-title');
    const modalSummary = document.getElementById('proj-modal-summary');
    const modalTech    = document.getElementById('proj-modal-tech');
    const modalBullets = document.getElementById('proj-modal-bullets');
    const modalActions = document.getElementById('proj-modal-actions');

    /* ---- Shared helper: append floating particles to a container ---- */
    function createParticles(container, count, palette) {
        for (var i = 0; i < count; i++) {
            var dot = document.createElement('span');
            dot.className = 'proj-particle';
            var size = Math.random() * 5 + 2;
            dot.style.cssText = [
                'width:'              + size + 'px',
                'height:'             + size + 'px',
                'left:'               + (Math.random() * 90 + 5) + '%',
                'top:'                + (Math.random() * 80 + 10) + '%',
                'animation-duration:' + (Math.random() * 3 + 2.5) + 's',
                'animation-delay:'    + (Math.random() * 3) + 's',
                'opacity:'            + (Math.random() * 0.5 + 0.1),
                'background:'         + palette.glow + '0.7)',
            ].join(';');
            container.appendChild(dot);
        }
    }

    /* ---- Build an animated name banner inside a container ---- */
    function buildNameBanner(container, title, badge, paletteIndex, isModal) {
        var p = PALETTES[paletteIndex % PALETTES.length];
        container.style.background = 'linear-gradient(135deg, ' + p.from + ' 0%, ' + p.mid + ' 50%, ' + p.from + ' 100%)';

        /* Name text block */
        var nameEl = document.createElement('div');
        nameEl.className = isModal ? 'proj-modal-name' : 'proj-name-text';
        nameEl.innerHTML =
            '<span class="' + (isModal ? 'proj-modal-name-main' : 'proj-name-main') + '">' + title + '</span>' +
            '<span class="' + (isModal ? 'proj-modal-name-sub'  : 'proj-name-sub')  + '">' + (badge || 'Project') + '</span>';
        container.appendChild(nameEl);

        /* Gradient fade at bottom (modal only) */
        if (isModal) {
            var fade = document.createElement('div');
            fade.className = 'proj-modal-header-gradient';
            container.appendChild(fade);
        }

        createParticles(container, isModal ? 14 : 8, p);
    }

    /* ---- Add per-card gradient + particles to existing .proj-name-banner elements ---- */
    function buildCardBanners() {
        document.querySelectorAll('.proj-card').forEach(function (card, idx) {
            var banner = card.querySelector('.proj-name-banner');
            if (!banner) return;
            var p = PALETTES[idx % PALETTES.length];
            banner.style.background = 'linear-gradient(135deg, ' + p.from + ' 0%, ' + p.mid + ' 50%, ' + p.from + ' 100%)';
            createParticles(banner, 8, p);
        });
    }

    /* ---- Open modal with card data ---- */
    function openModal(card, paletteIndex) {
        var badge     = card.querySelector('.proj-badge');
        var title     = card.querySelector('.proj-title-row h3');
        var summary   = card.querySelector('.proj-summary');
        var techEls   = card.querySelectorAll('.proj-tech span');
        var bulletsRaw = card.dataset.bullets || '';
        var github    = card.dataset.github  || null;
        var demo      = card.dataset.demo    || null;
        var altHref   = card.dataset.altHref  || null;
        var altLabel  = card.dataset.altLabel || null;

        var titleText = title ? title.textContent : '';
        var badgeText = badge ? badge.textContent : '';

        /* Rebuild modal header banner content (keep close button + badge in place) */
        var existingBadge = document.getElementById('proj-modal-badge');
        if (existingBadge) {
            existingBadge.textContent = badgeText;
            existingBadge.style.display = badgeText ? '' : 'none';
        }

        /* Clear previously built banner elements (keep close btn & badge) */
        Array.from(modalHeader.children).forEach(function (child) {
            if (child.id !== 'proj-modal-close' && child.id !== 'proj-modal-badge') {
                child.remove();
            }
        });

        buildNameBanner(modalHeader, titleText, badgeText, paletteIndex, true);

        /* Text */
        modalTitle.textContent   = titleText;
        modalSummary.textContent = summary ? summary.textContent : '';

        /* Tech pills */
        modalTech.innerHTML = Array.from(techEls)
            .map(function (t) { return '<span>' + t.textContent + '</span>'; })
            .join('');

        /* Bullets */
        var bullets = bulletsRaw.split('||').map(function (b) { return b.trim(); }).filter(Boolean);
        modalBullets.innerHTML = bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('');

        /* Action buttons */
        var actHtml = '';
        if (demo)                actHtml += '<a href="' + demo    + '" target="_blank" rel="noopener noreferrer" class="proj-btn proj-btn-primary">' + DEPLOY_ICON + ' Live Demo</a>';
        if (github)              actHtml += '<a href="' + github  + '" target="_blank" rel="noopener noreferrer" class="proj-btn proj-btn-ghost">'   + GITHUB_ICON + ' GitHub</a>';
        if (altHref && altLabel) actHtml += '<a href="' + altHref + '" class="proj-btn proj-btn-ghost">' + DEPLOY_ICON + ' ' + altLabel + '</a>';
        modalActions.innerHTML = actHtml;

        /* Show */
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    /* ---- Close modal ---- */
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    /* ---- Event: close button ---- */
    closeBtn.addEventListener('click', closeModal);

    /* ---- Event: backdrop click (outside modal box) ---- */
    modal.addEventListener('click', function (e) {
        if (!modalBox.contains(e.target)) closeModal();
    });

    /* ---- Event: Escape key ---- */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    /* ---- Attach open listeners to cards ---- */
    function initCards() {
        buildCardBanners();

        document.querySelectorAll('.proj-card').forEach(function (card, idx) {
            card.addEventListener('click', function (e) {
                if (e.target.closest('a, button')) return;
                openModal(card, idx);
            });

            card.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(card, idx);
                }
            });
        });
    }

    /* ---- Entry point ---- */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCards);
    } else {
        initCards();
    }

})();
