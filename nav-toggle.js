// Mobile navigation toggle
// Adds support for opening/closing the nav menu on small screens.
document.addEventListener('DOMContentLoaded', ()=>{
    const navToggle = document.querySelector('.nav-toggle');
    const body = document.body;
    if(!navToggle) return;

    navToggle.addEventListener('click', ()=>{
        const expanded = body.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', String(expanded));
    });

    // Close mobile nav when a link is clicked
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link=>{
        link.addEventListener('click', ()=>{
            if(body.classList.contains('nav-open')){
                body.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
});
