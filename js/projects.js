/* =============================================
   projects.js – Project Detail Modal
   ============================================= */

(function () {
    'use strict';

    const GITHUB_ICON = `<svg viewBox="0 0 24 24" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`;
    const DEPLOY_ICON = `<svg viewBox="0 0 24 24" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

    /* ---- DOM refs ---- */
    const modal = document.getElementById('proj-modal');
    const modalBox = modal.querySelector('.proj-modal-box');
    const closeBtn = document.getElementById('proj-modal-close');
    const modalImg = document.getElementById('proj-modal-img');
    const modalBadge = document.getElementById('proj-modal-badge');
    const modalTitle = document.getElementById('proj-modal-title');
    const modalSummary = document.getElementById('proj-modal-summary');
    const modalTech = document.getElementById('proj-modal-tech');
    const modalBullets = document.getElementById('proj-modal-bullets');
    const modalActions = document.getElementById('proj-modal-actions');

    /* ---- Open modal with card data ---- */
    function openModal(card) {
        const img = card.querySelector('.proj-image-wrap img');
        const badge = card.querySelector('.proj-badge');
        const title = card.querySelector('.proj-title-row h3');
        const summary = card.querySelector('.proj-summary');
        const techEls = card.querySelectorAll('.proj-tech span');
        const bulletsRaw = card.dataset.bullets || '';
        const github = card.dataset.github || null;
        const demo = card.dataset.demo || null;
        const altHref = card.dataset.altHref || null;
        const altLabel = card.dataset.altLabel || null;

        /* Image */
        modalImg.src = img ? img.src : '';
        modalImg.alt = img ? img.alt : '';

        /* Badge */
        if (badge) {
            modalBadge.textContent = badge.textContent;
            modalBadge.style.display = '';
        } else {
            modalBadge.style.display = 'none';
        }

        /* Text */
        modalTitle.textContent = title ? title.textContent : '';
        modalSummary.textContent = summary ? summary.textContent : '';

        /* Tech pills */
        modalTech.innerHTML = Array.from(techEls)
            .map(t => `<span>${t.textContent}</span>`)
            .join('');

        /* Bullets */
        const bullets = bulletsRaw.split('||').map(b => b.trim()).filter(Boolean);
        modalBullets.innerHTML = bullets.map(b => `<li>${b}</li>`).join('');

        /* Action buttons */
        let actHtml = '';
        if (demo) {
            actHtml += `<a href="${demo}" target="_blank" rel="noopener noreferrer" class="proj-btn proj-btn-primary">${DEPLOY_ICON} Live Demo</a>`;
        }
        if (github) {
            actHtml += `<a href="${github}" target="_blank" rel="noopener noreferrer" class="proj-btn proj-btn-ghost">${GITHUB_ICON} GitHub</a>`;
        }
        if (altHref && altLabel) {
            actHtml += `<a href="${altHref}" class="proj-btn proj-btn-ghost">${DEPLOY_ICON} ${altLabel}</a>`;
        }
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
        document.querySelectorAll('.proj-card').forEach(card => {
            card.addEventListener('click', function (e) {
                /* Don't intercept clicks on links/buttons inside the card */
                if (e.target.closest('a, button')) return;
                openModal(card);
            });

            card.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(card);
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
