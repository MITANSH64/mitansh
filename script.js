const header = document.getElementById('header'), progress = document.getElementById('progress');

function scrollUI() {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = (max ? scrollY / max * 100 : 0) + '%';
    header.classList.toggle('scrolled', scrollY > 20);
}

addEventListener('scroll', scrollUI, { passive: true });
scrollUI();

const menu = document.getElementById('menu'), nav = document.getElementById('nav');

menu.addEventListener('click', () => {
    let open = nav.classList.toggle('open');
    menu.textContent = open ? '✕' : '☰';
    menu.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    menu.textContent = '☰';
    menu.setAttribute('aria-expanded', 'false');
}));

document.getElementById('year').textContent = new Date().getFullYear();

const phrases = ['web development', 'Python programming', 'AI & machine learning', 'creative problem solving'];
let pi = 0, ci = 0, del = false;
const typed = document.getElementById('typed');

function type() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let s = phrases[pi];
    ci += del ? -1 : 1;
    typed.textContent = s.slice(0, ci);
    let wait = del ? 40 : 75;
    if (!del && ci === s.length) {
        del = true;
        wait = 1200;
    } else if (del && ci === 0) {
        del = false;
        pi = (pi + 1) % phrases.length;
        wait = 250;
    }
    setTimeout(type, wait);
}
type();

const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) {
        e.target.classList.add('show');
        io.unobserve(e.target);
    }
}), { threshold: .12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));