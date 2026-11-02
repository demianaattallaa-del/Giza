const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
}, {passive:true});

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

// Subtle reveal animation without a library.
const reveal = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.animate(
        [{opacity:0, transform:'translateY(18px)'},{opacity:1, transform:'translateY(0)'}],
        {duration:650, easing:'cubic-bezier(.2,.8,.2,1)', fill:'forwards'}
      );
      reveal.unobserve(entry.target);
    }
  });
}, {threshold:.12});

document.querySelectorAll('.landmark-card,.heritage-card,.timeline-item,.stat-row>div,.explore-link').forEach(el => {
  el.style.opacity = '0';
  reveal.observe(el);
});
