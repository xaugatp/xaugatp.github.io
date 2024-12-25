const rot13 = (message) => {
    const alpha = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLM';
    return message.replace(/[a-z]/gi, letter => alpha[alpha.indexOf(letter) + 13]);
}

let e_is_shown = false;

document.getElementById('iemail').addEventListener("click", function(){
    let demail = document.getElementById('demail');
    let msg = "avxuvynpp16" + "@" + "tznvy.pbz<oe>" + "acnyrgv@hpfq.rqh";
    demail.innerHTML = rot13(msg);
    demail.style.opacity = e_is_shown ? 0 : 1;
    e_is_shown = !e_is_shown;
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    if (window.scrollY > 0) {
        nav.classList.add('scrolled');
        header.classList.remove('gradient-background');
    } else {
        nav.classList.remove('scrolled');
        header.classList.add('gradient-background');
    }
});

document.getElementById('menu-toggle').addEventListener('click', function(){
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('open');
});

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const menu = document.getElementById('mobile-menu');

    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });

                // Hide the menu after clicking a link
                if (menu.classList.contains('open')) {
                    menu.classList.remove('open');
                }
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-project-content');
    const closeBtn = document.querySelector('.close');
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');

    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectCard = this.closest('.project-card');
            const projectDetails = projectCard.querySelector('.project-details').innerHTML;
            const projectTitle = projectCard.querySelector('h4').textContent;
            const projectImage = projectCard.querySelector('img').outerHTML;
            const projectBrief = projectCard.querySelector('.project-brief').innerHTML;
            const projectTools = projectCard.querySelector('.project-tools').textContent;

            modalContent.innerHTML = `
                <h3>${projectTitle}</h3>
                ${projectImage}
                <div class="modal-brief">${projectBrief}</div>
                <div class="modal-tools"><strong>Tools:</strong> ${projectTools}</div>
                ${projectDetails}
            `;
            modal.style.display = 'block';
        });
    });

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img[data-src]"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.removeAttribute("data-src");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(function(lazyImage) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.removeAttribute("data-src");
        });
    }
});

const dhead = document.getElementById('dhead');
const img = document.querySelector('#dpic img');
const images = ['assets/me.jpg', 'assets/me2.png'];
let currentIndex = 0;

function switchImage() {
    img.style.opacity = '0';
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        img.src = images[currentIndex];
        img.style.opacity = '1';
    }, 300);
}

dhead.addEventListener('click', function(event) {
    // Prevent the click from triggering on child links
    if (event.target.tagName.toLowerCase() !== 'a' && !event.target.closest('a')) {
        switchImage();
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
});