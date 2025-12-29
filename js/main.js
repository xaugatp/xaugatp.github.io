/* Main JavaScript */

// 1. Email Obfuscation (ROT13)
const rot13 = (message) => {
    const alpha = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLM';
    return message.replace(/[a-z]/gi, letter => alpha[alpha.indexOf(letter) + 13]);
}

let e_is_shown = false;
const emailIcon = document.getElementById('iemail');
if(emailIcon) {
    emailIcon.addEventListener("click", function(){
        let demail = document.getElementById('demail');
        let msg = "fnhtngfnhtng363" + "@" + "tznvy.pbz<oe>" + "fnhtng.cbhqry@fghqrag.gbeeraf.rqh.nh";
        demail.innerHTML = rot13(msg);
        demail.style.opacity = e_is_shown ? 0 : 1;
        e_is_shown = !e_is_shown;
    });
}

// 2. Scroll Animations & Navbar
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if(target){
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                }
            }
        });
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Section Fade-ins
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
});

// 3. Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if(menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });
}

// 4. Project Modal
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-project-content');
const closeBtn = document.querySelector('.close');

// Open Modal
document.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.project-card');
        const title = card.querySelector('h4').textContent;
        // const img = card.querySelector('img').cloneNode();
        const img = card.querySelector('img').src;
        const brief = card.querySelector('.project-brief').innerHTML;
        const tools = card.querySelector('.project-tools').innerHTML;
        const details = card.querySelector('.project-details').innerHTML;

        modalContent.innerHTML = `
            <h3>${title}</h3>
            <img src="${img}" alt="${title}">
            <div class="modal-brief">${brief}</div>
            <div class="modal-tools"><strong>Stack:</strong> ${tools}</div>
            ${details}
        `;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    });
});

// Close Modal
if(closeBtn) {
    closeBtn.onclick = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    };
}

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// 5. Hero Subtitle Typewriter Effect (Simple)
const subtitle = document.querySelector('#ddesc h2');
if(subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// 6. Tabs for Skills
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = button.getAttribute('data-tab');
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(target).classList.add('active');
    });
});