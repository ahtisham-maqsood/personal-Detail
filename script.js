document.addEventListener('DOMContentLoaded', ()=>{
    const container = document.querySelector('.testimonial-container');
    const track = document.querySelector('.testimonial-track');
    const cards = Array.from(document.querySelectorAll('.testimonial-card'));
    const dots = Array.from(document.querySelectorAll('.dot'));
    if(!container || !track || !cards.length) return;

    // center a card in the container
    function centerCard(i){
        const card = cards[i];
        const containerW = container.clientWidth;
        const maxTranslate = Math.max(track.scrollWidth - containerW, 0);
        const desired = card.offsetLeft - (containerW - card.offsetWidth)/2;
        const x = Math.max(0, Math.min(desired, maxTranslate));
        track.style.transform = `translateX(-${x}px)`;
        dots.forEach((d,idx)=> d.classList.toggle('active', idx===i));
        current = i;
    }

    let current = 0;
    dots.forEach((d,i)=> d.addEventListener('click', ()=> centerCard(i)));

    // auto advance
    let iv = setInterval(()=> centerCard((current+1)%cards.length), 3000);
    container.addEventListener('mouseenter', ()=> clearInterval(iv));
    container.addEventListener('mouseleave', ()=> iv = setInterval(()=> centerCard((current+1)%cards.length), 3000));

    // start centered on first
    centerCard(0);
    // ensure re-center on resize
    window.addEventListener('resize', ()=> centerCard(current));
});

// Projects filter
document.addEventListener('DOMContentLoaded', ()=>{
    const buttons = Array.from(document.querySelectorAll('.filter-btns button'));
    const projects = Array.from(document.querySelectorAll('.projects-grid .project-card'));
    if(!buttons.length || !projects.length) return;

    function showFilter(filter){
        projects.forEach(p=>{
            const cat = p.getAttribute('data-category');
            if(filter === 'all' || cat === filter) p.classList.remove('hidden'); else p.classList.add('hidden');
        });
    }

    buttons.forEach(btn=> btn.addEventListener('click', ()=>{
        buttons.forEach(b=> b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.getAttribute('data-filter') || btn.textContent.trim().toLowerCase();
        showFilter(f);
    }));

    // initialize
    showFilter('all');
});

// Nav link smooth scroll fallback (ensures consistent behavior and optional offset)
document.addEventListener('DOMContentLoaded', ()=>{
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    if(!navLinks.length) return;
    navLinks.forEach(link=>{
        link.addEventListener('click', (e)=>{
            // let native behavior handle if hash navigation is fine
            const href = link.getAttribute('href');
            if(!href || href === '#') return;
            const el = document.querySelector(href);
            if(!el) return;
            e.preventDefault();
            // scroll and update URL hash
            const top = el.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({top, behavior:'smooth'});
            // update hash without jumping
            history.replaceState(null, '', href);
        });
    });
});